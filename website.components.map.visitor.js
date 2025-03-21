websiteComponents.loader.define("website.components.map.visitor", [], (() => (() => {
    "use strict";
    var e = {
            68990: function(e, t, i) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.destroyUpdater = t.updateUiOptions = t.mapModelToViewConfig = t.Styles = t.getStyleById = void 0;
                const l = a(i(27749)),
                    s = [null, l.default.Original, l.default.Grayscale, l.default.Satellite, l.default.MinimalLight, l.default.MinimalDark, l.default.MinimalBlue];
                t.getStyleById = e => s[e], t.Styles = {
                    ORIGINAL: 1,
                    GRAYSCALE: 2,
                    SATELLITE: 3,
                    MINIMAL_LIGHT: 4,
                    MINIMAL_DARK: 5,
                    MINIMAL_BLUE: 6
                }, t.mapModelToViewConfig = ({
                    location: e,
                    controls: t,
                    terrain: i,
                    labels: a,
                    style: l,
                    gmak: r,
                    locale: o
                }) => ({
                    location: e,
                    ui: {
                        showControls: t,
                        showTerrain: i,
                        showLabels: a,
                        style: s[l] || void 0
                    },
                    gMapKey: r,
                    locale: o
                });
                const r = new Map;
                t.updateUiOptions = (e, t) => {
                    if (!e || !t) return;
                    const {
                        timeout: i,
                        options: a = {}
                    } = r.get(e) || {};
                    i && window.clearTimeout(i);
                    const l = Object.assign(Object.assign({}, a), t),
                        s = () => {
                            try {
                                e.updateUIOptions(l)
                            } catch (e) {
                                console.error(e)
                            }
                        };
                    r.set(e, {
                        cb: s,
                        timeout: window.setTimeout(s, 60),
                        options: l
                    })
                }, t.destroyUpdater = (e, t = !1) => {
                    if (!e) return;
                    const {
                        cb: i,
                        timeout: a
                    } = r.get(e) || {};
                    a && window.clearTimeout(a), !t && i && i(), r.delete(e)
                }
            },
            24596: function(e, t, i) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const l = a(i(7199)),
                    s = a(i(27749)),
                    r = {
                        mapLat: 40.720882,
                        mapLng: -74.000988,
                        markerLat: null,
                        markerLng: null,
                        mapZoom: 12,
                        addressTitle: null,
                        addressLine1: null,
                        addressLine2: null,
                        addressCountry: null
                    },
                    o = {
                        style: s.default.Grayscale,
                        showLabels: !0,
                        showTerrain: !1,
                        draggable: !0,
                        scrollwheel: !0,
                        showControls: !0,
                        disableDefaultUI: !0,
                        markerDraggable: !1,
                        linkOnClick: !0
                    };
                class n {
                    static createView(e, t, i, a, s) {
                        return e = Object.entries(e).reduce((function(e, [t, i]) {
                            return void 0 !== i && (e[t] = i), e
                        }), {}), e = Object.assign({}, o, e), null === (t = Object.assign({}, r, t)).markerLat && (t.markerLat = t.mapLat), null === t.markerLng && (t.markerLng = t.mapLng), (0, l.default)(a, s).then((a => new n(a, e, t, i)))
                    }
                    constructor(e, t, i, a) {
                        this.GMaps = e, this.ui = t, this.location = i, this.render(a)
                    }
                    render(e) {
                        const t = this.GMaps;
                        this.container = e;
                        const {
                            markerLat: i,
                            markerLng: a,
                            mapLat: l,
                            mapLng: s
                        } = this.location;
                        e.classList.add("page-map"), e.innerHTML = "&nbsp;", this.markerLoc = new t.LatLng(i, a), this.mapLoc = new t.LatLng(l, s), this.locationString = this.getLocationString(), this.initMapImpl(), this.initMarkerImpl(), this.updateUIOptions()
                    }
                    initMapImpl() {
                        this.map = new this.GMaps.Map(this.container, {
                            zoom: this.location.mapZoom,
                            center: this.mapLoc,
                            draggable: this.ui.draggable,
                            scrollwheel: this.ui.scrollwheel,
                            disableDefaultUI: this.ui.disableDefaultUI
                        })
                    }
                    initMarkerImpl() {
                        const e = this.GMaps,
                            t = this.location;
                        this.marker = new e.Marker({
                            map: this.map,
                            animation: e.Animation.DROP,
                            draggable: this.ui.markerDraggable,
                            position: this.markerLoc,
                            title: t.addressTitle ? t.addressTitle + " " + this.locationString : this.locationString,
                            icon: ""
                        }), e.event.addListener(this.marker, "click", (() => this.handleMarkerClick()))
                    }
                    getLocationString() {
                        const e = this.location;
                        let t;
                        return e.addressLine1 || e.addressLine2 ? (t = e.addressLine1 + " " + e.addressLine2, e.addressCountry && (t += ", " + e.addressCountry)) : t = e.mapLat + "," + e.mapLng, t
                    }
                    handleMarkerClick() {
                        if (this.marker.dragging || !this.ui.linkOnClick) return;
                        const e = encodeURIComponent(this.marker.getPosition().toUrlValue()),
                            t = encodeURIComponent(this.getLocationString()),
                            i = encodeURIComponent(this.map.getZoom());
                        window.open(`http://maps.google.com/maps?sll=${e}&q=${t}&z=${i}`)
                    }
                    redraw() {
                        this.GMaps.event.trigger(this.map, "resize")
                    }
                    updateUIOptions(e = {}) {
                        const t = this.GMaps;
                        Object.assign(this.ui, e);
                        const {
                            showControls: i,
                            showTerrain: a,
                            showLabels: l,
                            draggable: s,
                            disableDefaultUI: r,
                            scrollwheel: o,
                            markerDraggable: n
                        } = this.ui, p = Object.assign({}, this.ui.style), c = [];
                        let m;
                        c.push(...p.colors), l && p.labels && c.push(...p.labels), m = p.satellite ? t.MapTypeId.HYBRID : a ? t.MapTypeId.TERRAIN : t.MapTypeId.ROADMAP;
                        const d = {
                            mapTypeControl: !1,
                            mapTypeId: m,
                            overviewMapControl: !1,
                            panControl: i,
                            scaleControl: i,
                            streetViewControl: !1,
                            styles: c,
                            zoomControl: i,
                            draggable: s,
                            disableDefaultUI: r,
                            scrollwheel: o
                        };
                        this.map.setOptions(d);
                        const y = {
                            draggable: n
                        };
                        if (this.marker.setOptions(y), p.marker) {
                            const e = p.marker.imgUrl,
                                i = p.marker.naturalWidth,
                                a = p.marker.naturalHeight;
                            this.marker.setIcon({
                                url: e,
                                size: new t.Size(i, a),
                                scaledSize: new t.Size(i / 2, a / 2),
                                anchor: new t.Point(i / 4, a / 2)
                            })
                        } else this.marker.setIcon(null)
                    }
                    centerMarker() {
                        this.redraw(), this.map.setCenter(this.marker.getPosition())
                    }
                    getCenter() {
                        const e = this.map.getCenter();
                        return {
                            lat: e.lat(),
                            lng: e.lng()
                        }
                    }
                    updateLocation(e, t) {
                        this.location.mapLat = e, this.location.mapLng = t, this.map.setCenter(new this.GMaps.LatLng(e, t)), this.updateMarker(e, t)
                    }
                    getMarkerPosition() {
                        const e = this.marker.getPosition();
                        return {
                            lat: e.lat(),
                            lng: e.lng()
                        }
                    }
                    updateMarker(e, t) {
                        const i = this.location;
                        this.location.markerLat = e, this.location.markerLng = t;
                        const a = this.getLocationString();
                        this.marker.setPosition(new this.GMaps.LatLng(e, t)), this.marker.title = i.addressTitle ? i.addressTitle + " " + a : a
                    }
                    setZoom(e) {
                        this.location.mapZoom = e, this.map.setZoom(e)
                    }
                }
                t.default = n
            },
            7199: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.default = function(e, t) {
                    const i = (a = t, window.atob(a));
                    var a;
                    return window.gMapsPromise || (window.gMapsPromise = new Promise(((t, a) => {
                        const l = setTimeout(a, 3e4);
                        window.GoogleMapsApiLoadCallback = function() {
                            clearTimeout(l), t(window.google.maps);
                            try {
                                delete window.GoogleMapsApiLoadCallback
                            } catch (e) {
                                console.error("unable to run delete window.GoogleMapsApiLoadCallback")
                            }
                        };
                        const s = document.createElement("script");
                        document.getElementsByTagName("head")[0].appendChild(s), i ? s.src = ((e, t) => {
                            let i = `//maps.googleapis.com/maps/api/js?v=3&callback=GoogleMapsApiLoadCallback&key=${t}`,
                                a = "en",
                                l = "US";
                            return e && (a = e.language, l = e.region), i += `&language=${a}&region=${l}`, i
                        })(e, i) : console.error("missing Google Maps API key")
                    }))), window.gMapsPromise
                }
            },
            27749: (e, t) => {
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                const i = {
                        imgUrl: "/universal/images-v6/icons/cover-pages-map-marker-pin-dark-2x.png",
                        naturalWidth: 48,
                        naturalHeight: 64
                    },
                    a = {
                        Original: {
                            marker: null,
                            colors: [{
                                elementType: "labels",
                                stylers: [{
                                    visibility: "off"
                                }]
                            }],
                            labels: [{
                                elementType: "labels",
                                stylers: [{
                                    visibility: "on"
                                }]
                            }]
                        },
                        Grayscale: {
                            marker: i,
                            colors: [{
                                featureType: "landscape.man_made",
                                elementType: "all",
                                stylers: [{
                                    lightness: 51
                                }]
                            }, {
                                featureType: "poi",
                                elementType: "all",
                                stylers: [{
                                    visibility: "off"
                                }]
                            }, {
                                featureType: "road.local",
                                elementType: "all",
                                stylers: [{
                                    gamma: 2.51
                                }]
                            }, {
                                featureType: "road.arterial",
                                elementType: "all",
                                stylers: [{
                                    gamma: 1.9
                                }]
                            }, {
                                featureType: "water",
                                elementType: "all",
                                stylers: [{
                                    gamma: 1.36
                                }]
                            }, {
                                featureType: "road.highway",
                                elementType: "all",
                                stylers: [{
                                    gamma: 1.33
                                }]
                            }, {
                                featureType: "transit.station.rail",
                                elementType: "all",
                                stylers: [{
                                    visibility: "simplified"
                                }]
                            }, {
                                featureType: "transit.station.bus",
                                elementType: "all",
                                stylers: [{
                                    visibility: "simplified"
                                }]
                            }, {
                                featureType: "transit",
                                elementType: "all",
                                stylers: [{
                                    gamma: 1.2
                                }, {
                                    hue: "#0033ff"
                                }]
                            }, {
                                featureType: "administrative.neighborhood",
                                elementType: "labels",
                                stylers: [{
                                    gamma: 1.43
                                }]
                            }, {
                                featureType: "water",
                                elementType: "all",
                                stylers: [{
                                    lightness: -47
                                }]
                            }, {
                                featureType: "all",
                                elementType: "all",
                                stylers: [{
                                    saturation: -100
                                }]
                            }, {
                                featureType: "road.arterial",
                                elementType: "labels",
                                stylers: [{
                                    lightness: 23
                                }]
                            }, {
                                elementType: "labels",
                                stylers: [{
                                    visibility: "off"
                                }]
                            }],
                            labels: [{
                                elementType: "labels",
                                stylers: [{
                                    visibility: "on"
                                }]
                            }]
                        },
                        Satellite: {
                            satellite: !0,
                            marker: null,
                            colors: [{
                                stylers: [{
                                    visibility: "off"
                                }]
                            }, {
                                elementType: "labels",
                                stylers: [{
                                    visibility: "off"
                                }]
                            }],
                            labels: [{
                                elementType: "labels",
                                stylers: [{
                                    visibility: "on"
                                }]
                            }]
                        },
                        MinimalDark: {
                            marker: {
                                imgUrl: "/universal/images-v6/icons/cover-pages-map-marker-pin-light-2x.png",
                                naturalWidth: 48,
                                naturalHeight: 64
                            },
                            colors: [{
                                stylers: [{
                                    visibility: "off"
                                }]
                            }, {
                                featureType: "water",
                                elementType: "geometry.fill",
                                stylers: [{
                                    color: "#0f0f0f"
                                }, {
                                    visibility: "on"
                                }]
                            }, {
                                featureType: "landscape.natural",
                                elementType: "geometry.fill",
                                stylers: [{
                                    color: "#1f1f1f"
                                }, {
                                    visibility: "on"
                                }]
                            }, {
                                featureType: "road",
                                elementType: "geometry.fill",
                                stylers: [{
                                    color: "#5a5a5a"
                                }, {
                                    visibility: "on"
                                }, {
                                    weight: .6
                                }]
                            }],
                            labels: [{
                                elementType: "labels.text.fill",
                                stylers: [{
                                    visibility: "on"
                                }, {
                                    color: "#777777"
                                }]
                            }, {
                                elementType: "labels.text.stroke",
                                stylers: [{
                                    weight: 2
                                }, {
                                    visibility: "on"
                                }, {
                                    color: "#1f1f1f"
                                }]
                            }]
                        },
                        MinimalLight: {
                            marker: i,
                            colors: [{
                                stylers: [{
                                    visibility: "off"
                                }]
                            }, {
                                featureType: "water",
                                elementType: "geometry.fill",
                                stylers: [{
                                    color: "#f2f2f2"
                                }, {
                                    visibility: "on"
                                }]
                            }, {
                                featureType: "landscape.natural",
                                elementType: "geometry.fill",
                                stylers: [{
                                    color: "#ffffff"
                                }, {
                                    visibility: "on"
                                }]
                            }, {
                                featureType: "road",
                                elementType: "geometry.fill",
                                stylers: [{
                                    color: "#bbbbbb"
                                }, {
                                    visibility: "on"
                                }, {
                                    weight: .6
                                }]
                            }],
                            labels: [{
                                elementType: "labels.text.fill",
                                stylers: [{
                                    visibility: "on"
                                }, {
                                    color: "#999999"
                                }]
                            }, {
                                elementType: "labels.text.stroke",
                                stylers: [{
                                    visibility: "on"
                                }, {
                                    color: "#ffffff"
                                }, {
                                    weight: 2
                                }]
                            }]
                        },
                        MinimalBlue: {
                            marker: i,
                            colors: [{
                                stylers: [{
                                    visibility: "off"
                                }]
                            }, {
                                featureType: "water",
                                elementType: "geometry.fill",
                                stylers: [{
                                    color: "#ccdee9"
                                }, {
                                    visibility: "on"
                                }]
                            }, {
                                featureType: "landscape.natural",
                                elementType: "geometry.fill",
                                stylers: [{
                                    color: "#ffffff"
                                }, {
                                    visibility: "on"
                                }]
                            }, {
                                featureType: "road",
                                elementType: "geometry.fill",
                                stylers: [{
                                    color: "#bbbbbb"
                                }, {
                                    visibility: "on"
                                }, {
                                    weight: .6
                                }]
                            }],
                            labels: [{
                                elementType: "labels.text.fill",
                                stylers: [{
                                    visibility: "on"
                                }, {
                                    color: "#999999"
                                }]
                            }, {
                                elementType: "labels.text.stroke",
                                stylers: [{
                                    visibility: "on"
                                }, {
                                    color: "#ffffff"
                                }, {
                                    weight: 2
                                }]
                            }]
                        }
                    };
                t.default = a
            },
            12562: function(e, t, i) {
                var a = this && this.__importDefault || function(e) {
                    return e && e.__esModule ? e : {
                        default: e
                    }
                };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.Visitor = void 0;
                const l = i(68990),
                    s = a(i(24596));
                class r {
                    constructor(e) {
                        this.root = e, this.render()
                    }
                    createMap(e, t) {
                        this.awaitedMapView = s.default.createView(e.ui, e.location, t, e.locale, e.gMapKey)
                    }
                    applyStretchedToFillHeightOverride() {
                        const e = this.root,
                            t = e.querySelector(".sqs-block-content");
                        t && e.parentElement && (e.parentElement.classList.contains("fluid-engine-block-contents") || e.parentElement.classList.contains("fe-block")) && (t.style.height = "100%")
                    }
                    async updateMap(e) {
                        const t = this.root.querySelector("[data-context]");
                        if (t) {
                            const i = (0, l.mapModelToViewConfig)(e),
                                {
                                    mapLat: a,
                                    mapLng: s,
                                    mapZoom: r
                                } = i.location,
                                o = await this.awaitedMapView;
                            o && (o.setZoom(r), o.updateLocation(a, s), o.updateUIOptions(i.ui), o.render(t))
                        }
                    }
                    render() {
                        const e = this.root,
                            t = e.querySelector("[data-context]");
                        if (t) {
                            this.applyStretchedToFillHeightOverride();
                            const i = JSON.parse((null == t ? void 0 : t.getAttribute("data-context")) || "{}"),
                                a = (0, l.mapModelToViewConfig)(i);
                            e.setAttribute("data-animation-role", "image"), this.awaitedMapView ? this.awaitedMapView.then((e => {
                                e.render(t)
                            })) : this.createMap(a, t)
                        }
                    }
                }
                t.Visitor = r, t.default = e => new r(e)
            }
        },
        t = {};
    return function i(a) {
        var l = t[a];
        if (void 0 !== l) return l.exports;
        var s = t[a] = {
            exports: {}
        };
        return e[a].call(s.exports, s, s.exports, i), s.exports
    }(12562)
})()));