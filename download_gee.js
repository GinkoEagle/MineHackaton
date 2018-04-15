// Plot a time series of a band's value in regions of the American West.
var mine1 = ee.Feature(    // Tulison. -33.85010224656475,116.05011436512962
                           //          -33.85010224656475,116.08328792622581
                           //          -33.88331328750793,116.08328792622581
                           //          -33.88353781695509,116.0499374151955
    ee.Geometry.Rectangle(116.08328792622581, -33.85010224656475, 116.0499374151955, -33.88353781695509),
    {label: 'australia'});

var mine2 = ee.Feature(    //SQM SALAR -23.444862421654562,-68.44521601288295
                           //          -23.44580735583742,-68.30136377899623
                           //          -23.57551402807672,-68.29999048798061
                           //          -23.574255354493978,-68.4434993991134
    ee.Geometry.Rectangle(-68.30136377899623, -23.44580735583742, -68.4434993991134, -23.574255354493978),
    {label: 'chile'});


var mines = new ee.FeatureCollection([mine2]);

// Get brightness temperature data for 1 year.

//var landsat8Toa = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
var landsat8Toa = ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA');

var imgs = landsat8Toa.filterBounds(mines)
    .filterDate('2000-01-01','2018-12-30')
    .select(['B4', 'B3', 'B2'])
    .map(function(image) {
    return image.multiply(512).uint8();
  });
  

Export.video.toDrive({
  collection: imgs,
  description: 'ChileMine',
  dimensions: 720,
  framesPerSecond: 12,
  region: mine2
});
