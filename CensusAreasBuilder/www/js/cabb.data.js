<<<<<<< HEAD
var AGS = AGS || {
    types: {
        integer: 'esriFieldTypeInteger',
        string: 'esriFieldTypeString'
    }
};

var CABB = CABB || {};

CABB.model = CABB.model || {
    mapp: null,
    layerData: null,
    currStep: -1,
    currLayer: -1,
    layerFeats: '',
    layerPolys: '',
    assist: {
        selAttr: null,
        selAttrVal: -1,
        bffrDistance: -1
    }
};

CABB.config = CABB.config || {
    condition: '$field <= $val',
    layers: [{
            label: '&Aacute;rea de trabajo externa',
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/Demographics/USA_Recent_Population_Change/MapServer/3',
            params: {
                where: "ST_ABBREV in ('UT','AZ','CO','NM')",
                outFields: 'OBJECTID,LANDAREA,ST_ABBREV,TOTPOP_CY',
                f: 'json',
                returnGeometry: true
            }
        }, {
            label: '&Aacute;reas de trabajo 01',
            url: 'http://dgest78.dane.gov.co:6080/arcgis/rest/services/PruebaSeccionCensal/PruebaSeccionCensal/MapServer/1',
            params: {
                where: "SECU_SET_1 in ('5610','5615','5609','5602')",
                outFields: 'FID,MANZ_CCNCT,TOT_VIV,TOT_HOG,TOT_PERLEA,TOT_UEXAG,TOT_PER',
                f: 'json',
                returnGeometry: true
            }
        }, {
            label: '&Aacute;reas de trabajo 02',
            url: 'http://dgest78.dane.gov.co:6080/arcgis/rest/services/PruebaSeccionCensal/PruebaSeccionCensal/MapServer/1',
            params: {
                where: "SECU_SET_1 in ('5405','5404','5406')",
                outFields: 'FID,MANZ_CCNCT,TOT_VIV,TOT_HOG,TOT_PERLEA,TOT_UEXAG,TOT_PER',
                f: 'json',
                returnGeometry: true
            }
        }, {
            label: '&Aacute;reas de trabajo 03',
            url: 'http://dgest78.dane.gov.co:6080/arcgis/rest/services/PruebaSeccionCensal/PruebaSeccionCensal/MapServer/1',
            params: {
                where: "SECU_SET_1 in ('5628','5608','5603')",
                outFields: 'FID,MANZ_CCNCT,TOT_VIV,TOT_HOG,TOT_PERLEA,TOT_UEXAG,TOT_PER',
                f: 'json',
                returnGeometry: true
            }
        }, {
            label: '&Aacute;reas de trabajo 04',
            url: 'http://dgest78.dane.gov.co:6080/arcgis/rest/services/PruebaSeccionCensal/PruebaSeccionCensal/MapServer/1',
            params: {
                where: "SECU_SET_1 in ('9121','5611','5601','5612')",
                outFields: 'FID,MANZ_CCNCT,TOT_VIV,TOT_HOG,TOT_PERLEA,TOT_UEXAG,TOT_PER',
                f: 'json',
                returnGeometry: true
            }
        }, {
            label: '&Aacute;reas de trabajo 05',
            url: 'http://dgest78.dane.gov.co:6080/arcgis/rest/services/PruebaSeccionCensal/PruebaSeccionCensal/MapServer/1',
            params: {
                where: "SECU_SET_1 in ('5501','5502','5503','5510','5509')",
                outFields: 'FID,MANZ_CCNCT,TOT_VIV,TOT_HOG,TOT_PERLEA,TOT_UEXAG,TOT_PER',
                f: 'json',
                returnGeometry: true
            }
        }, {
            label: '&Aacute;reas de trabajo 06',
            url: 'http://dgest78.dane.gov.co:6080/arcgis/rest/services/PruebaSeccionCensal/PruebaSeccionCensal/MapServer/1',
            params: {
                where: "SECU_SET_1 in ('5401','5402','5403')",
                outFields: 'FID,MANZ_CCNCT,TOT_VIV,TOT_HOG,TOT_PERLEA,TOT_UEXAG,TOT_PER',
                f: 'json',
                returnGeometry: true
            }
        }
    ]
=======
var AGS = AGS || {
    types: {
        integer: 'esriFieldTypeInteger',
        string: 'esriFieldTypeString'
    }
};

var CABB = CABB || {};

CABB.model = CABB.model || {
    mapp: null,
    layerData: null,
    currStep: -1,
    currLayer: -1,
    layerFeats: '',
    layerPolys: '',
    assist: {
        selAttr: null,
        selAttrVal: -1,
        bffrDistance: -1
    }
};

CABB.config = CABB.config || {
    condition: '$field <= $val',
    layers: [{
            label: '&Aacute;rea de trabajo externa',
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/Demographics/USA_Recent_Population_Change/MapServer/3',
            params: {
                where: "ST_ABBREV in ('UT','AZ','CO','NM')",
                outFields: 'OBJECTID,LANDAREA,ST_ABBREV,TOTPOP_CY',
                f: 'json',
                returnGeometry: true
            }
        }, {
            label: '&Aacute;reas de trabajo 01',
            url: 'http://dgest78.dane.gov.co:6080/arcgis/rest/services/PruebaSeccionCensal/PruebaSeccionCensal/MapServer/1',
            params: {
                where: "SECU_SET_1 in ('5610','5615','5609','5602')",
                outFields: 'FID,MANZ_CCNCT,TOT_VIV,TOT_HOG,TOT_PERLEA,TOT_UEXAG,TOT_PER',
                f: 'json',
                returnGeometry: true
            }
        }, {
            label: '&Aacute;reas de trabajo 02',
            url: 'http://dgest78.dane.gov.co:6080/arcgis/rest/services/PruebaSeccionCensal/PruebaSeccionCensal/MapServer/1',
            params: {
                where: "SECU_SET_1 in ('5405','5404','5406')",
                outFields: 'FID,MANZ_CCNCT,TOT_VIV,TOT_HOG,TOT_PERLEA,TOT_UEXAG,TOT_PER',
                f: 'json',
                returnGeometry: true
            }
        }, {
            label: '&Aacute;reas de trabajo 03',
            url: 'http://dgest78.dane.gov.co:6080/arcgis/rest/services/PruebaSeccionCensal/PruebaSeccionCensal/MapServer/1',
            params: {
                where: "SECU_SET_1 in ('5628','5608','5603')",
                outFields: 'FID,MANZ_CCNCT,TOT_VIV,TOT_HOG,TOT_PERLEA,TOT_UEXAG,TOT_PER',
                f: 'json',
                returnGeometry: true
            }
        }, {
            label: '&Aacute;reas de trabajo 04',
            url: 'http://dgest78.dane.gov.co:6080/arcgis/rest/services/PruebaSeccionCensal/PruebaSeccionCensal/MapServer/1',
            params: {
                where: "SECU_SET_1 in ('9121','5611','5601','5612')",
                outFields: 'FID,MANZ_CCNCT,TOT_VIV,TOT_HOG,TOT_PERLEA,TOT_UEXAG,TOT_PER',
                f: 'json',
                returnGeometry: true
            }
        }, {
            label: '&Aacute;reas de trabajo 05',
            url: 'http://dgest78.dane.gov.co:6080/arcgis/rest/services/PruebaSeccionCensal/PruebaSeccionCensal/MapServer/1',
            params: {
                where: "SECU_SET_1 in ('5501','5502','5503','5510','5509')",
                outFields: 'FID,MANZ_CCNCT,TOT_VIV,TOT_HOG,TOT_PERLEA,TOT_UEXAG,TOT_PER',
                f: 'json',
                returnGeometry: true
            }
        }, {
            label: '&Aacute;reas de trabajo 06',
            url: 'http://dgest78.dane.gov.co:6080/arcgis/rest/services/PruebaSeccionCensal/PruebaSeccionCensal/MapServer/1',
            params: {
                where: "SECU_SET_1 in ('5401','5402','5403')",
                outFields: 'FID,MANZ_CCNCT,TOT_VIV,TOT_HOG,TOT_PERLEA,TOT_UEXAG,TOT_PER',
                f: 'json',
                returnGeometry: true
            }
        }
    ]
>>>>>>> 62358265884161aaeab91b8c3d66d7b4293815a0
};