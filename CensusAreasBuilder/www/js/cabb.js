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
            label: '&Aacute;reas de trabajo 01',
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/Demographics/USA_Recent_Population_Change/MapServer/3',
            params: {
                where: "ST_ABBREV in ('AK')",
                outFields: 'OBJECTID,LANDAREA,ST_ABBREV,TOTPOP_CY',
                f: 'json',
                returnGeometry: true
            }
        }, {
            label: '&Aacute;reas de trabajo 02',
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/Demographics/USA_Recent_Population_Change/MapServer/3',
            params: {
                where: "ST_ABBREV in ('5405','5404','5406')",
                outFields: 'OBJECTID,LANDAREA,ST_ABBREV,TOTPOP_CY',
                f: 'json',
                returnGeometry: true
            }
        }, {
            label: '&Aacute;reas de trabajo 03',
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/Demographics/USA_Recent_Population_Change/MapServer/3',
            params: {
                where: "ST_ABBREV in ('5628','5608','5603')",
                outFields: 'OBJECTID,LANDAREA,ST_ABBREV,TOTPOP_CY',
                f: 'json',
                returnGeometry: true
            }
        }, {
            label: '&Aacute;reas de trabajo 04',
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/Demographics/USA_Recent_Population_Change/MapServer/3',
            params: {
                where: "ST_ABBREV in ('9121','5611','5601','5612')",
                outFields: 'OBJECTID,LANDAREA,ST_ABBREV,TOTPOP_CY',
                f: 'json',
                returnGeometry: true
            }
        }, {
            label: '&Aacute;reas de trabajo 05',
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/Demographics/USA_Recent_Population_Change/MapServer/3',
            params: {
                where: "ST_ABBREV in ('5501','5502','5503','5510','5509')",
                outFields: 'OBJECTID,LANDAREA,ST_ABBREV,TOTPOP_CY',
                f: 'json',
                returnGeometry: true
            }
        }, {
            label: '&Aacute;reas de trabajo 06',
            url: 'http://server.arcgisonline.com/ArcGIS/rest/services/Demographics/USA_Recent_Population_Change/MapServer/3',
            params: {
                where: "ST_ABBREV in ('5401','5402','5403')",
                outFields: 'OBJECTID,LANDAREA,ST_ABBREV,TOTPOP_CY',
                f: 'json',
                returnGeometry: true
            }
        }
    ]
};

CABB.prepareXHRForMSIE = function () {
    var xhr = null;
    if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHttp");
    } else if ((window.XMLHttpRequest) || (typeof XMLHttpRequest) != undefined) {
        xhr = new XMLHttpRequest();
    } else {
        alert("Su navegador no tiene soporte para AJAX");
        return;
    }
    return xhr;
};

CABB.retrieveLayerInformation = function (layer) {
    if (layer !== null) {
        if (jQuery.browser.msie) {
            var xhr = CABB.prepareXHRForMSIE();
            if (xhr !== null) {
                xhr.open("POST",ROOT['arcgis_query'], false);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        CABB.model.layerData = jQuery.parseJSON(xhr.responseText);
                        CABB.handleLayerAttributeSelector();
                    }
                };
                xhr.send('action=metadata&url=' + metadata['url'] + '&f=json');
            }
        } else {
            jQuery.post(ROOT['arcgis_query'], {
                action:'metadata',
                f: 'json',
                url : layer['url']
            }, function (data) {
                CABB.model.layerData = aug({}, jQuery.parseJSON(data));
                CABB.handleLayerAttributeSelector();
            });
        }
    }
};

CABB.handleLayerAttributeSelector = function () {
    var contents = "<option value='none'>Seleccionar...</option>";
    if (CABB.model.layerData !== null) {
        var attributesForSelect = jQuery.grep(CABB.model.layerData.fields, function (v, i) {
            return v['type'] === AGS.types.integer;
        });
        if (attributesForSelect !== null && attributesForSelect.length > 0) {
            jQuery.each(attributesForSelect, function (i, v) {
                contents += "<option value='" + v['name'] + "'>" + v['alias'] + "</option>";
            });
        }
    }
    jQuery("select#layerAttributeSelect").html(contents);
};

CABB.checkBoundsCO = function () {
    var sw = new google.maps.LatLng(-9.300981819011168, -94.90416576057339);
    var ne = new google.maps.LatLng(15.089743799755771, -53.15611888557339);
    var strictBounds = new google.maps.LatLngBounds(sw, ne);
    var strictCenter = new google.maps.LatLng(4.687289089164541, -74.07994368077851);
    google.maps.event.addListener(CABB.model.mapp.map, 'dragend', function () {
        var condi = strictBounds.contains(CABB.model.mapp.map.getCenter());
        if (condi === true) {
            return;
        } else {
            CABB.model.mapp.map.fitBounds(strictBounds);
            CABB.model.mapp.map.setCenter(strictCenter);
        }
    });
};

CABB.prepareKeyDragZoom = function (imgpath) {
    if (CABB.model.mapp !== null && CABB.model.mapp.map !== null && imgpath !== null) {
        CABB.model.mapp.map.enableKeyDragZoom({
            visualEnabled: true,
            visualPosition: google.maps.ControlPosition.LEFT,
            visualPositionOffset: new google.maps.Size(35, 0),
            visualPositionIndex: null,
            visualSprite: imgpath + "/keydragzoom_btn.png",
            visualSize: new google.maps.Size(20, 20),
            visualTips: {
                off: "Encender",
                on: "Apagar"
            }
        });
    }
};

CABB.loadLayerGeometries = function (query) {
    if (query !== null) {
        if (jQuery.browser.msie) {
            var xhr = CABB.prepareXHRForMSIE();
            if (xhr !== null) {
                xhr.open("POST", ROOT['arcgis_query'], false);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        CABB.model.layerFeats = xhr.responseText;
                        CABB.prepareLayerGeometries();
                    }
                };
                xhr.send('action=query&url=' + query['url'] + "&params=" + JSON.stringify(aug({}, query['params'])));
            }
        } else {
            var params = {};
            params['params'] = JSON.stringify(aug({}, query['params']));
            params['action'] = 'query';
            params['url'] = query['url'];
            jQuery.post(ROOT['arcgis_query'], params, function (data) {
                CABB.model.layerFeats = data;
                CABB.prepareLayerGeometries();
            });
        }
    }
};

CABB.prepareLayerGeometries = function () {
    CABB.model.mapp.removePolygons();
    if (CABB.model.layerFeats !== '') {
        var resu = jQuery.parseJSON(CABB.model.layerFeats);
        if (resu !== null) {
            var _bounds = new google.maps.LatLngBounds();
            var feats = aug({}, resu['features']);
            CABB.model.layerPolys = new Array();
            var countedPolys = 0;
            if (feats !== null) {
                jQuery.each(feats, function (i, f) {
                    var rngs = f['geometry']['rings'];
                    var path = new Array();
                    jQuery.each(rngs, function (j, r) {
                        path[j] = new Array();
                        jQuery.each(r, function (k, c) {
                            path[j].push([c[1], c[0]]);
                        });
                    });
                    var plg = CABB.model.mapp.drawPolygon({
                        paths: path,
                        strokeColor: '#333',
                        strokeWeight: 1,
                        strokeOpacity: 1,
                    });
                    _bounds.union(plg.getBounds());
                    CABB.model.layerPolys.push(aug({
						centerX : plg.getBounds().getCenter().lng(),
						centerY : plg.getBounds().getCenter().lat()
					}, f['attributes']));
                    countedPolys++;
                });
                CABB.model.mapp.map.fitBounds(_bounds);
                if (countedPolys > 0) {
                    if (jQuery('a#mbtn-asist-start').hasClass('disabled') === true) {
                        jQuery('a#mbtn-asist-start').removeClass('disabled');
                    }
                } else {
                    if (jQuery('a#mbtn-asist-start').hasClass('disabled') === false) {
                        jQuery('a#mbtn-asist-start').addClass('disabled');
                    }
                }
            }
        }
    }
};

CABB.getRandomColorText = function(){
	return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);	
};

CABB.prepareCentroidsData = function(){
	if (CABB.model.layerPolys !== null && CABB.model.layerPolys.length>0) {
		var takenFIDs = new Array();
		var clusterIndex = 0;
		var incrementClusterId = false;
		var clusters = new Array();
		var clustersColors = new Array();
		jQuery.each(CABB.model.layerPolys,function(i,poly){
			if (jQuery.inArray(poly['FID'], takenFIDs) === -1) {
				var polyVal = poly[CABB.model.assist['selAttr']];
				var haveCluster = jQuery.grep(CABB.model.layerPolys,function(v,i){
					return v['cluster'] === clusterIndex;
				});
				if(polyVal >= Number(CABB.model.assist['selAttrVal'])){
					if (haveCluster.length > 0) {
						incrementClusterId=true;
					}
					if (clusters[clusterIndex+1] === undefined) {
						clusters[clusterIndex+1] = polyVal;
					}
				}else if(polyVal <= Number(CABB.model.assist['selAttrVal'])){
					if(clusters[clusterIndex]!==undefined && Number(clusters[clusterIndex]) >= Number(CABB.model.assist['selAttrVal'])){
						incrementClusterId=true;
					}else if(clusters[clusterIndex]!==undefined && Number(clusters[clusterIndex]) < Number(CABB.model.assist['selAttrVal'])){
						var aggrCount = clusters[clusterIndex] + polyVal;
						if(aggrCount > Number(CABB.model.assist['selAttrVal'])){
							incrementClusterId=true;
						}else if(aggrCount <= Number(CABB.model.assist['selAttrVal'])){
							if(clusters[clusterIndex]===undefined){
								clusters[clusterIndex] = 0;
								clustersColors[clusterIndex] = CABB.getRandomColorText();
							}
							clusters[clusterIndex] = aggrCount;
						}
					}
				}
				if(incrementClusterId===true){
					clusterIndex++;
					incrementClusterId=false;
				}
				if (clusters[clusterIndex] === undefined) {
					clusters[clusterIndex] = 0;
				}
				poly['cluster'] = clusterIndex;
				takenFIDs.push(poly['FID']);
			}
		});
		var colors = [];
		jQuery.each(clusters,function(i,c){
			colors[i] = CABB.getRandomColorText();
		});
		jQuery('div#cust-assist-modal').modal('hide');
		CABB.model.mapp.removePolygons();
	    if (CABB.model.layerFeats !== '') {
	    	var resu = jQuery.parseJSON(CABB.model.layerFeats);
	    	 if (resu !== null) {
	    		 var _bounds = new google.maps.LatLngBounds();
	             var feats = aug({}, resu['features']);
	             var countedPolys = 0;
	             if (feats !== null) {
	                 jQuery.each(feats, function (i, f) {
	                     var rngs = f['geometry']['rings'];
	                     var _fid = f['attributes']['FID'];
	                     var layerPoly=jQuery.grep(CABB.model.layerPolys,function(p,i){
	                    	 return p['FID'] === _fid;
	                     });
	                     var polygonConfigs = new Object(); 
	                     if (layerPoly != null && layerPoly.length > 0) {
	                    	 var clustir = layerPoly[0]['cluster'];
	                    	 var fillColor = colors[clustir];
	                    	 polygonConfigs = aug({},{
	                    		 fillColor : fillColor,
	                    		 fillOpacity : 1
	                    	 });
	                     }
	                     var path = new Array();
	                     jQuery.each(rngs, function (j, r) {
	                         path[j] = new Array();
	                         jQuery.each(r, function (k, c) {
	                             path[j].push([c[1], c[0]]);
	                         });
	                     });
	                     polygonConfigs = aug(polygonConfigs,{
	                    	 paths: path,
	                         strokeColor: '#333',
	                         strokeWeight: 1,
	                         strokeOpacity: 1,
                    	 });
	                     var plg = CABB.model.mapp.drawPolygon(polygonConfigs);
	                     _bounds.union(plg.getBounds());
	                     countedPolys++;
	                 });
	                 CABB.model.mapp.map.fitBounds(_bounds);
	             }
	    	 }
	    }
	}
};

CABB.startMap = function () {

    if (CABB.model.mapp === null) {
        CABB.model.mapp = new GMaps({
            div: '#the_map',
            lat: 4.070173554400997,
            lng: -73.42295267583467,
            minZoom: 5,
            zoom: 5,
            maxZoom: 16,
            mapTypeControl: false,
            streetViewControl: false
        });

        if (CABB.model.mapp.map !== null) {

            /*CABB.checkBoundsCO();*/

            var imgpath = ROOT ? ROOT.imgpath : null;
            CABB.prepareKeyDragZoom(imgpath);

            CABB.model.mapp.addMapType('AGS_CUSTOM', {
                getTileUrl: function (coord, zoom) {
                    return "http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/" + zoom + "/" + coord.y + "/" + coord.x + ".png";
                },
                tileSize: new google.maps.Size(256, 256),
                name: "AGS_CUSTOM",
                maxZoom: 18
            });
        }

        jQuery("button#cust-assist-btn-prev").hide();
        CABB.model.currStep = 0;

        jQuery("a#defmap-gmaps").unbind('click').live('click', function (e) {
            e.preventDefault();
            CABB.model.mapp.setMapTypeId("roadmap");
        });
        jQuery("a#defmap-agsonline01").unbind('click').live('click', function (e) {
            e.preventDefault();
            CABB.model.mapp.setMapTypeId("AGS_CUSTOM");
        });

        jQuery("a#mbtn-asist-start").unbind('click').live('click', function (e) {
            e.preventDefault();
            if (jQuery(this).hasClass('disabled') === false) {
                jQuery('div#cust-assist-modal').modal('show');
            }
        });

        jQuery("ul.cust-menu-maplayer li a").unbind('click').live('click', function (e) {
            e.preventDefault();
            var item_layerid = jQuery(this).attr('data-cust-layer-id') || 'none';
            if (item_layerid !== 'none') {
                var qparams = aug({}, CABB.config.layers[item_layerid]);
                CABB.config.currLayer = item_layerid;
                CABB.loadLayerGeometries(qparams);
            } else {
                CABB.config.currLayer = -1;
            }
        });

        jQuery('div#cust-assist-modal').unbind('shown').on('shown', function (e) {
            e.preventDefault();
            if (jQuery('a#mbtn-asist-start').hasClass('disabled') === false) {
                jQuery("form.cust-assist-form-step01").show();
                jQuery("form.cust-assist-form-step02").hide();
                jQuery("button#cust-assist-btn-prev").hide();
                jQuery("form.cust-assist-form-step01 select#layerServiceSelect").val(null);
                jQuery("form.cust-assist-form-step01 select#layerAttributeSelect").html("<option value='none'>Seleccionar...</option>");
                jQuery("input#conditionValueInput").val(null);
                CABB.model.currStep = 0;
                CABB.model.assist['selAttr'] = null;
                CABB.model.assist['selAttrVal'] = -1;
                CABB.model.assist['bffrDistance'] = -1;
                var selLayer = null;
                if (CABB.config.currLayer > -1) {
                    selLayer = aug({}, CABB.config.layers[CABB.config.currLayer]);
                    CABB.retrieveLayerInformation(selLayer);
                }
            }
        });

        jQuery('button#cust-assist-btn-next').unbind('click').live('click', function (e) {
            e.preventDefault();
            if (CABB.model.currStep === 0) {
                e.preventDefault();
                CABB.model.assist['selAttr'] = jQuery("select#layerAttributeSelect").val();
                CABB.model.assist['selAttrVal'] = jQuery("input#conditionValueInput").val();
                CABB.model.currStep = 1;
                jQuery("form.cust-assist-form-step01,button#cust-assist-btn-prev").hide();
                jQuery("form.cust-assist-form-step02,button#cust-assist-btn-prev").show();
            } else if (CABB.model.currStep === 1) {
                CABB.model.assist['bffrDistance'] = jQuery("input#bffrDistanceInput").val(); /*CABB.model.currStep = 2;*/
                CABB.prepareCentroidsData();
            }
        });

        jQuery("button#cust-assist-btn-prev").unbind('click').live('click', function (e) {
            e.preventDefault();
            if (CABB.model.currStep === 1) {
                jQuery("form.cust-assist-form-step01,button#cust-assist-btn-prev").show();
                jQuery("form.cust-assist-form-step02,button#cust-assist-btn-prev").hide();
                CABB.model.currStep = 0;
            }
        });
    }
};