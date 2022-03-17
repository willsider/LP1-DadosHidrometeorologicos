import { RiverReading } from "./models/RiverReading";
import { fetchRiverReadingData } from "./services/river_reading_services";
import { saveToCsvFile } from "./utils/files_utils";

const generateRiverDataFiles = async ( 
    stationCode: string,
    initialDate: Date,
    finalDate: Date
    ) => {
        const readings: RiverReading[] = await fetchRiverReadingData(
            stationCode,
            initialDate,
            finalDate
        )

        saveToCsvFile(readings, 'leituras.csv')
        console.log('mal feito desfeito')
    }


generateRiverDataFiles('66945000', new Date(2022,2,16), new Date(2022,2,16))

fetchRiverReadingData(
    '66945000', 
    new Date(2022, 2, 16),
    new Date(2022, 2, 16),
)