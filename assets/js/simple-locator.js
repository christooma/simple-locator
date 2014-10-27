function openInfoWindow(e){return google.maps.event.trigger(markers[e],"click"),googlemap.panTo(markers[e].getPosition()),googlemap.fitBounds(markers[e].getPosition()),googlemap.setZoom(12),!1}function wpsl_after_render(){}function wpsl_click_marker(){}var markers=[],googlemap="";jQuery(function(e){function o(o){if("."===wpsl_locator_options.mapcont.charAt(0))var t=e(o).find(wpsl_locator_options.mapcont);else var t=e(wpsl_locator_options.mapcont);if("."===wpsl_locator_options.resultscontainer.charAt(0))var s=e(o).find(wpsl_locator_options.resultscontainer);else var s=e(wpsl_locator_options.resultscontainer);return formelements={parentdiv:e(o),errordiv:e(o).find(".wpsl-error"),map:t,results:s,distance:e(o).find(".distanceselect"),zip:e(o).find(".zipcode"),latitude:e(o).find(".latitude"),longitude:e(o).find(".longitude"),unit:e(o).find(".unit")}}function t(o){var t=e(o.zip).val();geocoder=new google.maps.Geocoder,geocoder.geocode({address:t},function(t,r){if(r==google.maps.GeocoderStatus.OK){var a=t[0].geometry.location.lat(),l=t[0].geometry.location.lng();e(o.latitude).val(a),e(o.longitude).val(l),s(o)}else e(o.errordiv).text("Address could not be found at this time.").show(),e(o.results).hide()})}function s(o){e.ajax({url:wpsl_locator.ajaxurl,type:"post",datatype:"json",data:{action:"locate",zip:e(o.zip).val(),locatorNonce:wpsl_locator.locatorNonce,distance:e(o.distance).val(),latitude:e(o.latitude).val(),longitude:e(o.longitude).val(),unit:e(o.unit).val()},success:function(t){"error"===t.status?(e(o.errordiv).text(t.message).show(),e(o.results).hide()):r(t,o)}})}function r(o,t){if(o.result_count>0){if(1===o.result_count)var s=wpsl_locator.location;else var s=wpsl_locator.locations;var r="<h3>"+o.result_count+" "+s+" "+wpsl_locator.found_within+" "+o.distance+" "+o.unit+" of "+o.zip+"</h3><ul>";for(i=0;i<o.results.length;i++){r=r+"<li data-result="+i+"><strong>",r=r+'<a href="'+o.results[i].permalink+'">',r+=o.results[i].title,r+="</a></strong><br />",r=r+"<em>"+wpsl_locator.distance+": "+o.results[i].distance+" "+o.unit+"</em><br />",o.results[i].address&&(r=r+o.results[i].address+"<br />"+o.results[i].city+", "+o.results[i].state+" "+o.results[i].zip);var l=o.results[i].phone,n=o.results[i].website;l&&(r=r+"<br />"+wpsl_locator.phone+": "+l),n&&(r=r+'<br /><a href="'+n+'" target="_blank">'+n+"</a>"),r+='<br /><a href="#" class="infowindow-open map-link" onClick="event.preventDefault(); openInfoWindow('+i+');">'+wpsl_locator.showonmap+"</a>",r+="</li>"}r+="</ul>",e(t.results).removeClass("loading").html(r),e(t.map).show(),e(t.zip).val("").blur(),a(o,t),wpsl_after_render()}else e(t.errordiv).text("No results found.").show(),e(t.results).hide()}function a(o,t){markers=[];var s=wpsl_locator.mapstyles;if(""!==s)var s=e.parseJSON(s);var r,a,l,n=e(t.map)[0],i="show"===wpsl_locator_options.mapcontrols?!1:!0,p=wpsl_locator.mappin?wpsl_locator.mappin:"",u=new google.maps.LatLngBounds,c={mapTypeId:"roadmap",mapTypeControl:!1,zoom:8,styles:s,panControl:!1,disableDefaultUI:i},d=[],g=new google.maps.InfoWindow;r=new google.maps.Map(n,c);for(var l=0,m=o.results.length;m>l;l++){var f=o.results[l].title,w=o.results[l].latitude,v=o.results[l].longitude,_=o.results[l].permalink,h=[f,w,v,_];d.push(h)}for(l=0;l<d.length;l++){var k=new google.maps.LatLng(d[l][1],d[l][2]);u.extend(k),a=new google.maps.Marker({position:k,map:r,title:d[l][0],icon:p}),google.maps.event.addListener(a,"click",function(e,o){return function(){g.setContent("<h4>"+d[o][0]+'</h4><p><a href="'+d[o][3]+'">'+wpsl_locator.viewlocation+"</a></p>"),g.open(r,e),wpsl_click_marker(e,o)}}(a,l)),markers.push(a),r.fitBounds(u)}var b=google.maps.event.addListener(r,"bounds_changed",function(){google.maps.event.removeListener(b)});googlemap=r}e(".wpslsubmit").on("click",function(s){s.preventDefault();var r=e(this).parents(".simple-locator-form"),a=o(r);e(a.errordiv).hide(),e(a.map).hide(),e(a.results).empty().addClass("loading").show(),t(a)})});