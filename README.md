# Windmate.de - Wind Forecast Service - Frontend

A Wind Forecast App. You can search for a spot and get the wind forecast for the next 5 days. The app is still in development and will be released soon. Windmate does not realy on a Weather API. Instead, i download the date from the DWD and NOAA and calculate the forecast myself. This way i can be indipedent from a Weather API and can provide the forecast for any spot in the world. There is one Backend API that provides the data and one Frontend App that displays the forecast. There is also a Backend Service that downloads the data from the DWD and NOAA and calculates the forecast that is then stored in a MongoDB database and an CDN.

### Live 
[windmate.de](https://windmate.de)

## Install and Run

### Run Dev
```bash
npm run dev
```
Runs the App in the development mode at http://localhost:3000

The App will reload when you make changes.
You may also see any lint errors in the console.

## Usage

Right now you can pick a few spots from the landing Page or go to the Wind Map and check out the ICON-D2 and ICON-EU windforecast Maps.

## Onaci.github.io

Thanks to onaci.github.io. I adapt his leaflet-velocity layer for leaflet to fit my requirements and make it usable for a big dataset.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
