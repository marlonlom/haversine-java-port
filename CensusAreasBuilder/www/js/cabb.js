<<<<<<< HEAD
CABB.retrieveLayerListing = function () {
	var contents = "<option value='none'>Seleccionar...</option>";
	if(CABB.config.layers!==null){
		jQuery.each(CABB.config.layers,function(i,l){
			contents += "<option value='" + i+ "'>" + l['label'] + "</option>";
		});
	}
	jQuery("select#layerSourceSelect").html(contents);
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
                        CABB.model.layerData = xhr.responseText !== '' ? aug({}, jQuery.parseJSON(xhr.responseText)) : null;
                        CABB.handleLayerAttributeSelector();
                    }
                };
                xhr.send('action=metadata&url=' + layer['url'] + '&f=json');
            }
        } else {
            jQuery.post(ROOT['arcgis_query'], {
                action:'metadata',
                f: 'json',
                url : layer['url']
            }, function (data) {
            	CABB.model.layerData = data !== '' ? aug({}, jQuery.parseJSON(data)) : null;
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

CABB.getRandomColorText = function(){
	return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);	
};

CABB.startMap = function () {

    if (CABB.model.mapp === null) {
        CABB.model.mapp = new GMaps({
            div: '#the_map',
            lat: 4.070173554400997,
            lng: -73.42295267583467,
            /*minZoom: 5,*/
            zoom: 5,
            maxZoom: 16,
            mapTypeControl: false,
            streetViewControl: false
        });

        if (CABB.model.mapp.map !== null) {

        	CABB.retrieveLayerListing();
        	
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


        jQuery('div#cust-assist-modal').unbind('shown').on('shown', function (e) {
            e.preventDefault();
            if (jQuery('a#mbtn-asist-start').hasClass('disabled') === false) {
                jQuery("form.cust-assist-form-step01").show();
                jQuery("form.cust-assist-form-step02").hide();
                jQuery("button#cust-assist-btn-prev").hide();
                jQuery("select#layerSourceSelect").val(null);
                jQuery("select#layerAttributeSelect").html("<option value='none'>Seleccionar...</option>");
                jQuery("input#conditionValueInput").val(null);
                CABB.model.layerData=null;
                jQuery('button#cust-assist-btn-next,button#cust-assist-btn-close').show();
            }
        });
        
        jQuery("select#layerSourceSelect").unbind("change").live('change',function(e){
        	e.preventDefault();
        	CABB.config.currLayer = jQuery(this).val() || -1;
        	if (CABB.config.currLayer > -1) {
                var selLayer = aug({}, CABB.config.layers[CABB.config.currLayer]);
                CABB.model.layerData=null;
                CABB.retrieveLayerInformation(selLayer);
            }else{
            	jQuery("select#layerAttributeSelect").html("<option value='none'>Seleccionar...</option>");
            	CABB.model.layerData=null;
            }
        });

        jQuery('button#cust-assist-btn-next').unbind('click').live('click', function (e) {
            e.preventDefault();
            CABB.model.assist['selAttr'] = jQuery("select#layerAttributeSelect").val();
            CABB.model.assist['selAttrVal'] = jQuery("input#conditionValueInput").val();
            if (CABB.config.currLayer > -1) {
            	var selLayer = aug({}, CABB.config.layers[CABB.config.currLayer]);
            	console.log('capturing data', {
            		layer : selLayer,
            		attr : CABB.model.assist['selAttr'],
            		attrVal : CABB.model.assist['selAttrVal']
				});
            	jQuery('button#cust-assist-btn-next,button#cust-assist-btn-close').hide();
            }
        });
    }
=======
CABB.retrieveLayerListing = function () {
	var contents = "<option value='none'>Seleccionar...</option>";
	if(CABB.config.layers!==null){
		jQuery.each(CABB.config.layers,function(i,l){
			contents += "<option value='" + i+ "'>" + l['label'] + "</option>";
		});
	}
	jQuery("select#layerSourceSelect").html(contents);
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
                        CABB.model.layerData = xhr.responseText !== '' ? aug({}, jQuery.parseJSON(xhr.responseText)) : null;
                        CABB.handleLayerAttributeSelector();
                    }
                };
                xhr.send('action=metadata&url=' + layer['url'] + '&f=json');
            }
        } else {
            jQuery.post(ROOT['arcgis_query'], {
                action:'metadata',
                f: 'json',
                url : layer['url']
            }, function (data) {
            	CABB.model.layerData = data !== '' ? aug({}, jQuery.parseJSON(data)) : null;
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

CABB.getRandomColorText = function(){
	return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);	
};

CABB.startMap = function () {

    if (CABB.model.mapp === null) {
        CABB.model.mapp = new GMaps({
            div: '#the_map',
            lat: 4.070173554400997,
            lng: -73.42295267583467,
            /*minZoom: 5,*/
            zoom: 5,
            maxZoom: 16,
            mapTypeControl: false,
            streetViewControl: false
        });

        if (CABB.model.mapp.map !== null) {

        	CABB.retrieveLayerListing();
        	
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


        jQuery('div#cust-assist-modal').unbind('shown').on('shown', function (e) {
            e.preventDefault();
            if (jQuery('a#mbtn-asist-start').hasClass('disabled') === false) {
                jQuery("form.cust-assist-form-step01").show();
                jQuery("form.cust-assist-form-step02").hide();
                jQuery("button#cust-assist-btn-prev").hide();
                jQuery("select#layerSourceSelect").val(null);
                jQuery("select#layerAttributeSelect").html("<option value='none'>Seleccionar...</option>");
                jQuery("input#conditionValueInput").val(null);
                CABB.model.layerData=null;
                jQuery('button#cust-assist-btn-next,button#cust-assist-btn-close').show();
            }
        });
        
        jQuery("select#layerSourceSelect").unbind("change").live('change',function(e){
        	e.preventDefault();
        	CABB.config.currLayer = jQuery(this).val() || -1;
        	if (CABB.config.currLayer > -1) {
                var selLayer = aug({}, CABB.config.layers[CABB.config.currLayer]);
                CABB.model.layerData=null;
                CABB.retrieveLayerInformation(selLayer);
            }else{
            	jQuery("select#layerAttributeSelect").html("<option value='none'>Seleccionar...</option>");
            	CABB.model.layerData=null;
            }
        });

        jQuery('button#cust-assist-btn-next').unbind('click').live('click', function (e) {
            e.preventDefault();
            CABB.model.assist['selAttr'] = jQuery("select#layerAttributeSelect").val();
            CABB.model.assist['selAttrVal'] = jQuery("input#conditionValueInput").val();
            if (CABB.config.currLayer > -1) {
            	var selLayer = aug({}, CABB.config.layers[CABB.config.currLayer]);
            	console.log('capturing data', {
            		layer : selLayer,
            		attr : CABB.model.assist['selAttr'],
            		attrVal : CABB.model.assist['selAttrVal']
				});
            	jQuery('button#cust-assist-btn-next,button#cust-assist-btn-close').hide();
            }
        });
    }
>>>>>>> 62358265884161aaeab91b8c3d66d7b4293815a0
};