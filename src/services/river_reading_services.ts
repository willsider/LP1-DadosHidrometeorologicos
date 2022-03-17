import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { find } from 'xml2js-xpath';

import { RiverReading } from "../models/RiverReading";
import { API_URL } from "../config/api";
import { toDateString } from "../utils/date_utils";


export const fetchRiverReadingData = async (
  stationCode: string,
  initialDate: Date,
  finalDate: Date
) => {
  //Array que contera todas as leituras do rio do//
  let readings: RiverReading[] = [];

  //Gera a url do serviço de consulta//

  const url = API_URL.replace("STATION_CODE", stationCode)
    .replace("INITIAL_DATE", toDateString(initialDate))
    .replace("FINAL_DATE", toDateString(finalDate));

  console.log(url);

  //consome o serviço de consulta da Ana//

  const response = await axios.get(url);
  
  //converte o xml para um objeto javascript //
  
  const jsonObj = await parseStringPromise(response.data)
  //utiliza o xptah para pegar somente os dados referentes//
  //as ocorrencias da tag dadoshidrometereologicos//
  const results = find(jsonObj, '//DadosHidrometereologicos')
  if(results) {
      results.forEach((r) => {
          const stationCode = r.CodEstacao[0]
          const level = parseFloat(r.Nivel[0])
          const flow = parseFloat(r.Vazao[0])
          const rain = parseFloat(r.Chuva[0])
          const dateTime = new Date(r.DataHora[0].trim())

          const reading: RiverReading = { stationCode, level, flow, rain, dateTime}

        readings.push(reading)
      })
  }

  return readings;
}
