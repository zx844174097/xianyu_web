!function(e, t) {
	if ("object" == typeof exports && "object" == typeof module)
		module.exports = t();
	else if ("function" == typeof define && define.amd) define([], t);else {
		var n = t();
		for (var r in n) ("object" == typeof exports ? exports : e)[r] = n[r]
	}
}(window, function() {
	return function(n) {
		var r = {};
		function i(e) {
			if (r[e]) return r[e].exports;
			var t = r[e] = {
				i : e,
				l : !1,
				exports : {}
			};
			return n[e].call(t.exports, t, t.exports, i), t.l = !0, t.exports
		}
		return i.m = n, i.c = r, i.d = function(e, t, n) {
				i.o(e, t) || Object.defineProperty(e, t, {
					enumerable : !0,
					get : n
				})
			}, i.r = function(e) {
				"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
					value : "Module"
				}), Object.defineProperty(e, "__esModule", {
					value : !0
				})
			}, i.t = function(t, e) {
				if (1 & e && (t = i(t)), 8 & e) return t;
				if (4 & e && "object" == typeof t && t && t.__esModule) return t;
				var n = Object.create(null);
				if (i.r(n), Object.defineProperty(n, "default", {
						enumerable : !0,
						value : t
					}), 2 & e && "string" != typeof t)
					for (var r in t) i.d(n, r, function(e) {
							return t[e]
						}.bind(null, r));
				return n
			}, i.n = function(e) {
				var t = e && e.__esModule ? function() {
					return e.default
				} : function() {
					return e
				};
				return i.d(t, "a", t), t
			}, i.o = function(e, t) {
				return Object.prototype.hasOwnProperty.call(e, t)
			}, i.p = "", i(i.s = 66)
	}([ function(e, o, t) {
		(function(e) {
			var t,
				n,
				r,
				i;
			function Fe(e) {
				return (Fe = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
					return typeof e
				} : function(e) {
					return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
				})(e)
			}
			"undefined" != typeof self && self, i = function() {
				return function(n) {
					function r(e) {
						if (i[e]) return i[e].exports;
						var t = i[e] = {
							i : e,
							l : !1,
							exports : {}
						};
						return n[e].call(t.exports, t, t.exports, r), t.l = !0, t.exports
					}
					var i = {};
					return r.m = n, r.c = i, r.d = function(e, t, n) {
							r.o(e, t) || Object.defineProperty(e, t, {
								configurable : !1,
								enumerable : !0,
								get : n
							})
						}, r.n = function(e) {
							var t = e && e.__esModule ? function() {
								return e.default
							} : function() {
								return e
							};
							return r.d(t, "a", t), t
						}, r.o = function(e, t) {
							return Object.prototype.hasOwnProperty.call(e, t)
						}, r.p = "", r(r.s = 0)
				}([ function(e, t, n) {
					var r = n(1).default;
					e.exports = r
				}, function(e, t, n) {
					"use strict";Object.defineProperty(t, "__esModule", {
						value : !0
					});
					var h = n(2),
						r = function() {
							function e(e, t) {
								if (this.config = {
										scriptSrc : "https://static.hdslb.com/player/js/dash.mediaplayer.min.js",
										scriptMaxLoadTime : 1e4,
										minQualityNumberMappingNumber : 6,
										videoInfoScheduleTime : 1e3
									}, this.state = {
										defaultQuality : 0,
										stableBufferTime : 60,
										isAutoPlay : !1,
										abrStrategy : h.STRING.ABR_THROUGHPUT,
										isAutoSwitch : {
											video : !1,
											audio : !1
										},
										onScriptLoading : !1,
										initialized : !1,
										mpd : null,
										manifest : null,
										manifestInfo : {},
										currentQualityIndex : {
											video : 0,
											audio : 0
										},
										maxQualityIndex : {
											video : -1,
											audio : -1
										},
										qualityNumberMap : {
											video : {},
											audio : {}
										},
										segmentsInfoMap : {
											video : {},
											audio : {}
										},
										mediaInfo : {},
										statisticsInfo : {},
										autoSwitchStartTime : 0
									}, this.timer = {
										loadScript : 0,
										videoInfoSchedule : 0
									}, this.events = {}, this.video = e, this.mixin(t), !(e && e instanceof HTMLVideoElement))
									throw new Error("Video parameter is not a HTMLVideoElement")
							}
							return e.prototype.preload = function() {
									var t = this;
									this.detectDashJSExists() || this.loadDashPlayerScript().then(function() {
										t.fire(h.EVENTS.SCRIPT_LOADED)
									}).catch(function(e) {
										t.error({
											msg : "Load dash player script error",
											detail : e
										})
									})
								}, e.prototype.initialize = function(n, e) {
									var r = this;
									return this.state.mpd = n, this.mixin(e), new Promise(function(e, t) {
											n || t({
												msg : "Manifest parameter error, manifest: " + JSON.stringify(n)
											}), r.detectDashJSExists() ? r.createPlayer(e, t) : r.state.onScriptLoading ? r.on(h.EVENTS.SCRIPT_LOADED, function() {
												r.off(h.EVENTS.SCRIPT_LOADED), r.createPlayer(e, t)
											}) : r.loadDashPlayerScript().then(function() {
												r.createPlayer(e, t)
											}).catch(function(e) {
												r.error(e)
											})
										})
								}, e.prototype.on = function(e, t) {
									e && "function" == typeof t && (this.events[e] || (this.events[e] = []), this.events[e].push(t))
								}, e.prototype.off = function(e, t) {
									if (e)
										if ("function" == typeof t) {
											if (this.events[e] && this.events[e].length) {
												var n = this.events[e].indexOf(t);
												0 <= n && this.events[e].splice(n, 1)
											}
										} else
											this.events[e] = []
								}, e.prototype.fire = function(e, t) {
									if (e) {
										var n = this.events[e];
										n && n.length && n.forEach(function(e) {
											"function" == typeof e && e.call(null, t)
										})
									}
								}, e.prototype.play = function() {
									try {
										this.player.play()
									} catch (e) {
										this.error({
											msg : "Call play function error",
											detail : e
										})
									}
								}, e.prototype.pause = function() {
									try {
										this.player.pause()
									} catch (e) {
										this.error({
											msg : "Call pause function error",
											detail : e
										})
									}
								}, e.prototype.getCurrentTime = function() {
									try {
										return this.player.time(void 0)
									} catch (e) {
										this.error({
											msg : "Call getCurrentTime function error",
											detail : e
										})
									} return 0
								}, e.prototype.getBufferedTime = function() {
									var e = (this.getCurrentTime(), this.video);
									try {
										e.buffered
									} catch (e) {
										this.error({
											msg : "Call getBufferedTime function error",
											detail : e
										})
									} return 0
								}, e.prototype.getDuration = function() {
									try {
										return this.player.duration()
									} catch (e) {
										this.error({
											msg : "Call getDuration function error",
											detail : e
										})
									}
								}, e.prototype.seek = function(i) {
									var a = this;
									return new Promise(function(t, e) {
										if (isNaN(parseInt("" + i, 10)) || i < 0) e({
												msg : "Seek time value error, time: " + i
											});else try {
												var n = a.getCurrentTime(),
													r = Date.now();
												a.video.currentTime = i;a.player.on(h.EVENTS.PLAYBACK_SEEKED, function e() {
													a.player.off(h.EVENTS.PLAYBACK_SEEKED, e), t({
														cost : Math.floor(Date.now() - r),
														currentTime : n,
														seekedTime : i
													})
												})
											} catch (e) {
												a.error({
													msg : "Call seek function error",
													detail : e
												})
										}
									})
								}, e.prototype.getCorePlayer = function() {
									return this.player
								}, e.prototype.setVolume = function(e) {
									if (isNaN(parseInt("" + e, 10)) || e < 0 || 1 < e) this.error({
											msg : "SetVolume value error, value: " + e
										});else try {
											this.player.setVolume(e)
										} catch (e) {
											this.error({
												msg : "Call setVolume function error",
												detail : e
											})
									}
								}, e.prototype.getVolume = function() {
									try {
										return this.player.getVolume()
									} catch (e) {
										this.error({
											msg : "Call getVolume function error",
											detail : e
										})
									}
								}, e.prototype.setPlaybackRate = function(e) {
									try {
										this.player.setPlaybackRate(e)
									} catch (e) {
										this.error({
											msg : "Call setPlaybackRate function error",
											detail : e
										})
									}
								}, e.prototype.getPlaybackRate = function() {
									try {
										return this.player.getPlaybackRate()
									} catch (e) {
										this.error({
											msg : "Call getPlaybackRate function error",
											detail : e
										})
									}
								}, e.prototype.getAutoSwitchQualityFor = function(e) {
									try {
										return this.player.getAutoSwitchQualityFor(e)
									} catch (e) {
										this.error({
											msg : "Call getAutoSwitchQualityFor function error",
											detail : e
										})
									}
								}, e.prototype.setAutoSwitchQualityFor = function(e, t) {
									void 0 === t && (t = !1);try {
										this.state.isAutoSwitch && (this.state.isAutoSwitch[e] = t), t || this.setMaxAllowedBitrateFor(e, 0), this.player.setAutoSwitchQualityFor(e, t)
									} catch (e) {
										this.error({
											msg : "Call setAutoSwitchQualityFor function error",
											detail : e
										})
									} return this
								}, e.prototype.getQualityList = function(e) {
									try {
										return this.player.getBitrateInfoListFor(e)
									} catch (e) {
										this.error({
											msg : "Call getQualityList function error",
											detail : e
										})
									}
								}, e.prototype.setDefaultQualityFor = function(e, t) {
									void 0 === t && (t = 0);
									var n = this.getQualityIndexFromQualityNumber(t);
									try {
										0 <= n ? (this.state.currentQualityIndex.video = n, this.player.setDefaultQualityFor(e, n)) : this.error({
											msg : "Call setDefaultQualityFor function error, quality: " + t
										})
									} catch (e) {
										this.error({
											msg : "Call setDefaultQualityFor function error, quality: " + t + ", qualityIndex = " + n,
											detail : e
										})
									}
								}, e.prototype.setAutoSwitchTopQualityFor = function(e, t) {
									var n = this;
									try {
										if (!this.state.initialized) return void this.on(h.EVENTS.STREAM_INITIALIZED, function() {
												n.setAutoSwitchTopQualityFor(e, t)
											});
										if (!t && 0 !== t) return void this.setMaxAllowedBitrateFor(e, 0);
										if (!this.state.isAutoSwitch || !this.state.isAutoSwitch[e]) return;
										var r = this.getQualityIndexFromQualityNumber(t),
											i = this.getQualityList(e),
											a = i && i[r],
											o = Math.floor(a.bitrate / 1e3) + 5;
										this.setMaxAllowedBitrateFor(e, o)
									} catch (e) {
										this.error({
											msg : "Call setAutoSwitchTopQualityFor function error",
											detail : e
										})
									}
								}, e.prototype.setQualityFor = function(e, i) {
									var a = this;
									return new Promise(function(n, t) {
										if (isNaN(parseInt("" + i, 10)) || i < 0) t({
												msg : "Set quality value error, quality: " + i
											});
										else if (a.detectQualityTypeIsLegal(e)) t({
												msg : "Set quality type error, type: " + e
											});else try {
												(i = a.getQualityIndexFromQualityNumber(i)) === a.state.currentQualityIndex[e] && t({
													msg : "Set quality equal current quality, quality: " + i
												}), a.player.setQualityFor(e, i);var r = Date.now();
												a.player.on(h.EVENTS.QUALITY_CHANGE_RENDERED, function e(t) {
													t.newQuality === i && (a.player.off(h.EVENTS.QUALITY_CHANGE_RENDERED, e), n(a.getQualityChangedData(t, r)))
												})
											} catch (e) {
												t({
													msg : "Call setQualityFor function error",
													detail : e
												})
										}
									})
								}, e.prototype.getQualityFor = function(e) {
									try {
										return this.player.getQualityFor(e)
									} catch (e) {
										this.error({
											msg : "Call getQualityFor function error",
											detail : e
										})
									}
								}, e.prototype.setStableBufferTime = function(e) {
									void 0 === e && (e = 60);try {
										this.player.setStableBufferTime(e), this.player.setBufferTimeAtTopQuality(e), this.player.setBufferTimeAtTopQualityLongForm(e)
									} catch (e) {
										this.error({
											msg : "Call setStableBufferTime function error",
											detail : e
										})
									}
								}, e.prototype.getStableBufferTime = function() {
									try {
										return this.player.getStableBufferTime()
									} catch (e) {
										this.error({
											msg : "Call getStableBufferTime function error",
											detail : e
										})
									}
								}, e.prototype.getBufferLength = function(e) {
									try {
										return this.player.getBufferLength(e)
									} catch (e) {
										this.error({
											msg : "Call getBufferLength function error",
											detail : e
										})
									}
								}, e.prototype.getCurrentPlayURLFor = function(t) {
									try {
										return this.player.getCurrentSegmentInfoFor(t).url || ""
									} catch (e) {
										this.error({
											msg : "Call getCurrentPlayURLFor function error, type: " + t + ", qualityIndex: " + this.state.currentQualityIndex[t],
											detail : e
										})
									}
								}, e.prototype.getVideoInfo = function() {
									return {
										mediaInfo : this.state.mediaInfo,
										statisticsInfo : this.state.statisticsInfo
									}
								}, e.prototype.getAverageConnectionSpeed = function(e) {
									void 0 === e && (e = h.STRING.VIDEO);try {
										return this.player.getAverageThroughput(e) || 0
									} catch (e) {
										this.error({
											msg : "Call getAverageConnectionSpeed function error",
											detail : e
										})
									}
								}, e.prototype.destroy = function() {
									try {
										this.player && this.player.reset(), this.events = {}, this.config = null, this.state = null, this.video = null, this.player = null, clearTimeout(this.timer && this.timer.loadScript), clearTimeout(this.timer && this.timer.videoInfoSchedule), this.timer = null
									} catch (e) {
										this.error({
											msg : "Call destroy function error",
											detail : e
										})
									}
								}, e.prototype.mixin = function(e) {
									if (e && e instanceof Object)
										for (var t in e) e.hasOwnProperty(t) && this.state.hasOwnProperty(t) && (this.state[t] = e[t]);
									this.state && this.state.isAutoSwitch || (this.state.isAutoSwitch = {
										video : !1,
										audio : !1
									})
								}, e.prototype.loadDashPlayerScript = function() {
									var r = this,
										i = this.config.scriptSrc;
									return new Promise(function(e, t) {
										try {
											var n = document.createElement("script");
											n.src = i, n.onload = function() {
												r.state.onScriptLoading = !1, clearTimeout(r.timer.loadScript), e()
											}, n.onerror = function(e) {
												r.state.onScriptLoading = !1, clearTimeout(r.timer.loadScript), t({
													msg : "Load dash player script error, src: " + i,
													detail : e
												})
											}, document.body.appendChild(n), r.state.onScriptLoading = !0, r.timer.loadScript = setTimeout(function() {
												t({
													msg : "Call loadDashPlayerScript function timeout"
												})
											}, r.config.scriptMaxLoadTime)
										} catch (e) {
											t({
												msg : "Call loadDashPlayerScript function error",
												detail : e
											})
										}
									})
								}, e.prototype.createPlayer = function(e, t) {
									var n = window.dashjs,
										r = this.state;
									this.state.defaultQuality = this.getQualityIndexFromQualityNumber(r.defaultQuality);try {
										var i = n.MediaPlayer().create();
										this.player = i, this.bindEvents(e), i.initialize(this.video, r.mpd, r.isAutoPlay), i.setABRStrategy(r.abrStrategy || h.STRING.ABR_THROUGHPUT), i.setAutoSwitchQualityFor(h.STRING.VIDEO, r.isAutoSwitch[h.STRING.VIDEO]), i.setAutoSwitchQualityFor(h.STRING.AUDIO, r.isAutoSwitch[h.STRING.AUDIO]), i.setFastSwitchEnabled(!0), i.enableLastBitrateCaching(!1), this.setDefaultQualityFor("video", r.defaultQuality), this.setStableBufferTime(this.state.stableBufferTime)
									} catch (e) {
										t({
											msg : "Call createPlayer function error",
											detail : e
										})
									}
								}, e.prototype.bindEvents = function(n) {
									var r = this,
										i = this.player;
									i.on(h.EVENTS.STREAM_INITIALIZED, function e() {
										i.off(h.EVENTS.STREAM_INITIALIZED, e, r), r.state.initialized = !0;
										var t = r.player.getBitrateInfoListFor("video");
										n && n(t), r.fire(h.EVENTS.STREAM_INITIALIZED), r.videoInfoSchedule()
									}, this), i.on(h.EVENTS.MANIFEST_LOADED, this.parseManifestInfo, this), i.onInitSegmentsLoaded(this.onInitSegmentsLoaded.bind(this)), this.bindDashCorePlayerEvents()
								}, e.prototype.error = function(e) {
									e.code = e.code || h.ERROR.INTERNAL_ERROR, e.msg = "[Dash] " + e.msg, e.type = e.type || h.STRING.ERROR, h.STRING.ERROR === e.type ? this.fire(h.EVENTS.ERROR, e) : this.fire(h.EVENTS.WARNING, e)
								}, e.prototype.bindDashCorePlayerEvents = function() {
									var r = this,
										e = this.events;
									this.player.on(h.EVENTS.ERROR, function(e) {
										r.errorHandler(e)
									}), this.on(h.EVENTS.QUALITY_CHANGE_RENDERED, function(e) {
										r.state.currentQualityIndex[e.mediaType] = e.newQuality
									}), [ {
										key : h.EVENTS.QUALITY_CHANGE_REQUESTED,
										callbackQueue : function() {
											return e[h.EVENTS.QUALITY_CHANGE_REQUESTED]
										}
									}, {
										key : h.EVENTS.QUALITY_CHANGE_RENDERED,
										callbackQueue : function() {
											return e[h.EVENTS.QUALITY_CHANGE_RENDERED]
										}
									} ].forEach(function(n) {
										r.player.on(n.key, function(t) {
											try {
												var e = n.callbackQueue();
												e && e.forEach(function(e) {
													"function" == typeof e && e(r.getQualityChangedData(t))
												})
											} catch (t) {
												r.error({
													msg : "Call " + n.key + " callback queue error",
													detail : t,
													type : h.STRING.WARNING
												})
											}
										})
									}), this.player.on(h.EVENTS.FRAGMENT_LOADED_ERROR, function(e) {
										if (e) {
											if (!e.code) return;
											var t = h.STRING.WARNING;
											e.code === h.ERROR.DOWNLOAD_FRAGMENT_ERROR_RETRY_FAILURE && (t = h.STRING.ERROR), r.error({
												code : e.code,
												detail : e,
												msg : "Fragment Loaded Error, " + JSON.stringify(e),
												type : t
											})
										}
									})
								}, e.prototype.errorHandler = function(e) {
									if (e) try {
											var t = e.code,
												n = e.error,
												r = e.event.message;
											switch (t) {
											case h.ERROR.DOWNLOAD_ERROR:
											case h.ERROR.DOWNLOAD_MPD_ERROR:
											case h.ERROR.DOWNLOAD_XINK_ERROR:
											case h.ERROR.DOWNLOAD_INIT_SEGMENT_ERROR:
											case h.ERROR.DOWNLOAD_MEDIA_SEGMENT_ERROR:
											case h.ERROR.DOWNLOAD_INDEX_SEGMENT_ERROR:
											case h.ERROR.DOWNLOAD_SWITCHING_SEGMENT_ERROR:
											case h.ERROR.DOWNLOAD_OTHER_ERROR:
												var i = e.event.url,
													a = e.httpCode;
												this.error({
													code : t,
													msg : a + " downloadError - " + i,
													detail : e
												});
												break;case h.ERROR.MANIFEST_ERROR:
											case h.ERROR.MANIFEST_TYPE_ERROR:
											case h.ERROR.MANIFEST_RESOLVE_ERROR:
												this.error({
													code : t,
													msg : n + " - " + r,
													detail : e
												});
												break;case h.ERROR.MEDIA_ERROR:
											case h.ERROR.MEDIA_ABORTED_ERROR:
											case h.ERROR.MEDIA_NETWORK_ERROR:
											case h.ERROR.MEDIA_DECODE_ERROR:
											case h.ERROR.MEDIA_SUPPORTED_ERROR:
											case h.ERROR.MEDIA_ENCRYPTED_ERROR:
											case h.ERROR.MEDIA_UNKNOWN_ERROR:
												var o = e.event;
												this.error({
													code : t,
													msg : n + " - " + o,
													detail : e
												});
												break;default:
												console.error(e)
											}
										} catch (e) {
											this.error({
												msg : "Unknown error.",
												detail : e
											})
									}
								}, e.prototype.detectDashJSExists = function() {
									return !(!window.dashjs || !window.dashjs.MediaPlayer)
								}, e.prototype.detectQualityTypeIsLegal = function(e) {
									return !(e === h.STRING.VIDEO || e === h.STRING.AUDIO)
								}, e.prototype.parseManifestInfo = function(e) {
									var u = this;
									try {
										var t = e.data;
										if ((this.state.manifest = t) && t.Period) {
											var l = {
													baseUri : t.baseUri,
													representation : {
														video : [],
														audio : []
													}
												},
												d = {
													video : {},
													audio : {}
												},
												n = t.Period.AdaptationSet_asArray;
											n.length && n.forEach(function(o) {
												var e = o.Representation_asArray;
												if (e) {
													var s = "";
													e instanceof Array || (e = [ e ]), e.length && (e.sort(function(e, t) {
														return e.bandwidth - t.bandwidth
													}), e.forEach(function(e, t) {
														var n = e.frameRate,
															r = e.mimeType || o.mimeType;
														try {
															if (n && -1 < ("" + n).indexOf("/")) {
																var i = n.split("/");
																n = (n = parseInt(i[0], 10) / parseInt(i[1], 10)).toFixed(3)
															}
														} catch (e) {
															u.error({
																msg : "Parse fps error, fps: " + n,
																detail : e
															})
														}
														var a = {
															id : e.id,
															baseURL : e.BaseURL,
															width : e.width,
															height : e.height,
															bandwidth : e.bandwidth,
															codecs : e.codecs,
															fps : n,
															mimeType : r,
															sar : e.sar,
															startWithSAP : e.startWithSAP,
															audioSamplingRate : e.audioSamplingRate
														};
														-1 < r.indexOf(h.STRING.VIDEO) ? s = h.STRING.VIDEO : -1 < r.indexOf(h.STRING.AUDIO) ? s = h.STRING.AUDIO : u.error({
															msg : "Manifest missing mimeType",
															detail : e
														}), s && (l.representation[s].push(a), d[s][a.id] = t)
													})), u.state.maxQualityIndex[s] = e.length - 1
												}
											}), this.state.manifestInfo = l, this.state.qualityNumberMap = d
										}
									} catch (u) {
										this.error({
											msg : "Parse dash player manifest error",
											detail : e
										})
									}
								}, e.prototype.getQualityIndexFromQualityNumber = function(e, t) {
									void 0 === t && (t = h.STRING.VIDEO);
									var n = 0;
									try {
										var r = this.state.qualityNumberMap[t];
										e = parseInt("" + e, 10);var i = this.state.maxQualityIndex[t];
										if (r && 0 <= r[e] && e >= this.config.minQualityNumberMappingNumber) {
											var a = r[e];
											0 <= a && (n = a)
										} else if (-1 === i || 0 <= e && e <= i)
											n = e;
										else if (r) {
											for (var o in r)
												if (r.hasOwnProperty(o)) {
													var s = parseInt(o, 10);
													s < e && (n = r["" + Math.max(n, s)])
											}
											this.error({
												msg : "Quality number or index is error, qn or index: " + e + ",using lower quality number: " + this.getQualityNumberFromQualityIndex(n) + " with quality index: " + n,
												type : h.STRING.WARNING
											})
										} else this.error({
												msg : "Quality number or index is error, qn or index: " + e + ", qn map: " + JSON.stringify(r) + ", max quality index: " + i,
												type : h.STRING.WARNING
											})
									} catch (t) {
										this.error({
											msg : "Call getQualityIndexFromQualityNumber error, qn: " + e,
											detail : t
										})
									} return n
								}, e.prototype.getQualityNumberFromQualityIndex = function(e, t) {
									void 0 === t && (t = h.STRING.VIDEO);try {
										var n = this.state.qualityNumberMap[t];
										if (e = parseInt("" + e, 10), n)
											for (var r in n)
												if (n.hasOwnProperty(r) && n[r] === e) return parseInt(r, 10)
									} catch (t) {
										this.error({
											msg : "Call getQualityNumberFromQualityIndex error, qn: " + e,
											detail : t
										})
									} return 32
								}, e.prototype.getDroppedFramesInfo = function() {
									try {
										return this.player.getDroppedFramesInfo() || {}
									} catch (e) {
										this.error({
											msg : "Call getDroppedFramesInfo function error",
											detail : e,
											type : h.STRING.WARNING
										})
									}
								}, e.prototype.getCurrentTrackFor = function(e) {
									try {
										return this.player.getCurrentTrackFor(e) || {}
									} catch (e) {
										this.error({
											msg : "Call getCurrentTrackFor function error",
											detail : e
										})
									}
								}, e.prototype.getCurrentSegmentInfoFor = function(e) {
									void 0 === e && (e = h.STRING.VIDEO);try {
										return this.player.getCurrentSegmentInfoFor(e) || {}
									} catch (e) {
										this.error({
											msg : "Call getCurrentSegmentInfoFor function error",
											detail : e,
											type : h.STRING.WARNING
										})
									}
								}, e.prototype.onInitSegmentsLoaded = function(e, t) {
									try {
										if (!(this.state.segmentsInfoMap[e] = t).isDurationAllEqual) {
											var n = t.notEqualQualityIndex;
											this.error({
												code : h.ERROR.DURATION_IS_NOT_ALL_EQUAL,
												msg : "Segments duration is not all equal, type: " + e + ", quality index switch: " + n.old + " => " + n.new + ", segment index list: " + t.notEqualIndexList + " } "
											})
										}
									} catch (e) {
										this.error({
											msg : "Call onInitSegmentsLoaded function error",
											detail : e
										})
									}
								}, e.prototype.setMaxAllowedBitrateFor = function(e, t) {
									try {
										this.player.setMaxAllowedBitrateFor(e, t)
									} catch (e) {
										this.error({
											msg : "Call setMaxAllowedBitrateFor function error",
											detail : e
										})
									}
								}, e.prototype.videoInfoSchedule = function() {
									var e = this,
										t = {},
										n = {};
									try {
										var r = this.state,
											i = r.manifestInfo,
											a = r.currentQualityIndex,
											o = i.representation[h.STRING.VIDEO][a[h.STRING.VIDEO]] || {},
											s = i.representation[h.STRING.AUDIO][a[h.STRING.AUDIO]] || {},
											u = this.getCurrentTrackFor("video"),
											l = this.getCurrentSegmentInfoFor(h.STRING.VIDEO),
											d = this.getCurrentTrackFor("audio"),
											f = this.getCurrentSegmentInfoFor(h.STRING.AUDIO),
											c = this.getDroppedFramesInfo();
										t = {
											width : o.width,
											height : o.height,
											sar : o.sar,
											mimeType : u.codec + ", " + d.codec,
											fps : o.fps,
											videoDataRate : o.bandwidth,
											videoCodec : u.codec,
											audioDataRate : s.bandwidth,
											audioCodec : d.codec,
											audioSampleRate : s.audioSamplingRate || 0,
											audioChannelCount : 0
										}, n = {
											playerType : "DashPlayer",
											speed : Math.round(this.getAverageConnectionSpeed(h.STRING.VIDEO)),
											bufferHealth : this.getBufferLength("video") || 0,
											droppedFrames : c.droppedFrames || 0,
											decodedFrames : c.totalFrames || 0,
											audioURL : f.url || "",
											audioCurrentSegmentIndex : f.index || 0,
											audioCurrentSegmentStartTime : f.startTime || 0,
											audioCurrentSegmentDuration : f.duration || 0,
											audioTotalSegmentCount : r.segmentsInfoMap[h.STRING.AUDIO].total || 0,
											videoURL : l.url || "",
											videoCurrentSegmentIndex : l.index || 0,
											videoCurrentSegmentStartTime : l.startTime || 0,
											videoCurrentSegmentDuration : l.duration || 0,
											videoTotalSegmentCount : r.segmentsInfoMap[h.STRING.VIDEO].total || 0
										}, this.state.mediaInfo = t, this.state.statisticsInfo = n, this.fire(h.EVENTS.VIDEO_INFO, {
											mediaInfo : t,
											statisticsInfo : n
										})
									} catch (e) {
										this.error({
											msg : "Call videoInfoSchedule error",
											detail : e,
											type : h.STRING.WARNING
										})
									} clearTimeout(this.timer && this.timer.videoInfoSchedule), this.config && this.config.videoInfoScheduleTime && this.timer && (this.timer.videoInfoSchedule = setTimeout(function() {
										e.videoInfoSchedule()
									}, this.config.videoInfoScheduleTime))
								}, e.prototype.getQualityChangedData = function(e, t) {
									var n = {};
									try {
										var r = e.mediaType,
											i = e.type,
											a = e.newQuality,
											o = e.oldQuality,
											s = this.state.isAutoSwitch[r];
										n = {
											mediaType : r,
											type : i,
											newQuality : a,
											newQualityNumber : this.getQualityNumberFromQualityIndex(a),
											oldQuality : o,
											oldQualityNumber : this.getQualityNumberFromQualityIndex(o),
											currentTime : this.getCurrentTime(),
											isAutoSwitch : s,
											dict : this.player.getThroughputDict("video")
										}, h.EVENTS.QUALITY_CHANGE_RENDERED === i ? ((t = t || this.state.autoSwitchStartTime || 0) && (n.cost = Math.floor(Date.now() - t)), this.state.autoSwitchStartTime = 0) : h.EVENTS.QUALITY_CHANGE_REQUESTED === i && (this.state.autoSwitchStartTime = Date.now())
									} catch (e) {
										this.error({
											msg : "Call getQualityChangedData error",
											detail : e,
											type : h.STRING.WARNING
										})
									} return n
								}, Object.defineProperty(e, "CONFIG", {
									get : function() {
										return {
											version : "1.2.2",
											gitHash : "3fcb4890",
											build : "20",
											bundleType : "release"
										}
									},
									enumerable : !0,
									configurable : !0
								}), e.EVENTS = h.EVENTS, e.ERROR = h.ERROR, e.STRING = h.STRING, e
						}();
					t.default = r
				}, function(e, t, n) {
					"use strict";Object.defineProperty(t, "__esModule", {
						value : !0
					});
					t.EVENTS = {
						SCRIPT_LOADED : "scripLoaded",
						VIDEO_INFO : "videoInfo",
						WARNING : "warning",
						AST_IN_FUTURE : "astInFuture",
						BUFFER_EMPTY : "bufferStalled",
						BUFFER_LOADED : "bufferLoaded",
						BUFFER_LEVEL_STATE_CHANGED : "bufferStateChanged",
						ERROR : "error",
						FRAGMENT_LOADING_COMPLETED : "fragmentLoadingCompleted",
						FRAGMENT_LOADING_PROGRESS : "fragmentLoadingProgress",
						FRAGMENT_LOADING_STARTED : "fragmentLoadingStarted",
						FRAGMENT_LOADING_ABANDONED : "fragmentLoadingAbandoned",
						FRAGMENT_LOADED_ERROR : "fragmentLoadedError",
						LOG : "log",
						MANIFEST_LOADED : "manifestLoaded",
						METRICS_CHANGED : "metricsChanged",
						METRIC_CHANGED : "metricChanged",
						METRIC_ADDED : "metricAdded",
						METRIC_UPDATED : "metricUpdated",
						PERIOD_SWITCH_COMPLETED : "periodSwitchCompleted",
						PERIOD_SWITCH_STARTED : "periodSwitchStarted",
						QUALITY_CHANGE_REQUESTED : "qualityChangeRequested",
						QUALITY_CHANGE_RENDERED : "qualityChangeRendered",
						TRACK_CHANGE_RENDERED : "trackChangeRendered",
						SOURCE_INITIALIZED : "sourceInitialized",
						STREAM_INITIALIZED : "streamInitialized",
						STREAM_TEARDOWN_COMPLETE : "streamTeardownComplete",
						TEXT_TRACKS_ADDED : "allTextTracksAdded",
						TEXT_TRACK_ADDED : "textTrackAdded",
						TTML_PARSED : "ttmlParsed",
						TTML_TO_PARSE : "ttmlToParse",
						CAN_PLAY : "canPlay",
						PLAYBACK_ENDED : "playbackEnded",
						PLAYBACK_ERROR : "playbackError",
						PLAYBACK_NOT_ALLOWED : "playbackNotAllowed",
						PLAYBACK_METADATA_LOADED : "playbackMetaDataLoaded",
						PLAYBACK_PAUSED : "playbackPaused",
						PLAYBACK_PLAYING : "playbackPlaying",
						PLAYBACK_PROGRESS : "playbackProgress",
						PLAYBACK_RATE_CHANGED : "playbackRateChanged",
						PLAYBACK_SEEKED : "playbackSeeked",
						PLAYBACK_SEEKING : "playbackSeeking",
						PLAYBACK_SEEK_ASKED : "playbackSeekAsked",
						PLAYBACK_STARTED : "playbackStarted",
						PLAYBACK_TIME_UPDATED : "playbackTimeUpdated",
						PLAYBACK_WAITING : "playbackWaiting",
						MANIFEST_VALIDITY_CHANGED : "manifestValidityChanged",
						KEY_ADDED : "public_keyAdded",
						KEY_ERROR : "public_keyError",
						KEY_MESSAGE : "public_keyMessage",
						KEY_SESSION_CLOSED : "public_keySessionClosed",
						KEY_SESSION_CREATED : "public_keySessionCreated",
						KEY_SESSION_REMOVED : "public_keySessionRemoved",
						KEY_STATUSES_CHANGED : "public_keyStatusesChanged",
						KEY_SYSTEM_ACCESS_COMPLETE : "public_keySystemAccessComplete",
						KEY_SYSTEM_SELECTED : "public_keySystemSelected",
						LICENSE_REQUEST_COMPLETE : "public_licenseRequestComplete",
						PROTECTION_CREATED : "public_protectioncreated",
						PROTECTION_DESTROYED : "public_protectiondestroyed"
					};
					t.ERROR = {
						INTERNAL_ERROR : -1,
						DURATION_IS_NOT_ALL_EQUAL : -2,
						DOWNLOAD_ERROR : 4,
						DOWNLOAD_MPD_ERROR : 4001,
						DOWNLOAD_XINK_ERROR : 4002,
						DOWNLOAD_INIT_SEGMENT_ERROR : 4003,
						DOWNLOAD_MEDIA_SEGMENT_ERROR : 4004,
						DOWNLOAD_INDEX_SEGMENT_ERROR : 4005,
						DOWNLOAD_SWITCHING_SEGMENT_ERROR : 4006,
						DOWNLOAD_OTHER_ERROR : 4007,
						DOWNLOAD_FRAGMENT_ERROR : 4101,
						DOWNLOAD_FRAGMENT_ERROR_RETRY_SUCCESS : 4102,
						DOWNLOAD_FRAGMENT_ERROR_RETRY_FAILURE : 4103,
						MANIFEST_ERROR : 5,
						MANIFEST_TYPE_ERROR : 5001,
						MANIFEST_RESOLVE_ERROR : 5002,
						MEDIA_ERROR : 6,
						MEDIA_ABORTED_ERROR : 6001,
						MEDIA_NETWORK_ERROR : 6002,
						MEDIA_DECODE_ERROR : 6003,
						MEDIA_SUPPORTED_ERROR : 6004,
						MEDIA_ENCRYPTED_ERROR : 6005,
						MEDIA_UNKNOWN_ERROR : 6e3
					};
					t.STRING = {
						VIDEO : "video",
						AUDIO : "audio",
						LOG : "log",
						WARNING : "warning",
						ERROR : "error",
						ABR_DYNAMIC : "abrDynamic",
						ABR_BOLA : "abrBola",
						ABR_THROUGHPUT : "abrThroughput"
					}
				} ])
			}, "object" == Fe(o) && "object" == Fe(e) ? e.exports = i() : (n = [], void 0 === (r = "function" == typeof (t = i) ? t.apply(o, n) : t) || (e.exports = r)), function i(a, o, s) {
				function u(t, e) {
					if (!o[t]) {
						if (!a[t]) {
							if (l) return l(t, !0);
							var n = new Error("Cannot find module '" + t + "'");
							throw n.code = "MODULE_NOT_FOUND", n
						}
						var r = o[t] = {
							exports : {}
						};
						a[t][0].call(r.exports, function(e) {
							return u(a[t][1][e] || e)
						}, r, r.exports, i, a, o, s)
					}
					return o[t].exports
				}
				for (var l = !1, e = 0; e < s.length; e++) u(s[e]);
				return u
			}({
				1 : [ function(e, t, n) {
					"use strict";
					var o,
						r,
						u,
						i,
						l,
						d = {
							encode : function(e) {
								for (var t = [], n = 0; n < e.length; ++n) {
									var r = e.charCodeAt(n);
									r < 128 ? t.push(r) : (r < 2048 ? t.push(192 | r >> 6) : (r < 65536 ? t.push(224 | r >> 12) : (t.push(240 | r >> 18), t.push(128 | 63 & r >> 12)), t.push(128 | 63 & r >> 6)), t.push(128 | 63 & r))
								}
								return t
							},
							decode : function(e) {
								for (var t = [], n = 0; n < e.length;) {
									var r = e[n++];
									r < 128 || (r < 224 ? r = (31 & r) << 6 : (r < 240 ? r = (15 & r) << 12 : (r = (7 & r) << 18, r |= (63 & e[n++]) << 12), r |= (63 & e[n++]) << 6), r |= 63 & e[n++]), t.push(String.fromCharCode(r))
								}
								return t.join("")
							}
						},
						f = {};
					o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = function(e) {
						for (var t = 0, n = [], r = 0 | e.length / 3; 0 < r--;) {
							var i = (e[t] << 16) + (e[t + 1] << 8) + e[t + 2];
							t += 3, n.push(o.charAt(63 & i >> 18)), n.push(o.charAt(63 & i >> 12)), n.push(o.charAt(63 & i >> 6)), n.push(o.charAt(63 & i))
						}
						if (2 == e.length - t) {
							i = (e[t] << 16) + (e[t + 1] << 8);n.push(o.charAt(63 & i >> 18)), n.push(o.charAt(63 & i >> 12)), n.push(o.charAt(63 & i >> 6)), n.push("=")
						} else if (1 == e.length - t) {
							i = e[t] << 16;n.push(o.charAt(63 & i >> 18)), n.push(o.charAt(63 & i >> 12)), n.push("==")
						}
						return n.join("")
					}, u = function() {
						for (var e = [], t = 0; t < o.length; ++t) e[o.charCodeAt(t)] = t;
						return e["=".charCodeAt(0)] = 0, e
					}(), i = function(e) {
						for (var t = 0, n = [], r = 0 | e.length / 4; 0 < r--;) {
							var i = (u[e.charCodeAt(t)] << 18) + (u[e.charCodeAt(t + 1)] << 12) + (u[e.charCodeAt(t + 2)] << 6) + u[e.charCodeAt(t + 3)];
							n.push(255 & i >> 16), n.push(255 & i >> 8), n.push(255 & i), t += 4
						}
						return n && ("=" == e.charAt(t - 2) ? (n.pop(), n.pop()) : "=" == e.charAt(t - 1) && n.pop()), n
					}, l = {
						encode : function(e) {
							for (var t = [], n = 0; n < e.length; ++n) t.push(e.charCodeAt(n));
							return t
						},
						decode : function(e) {
							for (var t = 0; t < s.length; ++t) a[t] = String.fromCharCode(a[t]);
							return a.join("")
						}
					}, f.decodeArray = function(e) {
						var t = i(e);
						return new Uint8Array(t)
					}, f.encodeASCII = function(e) {
						var t = l.encode(e);
						return r(t)
					}, f.decodeASCII = function(e) {
						var t = i(e);
						return l.decode(t)
					}, f.encode = function(e) {
						var t = d.encode(e);
						return r(t)
					}, f.decode = function(e) {
						var t = i(e);
						return d.decode(t)
					}, void 0 !== n && (n.decode = f.decode, n.decodeArray = f.decodeArray, n.encode = f.encode, n.encodeASCII = f.encodeASCII)
				}, {} ],
				2 : [ function(e, t, n) {
					"use strict";!function(e) {
						var n = {
								42 : 225,
								92 : 233,
								94 : 237,
								95 : 243,
								96 : 250,
								123 : 231,
								124 : 247,
								125 : 209,
								126 : 241,
								127 : 9608,
								128 : 174,
								129 : 176,
								130 : 189,
								131 : 191,
								132 : 8482,
								133 : 162,
								134 : 163,
								135 : 9834,
								136 : 224,
								137 : 32,
								138 : 232,
								139 : 226,
								140 : 234,
								141 : 238,
								142 : 244,
								143 : 251,
								144 : 193,
								145 : 201,
								146 : 211,
								147 : 218,
								148 : 220,
								149 : 252,
								150 : 8216,
								151 : 161,
								152 : 42,
								153 : 8217,
								154 : 9473,
								155 : 169,
								156 : 8480,
								157 : 8226,
								158 : 8220,
								159 : 8221,
								160 : 192,
								161 : 194,
								162 : 199,
								163 : 200,
								164 : 202,
								165 : 203,
								166 : 235,
								167 : 206,
								168 : 207,
								169 : 239,
								170 : 212,
								171 : 217,
								172 : 249,
								173 : 219,
								174 : 171,
								175 : 187,
								176 : 195,
								177 : 227,
								178 : 205,
								179 : 204,
								180 : 236,
								181 : 210,
								182 : 242,
								183 : 213,
								184 : 245,
								185 : 123,
								186 : 125,
								187 : 92,
								188 : 94,
								189 : 95,
								190 : 124,
								191 : 8764,
								192 : 196,
								193 : 228,
								194 : 214,
								195 : 246,
								196 : 223,
								197 : 165,
								198 : 164,
								199 : 9475,
								200 : 197,
								201 : 229,
								202 : 216,
								203 : 248,
								204 : 9487,
								205 : 9491,
								206 : 9495,
								207 : 9499
							},
							s = function(e) {
								var t = e;
								return n.hasOwnProperty(e) && (t = n[e]), String.fromCharCode(t)
							},
							a = {
								17 : 1,
								18 : 3,
								21 : 5,
								22 : 7,
								23 : 9,
								16 : 11,
								19 : 12,
								20 : 14
							},
							o = {
								17 : 2,
								18 : 4,
								21 : 6,
								22 : 8,
								23 : 10,
								19 : 13,
								20 : 15
							},
							u = {
								25 : 1,
								26 : 3,
								29 : 5,
								30 : 7,
								31 : 9,
								24 : 11,
								27 : 12,
								28 : 14
							},
							l = {
								25 : 2,
								26 : 4,
								29 : 6,
								30 : 8,
								31 : 10,
								27 : 13,
								28 : 15
							},
							d = [ "white", "green", "blue", "cyan", "red", "yellow", "magenta", "black", "transparent" ],
							f = {
								verboseFilter : {
									DATA : 3,
									DEBUG : 3,
									INFO : 2,
									WARNING : 2,
									TEXT : 1,
									ERROR : 0
								},
								time : null,
								verboseLevel : 0,
								setTime : function(e) {
									this.time = e
								},
								log : function(e, t) {
									var n = this.verboseFilter[e];
									this.verboseLevel >= n && console.log(this.time + " [" + e + "] " + t)
								}
							},
							c = function(e) {
								for (var t = [], n = 0; n < e.length; n++) t.push(e[n].toString(16));
								return t
							},
							h = function(e, t, n, r, i) {
								this.foreground = e || "white", this.underline = t || !1, this.italics = n || !1, this.background = r || "black", this.flash = i || !1
							};
						h.prototype = {
							reset : function() {
								this.foreground = "white", this.underline = !1, this.italics = !1, this.background = "black", this.flash = !1
							},
							setStyles : function(e) {
								for (var t = [ "foreground", "underline", "italics", "background", "flash" ], n = 0; n < t.length; n++) {
									var r = t[n];
									e.hasOwnProperty(r) && (this[r] = e[r])
								}
							},
							isDefault : function() {
								return "white" === this.foreground && !this.underline && !this.italics && "black" === this.background && !this.flash
							},
							equals : function(e) {
								return this.foreground === e.foreground && this.underline === e.underline && this.italics === e.italics && this.background === e.background && this.flash === e.flash
							},
							copy : function(e) {
								this.foreground = e.foreground, this.underline = e.underline, this.italics = e.italics, this.background = e.background, this.flash = e.flash
							},
							toString : function() {
								return "color=" + this.foreground + ", underline=" + this.underline + ", italics=" + this.italics + ", background=" + this.background + ", flash=" + this.flash
							}
						};
						var t = function(e, t, n, r, i, a) {
							this.uchar = e || " ", this.penState = new h(t, n, r, i, a)
						};
						t.prototype = {
							reset : function() {
								this.uchar = " ", this.penState.reset()
							},
							setChar : function(e, t) {
								this.uchar = e, this.penState.copy(t)
							},
							setPenState : function(e) {
								this.penState.copy(e)
							},
							equals : function(e) {
								return this.uchar === e.uchar && this.penState.equals(e.penState)
							},
							copy : function(e) {
								this.uchar = e.uchar, this.penState.copy(e.penState)
							},
							isEmpty : function() {
								return " " === this.uchar && this.penState.isDefault()
							}
						};
						var r = function() {
							this.chars = [];
							for (var e = 0; e < 32; e++) this.chars.push(new t);
							this.pos = 0, this.currPenState = new h
						};
						r.prototype = {
							equals : function(e) {
								for (var t = !0, n = 0; n < 32; n++)
									if (!this.chars[n].equals(e.chars[n])) {
										t = !1;break
								}
								return t
							},
							copy : function(e) {
								for (var t = 0; t < 32; t++) this.chars[t].copy(e.chars[t])
							},
							isEmpty : function() {
								for (var e = !0, t = 0; t < 32; t++)
									if (!this.chars[t].isEmpty()) {
										e = !1;break
								}
								return e
							},
							setCursor : function(e) {
								this.pos !== e && (this.pos = e), this.pos < 0 ? (f.log("ERROR", "Negative cursor position " + this.pos), this.pos = 0) : 32 < this.pos && (f.log("ERROR", "Too large cursor position " + this.pos), this.pos = 32)
							},
							moveCursor : function(e) {
								var t = this.pos + e;
								if (1 < e)
									for (var n = this.pos + 1; n < t + 1; n++) this.chars[n].setPenState(this.currPenState);
								this.setCursor(t)
							},
							backSpace : function() {
								this.moveCursor(-1), this.chars[this.pos].setChar(" ", this.currPenState)
							},
							insertChar : function(e) {
								144 <= e && this.backSpace();
								var t = s(e);
								32 <= this.pos ? f.log("ERROR", "Cannot insert " + e.toString(16) + " (" + t + ") at position " + this.pos + ". Skipping it!") : (this.chars[this.pos].setChar(t, this.currPenState), this.moveCursor(1))
							},
							clearFromPos : function(e) {
								var t;
								for (t = e; t < 32; t++) this.chars[t].reset()
							},
							clear : function() {
								this.clearFromPos(0), this.pos = 0, this.currPenState.reset()
							},
							clearToEndOfRow : function() {
								this.clearFromPos(this.pos)
							},
							getTextString : function() {
								for (var e = [], t = !0, n = 0; n < 32; n++) {
									var r = this.chars[n].uchar;
									" " !== r && (t = !1), e.push(r)
								}
								return t ? "" : e.join("")
							},
							setPenStyles : function(e) {
								this.currPenState.setStyles(e), this.chars[this.pos].setPenState(this.currPenState)
							}
						};
						var i = function() {
							this.rows = [];
							for (var e = 0; e < 15; e++) this.rows.push(new r);
							this.currRow = 14, this.nrRollUpRows = null, this.reset()
						};
						i.prototype = {
							reset : function() {
								for (var e = 0; e < 15; e++) this.rows[e].clear();
								this.currRow = 14
							},
							equals : function(e) {
								for (var t = !0, n = 0; n < 15; n++)
									if (!this.rows[n].equals(e.rows[n])) {
										t = !1;break
								}
								return t
							},
							copy : function(e) {
								for (var t = 0; t < 15; t++) this.rows[t].copy(e.rows[t])
							},
							isEmpty : function() {
								for (var e = !0, t = 0; t < 15; t++)
									if (!this.rows[t].isEmpty()) {
										e = !1;break
								}
								return e
							},
							backSpace : function() {
								this.rows[this.currRow].backSpace()
							},
							clearToEndOfRow : function() {
								this.rows[this.currRow].clearToEndOfRow()
							},
							insertChar : function(e) {
								this.rows[this.currRow].insertChar(e)
							},
							setPen : function(e) {
								this.rows[this.currRow].setPenStyles(e)
							},
							moveCursor : function(e) {
								this.rows[this.currRow].moveCursor(e)
							},
							setCursor : function(e) {
								f.log("INFO", "setCursor: " + e), this.rows[this.currRow].setCursor(e)
							},
							setPAC : function(e) {
								f.log("INFO", "pacData = " + JSON.stringify(e));
								var t = e.row - 1;
								this.nrRollUpRows && t < this.nrRollUpRows - 1 && (t = this.nrRollUpRows - 1), this.currRow = t;
								var n = this.rows[this.currRow];
								if (null !== e.indent) {
									var r = e.indent,
										i = Math.max(r - 1, 0);
									n.setCursor(e.indent), e.color = n.chars[i].penState.foreground
								}
								var a = {
									foreground : e.color,
									underline : e.underline,
									italics : e.italics,
									background : "black",
									flash : !1
								};
								this.setPen(a)
							},
							setBkgData : function(e) {
								f.log("INFO", "bkgData = " + JSON.stringify(e)), this.backSpace(), this.setPen(e), this.insertChar(32)
							},
							setRollUpRows : function(e) {
								this.nrRollUpRows = e
							},
							rollUp : function() {
								if (null !== this.nrRollUpRows) {
									f.log("TEXT", this.getDisplayText());
									var e = this.currRow + 1 - this.nrRollUpRows,
										t = this.rows.splice(e, 1)[0];
									t.clear(), this.rows.splice(this.currRow, 0, t), f.log("INFO", "Rolling up")
								} else f.log("DEBUG", "roll_up but nrRollUpRows not set yet")
							},
							getDisplayText : function(e) {
								e = e || !1;
								for (var t = [], n = "", r = -1, i = 0; i < 15; i++) {
									var a = this.rows[i].getTextString();
									a && (r = i + 1, e ? t.push("Row " + r + ': "' + a + '"') : t.push(a.trim()))
								}
								return 0 < t.length && (n = e ? "[" + t.join(" | ") + "]" : t.join("\n")), n
							},
							getTextAndFormat : function() {
								return this.rows
							}
						};
						var p = function(e, t) {
							this.chNr = e, this.outputFilter = t, this.mode = null, this.verbose = 0, this.displayedMemory = new i, this.nonDisplayedMemory = new i, this.lastOutputScreen = new i, this.currRollUpRow = this.displayedMemory.rows[14], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null
						};
						p.prototype = {
							modes : [ "MODE_ROLL-UP", "MODE_POP-ON", "MODE_PAINT-ON", "MODE_TEXT" ],
							reset : function() {
								this.mode = null, this.displayedMemory.reset(), this.nonDisplayedMemory.reset(), this.lastOutputScreen.reset(), this.currRollUpRow = this.displayedMemory.rows[14], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null, this.lastCueEndTime = null
							},
							getHandler : function() {
								return this.outputFilter
							},
							setHandler : function(e) {
								this.outputFilter = e
							},
							setPAC : function(e) {
								this.writeScreen.setPAC(e)
							},
							setBkgData : function(e) {
								this.writeScreen.setBkgData(e)
							},
							setMode : function(e) {
								e !== this.mode && (this.mode = e, f.log("INFO", "MODE=" + e), "MODE_POP-ON" == this.mode ? this.writeScreen = this.nonDisplayedMemory : (this.writeScreen = this.displayedMemory, this.writeScreen.reset()), "MODE_ROLL-UP" !== this.mode && (this.displayedMemory.nrRollUpRows = null, this.nonDisplayedMemory.nrRollUpRows = null), this.mode = e)
							},
							insertChars : function(e) {
								for (var t = 0; t < e.length; t++) this.writeScreen.insertChar(e[t]);
								var n = this.writeScreen === this.displayedMemory ? "DISP" : "NON_DISP";
								f.log("INFO", n + ": " + this.writeScreen.getDisplayText(!0)), "MODE_PAINT-ON" !== this.mode && "MODE_ROLL-UP" !== this.mode || (f.log("TEXT", "DISPLAYED: " + this.displayedMemory.getDisplayText(!0)), this.outputDataUpdate())
							},
							cc_RCL : function() {
								f.log("INFO", "RCL - Resume Caption Loading"), this.setMode("MODE_POP-ON")
							},
							cc_BS : function() {
								f.log("INFO", "BS - BackSpace"), "MODE_TEXT" !== this.mode && (this.writeScreen.backSpace(), this.writeScreen === this.displayedMemory && this.outputDataUpdate())
							},
							cc_AOF : function() {},
							cc_AON : function() {},
							cc_DER : function() {
								f.log("INFO", "DER- Delete to End of Row"), this.writeScreen.clearToEndOfRow(), this.outputDataUpdate()
							},
							cc_RU : function(e) {
								f.log("INFO", "RU(" + e + ") - Roll Up"), this.writeScreen = this.displayedMemory, this.setMode("MODE_ROLL-UP"), this.writeScreen.setRollUpRows(e)
							},
							cc_FON : function() {
								f.log("INFO", "FON - Flash On"), this.writeScreen.setPen({
									flash : !0
								})
							},
							cc_RDC : function() {
								f.log("INFO", "RDC - Resume Direct Captioning"), this.setMode("MODE_PAINT-ON")
							},
							cc_TR : function() {
								f.log("INFO", "TR"), this.setMode("MODE_TEXT")
							},
							cc_RTD : function() {
								f.log("INFO", "RTD"), this.setMode("MODE_TEXT")
							},
							cc_EDM : function() {
								f.log("INFO", "EDM - Erase Displayed Memory"), this.displayedMemory.reset(), this.outputDataUpdate()
							},
							cc_CR : function() {
								f.log("CR - Carriage Return"), this.writeScreen.rollUp(), this.outputDataUpdate()
							},
							cc_ENM : function() {
								f.log("INFO", "ENM - Erase Non-displayed Memory"), this.nonDisplayedMemory.reset()
							},
							cc_EOC : function() {
								if (f.log("INFO", "EOC - End Of Caption"), "MODE_POP-ON" === this.mode) {
									var e = this.displayedMemory;
									this.displayedMemory = this.nonDisplayedMemory, this.nonDisplayedMemory = e, this.writeScreen = this.nonDisplayedMemory, f.log("TEXT", "DISP: " + this.displayedMemory.getDisplayText())
								}
								this.outputDataUpdate()
							},
							cc_TO : function(e) {
								f.log("INFO", "TO(" + e + ") - Tab Offset"), this.writeScreen.moveCursor(e)
							},
							cc_MIDROW : function(e) {
								var t = {
									flash : !1
								};
								if (t.underline = e % 2 == 1, t.italics = 46 <= e, t.italics)
									t.foreground = "white";else {
									var n = Math.floor(e / 2) - 16;
									t.foreground = [ "white", "green", "blue", "cyan", "red", "yellow", "magenta" ][n]
								}
								f.log("INFO", "MIDROW: " + JSON.stringify(t)), this.writeScreen.setPen(t)
							},
							outputDataUpdate : function() {
								var e = f.time;
								null !== e && this.outputFilter && (this.outputFilter.updateData && this.outputFilter.updateData(e, this.displayedMemory), null !== this.cueStartTime || this.displayedMemory.isEmpty() ? this.displayedMemory.equals(this.lastOutputScreen) || (this.outputFilter.newCue && this.outputFilter.newCue(this.cueStartTime, e, this.lastOutputScreen), this.cueStartTime = this.displayedMemory.isEmpty() ? null : e) : this.cueStartTime = e, this.lastOutputScreen.copy(this.displayedMemory))
							},
							cueSplitAtTime : function(e) {
								this.outputFilter && (this.displayedMemory.isEmpty() || (this.outputFilter.newCue && this.outputFilter.newCue(this.cueStartTime, e, this.displayedMemory), this.cueStartTime = e))
							}
						};
						var g = function(e, t, n) {
							this.field = e || 1, this.outputs = [ t, n ], this.channels = [ new p(1, t), new p(2, n) ], this.currChNr = -1, this.lastCmdA = null, this.lastCmdB = null, this.bufferedData = [], this.startTime = null, this.lastTime = null, this.dataCounters = {
								padding : 0,
								char : 0,
								cmd : 0,
								other : 0
							}
						};
						g.prototype = {
							getHandler : function(e) {
								return this.channels[e].getHandler()
							},
							setHandler : function(e, t) {
								this.channels[e].setHandler(t)
							},
							addData : function(e, t) {
								var n,
									r,
									i,
									a = !1;
								this.lastTime = e, f.setTime(e);
								for (var o = 0; o < t.length; o += 2)
									if (r = 127 & t[o], i = 127 & t[o + 1], 16 <= r && r <= 31 && r === this.lastCmdA && i === this.lastCmdB) this.lastCmdA = null, this.lastCmdB = null, f.log("DEBUG", "Repeated command (" + c([ r, i ]) + ") is dropped");
									else if (0 !== r || 0 !== i) {
										if (f.log("DATA", "[" + c([ t[o], t[o + 1] ]) + "] -> (" + c([ r, i ]) + ")"), (n = this.parseCmd(r, i)) || (n = this.parseMidrow(r, i)), n || (n = this.parsePAC(r, i)), n || (n = this.parseBackgroundAttributes(r, i)), !n && (a = this.parseChars(r, i)))
											if (this.currChNr && 0 <= this.currChNr) {
												this.channels[this.currChNr - 1].insertChars(a)
											} else f.log("WARNING", "No channel found yet. TEXT-MODE?");
										n ? this.dataCounters.cmd += 2 : a ? this.dataCounters.char += 2 : (this.dataCounters.other += 2, f.log("WARNING", "Couldn't parse cleaned data " + c([ r, i ]) + " orig: " + c([ t[o], t[o + 1] ])))
									} else
										this.dataCounters.padding += 2
							},
							parseCmd : function(e, t) {
								var n;
								if (!((20 === e || 21 === e || 28 === e || 29 === e) && 32 <= t && t <= 47) && !((23 === e || 31 === e) && 33 <= t && t <= 35)) return !1;
								n = 20 === e || 21 === e || 23 === e ? 1 : 2;
								var r = this.channels[n - 1];
								return 20 === e || 21 === e || 28 === e || 29 === e ? 32 === t ? r.cc_RCL() : 33 === t ? r.cc_BS() : 34 === t ? r.cc_AOF() : 35 === t ? r.cc_AON() : 36 === t ? r.cc_DER() : 37 === t ? r.cc_RU(2) : 38 === t ? r.cc_RU(3) : 39 === t ? r.cc_RU(4) : 40 === t ? r.cc_FON() : 41 === t ? r.cc_RDC() : 42 === t ? r.cc_TR() : 43 === t ? r.cc_RTD() : 44 === t ? r.cc_EDM() : 45 === t ? r.cc_CR() : 46 === t ? r.cc_ENM() : 47 === t && r.cc_EOC() : r.cc_TO(t - 32), this.lastCmdA = e, this.lastCmdB = t, this.currChNr = n, !0
							},
							parseMidrow : function(e, t) {
								var n = null;
								if ((17 === e || 25 === e) && 32 <= t && t <= 47) {
									if ((n = 17 === e ? 1 : 2) !== this.currChNr) return f.log("ERROR", "Mismatch channel in midrow parsing"), !1;
									var r = this.channels[n - 1];
									return r.insertChars([ 32 ]), r.cc_MIDROW(t), f.log("DEBUG", "MIDROW (" + c([ e, t ]) + ")"), this.lastCmdA = e, this.lastCmdB = t, !0
								}
								return !1
							},
							parsePAC : function(e, t) {
								var n,
									r;
								if (!((17 <= e && e <= 23 || 25 <= e && e <= 31) && 64 <= t && t <= 127) && !((16 === e || 24 === e) && 64 <= t && t <= 95)) return !1;
								n = e <= 23 ? 1 : 2, r = 64 <= t && t <= 95 ? 1 === n ? a[e] : u[e] : 1 === n ? o[e] : l[e];
								var i = this.interpretPAC(r, t);
								return this.channels[n - 1].setPAC(i), this.lastCmdA = e, this.lastCmdB = t, this.currChNr = n, !0
							},
							interpretPAC : function(e, t) {
								var n,
									r = {
										color : null,
										italics : !1,
										indent : null,
										underline : !1,
										row : e
									};
								return n = 95 < t ? t - 96 : t - 64, r.underline = 1 == (1 & n), n <= 13 ? r.color = [ "white", "green", "blue", "cyan", "red", "yellow", "magenta", "white" ][Math.floor(n / 2)] : n <= 15 ? (r.italics = !0, r.color = "white") : r.indent = 4 * Math.floor((n - 16) / 2), r
							},
							parseChars : function(e, t) {
								var n = null,
									r = null,
									i = null;
								if (17 <= (i = 25 <= e ? (n = 2, e - 8) : (n = 1, e)) && i <= 19) {
									var a;
									a = 17 === i ? t + 80 : 18 === i ? t + 112 : t + 144, f.log("INFO", "Special char '" + s(a) + "' in channel " + n), r = [ a ], this.lastCmdA = e, this.lastCmdB = t
								} else 32 <= e && e <= 127 && (r = 0 === t ? [ e ] : [ e, t ], this.lastCmdA = null, this.lastCmdB = null);
								if (r) {
									var o = c(r);
									f.log("DEBUG", "Char codes =  " + o.join(","))
								}
								return r
							},
							parseBackgroundAttributes : function(e, t) {
								var n,
									r,
									i;
								return !(!((16 === e || 24 === e) && 32 <= t && t <= 47) && !((23 === e || 31 === e) && 45 <= t && t <= 47) || (n = {}, 16 === e || 24 === e ? (r = Math.floor((t - 32) / 2), n.background = d[r], t % 2 == 1 && (n.background = n.background + "_semi")) : 45 === t ? n.background = "transparent" : (n.foreground = "black", 47 === t && (n.underline = !0)), i = e < 24 ? 1 : 2, this.channels[i - 1].setBkgData(n), this.lastCmdA = e, this.lastCmdB = t, 0))
							},
							reset : function() {
								for (var e = 0; e < this.channels.length; e++) this.channels[e] && this.channels[e].reset();
								this.lastCmdA = null, this.lastCmdB = null
							},
							cueSplitAtTime : function(e) {
								for (var t = 0; t < this.channels.length; t++) this.channels[t] && this.channels[t].cueSplitAtTime(e)
							}
						};e.logger = f, e.PenState = h, e.CaptionScreen = i, e.Cea608Parser = g, e.findCea608Nalus = function(e, t, n) {
							for (var r = 0, i = t, a = [], o = function(e, t, n, r) {
										if (4 !== e || t < 8) return null;
										var i = n.getUint8(r),
											a = n.getUint16(r + 1),
											o = n.getUint32(r + 3),
											s = n.getUint8(r + 7);
										return 181 == i && 49 == a && 1195456820 == o && 3 == s
								};i < t + n;) {
								if (r = e.getUint32(i), 6 == (31 & e.getUint8(i + 4)))
									for (var s = i + 5, u = -1; s < i + 4 + r - 1;) {
										u = 0;
										for (var l = 255; 255 === l;) u += l = e.getUint8(s), s++;
										var d = 0;
										for (l = 255; 255 === l;) d += l = e.getUint8(s), s++;
										o(u, d, e, s) && a.push([ s, d ]), s += d
								}
								i += r + 4
							}
							return a
						}, e.extractCea608DataFromRange = function(e, t) {
							var n = t[0],
								r = [ [], [] ];
							n += 8;
							var i = 31 & e.getUint8(n);
							n += 2;
							for (var a = 0; a < i; a++) {
								var o = e.getUint8(n),
									s = 4 & o,
									u = 3 & o;
								n++;var l = e.getUint8(n);
								n++;var d = e.getUint8(n);
								n++, s && (127 & l) + (127 & d) != 0 && (0 === u ? (r[0].push(l), r[0].push(d)) : 1 === u && (r[1].push(l), r[1].push(d)))
							}
							return r
						}
					}(void 0 === n ? (void 0).cea608parser = {} : n)
				}, {} ],
				3 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					}), n.default = function(R) {
						function I(e) {
							var t = e.localName;
							return null == t && (t = e.baseName), null != t && "" != t || (t = e.nodeName), t
						}
						function u(e) {
							return "string" == typeof e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;") : e
						}
						function S(e, t, n, r) {
							for (var i = 0; i < e.length; i++) {
								var a = e[i];
								if ("string" == typeof a) {
									if (a == r) break
								} else if (a instanceof RegExp) {
									if (a.test(r)) break
								} else if ("function" == typeof a && a(t, n, r)) break
							}
							return i != e.length
						}
						function b(e, t, n) {
							switch (R.arrayAccessForm) {
							case "property":
								e[t] instanceof Array ? e[t + "_asArray"] = e[t] : e[t + "_asArray"] = [ e[t] ]
							}
							!(e[t] instanceof Array) && 0 < R.arrayAccessFormPaths.length && S(R.arrayAccessFormPaths, e, t, n) && (e[t] = [ e[t] ])
						}
						function w(e) {
							var t = e.split(/[-T:+Z]/g),
								n = new Date(t[0], t[1] - 1, t[2]),
								r = t[5].split(".");
							if (n.setHours(t[3], t[4], r[0]), 1 < r.length && n.setMilliseconds(r[1]), t[6] && t[7]) {
								var i = 60 * t[6] + Number(t[7]);
								i = 0 + ("-" == (/\d\d-\d\d:\d\d$/.test(e) ? "-" : "+") ? -1 * i : i), n.setMinutes(n.getMinutes() - i - n.getTimezoneOffset())
							} else -1 !== e.indexOf("Z", e.length - 1) && (n = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds(), n.getMilliseconds())));
							return n
						}
						function C(e, t) {
							if (e.nodeType == D.DOCUMENT_NODE) {
								for (var n = new Object, r = e.childNodes, i = 0; i < r.length; i++) (o = r[i]).nodeType == D.ELEMENT_NODE && (R.ignoreRoot ? n = C(o) : (n = {})[s = I(o)] = C(o));
								return n
							}
							if (e.nodeType == D.ELEMENT_NODE) {
								(n = new Object).__cnt = 0;
								var a = [];
								for (r = e.childNodes, i = 0; i < r.length; i++) {
									var o,
										s = I(o = r[i]);
									if (o.nodeType != D.COMMENT_NODE) {
										var u = t + "." + s;
										if (y = n, E = o.nodeType, A = s, T = u, !(E == D.ELEMENT_NODE && 0 < R.xmlElementsFilter.length) || S(R.xmlElementsFilter, y, A, T))
											if (n.__cnt++, null == n[s]) {
												var l = C(o, u);
												("#text" != s || /[^\s]/.test(l)) && ((d = {})[s] = l, a.push(d)), n[s] = l, b(n, s, u)
											} else {
												var d;
												null != n[s] && (n[s] instanceof Array || (n[s] = [ n[s] ], b(n, s, u))), l = C(o, u), ("#text" != s || /[^\s]/.test(l)) && ((d = {})[s] = l, a.push(d)), n[s][n[s].length] = l
										}
									}
								}
								n.__children = a;
								for (var f = I(e), c = 0; c < e.attributes.length; c++) {
									var h = e.attributes[c];
									n.__cnt++;
									for (var p = h.value, g = 0, m = R.matchers.length; g < m; g++) {
										var _ = R.matchers[g];
										_.test(h, f) && (p = _.converter(h.value))
									}
									n[R.attributePrefix + h.name] = p
								}
								var v = e.prefix;
								return null != v && "" != v && (n.__cnt++, n.__prefix = v), null != n["#text"] && (n.__text = n["#text"], n.__text instanceof Array && (n.__text = n.__text.join("\n")), R.stripWhitespaces && (n.__text = n.__text.trim()),
									delete n["#text"]
									, "property" == R.arrayAccessForm &&
									delete n["#text_asArray"]
									, n.__text = function(e, t, n) {
										if (0 < R.datetimeAccessFormPaths.length) {
											var r = n.split(".#")[0];
											return S(R.datetimeAccessFormPaths, e, t, r) ? w(e) : e
										}
										return e
									}(n.__text, s, t + "." + s)), null != n["#cdata-section"] && (n.__cdata = n["#cdata-section"],
									delete n["#cdata-section"]
									, "property" == R.arrayAccessForm &&
									delete n["#cdata-section_asArray"]
									), 0 == n.__cnt && "text" == R.emptyNodeForm ? n = "" : 1 == n.__cnt && null != n.__text ? n = n.__text : 1 != n.__cnt || null == n.__cdata || R.keepCData ? 1 < n.__cnt && null != n.__text && R.skipEmptyTextNodesForObj && (R.stripWhitespaces && "" == n.__text || "" == n.__text.trim()) &&
									delete n.__text
										: n = n.__cdata,
									delete n.__cnt
									, !R.enableToStringFunc || null == n.__text && null == n.__cdata || (n.toString = function() {
										return (null != this.__text ? this.__text : "") + (null != this.__cdata ? this.__cdata : "")
									}), n
							}
							var y,
								E,
								A,
								T;
							if (e.nodeType == D.TEXT_NODE || e.nodeType == D.CDATA_SECTION_NODE) return e.nodeValue
						}
						function l(e, t, n, r) {
							var i = "<" + (null != e && null != e.__prefix ? e.__prefix + ":" : "") + t;
							if (null != n)
								for (var a = 0; a < n.length; a++) {
									var o = n[a],
										s = e[o];
									R.escapeMode && (s = u(s)), i += " " + o.substr(R.attributePrefix.length) + "=", R.useDoubleQuotes ? i += '"' + s + '"' : i += "'" + s + "'"
							}
							return i + (r ? "/>" : ">")
						}
						function d(e, t) {
							return "</" + (null != e.__prefix ? e.__prefix + ":" : "") + t + ">"
						}
						function f(e, t) {
							return !!("property" == R.arrayAccessForm && (n = t.toString(), r = "_asArray", -1 !== n.indexOf(r, n.length - r.length)) || 0 == t.toString().indexOf(R.attributePrefix) || 0 == t.toString().indexOf("__") || e[t] instanceof Function);var n,
								r
						}
						function c(e) {
							var t = 0;
							if (e instanceof Object)
								for (var n in e) f(e, n) || t++;
							return t
						}
						function h(e) {
							var t = [];
							if (e instanceof Object)
								for (var n in e) -1 == n.toString().indexOf("__") && 0 == n.toString().indexOf(R.attributePrefix) && t.push(n);
							return t
						}
						function p(e) {
							var t,
								n,
								r = "";
							return e instanceof Object ? r += (n = "", null != (t = e).__cdata && (n += "<![CDATA[" + t.__cdata + "]]>"), null != t.__text && (R.escapeMode ? n += u(t.__text) : n += t.__text), n) : null != e && (R.escapeMode ? r += u(e) : r += e), r
						}
						function g(e, t) {
							return "" === e ? t : e + "." + t
						}
						function m(e, t, n, r) {
							var i = "";
							if (0 == e.length)
								i += l(e, t, n, !0);else
								for (var a = 0; a < e.length; a++) i += l(e[a], t, h(e[a]), !1), i += _(e[a], g(r, t)), i += d(e[a], t);
							return i
						}
						function _(e, t) {
							var n,
								r,
								i,
								a = "";
							if (0 < c(e))
								for (var o in e)
									if (!f(e, o) && ("" == t || (n = e, i = g(t, r = o), 0 == R.jsonPropertiesFilter.length || "" == i || S(R.jsonPropertiesFilter, n, r, i)))) {
										var s = e[o],
											u = h(s);
										null == s || null == s ? a += l(s, o, u, !0) : s instanceof Object ? s instanceof Array ? a += m(s, o, u, t) : s instanceof Date ? (a += l(s, o, u, !1), a += s.toISOString(), a += d(s, o)) : 0 < c(s) || null != s.__text || null != s.__cdata ? (a += l(s, o, u, !1), a += _(s, g(t, o)), a += d(s, o)) : a += l(s, o, u, !0) : (a += l(s, o, u, !1), a += p(s), a += d(s, o))
							}
							return a + p(e)
						}
						void 0 === (R = R || {}).escapeMode && (R.escapeMode = !0), void 0 === R.attributePrefix && (R.attributePrefix = "_"), R.arrayAccessForm = R.arrayAccessForm || "none", R.emptyNodeForm = R.emptyNodeForm || "text", void 0 === R.enableToStringFunc && (R.enableToStringFunc = !0), R.arrayAccessFormPaths = R.arrayAccessFormPaths || [], void 0 === R.skipEmptyTextNodesForObj && (R.skipEmptyTextNodesForObj = !0), void 0 === R.stripWhitespaces && (R.stripWhitespaces = !0), R.datetimeAccessFormPaths = R.datetimeAccessFormPaths || [], void 0 === R.useDoubleQuotes && (R.useDoubleQuotes = !1), R.xmlElementsFilter = R.xmlElementsFilter || [], R.jsonPropertiesFilter = R.jsonPropertiesFilter || [], void 0 === R.keepCData && (R.keepCData = !1), void 0 === R.ignoreRoot && (R.ignoreRoot = !1);
						var D = {
							ELEMENT_NODE : 1,
							TEXT_NODE : 3,
							CDATA_SECTION_NODE : 4,
							COMMENT_NODE : 8,
							DOCUMENT_NODE : 9
						};
						this.parseXmlString = function(e) {
							if (window.ActiveXObject || window, void 0 === e) return null;
							var t;
							if (window.DOMParser) {
								var n = new window.DOMParser;
								try {
									0 < (t = n.parseFromString(e, "text/xml")).getElementsByTagNameNS("*", "parsererror").length && (t = null)
								} catch (e) {
									t = null
								}
							} else 0 == e.indexOf("<?") && (e = e.substr(e.indexOf("?>") + 2)), (t = new ActiveXObject("Microsoft.XMLDOM")).async = "false", t.loadXML(e);
							return t
						}, this.asArray = function(e) {
							return void 0 === e || null == e ? [] : e instanceof Array ? e : [ e ]
						}, this.toXmlDateTime = function(e) {
							return e instanceof Date ? e.toISOString() : "number" == typeof e ? new Date(e).toISOString() : null
						}, this.asDateTime = function(e) {
							return "string" == typeof e ? w(e) : e
						}, this.xml2json = function(e) {
							return C(e)
						}, this.xml_str2json = function(e) {
							var t = this.parseXmlString(e);
							return null != t ? this.xml2json(t) : null
						}, this.json2xml_str = function(e) {
							return _(e, "")
						}, this.json2xml = function(e) {
							var t = this.json2xml_str(e);
							return this.parseXmlString(t)
						}, this.getVersion = function() {
							return "1.2.0"
						}
					}, t.exports = n.default
				}, {} ],
				4 : [ function(s, e, u) {
					(function(e) {
						"use strict";
						function t(e) {
							return e && e.__esModule ? e : {
								default : e
							}
						}
						Object.defineProperty(u, "__esModule", {
							value : !0
						});
						var n = t(s(52)),
							r = t(s(9)),
							i = s(10),
							a = "undefined" != typeof window && window || e,
							o = a.dashjs;
						o || (o = a.dashjs = {}), o.MediaPlayer = n.default, o.FactoryMaker = r.default, o.Version = (0, i.getVersionString)(), u.default = o, u.MediaPlayer = n.default, u.FactoryMaker = r.default
					}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
				}, {
					10 : 10,
					52 : 52,
					9 : 9
				} ],
				5 : [ function(e, t, n) {
					var i = {
						parseBuffer : function(e) {
							return new a(e).parse()
						},
						addBoxProcessor : function(e, t) {
							"string" == typeof e && "function" == typeof t && (o.prototype._boxProcessors[e] = t)
						},
						createFile : function() {
							return new a
						},
						createBox : function(e, t, n) {
							var r = o.create(e);
							return t && t.append(r, n), r
						},
						createFullBox : function(e, t, n) {
							var r = i.createBox(e, t, n);
							return r.version = 0, r.flags = 0, r
						},
						Utils : {}
					};
					i.Utils.dataViewToString = function(e, t) {
						var n = t || "utf-8";
						if ("undefined" != typeof TextDecoder) return new TextDecoder(n).decode(e);
						var r = [],
							i = 0;
						if ("utf-8" === n)
							for (; i < e.byteLength;) {
								var a = e.getUint8(i++);
								a < 128 || (a < 224 ? a = (31 & a) << 6 : (a < 240 ? a = (15 & a) << 12 : (a = (7 & a) << 18, a |= (63 & e.getUint8(i++)) << 12), a |= (63 & e.getUint8(i++)) << 6), a |= 63 & e.getUint8(i++)), r.push(String.fromCharCode(a))
						}
						else
							for (; i < e.byteLength;) r.push(String.fromCharCode(e.getUint8(i++)));
						return r.join("")
					}, i.Utils.utf8ToByteArray = function(e) {
						var t,
							n;
						if ("undefined" != typeof TextEncoder)
							t = (new TextEncoder).encode(e);else
							for (t = [], n = 0; n < e.length; ++n) {
								var r = e.charCodeAt(n);
								r < 128 ? t.push(r) : (r < 2048 ? t.push(192 | r >> 6) : (r < 65536 ? t.push(224 | r >> 12) : (t.push(240 | r >> 18), t.push(128 | 63 & r >> 12)), t.push(128 | 63 & r >> 6)), t.push(128 | 63 & r))
						}
						return t
					}, i.Utils.appendBox = function(e, t, n) {
						if (t._offset = e._cursor.offset, t._root = e._root ? e._root : e, t._raw = e._raw, t._parent = e, -1 !== n) {
							if (null == n) return void e.boxes.push(t);
							var r,
								i = -1;
							if ("number" == typeof n)
								i = n;else {
								if ("string" == typeof n)
									r = n;else {
									if ("object" != Fe(n) || !n.type) return void e.boxes.push(t);
									r = n.type
								}
								for (var a = 0; a < e.boxes.length; a++)
									if (r === e.boxes[a].type) {
										i = a + 1;break
								}
							}
							e.boxes.splice(i, 0, t)
						}
					}, void 0 !== n && (n.parseBuffer = i.parseBuffer, n.addBoxProcessor = i.addBoxProcessor, n.createFile = i.createFile, n.createBox = i.createBox, n.createFullBox = i.createFullBox, n.Utils = i.Utils), i.Cursor = function(e) {
						this.offset = void 0 === e ? 0 : e
					};
					var a = function(e) {
						this._cursor = new i.Cursor, this.boxes = [], e && (this._raw = new DataView(e))
					};
					a.prototype.fetch = function(e) {
						var t = this.fetchAll(e, !0);
						return t.length ? t[0] : null
					}, a.prototype.fetchAll = function(e, t) {
						var n = [];
						return a._sweep.call(this, e, n, t), n
					}, a.prototype.parse = function() {
						for (this._cursor.offset = 0, this.boxes = []; this._cursor.offset < this._raw.byteLength;) {
							var e = o.parse(this);
							if (void 0 === e.type) break;
							this.boxes.push(e)
						}
						return this
					}, a._sweep = function(e, t, n) {
						for (var r in this.type && this.type == e && t.push(this), this.boxes) {
							if (t.length && n) return;
							a._sweep.call(this.boxes[r], e, t, n)
						}
					}, a.prototype.write = function() {
						var e,
							t = 0;
						for (e = 0; e < this.boxes.length; e++) t += this.boxes[e].getLength(!1);
						var n = new Uint8Array(t);
						for (this._rawo = new DataView(n.buffer), this.bytes = n, e = this._cursor.offset = 0; e < this.boxes.length; e++) this.boxes[e].write();
						return n.buffer
					}, a.prototype.append = function(e, t) {
						i.Utils.appendBox(this, e, t)
					};
					var o = function() {
						this._cursor = new i.Cursor
					};
					o.parse = function(e) {
						var t = new o;
						return t._offset = e._cursor.offset, t._root = e._root ? e._root : e, t._raw = e._raw, t._parent = e, t._parseBox(), e._cursor.offset = t._raw.byteOffset + t._raw.byteLength, t
					}, o.create = function(e) {
						var t = new o;
						return t.type = e, t.boxes = [], t
					}, o.prototype._boxContainers = [ "dinf", "edts", "mdia", "meco", "mfra", "minf", "moof", "moov", "mvex", "stbl", "strk", "traf", "trak", "tref", "udta", "vttc", "sinf", "schi", "encv", "enca" ], o.prototype._boxProcessors = {}, o.prototype._procField = function(e, t, n) {
						this._parsing ? this[e] = this._readField(t, n) : this._writeField(t, n, this[e])
					}, o.prototype._procFieldArray = function(e, t, n, r) {
						var i;
						if (this._parsing)
							for (this[e] = [], i = 0; i < t; i++) this[e][i] = this._readField(n, r);
						else
							for (i = 0; i < this[e].length; i++) this._writeField(n, r, this[e][i])
					}, o.prototype._procFullBox = function() {
						this._procField("version", "uint", 8), this._procField("flags", "uint", 24)
					}, o.prototype._procEntries = function(e, t, n) {
						var r;
						if (this._parsing)
							for (this[e] = [], r = 0; r < t; r++) this[e].push({}), n.call(this, this[e][r]);
						else
							for (r = 0; r < t; r++) n.call(this, this[e][r])
					}, o.prototype._procSubEntries = function(e, t, n, r) {
						var i;
						if (this._parsing)
							for (e[t] = [], i = 0; i < n; i++) e[t].push({}), r.call(this, e[t][i]);
						else
							for (i = 0; i < n; i++) r.call(this, e[t][i])
					}, o.prototype._procEntryField = function(e, t, n, r) {
						this._parsing ? e[t] = this._readField(n, r) : this._writeField(n, r, e[t])
					}, o.prototype._procSubBoxes = function(e, t) {
						var n;
						if (this._parsing)
							for (this[e] = [], n = 0; n < t; n++) this[e].push(o.parse(this));
						else
							for (n = 0; n < t; n++) this._rawo ? this[e][n].write() : this.size += this[e][n].getLength()
					}, o.prototype._readField = function(e, t) {
						switch (e) {
						case "uint":
							return this._readUint(t);case "int":
							return this._readInt(t);case "template":
							return this._readTemplate(t);case "string":
							return -1 === t ? this._readTerminatedString() : this._readString(t);case "data":
							return this._readData(t);case "utf8":
							return this._readUTF8String();default:
							return -1
						}
					}, o.prototype._readInt = function(e) {
						var t = null,
							n = this._cursor.offset - this._raw.byteOffset;
						switch (e) {
						case 8:
							t = this._raw.getInt8(n);
							break;case 16:
							t = this._raw.getInt16(n);
							break;case 32:
							t = this._raw.getInt32(n);
							break;case 64:
							var r = this._raw.getInt32(n),
								i = this._raw.getInt32(n + 4);
							t = r * Math.pow(2, 32) + i
						}
						return this._cursor.offset += e >> 3, t
					}, o.prototype._readUint = function(e) {
						var t,
							n,
							r = null,
							i = this._cursor.offset - this._raw.byteOffset;
						switch (e) {
						case 8:
							r = this._raw.getUint8(i);
							break;case 16:
							r = this._raw.getUint16(i);
							break;case 24:
							r = ((t = this._raw.getUint16(i)) << 8) + (n = this._raw.getUint8(i + 2));
							break;case 32:
							r = this._raw.getUint32(i);
							break;case 64:
							t = this._raw.getUint32(i), n = this._raw.getUint32(i + 4), r = t * Math.pow(2, 32) + n
						}
						return this._cursor.offset += e >> 3, r
					}, o.prototype._readString = function(e) {
						for (var t = "", n = 0; n < e; n++) {
							var r = this._readUint(8);
							t += String.fromCharCode(r)
						}
						return t
					}, o.prototype._readTemplate = function(e) {
						return this._readUint(e / 2) + this._readUint(e / 2) / Math.pow(2, e / 2)
					}, o.prototype._readTerminatedString = function() {
						for (var e = ""; this._cursor.offset - this._offset < this._raw.byteLength;) {
							var t = this._readUint(8);
							if (0 === t) break;
							e += String.fromCharCode(t)
						}
						return e
					}, o.prototype._readData = function(e) {
						var t = 0 < e ? e : this._raw.byteLength - (this._cursor.offset - this._offset);
						if (0 < t) {
							var n = new Uint8Array(this._raw.buffer, this._cursor.offset, t);
							return this._cursor.offset += t, n
						}
						return null
					}, o.prototype._readUTF8String = function() {
						var e = this._raw.byteLength - (this._cursor.offset - this._offset),
							t = null;
						return 0 < e && (t = new DataView(this._raw.buffer, this._cursor.offset, e), this._cursor.offset += e), t ? i.Utils.dataViewToString(t) : t
					}, o.prototype._parseBox = function() {
						if (this._parsing = !0, this._cursor.offset = this._offset, this._offset + 8 > this._raw.buffer.byteLength)
							this._root._incomplete = !0;else {
							switch (this._procField("size", "uint", 32), this._procField("type", "string", 4), 1 === this.size && this._procField("largesize", "uint", 64), "uuid" === this.type && this._procFieldArray("usertype", 16, "uint", 8), this.size) {
							case 0:
								this._raw = new DataView(this._raw.buffer, this._offset, this._raw.byteLength - this._cursor.offset + 8);
								break;case 1:
								this._offset + this.size > this._raw.buffer.byteLength ? (this._incomplete = !0, this._root._incomplete = !0) : this._raw = new DataView(this._raw.buffer, this._offset, this.largesize);
								break;default:
								this._offset + this.size > this._raw.buffer.byteLength ? (this._incomplete = !0, this._root._incomplete = !0) : this._raw = new DataView(this._raw.buffer, this._offset, this.size)
							}
							this._incomplete || (this._boxProcessors[this.type] && this._boxProcessors[this.type].call(this), -1 !== this._boxContainers.indexOf(this.type) ? this._parseContainerBox() : this._data = this._readData())
						}
					}, o.prototype._parseFullBox = function() {
						this.version = this._readUint(8), this.flags = this._readUint(24)
					}, o.prototype._parseContainerBox = function() {
						for (this.boxes = []; this._cursor.offset - this._raw.byteOffset < this._raw.byteLength;) this.boxes.push(o.parse(this))
					}, o.prototype.append = function(e, t) {
						i.Utils.appendBox(this, e, t)
					}, o.prototype.getLength = function() {
						if (this._parsing = !1, this._rawo = null, this.size = 0, this._procField("size", "uint", 32), this._procField("type", "string", 4), 1 === this.size && this._procField("largesize", "uint", 64), "uuid" === this.type && this._procFieldArray("usertype", 16, "uint", 8), this._boxProcessors[this.type] && this._boxProcessors[this.type].call(this), -1 !== this._boxContainers.indexOf(this.type))
							for (var e = 0; e < this.boxes.length; e++) this.size += this.boxes[e].getLength();
						return this._data && this._writeData(this._data), this.size
					}, o.prototype.write = function() {
						switch (this._parsing = !1, this._cursor.offset = this._parent._cursor.offset, this.size) {
						case 0:
							this._rawo = new DataView(this._parent._rawo.buffer, this._cursor.offset, this.parent._rawo.byteLength - this._cursor.offset);
							break;case 1:
							this._rawo = new DataView(this._parent._rawo.buffer, this._cursor.offset, this.largesize);
							break;default:
							this._rawo = new DataView(this._parent._rawo.buffer, this._cursor.offset, this.size)
						}
						if (this._procField("size", "uint", 32), this._procField("type", "string", 4), 1 === this.size && this._procField("largesize", "uint", 64), "uuid" === this.type && this._procFieldArray("usertype", 16, "uint", 8), this._boxProcessors[this.type] && this._boxProcessors[this.type].call(this), -1 !== this._boxContainers.indexOf(this.type))
							for (var e = 0; e < this.boxes.length; e++) this.boxes[e].write();
						return this._data && this._writeData(this._data), this._parent._cursor.offset += this.size, this.size
					}, o.prototype._writeInt = function(e, t) {
						if (this._rawo) {
							var n = this._cursor.offset - this._rawo.byteOffset;
							switch (e) {
							case 8:
								this._rawo.setInt8(n, t);
								break;case 16:
								this._rawo.setInt16(n, t);
								break;case 32:
								this._rawo.setInt32(n, t);
								break;case 64:
								var r = Math.floor(t / Math.pow(2, 32)),
									i = t - r * Math.pow(2, 32);
								this._rawo.setUint32(n, r), this._rawo.setUint32(n + 4, i)
							}
							this._cursor.offset += e >> 3
						} else
							this.size += e >> 3
					}, o.prototype._writeUint = function(e, t) {
						if (this._rawo) {
							var n,
								r,
								i = this._cursor.offset - this._rawo.byteOffset;
							switch (e) {
							case 8:
								this._rawo.setUint8(i, t);
								break;case 16:
								this._rawo.setUint16(i, t);
								break;case 24:
								n = (16776960 & t) >> 8, r = 255 & t, this._rawo.setUint16(i, n), this._rawo.setUint8(i + 2, r);
								break;case 32:
								this._rawo.setUint32(i, t);
								break;case 64:
								r = t - (n = Math.floor(t / Math.pow(2, 32))) * Math.pow(2, 32), this._rawo.setUint32(i, n), this._rawo.setUint32(i + 4, r)
							}
							this._cursor.offset += e >> 3
						} else
							this.size += e >> 3
					}, o.prototype._writeString = function(e, t) {
						for (var n = 0; n < e; n++) this._writeUint(8, t.charCodeAt(n))
					}, o.prototype._writeTerminatedString = function(e) {
						if (0 !== e.length) {
							for (var t = 0; t < e.length; t++) this._writeUint(8, e.charCodeAt(t));
							this._writeUint(8, 0)
						}
					}, o.prototype._writeTemplate = function(e, t) {
						var n = Math.floor(t),
							r = (t - n) * Math.pow(2, e / 2);
						this._writeUint(e / 2, n), this._writeUint(e / 2, r)
					}, o.prototype._writeData = function(e) {
						if (e)
							if (this._rawo) {
								if (e instanceof Array) {
									for (var t = this._cursor.offset - this._rawo.byteOffset, n = 0; n < e.length; n++) this._rawo.setInt8(t + n, e[n]);
									this._cursor.offset += e.length
								}
								e instanceof Uint8Array && (this._root.bytes.set(e, this._cursor.offset), this._cursor.offset += e.length)
							} else
								this.size += e.length
					}, o.prototype._writeUTF8String = function(e) {
						var t = i.Utils.utf8ToByteArray(e);
						if (this._rawo)
							for (var n = new DataView(this._rawo.buffer, this._cursor.offset, t.length), r = 0; r < t.length; r++) n.setUint8(r, t[r]);
						else
							this.size += t.length
					}, o.prototype._writeField = function(e, t, n) {
						switch (e) {
						case "uint":
							this._writeUint(t, n);
							break;case "int":
							this._writeInt(t, n);
							break;case "template":
							this._writeTemplate(t, n);
							break;case "string":
							-1 == t ? this._writeTerminatedString(n) : this._writeString(t, n);
							break;case "data":
							this._writeData(n);
							break;case "utf8":
							this._writeUTF8String(n)
						}
					}, o.prototype._boxProcessors.avc1 = o.prototype._boxProcessors.encv = function() {
						this._procFieldArray("reserved1", 6, "uint", 8), this._procField("data_reference_index", "uint", 16), this._procField("pre_defined1", "uint", 16), this._procField("reserved2", "uint", 16), this._procFieldArray("pre_defined2", 3, "uint", 32), this._procField("width", "uint", 16), this._procField("height", "uint", 16), this._procField("horizresolution", "template", 32), this._procField("vertresolution", "template", 32), this._procField("reserved3", "uint", 32), this._procField("frame_count", "uint", 16), this._procFieldArray("compressorname", 32, "uint", 8), this._procField("depth", "uint", 16), this._procField("pre_defined3", "int", 16), this._procField("config", "data", -1)
					}, o.prototype._boxProcessors.dref = function() {
						this._procFullBox(), this._procField("entry_count", "uint", 32), this._procSubBoxes("entries", this.entry_count)
					}, o.prototype._boxProcessors.elst = function() {
						this._procFullBox(), this._procField("entry_count", "uint", 32), this._procEntries("entries", this.entry_count, function(e) {
							this._procEntryField(e, "segment_duration", "uint", 1 === this.version ? 64 : 32), this._procEntryField(e, "media_time", "int", 1 === this.version ? 64 : 32), this._procEntryField(e, "media_rate_integer", "int", 16), this._procEntryField(e, "media_rate_fraction", "int", 16)
						})
					}, o.prototype._boxProcessors.emsg = function() {
						this._procFullBox(), this._procField("scheme_id_uri", "string", -1), this._procField("value", "string", -1), this._procField("timescale", "uint", 32), this._procField("presentation_time_delta", "uint", 32), this._procField("event_duration", "uint", 32), this._procField("id", "uint", 32), this._procField("message_data", "data", -1)
					}, o.prototype._boxProcessors.free = o.prototype._boxProcessors.skip = function() {
						this._procField("data", "data", -1)
					}, o.prototype._boxProcessors.frma = function() {
						this._procField("data_format", "uint", 32)
					}, o.prototype._boxProcessors.ftyp = o.prototype._boxProcessors.styp = function() {
						this._procField("major_brand", "string", 4), this._procField("minor_version", "uint", 32);
						var e = -1;
						this._parsing && (e = (this._raw.byteLength - (this._cursor.offset - this._raw.byteOffset)) / 4), this._procFieldArray("compatible_brands", e, "string", 4)
					}, o.prototype._boxProcessors.hdlr = function() {
						this._procFullBox(), this._procField("pre_defined", "uint", 32), this._procField("handler_type", "string", 4), this._procFieldArray("reserved", 3, "uint", 32), this._procField("name", "string", -1)
					}, o.prototype._boxProcessors.mdat = function() {
						this._procField("data", "data", -1)
					}, o.prototype._boxProcessors.mdhd = function() {
						this._procFullBox(), this._procField("creation_time", "uint", 1 == this.version ? 64 : 32), this._procField("modification_time", "uint", 1 == this.version ? 64 : 32), this._procField("timescale", "uint", 32), this._procField("duration", "uint", 1 == this.version ? 64 : 32), this._parsing || "string" != typeof this.language || (this.language = this.language.charCodeAt(0) - 96 << 10 | this.language.charCodeAt(1) - 96 << 5 | this.language.charCodeAt(2) - 96), this._procField("language", "uint", 16), this._parsing && (this.language = String.fromCharCode(96 + (this.language >> 10 & 31), 96 + (this.language >> 5 & 31), 96 + (31 & this.language))), this._procField("pre_defined", "uint", 16)
					}, o.prototype._boxProcessors.mehd = function() {
						this._procFullBox(), this._procField("fragment_duration", "uint", 1 == this.version ? 64 : 32)
					}, o.prototype._boxProcessors.mfhd = function() {
						this._procFullBox(), this._procField("sequence_number", "uint", 32)
					}, o.prototype._boxProcessors.mfro = function() {
						this._procFullBox(), this._procField("mfra_size", "uint", 32)
					}, o.prototype._boxProcessors.mp4a = o.prototype._boxProcessors.enca = function() {
						this._procFieldArray("reserved1", 6, "uint", 8), this._procField("data_reference_index", "uint", 16), this._procFieldArray("reserved2", 2, "uint", 32), this._procField("channelcount", "uint", 16), this._procField("samplesize", "uint", 16), this._procField("pre_defined", "uint", 16), this._procField("reserved3", "uint", 16), this._procField("samplerate", "template", 32), this._procField("esds", "data", -1)
					}, o.prototype._boxProcessors.mvhd = function() {
						this._procFullBox(), this._procField("creation_time", "uint", 1 == this.version ? 64 : 32), this._procField("modification_time", "uint", 1 == this.version ? 64 : 32), this._procField("timescale", "uint", 32), this._procField("duration", "uint", 1 == this.version ? 64 : 32), this._procField("rate", "template", 32), this._procField("volume", "template", 16), this._procField("reserved1", "uint", 16), this._procFieldArray("reserved2", 2, "uint", 32), this._procFieldArray("matrix", 9, "template", 32), this._procFieldArray("pre_defined", 6, "uint", 32), this._procField("next_track_ID", "uint", 32)
					}, o.prototype._boxProcessors.payl = function() {
						this._procField("cue_text", "utf8")
					}, o.prototype._boxProcessors.pssh = function() {
						this._procFullBox(), this._procFieldArray("SystemID", 16, "uint", 8), this._procField("DataSize", "uint", 32), this._procFieldArray("Data", this.DataSize, "uint", 8)
					}, o.prototype._boxProcessors.schm = function() {
						this._procFullBox(), this._procField("scheme_type", "uint", 32), this._procField("scheme_version", "uint", 32), 1 & this.flags && this._procField("scheme_uri", "string", -1)
					}, o.prototype._boxProcessors.sdtp = function() {
						this._procFullBox();
						var e = -1;
						this._parsing && (e = this._raw.byteLength - (this._cursor.offset - this._raw.byteOffset)), this._procFieldArray("sample_dependency_table", e, "uint", 8)
					}, o.prototype._boxProcessors.sidx = function() {
						this._procFullBox(), this._procField("reference_ID", "uint", 32), this._procField("timescale", "uint", 32), this._procField("earliest_presentation_time", "uint", 1 == this.version ? 64 : 32), this._procField("first_offset", "uint", 1 == this.version ? 64 : 32), this._procField("reserved", "uint", 16), this._procField("reference_count", "uint", 16), this._procEntries("references", this.reference_count, function(e) {
							this._parsing || (e.reference = (1 & e.reference_type) << 31, e.reference |= 2147483647 & e.referenced_size, e.sap = (1 & e.starts_with_SAP) << 31, e.sap |= (3 & e.SAP_type) << 28, e.sap |= 268435455 & e.SAP_delta_time), this._procEntryField(e, "reference", "uint", 32), this._procEntryField(e, "subsegment_duration", "uint", 32), this._procEntryField(e, "sap", "uint", 32), this._parsing && (e.reference_type = e.reference >> 31 & 1, e.referenced_size = 2147483647 & e.reference, e.starts_with_SAP = e.sap >> 31 & 1, e.SAP_type = e.sap >> 28 & 7, e.SAP_delta_time = 268435455 & e.sap)
						})
					}, o.prototype._boxProcessors.smhd = function() {
						this._procFullBox(), this._procField("balance", "uint", 16), this._procField("reserved", "uint", 16)
					}, o.prototype._boxProcessors.ssix = function() {
						this._procFullBox(), this._procField("subsegment_count", "uint", 32), this._procEntries("subsegments", this.subsegment_count, function(e) {
							this._procEntryField(e, "ranges_count", "uint", 32), this._procSubEntries(e, "ranges", e.ranges_count, function(e) {
								this._procEntryField(e, "level", "uint", 8), this._procEntryField(e, "range_size", "uint", 24)
							})
						})
					}, o.prototype._boxProcessors.stsd = function() {
						this._procFullBox(), this._procField("entry_count", "uint", 32), this._procSubBoxes("entries", this.entry_count)
					}, o.prototype._boxProcessors.subs = function() {
						this._procFullBox(), this._procField("entry_count", "uint", 32), this._procEntries("entries", this.entry_count, function(e) {
							this._procEntryField(e, "sample_delta", "uint", 32), this._procEntryField(e, "subsample_count", "uint", 16), this._procSubEntries(e, "subsamples", e.subsample_count, function(e) {
								this._procEntryField(e, "subsample_size", "uint", 1 === this.version ? 32 : 16), this._procEntryField(e, "subsample_priority", "uint", 8), this._procEntryField(e, "discardable", "uint", 8), this._procEntryField(e, "codec_specific_parameters", "uint", 32)
							})
						})
					}, o.prototype._boxProcessors.tenc = function() {
						this._procFullBox(), this._procField("default_IsEncrypted", "uint", 24), this._procField("default_IV_size", "uint", 8), this._procFieldArray("default_KID", 16, "uint", 8)
					}, o.prototype._boxProcessors.tfdt = function() {
						this._procFullBox(), this._procField("baseMediaDecodeTime", "uint", 1 == this.version ? 64 : 32)
					}, o.prototype._boxProcessors.tfhd = function() {
						this._procFullBox(), this._procField("track_ID", "uint", 32), 1 & this.flags && this._procField("base_data_offset", "uint", 64), 2 & this.flags && this._procField("sample_description_offset", "uint", 32), 8 & this.flags && this._procField("default_sample_duration", "uint", 32), 16 & this.flags && this._procField("default_sample_size", "uint", 32), 32 & this.flags && this._procField("default_sample_flags", "uint", 32)
					}, o.prototype._boxProcessors.tfra = function() {
						this._procFullBox(), this._procField("track_ID", "uint", 32), this._parsing || (this.reserved = 0, this.reserved |= (48 & this.length_size_of_traf_num) << 4, this.reserved |= (12 & this.length_size_of_trun_num) << 2, this.reserved |= 3 & this.length_size_of_sample_num), this._procField("reserved", "uint", 32), this._parsing && (this.length_size_of_traf_num = (48 & this.reserved) >> 4, this.length_size_of_trun_num = (12 & this.reserved) >> 2, this.length_size_of_sample_num = 3 & this.reserved), this._procField("number_of_entry", "uint", 32), this._procEntries("entries", this.number_of_entry, function(e) {
							this._procEntryField(e, "time", "uint", 1 === this.version ? 64 : 32), this._procEntryField(e, "moof_offset", "uint", 1 === this.version ? 64 : 32), this._procEntryField(e, "traf_number", "uint", 8 * (this.length_size_of_traf_num + 1)), this._procEntryField(e, "trun_number", "uint", 8 * (this.length_size_of_trun_num + 1)), this._procEntryField(e, "sample_number", "uint", 8 * (this.length_size_of_sample_num + 1))
						})
					}, o.prototype._boxProcessors.tkhd = function() {
						this._procFullBox(), this._procField("creation_time", "uint", 1 == this.version ? 64 : 32), this._procField("modification_time", "uint", 1 == this.version ? 64 : 32), this._procField("track_ID", "uint", 32), this._procField("reserved1", "uint", 32), this._procField("duration", "uint", 1 == this.version ? 64 : 32), this._procFieldArray("reserved2", 2, "uint", 32), this._procField("layer", "uint", 16), this._procField("alternate_group", "uint", 16), this._procField("volume", "template", 16), this._procField("reserved3", "uint", 16), this._procFieldArray("matrix", 9, "template", 32), this._procField("width", "template", 32), this._procField("height", "template", 32)
					}, o.prototype._boxProcessors.trex = function() {
						this._procFullBox(), this._procField("track_ID", "uint", 32), this._procField("default_sample_description_index", "uint", 32), this._procField("default_sample_duration", "uint", 32), this._procField("default_sample_size", "uint", 32), this._procField("default_sample_flags", "uint", 32)
					}, o.prototype._boxProcessors.trun = function() {
						this._procFullBox(), this._procField("sample_count", "uint", 32), 1 & this.flags && this._procField("data_offset", "int", 32), 4 & this.flags && this._procField("first_sample_flags", "uint", 32), this._procEntries("samples", this.sample_count, function(e) {
							256 & this.flags && this._procEntryField(e, "sample_duration", "uint", 32), 512 & this.flags && this._procEntryField(e, "sample_size", "uint", 32), 1024 & this.flags && this._procEntryField(e, "sample_flags", "uint", 32), 2048 & this.flags && this._procEntryField(e, "sample_composition_time_offset", 1 === this.version ? "int" : "uint", 32)
						})
					}, o.prototype._boxProcessors["url "] = o.prototype._boxProcessors["urn "] = function() {
						this._procFullBox(), "urn " === this.type && this._procField("name", "string", -1), this._procField("location", "string", -1)
					}, o.prototype._boxProcessors.vlab = function() {
						this._procField("source_label", "utf8")
					}, o.prototype._boxProcessors.vmhd = function() {
						this._procFullBox(), this._procField("graphicsmode", "uint", 16), this._procFieldArray("opcolor", 3, "uint", 16)
					}, o.prototype._boxProcessors.vttC = function() {
						this._procField("config", "utf8")
					}, o.prototype._boxProcessors.vtte = function() {}
				}, {} ],
				6 : [ function(e, t, n) {
					"use strict";
					var h = Array.isArray,
						p = Object.keys,
						g = Object.prototype.hasOwnProperty;
					t.exports = function e(t, n) {
						if (t === n) return !0;
						var r,
							i,
							a,
							o = h(t),
							s = h(n);
						if (o && s) {
							if ((i = t.length) != n.length) return !1;
							for (r = 0; r < i; r++)
								if (!e(t[r], n[r])) return !1;
							return !0
						}
						if (o != s) return !1;
						var u = t instanceof Date,
							l = n instanceof Date;
						if (u != l) return !1;
						if (u && l) return t.getTime() == n.getTime();
						var d = t instanceof RegExp,
							f = n instanceof RegExp;
						if (d != f) return !1;
						if (d && f) return t.toString() == n.toString();
						if (t instanceof Object && n instanceof Object) {
							var c = p(t);
							if ((i = c.length) !== p(n).length) return !1;
							for (r = 0; r < i; r++)
								if (!g.call(n, c[r])) return !1;
							for (r = 0; r < i; r++)
								if (!e(t[a = c[r]], n[a])) return !1;
							return !0
						}
						return !1
					}
				}, {} ],
				7 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						var e,
							t = this.context,
							n = (0, s.default)(t).getInstance(),
							r = void 0,
							i = void 0,
							a = void 0,
							o = void 0;
						return e = {
								log : function() {
									var t = "",
										e = null;
									i && (e = (new Date).getTime(), t += "[" + (e - o) + "]"), a && this && this.getClassName && (t += "[" + this.getClassName() + "]", this.getType && (t += "[" + this.getType() + "]")), 0 < t.length && (t += " "), Array.apply(null, arguments).forEach(function(e) {
										t += e + " "
									}), n.trigger(u.default.LOG, {
										message : t
									})
								},
								setLogTimestampVisible : function(e) {
									i = e
								},
								setCalleeNameVisible : function(e) {
									a = e
								},
								setLogToBrowserConsole : function(e) {
									r = e
								},
								getLogToBrowserConsole : function() {
									return r
								}
							}, a = !(i = r = !0), o = (new Date).getTime(), e
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var s = r(e(8)),
						u = r(e(12)),
						a = r(e(9));
					i.__dashjs_factory_name = "Debug", n.default = a.default.getSingletonFactory(i), t.exports = n.default
				}, {
					12 : 12,
					8 : 8,
					9 : 9
				} ],
				8 : [ function(e, t, n) {
					"use strict";
					function r() {
						function a(e, n, r) {
							var i = -1;
							return o[e] && o[e].some(function(e, t) {
									if (e && e.callback === n && (!r || r === e.scope)) return i = t, !0
								}), i
						}
						var o = {};
						return {
							on : function(n, e, t) {
								var r = arguments.length <= 3 || void 0 === arguments[3] ? 0 : arguments[3];
								if (!n)
									throw new Error("event type cannot be null or undefined");
								if (!e || "function" != typeof e)
									throw new Error("listener must be a function: " + e);
								if (!(0 <= a(n, e, t))) {
									o[n] = o[n] || [];
									var i = {
										callback : e,
										scope : t,
										priority : r
									};
									o[n].some(function(e, t) {
										if (e && r > e.priority) return o[n].splice(t, 0, i), !0
									}) || o[n].push(i)
								}
							},
							off : function(e, t, n) {
								if (e && t && o[e]) {
									var r = a(e, t, n);
									r < 0 || (o[e][r] = null)
								}
							},
							trigger : function(e, t) {
								if (e && o[e]) {
									if ((t = t || {}).hasOwnProperty("type"))
										throw new Error("'type' is a reserved word for event dispatching");
									t.type = e, o[e] = o[e].filter(function(e) {
										return e
									}), o[e].forEach(function(e) {
										return e && e.callback.call(e.scope, t)
									})
								}
							},
							reset : function() {
								o = {}
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i,
						a = e(9),
						o = (i = a) && i.__esModule ? i : {
							default : i
						};
					r.__dashjs_factory_name = "EventBus";
					var s = o.default.getSingletonFactory(r);
					s.EVENT_PRIORITY_LOW = 0, s.EVENT_PRIORITY_HIGH = 5e3, o.default.updateSingletonFactory(r.__dashjs_factory_name, s), n.default = s, t.exports = n.default
				}, {
					9 : 9
				} ],
				9 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
						function r(e, t) {
							for (var n in o) {
								var r = o[n];
								if (r.context === e && r.name === t) return r.instance
							}
							return null
						}
						function i(e, t) {
							return t[e]
						}
						function n(e, t, n) {
							e in n && (n[e] = t)
						}
						function a(e, t, n) {
							var r = void 0,
								i = e.__dashjs_factory_name,
								a = t[i];
							if (a) {
								var o = a.instance;
								if (!a.override) return o.apply({
										context : t,
										factory : u
									}, n);
								for (var s in r = e.apply({
										context : t
									}, n), o = o.apply({
										context : t,
										factory : u,
										parent : r
									}, n)) r.hasOwnProperty(s) && (r[s] = o[s])
							} else
								r = e.apply({
									context : t
								}, n);
							return r.getClassName = function() {
									return i
								}, r
						}
						var u = void 0,
							o = [],
							s = {},
							l = {};
						return u = {
							extend : function(e, t, n, r) {
								!r[e] && t && (r[e] = {
									instance : t,
									override : n
								})
							},
							getSingletonInstance : r,
							setSingletonInstance : function(e, t, n) {
								for (var r in o) {
									var i = o[r];
									if (i.context === e && i.name === t) return void (o[r].instance = n)
								}
								o.push({
									name : t,
									context : e,
									instance : n
								})
							},
							getSingletonFactory : function(n) {
								var e = i(n.__dashjs_factory_name, s);
								return e || (e = function(e) {
										var t = void 0;
										return void 0 === e && (e = {}), {
												getInstance : function() {
													return t || (t = r(e, n.__dashjs_factory_name)), t || (t = a(n, e, arguments), o.push({
															name : n.__dashjs_factory_name,
															context : e,
															instance : t
														})), t
												}
										}
									}, s[n.__dashjs_factory_name] = e), e
							},
							getSingletonFactoryByName : function(e) {
								return i(e, s)
							},
							updateSingletonFactory : function(e, t) {
								n(e, t, s)
							},
							getClassFactory : function(t) {
								var e = i(t.__dashjs_factory_name, l);
								return e || (e = function(e) {
										return void 0 === e && (e = {}), {
												create : function() {
													return a(t, e, arguments)
												}
										}
									}, l[t.__dashjs_factory_name] = e), e
							},
							getClassFactoryByName : function(e) {
								return i(e, l)
							},
							updateClassFactory : function(e, t) {
								n(e, t, l)
							}
						}
					}();
					n.default = r, t.exports = n.default
				}, {} ],
				10 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					}), n.getVersionString = function() {
						return r
					};
					var r = "2.7.0"
				}, {} ],
				11 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r,
						i = e(13),
						a = (r = i) && r.__esModule ? r : {
							default : r
						},
						o = function(e) {
							function t() {
								(function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								})(this, t), function(e, t, n) {
									for (var r = !0; r;) {
										var i = e,
											a = t,
											o = n;
										r = !1, null === i && (i = Function.prototype);var s = Object.getOwnPropertyDescriptor(i, a);
										if (void 0 !== s) {
											if ("value" in s) return s.value;
											var u = s.get;
											if (void 0 === u) return;
											return u.call(o)
										}
										var l = Object.getPrototypeOf(i);
										if (null === l) return;
										e = l, t = a, n = o, r = !0, s = l = void 0
									}
								}(Object.getPrototypeOf(t.prototype), "constructor", this).call(this), this.BUFFERING_COMPLETED = "bufferingCompleted", this.BUFFER_CLEARED = "bufferCleared", this.BUFFER_LEVEL_UPDATED = "bufferLevelUpdated", this.BYTES_APPENDED = "bytesAppended", this.BYTES_APPENDED_END_FRAGMENT = "bytesAppendedEndFragment", this.CHECK_FOR_EXISTENCE_COMPLETED = "checkForExistenceCompleted", this.CURRENT_TRACK_CHANGED = "currentTrackChanged", this.DATA_UPDATE_COMPLETED = "dataUpdateCompleted", this.DATA_UPDATE_STARTED = "dataUpdateStarted", this.INITIALIZATION_LOADED = "initializationLoaded", this.INIT_FRAGMENT_LOADED = "initFragmentLoaded", this.INIT_REQUESTED = "initRequested", this.INTERNAL_MANIFEST_LOADED = "internalManifestLoaded", this.LIVE_EDGE_SEARCH_COMPLETED = "liveEdgeSearchCompleted", this.LOADING_COMPLETED = "loadingCompleted", this.LOADING_PROGRESS = "loadingProgress", this.LOADING_DATA_PROGRESS = "loadingDataProgress", this.LOADING_ABANDONED = "loadingAborted", this.MANIFEST_UPDATED = "manifestUpdated", this.MEDIA_FRAGMENT_LOADED = "mediaFragmentLoaded", this.QUOTA_EXCEEDED = "quotaExceeded", this.REPRESENTATION_UPDATED = "representationUpdated", this.SEGMENTS_LOADED = "segmentsLoaded", this.SERVICE_LOCATION_BLACKLIST_ADD = "serviceLocationBlacklistAdd", this.SERVICE_LOCATION_BLACKLIST_CHANGED = "serviceLocationBlacklistChanged", this.SOURCEBUFFER_REMOVE_COMPLETED = "sourceBufferRemoveCompleted", this.STREAMS_COMPOSED = "streamsComposed", this.STREAM_BUFFERING_COMPLETED = "streamBufferingCompleted", this.STREAM_COMPLETED = "streamCompleted", this.TEXT_TRACKS_QUEUE_INITIALIZED = "textTracksQueueInitialized", this.TIMED_TEXT_REQUESTED = "timedTextRequested", this.TIME_SYNCHRONIZATION_COMPLETED = "timeSynchronizationComplete", this.URL_RESOLUTION_FAILED = "urlResolutionFailed", this.VIDEO_CHUNK_RECEIVED = "videoChunkReceived", this.WALLCLOCK_TIME_UPDATED = "wallclockTimeUpdated", this.XLINK_ELEMENT_LOADED = "xlinkElementLoaded", this.XLINK_READY = "xlinkReady", this.REQUEST_RETRYED = "requestRetryed"
							}
							return function(e, t) {
									if ("function" != typeof t && null !== t)
										throw new TypeError("Super expression must either be null or a function, not " + Fe(t));
									e.prototype = Object.create(t && t.prototype, {
										constructor : {
											value : e,
											enumerable : !1,
											writable : !0,
											configurable : !0
										}
									}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
								}(t, a.default), t
						}();
					n.default = o, t.exports = n.default
				}, {
					13 : 13
				} ],
				12 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r,
						i = e(11),
						a = (r = i) && r.__esModule ? r : {
							default : r
						},
						o = new (function(e) {
							function t() {
								(function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								})(this, t), function(e, t, n) {
									for (var r = !0; r;) {
										var i = e,
											a = t,
											o = n;
										r = !1, null === i && (i = Function.prototype);var s = Object.getOwnPropertyDescriptor(i, a);
										if (void 0 !== s) {
											if ("value" in s) return s.value;
											var u = s.get;
											if (void 0 === u) return;
											return u.call(o)
										}
										var l = Object.getPrototypeOf(i);
										if (null === l) return;
										e = l, t = a, n = o, r = !0, s = l = void 0
									}
								}(Object.getPrototypeOf(t.prototype), "constructor", this).apply(this, arguments)
							}
							return function(e, t) {
									if ("function" != typeof t && null !== t)
										throw new TypeError("Super expression must either be null or a function, not " + Fe(t));
									e.prototype = Object.create(t && t.prototype, {
										constructor : {
											value : e,
											enumerable : !1,
											writable : !0,
											configurable : !0
										}
									}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
								}(t, a.default), t
						}());
					n.default = o, t.exports = n.default
				}, {
					11 : 11
				} ],
				13 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						i = function() {
							function e() {
								!function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								}(this, e)
							}
							return r(e, [ {
									key : "extend",
									value : function(e, t) {
										if (e) {
											var n = !!t && t.override,
												r = !!t && t.publicOnly;
											for (var i in e) !e.hasOwnProperty(i) || this[i] && !n || r && -1 === e[i].indexOf("public_") || (this[i] = e[i])
										}
									}
								} ]), e
						}();
					n.default = i, t.exports = n.default
				}, {} ],
				14 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						function o(e, t) {
							return t && e ? t.getRepresentationForQuality(e.quality) : null
						}
						function s(e) {
							return e && e.streamInfo && void 0 !== e.streamInfo.id && S[e.streamInfo.id] ? S[e.streamInfo.id][e.index] : null
						}
						function y(e, t) {
							for (var n = t.length, r = 0; r < n; r++) {
								var i = t[r];
								if (e.id === i.id) return i
							}
							return null
						}
						function r(e) {
							var t = new d.default,
								n = e.adaptation.period.mpd.manifest.Period_asArray[e.adaptation.period.index].AdaptationSet_asArray[e.adaptation.index],
								r = R.getRepresentationFor(e.index, n);
							return t.id = e.id, t.quality = e.index, t.bandwidth = R.getBandwidth(r), t.DVRWindow = e.segmentAvailabilityRange, t.fragmentDuration = e.segmentDuration || (e.segments && 0 < e.segments.length ? e.segments[0].duration : NaN), t.MSETimeOffset = e.MSETimeOffset, t.useCalculatedLiveEdgeTime = e.useCalculatedLiveEdgeTime, t.mediaInfo = E(e.adaptation), t
						}
						function E(e) {
							var t,
								r = new f.default,
								n = e.period.mpd.manifest.Period_asArray[e.period.index].AdaptationSet_asArray[e.index];
							return r.id = e.id, r.index = e.index, r.type = e.type, r.streamInfo = u(e.period), r.representationCount = R.getRepresentationCount(n), r.lang = R.getLanguageForAdaptation(n), t = R.getViewpointForAdaptation(n), r.viewpoint = t ? t.value : void 0, r.accessibility = R.getAccessibilityForAdaptation(n).map(function(e) {
									var t = e.value,
										n = t;
									return e.schemeIdUri && 0 <= e.schemeIdUri.search("cea-608") && void 0 !== g.default && (n = t ? "cea-608:" + t : "cea-608", r.embeddedCaptions = !0), n
								}), r.audioChannelConfiguration = R.getAudioChannelConfigurationForAdaptation(n).map(function(e) {
									return e.value
								}), r.roles = R.getRolesForAdaptation(n).map(function(e) {
									return e.value
								}), r.codec = R.getCodec(n), r.mimeType = R.getMimeType(n), r.contentProtection = R.getContentProtectionData(n), r.bitrateList = R.getBitrateListForAdaptation(n), r.contentProtection && r.contentProtection.forEach(function(e) {
									e.KID = R.getKID(e)
								}), r.isText = R.getIsTextTrack(r.mimeType), r
						}
						function A(e, t, n) {
							e.id = t, e.index = 100 + parseInt(t.substring(2, 3)), e.type = b.default.EMBEDDED_TEXT, e.codec = "cea-608-in-SEI", e.isText = !0, e.isEmbedded = !0, e.lang = n, e.roles = [ "caption" ]
						}
						function u(e) {
							var t,
								n,
								r = new c.default;
							return r.id = e.id, r.index = e.index, r.start = e.start, r.duration = e.duration, r.manifestInfo = (t = e.mpd, (n = new h.default).DVRWindowSize = t.timeShiftBufferDepth, n.loadedTime = t.manifest.loadedTime, n.availableFrom = t.availabilityStartTime, n.minBufferTime = t.manifest.minBufferTime, n.maxFragmentDuration = t.maxSegmentDuration, n.duration = R.getDuration(t.manifest), n.isDynamic = R.getIsDynamic(t.manifest), n), r.isLast = 1 === e.mpd.manifest.Period_asArray.length || Math.abs(r.start + r.duration - r.manifestInfo.duration) < 1, r
						}
						function T() {
							if (!R || !R.hasOwnProperty("getMpd") || !R.hasOwnProperty("getRegularPeriods"))
								throw new Error("setConfig function has to be called previously")
						}
						function l(e) {
							if (!(e && e.hasOwnProperty("getRepresentationController") && e.hasOwnProperty("getIndexHandler") && e.hasOwnProperty("getMediaInfo") && e.hasOwnProperty("getType") && e.hasOwnProperty("getStreamInfo")))
								throw new Error("streamProcessor parameter is missing or malformed!")
						}
						function i(e) {
							if (!e || !e.hasOwnProperty("getRepresentationForQuality") || !e.hasOwnProperty("getCurrentRepresentation"))
								throw new Error("representationController parameter is missing or malformed!")
						}
						function a(e) {
							if (null === e || isNaN(e) || e % 1 != 0)
								throw new Error("quality argument is not an integer")
						}
						function e() {
							I = [], S = {}
						}
						var t,
							R = void 0,
							I = void 0,
							S = void 0;
						return t = {
								convertDataToRepresentationInfo : r,
								getDataForMedia : s,
								getStreamsInfo : function(e, t) {
									var n = [],
										r = I;
									if (e) {
										T();
										var i = R.getMpd(e);
										r = R.getRegularPeriods(i)
									}
									t || (t = r.length);
									for (var a = 0; a < t; a++) n.push(u(r[a]));
									return n
								},
								getMediaInfoForType : function(e, t) {
									if (0 === I.length) return null;
									var n = I[0].mpd.manifest,
										r = R.getAdaptationForType(n, e.index, t, e);
									if (!r) return null;
									var i = y(e, I),
										a = i.id,
										o = R.getIndexForAdaptation(r, n, e.index);
									return S[a] = S[a] || R.getAdaptationsForPeriod(i), E(S[a][o])
								},
								getAllMediaInfoForType : function(e, t, n) {
									var r,
										i = I,
										a = n,
										o = [],
										s = void 0,
										u = void 0,
										l = void 0,
										d = void 0,
										f = void 0;
									if (a) {
										T();
										var c = R.getMpd(a);
										i = R.getRegularPeriods(c)
									} else {
										if (!(0 < I.length)) return o;
										a = I[0].mpd.manifest
									}
									var h = y(e, i),
										p = h.id,
										g = R.getAdaptationsForType(a, e.index, t !== b.default.EMBEDDED_TEXT ? t : b.default.VIDEO);
									if (!g) return o;
									for (S[p] = S[p] || R.getAdaptationsForPeriod(h), d = 0, r = g.length; d < r; d++)
										if (s = g[d], l = R.getIndexForAdaptation(s, a, e.index), u = E(S[p][l]), t === b.default.EMBEDDED_TEXT) {
											var m = u.accessibility.length;
											for (f = 0; f < m; f++)
												if (u) {
													var _ = u.accessibility[f];
													if (0 === _.indexOf("cea-608:")) {
														var v = _.substring(8).split(";");
														if ("CC" === v[0].substring(0, 2))
															for (f = 0; f < v.length; f++) u || (u = E.call(this, S[p][l])), A(u, v[f].substring(0, 3), v[f].substring(4)), o.push(u), u = null;
														else
															for (f = 0; f < v.length; f++) u || (u = E.call(this, S[p][l])), A(u, "CC" + (f + 1), v[f]), o.push(u), u = null
													} else 0 === _.indexOf("cea-608") && (A(u, b.default.CC1, "eng"), o.push(u), u = null)
											}
										} else
											t === b.default.IMAGE ? (u.type = b.default.IMAGE, o.push(u), u = null) : u && o.push(u);
									return o
								},
								getCurrentRepresentationInfo : function(e) {
									i(e);
									var t = e.getCurrentRepresentation();
									return t ? r(t) : null
								},
								getRepresentationInfoForQuality : function(e, t) {
									i(e), a(t);
									var n = e.getRepresentationForQuality(t);
									return n ? r(n) : null
								},
								updateData : function(e) {
									l(e);
									var t,
										n = y(e.getStreamInfo(), I),
										r = e.getMediaInfo(),
										i = s(r),
										a = e.getType(),
										o = void 0;
									t = r ? r.id : null, 0 < I.length && (o = t ? R.getAdaptationForId(t, I[0].mpd.manifest, n.index) : R.getAdaptationForIndex(r.index, I[0].mpd.manifest, n.index), e.getRepresentationController().updateData(o, i, a))
								},
								getInitRequest : function(e, t) {
									var n,
										r = void 0,
										i = void 0;
									return l(e), a(t), r = e.getRepresentationController(), i = e.getIndexHandler(), n = r ? r.getRepresentationForQuality(t) : null, i ? i.getInitRequest(n) : null
								},
								getNextFragmentRequest : function(e, t) {
									var n,
										r = void 0;
									return l(e), n = o(t, e.getRepresentationController()), (r = e.getIndexHandler()) ? r.getNextSegmentRequest(n) : null
								},
								getFragmentRequestForTime : function(e, t, n, r) {
									var i,
										a = void 0;
									return l(e), i = o(t, e.getRepresentationController()), (a = e.getIndexHandler()) ? a.getSegmentRequestForTime(i, n, r) : null
								},
								generateFragmentRequestForTime : function(e, t, n) {
									var r,
										i = void 0;
									return l(e), r = o(t, e.getRepresentationController()), (i = e.getIndexHandler()) ? i.generateSegmentRequestForTime(r, n) : null
								},
								getIndexHandlerTime : function(e) {
									l(e);
									var t = e.getIndexHandler();
									return t ? t.getCurrentTime() : NaN
								},
								setIndexHandlerTime : function(e, t) {
									l(e);
									var n = e.getIndexHandler();
									n && n.setCurrentTime(t)
								},
								getEventsFor : function(e, t) {
									var n = [];
									if (0 === I.length) return n;
									var r = I[0].mpd.manifest;
									return e instanceof c.default ? n = R.getEventsForPeriod(y(e, I)) : e instanceof f.default ? n = R.getEventStreamForAdaptationSet(r, s(e)) : e instanceof d.default && (n = R.getEventStreamForRepresentation(r, o(e, t.getRepresentationController()))), n
								},
								getEvent : function(e, t, n) {
									if (!e || !t) return null;
									var r = new p.default,
										i = e.scheme_id_uri,
										a = e.value,
										o = e.timescale,
										s = e.presentation_time_delta,
										u = e.event_duration,
										l = e.id,
										d = e.message_data,
										f = n * o + s;
									return t[i] ? (r.eventStream = t[i], r.eventStream.value = a, r.eventStream.timescale = o, r.duration = u, r.id = l, r.presentationTime = f, r.messageData = d, r.presentationTimeDelta = s, r) : null
								},
								setConfig : function(e) {
									e && e.dashManifestModel && (R = e.dashManifestModel)
								},
								updatePeriods : function(e) {
									if (!e) return null;
									T();
									var t = R.getMpd(e);
									I = R.getRegularPeriods(t), S = {}
								},
								reset : e
							}, e(), t
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var b = r(e(59)),
						d = r(e(121)),
						f = r(e(119)),
						c = r(e(122)),
						h = r(e(118)),
						p = r(e(42)),
						a = r(e(9)),
						g = r(e(2));
					i.__dashjs_factory_name = "DashAdapter", n.default = a.default.getSingletonFactory(i), t.exports = n.default
				}, {
					118 : 118,
					119 : 119,
					121 : 121,
					122 : 122,
					2 : 2,
					42 : 42,
					59 : 59,
					9 : 9
				} ],
				15 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(n) {
						function e() {
							I = -1, b = 0, w = NaN, D = C = S = null
						}
						function o(e, t, n) {
							var r = A.resolve(n.path),
								i = void 0,
								a = void 0,
								o = void 0;
							return r && t !== r.url && u.isRelative(t) ? (i = r.url, a = r.urls || [], o = r.serviceLocation, t && (i = u.resolve(t, i))) : a = [ i = t ], !u.isRelative(i) && (e.url = i, e.urls = a, e.serviceLocation = o, !0)
						}
						function d(e) {
							var t = !1,
								n = C ? C.getStreamInfo().manifestInfo.isDynamic : null;
							if (n || I !== e.availableSegmentsNumber) {
								var r = (0, Q.getSegmentByIndex)(I, e);
								if (r) {
									var i = parseFloat((r.presentationStartTime - e.adaptation.period.start).toFixed(5)),
										a = e.adaptation.period.duration;
									R(e.segmentInfoType + ": " + i + " / " + a), t = (e.segmentInfoType !== M.default.SEGMENT_TIMELINE || !n) && a <= i
								} else R("isMediaFinished - no segment found")
							} else
								t = !0;
							return t
						}
						function f(e) {
							D.getSegments(e, S, I, c)
						}
						function c(e, t) {
							var n = C ? C.getStreamInfo().manifestInfo.isDynamic : null;
							if ((e.segments = t) && 0 < t.length && (w = isNaN(w) ? t[0].presentationStartTime : Math.min(t[0].presentationStartTime, w), n && isNaN(m.getExpectedLiveEdge()))) {
								var r = t[t.length - 1].presentationStartTime,
									i = v.getMetricsFor(O.default.STREAM);
								m.setExpectedLiveEdge(r), v.updateManifestUpdateInfo(_.getCurrentManifestUpdate(i), {
									presentationStartTime : r
								})
							}
						}
						function s(e) {
							if (!e)
								throw new Error("no representation");
							e.segments = null, f(e)
						}
						function h(e, t, n) {
							var r = t.segments,
								i = r ? r.length : null,
								a = -1,
								o = void 0,
								s = void 0,
								u = void 0,
								l = void 0,
								d = void 0;
							if (r && 0 < i) {
								for (n = null == n ? y.getSegmentOverlapToleranceTime() : n, d = 0; d < i; d++)
									if (u = (s = r[d]).presentationStartTime, l = s.duration, u <= e + (o = null == n ? l / 2 : n) && e - o < u + l) {
										a = s.availabilityIdx;break
								}
								0 === e && 0 < r[0].presentationStartTime && (a = 0)
							}
							return a
						}
						function p(e) {
							if (null == e) return null;
							var t = new N.default,
								n = e.representation,
								r = n.adaptation.period.mpd.manifest.Period_asArray[n.adaptation.period.index].AdaptationSet_asArray[n.adaptation.index].Representation_asArray[n.index].bandwidth,
								i = e.media,
								a = C ? C.getType() : null;
							return i = (0, Q.replaceTokenForTemplate)(i, "Number", e.replacementNumber), i = (0, Q.replaceTokenForTemplate)(i, "Time", e.replacementTime), i = (0, Q.replaceTokenForTemplate)(i, "Bandwidth", r), i = (0, Q.replaceIDForTemplate)(i, n.id), i = (0, Q.unescapeDollarsInTemplate)(i), t.mediaType = a, t.type = P.HTTPRequest.MEDIA_SEGMENT_TYPE, t.range = e.mediaRange, t.startTime = e.presentationStartTime, t.duration = e.duration, t.timescale = n.timescale, t.availabilityStartTime = e.availabilityStartTime, t.availabilityEndTime = e.availabilityEndTime, t.wallStartTime = e.wallStartTime, t.quality = n.index, t.index = e.availabilityIdx, t.mediaInfo = C.getMediaInfo(), t.adaptationIndex = n.adaptation.index, t.representationId = n.id, o(t, i, n) ? t : void 0
						}
						function r(e, t, n) {
							var r = void 0,
								i = C ? C.getType() : null,
								a = C ? C.getStreamInfo().manifestInfo.isDynamic : null,
								o = I,
								s = !!n && n.keepIdx,
								u = n ? n.timeThreshold : null,
								l = !(!n || !n.ignoreIsFinished);
							return e ? (S !== t && R("Getting the request for " + i + " time : " + (S = t)), f(e), (I = h(t, e, u)) < 0 && (f(e), I = h(t, e, u)), 0 < I && R("Index for " + i + " time " + t + " is " + I), !l && d(e) ? ((r = new N.default).action = N.default.ACTION_COMPLETE, r.index = I, r.mediaType = i, r.mediaInfo = C.getMediaInfo(), R("Signal complete in getSegmentRequestForTime -", i)) : r = p((0, Q.getSegmentByIndex)(I, e)), s && 0 <= o && (I = e.segmentInfoType === M.default.SEGMENT_TIMELINE && a ? I : o), r) : null
						}
						function t(e) {
							var t = e.representation;
							t.segments && g.trigger(F.default.REPRESENTATION_UPDATED, {
								sender : this,
								representation : t
							})
						}
						function i(e) {
							var t = C ? C.getType() : null,
								n = C ? C.getStreamInfo().manifestInfo.isDynamic : null;
							if (!e.error && t === e.mediaType) {
								var r,
									i = e.segments,
									a = e.representation,
									o = [],
									s = 0,
									u = void 0,
									l = void 0,
									d = void 0;
								for (u = 0, r = i.length; u < r; u++) l = i[u], d = (0, Q.getTimeBasedSegment)(m, n, a, l.startTime, l.duration, l.timescale, l.media, l.mediaRange, s), o.push(d), d = null, s++;
								a.segmentAvailabilityRange = {
									start : o[0].presentationStartTime,
									end : o[r - 1].presentationStartTime
								}, a.availableSegmentsNumber = r, c(a, o), U.default.hasInitialization(a) && g.trigger(F.default.REPRESENTATION_UPDATED, {
									sender : this,
									representation : a
								})
							}
						}
						n = n || {};var a = this.context,
							g = (0, B.default)(a).getInstance(),
							u = (0, k.default)(a).getInstance(),
							l = void 0,
							m = n.timelineConverter,
							_ = n.dashMetrics,
							v = n.metricsModel,
							y = n.mediaPlayerModel,
							E = n.errHandler,
							A = n.baseURLController,
							T = void 0,
							R = void 0,
							I = void 0,
							S = void 0,
							b = void 0,
							w = void 0,
							C = void 0,
							D = void 0;
						return T = {
								initialize : function(e) {
									var t = (C = e) ? C.getStreamInfo().manifestInfo.isDynamic : null;
									l.initialize(), D = (0, G.default)(a).create(n, t)
								},
								getStreamProcessor : function() {
									return C
								},
								getInitRequest : function(e) {
									var t = C ? C.getType() : null;
									return e ? function(e, t) {
										var n = new N.default,
											r = e.adaptation.period,
											i = r.start,
											a = C ? C.getStreamInfo().manifestInfo.isDynamic : null;
										if (n.mediaType = t, n.type = P.HTTPRequest.INIT_SEGMENT_TYPE, n.range = e.range, n.availabilityStartTime = m.calcAvailabilityStartTimeFromPresentationTime(i, r.mpd, a), n.availabilityEndTime = m.calcAvailabilityEndTimeFromPresentationTime(i + r.duration, r.mpd, a), n.quality = e.index, n.mediaInfo = C ? C.getMediaInfo() : null, n.representationId = e.id, o(n, e.initialization, e)) return n
									}(e, t) : null
								},
								getSegmentRequestForTime : r,
								getNextSegmentRequest : function(e) {
									var t = void 0,
										n = void 0,
										r = C ? C.getType() : null,
										i = C ? C.getStreamInfo().manifestInfo.isDynamic : null;
									return e && -1 !== I ? (S = null, R("Getting the next request at index: " + ++I + ", type: " + r), !(0, Q.getSegmentByIndex)(I, e) && i ? (R("No segment found at index: " + I + ". Wait for next loop"), f(e), I--, null) : (d(e) ? ((t = new N.default).action = N.default.ACTION_COMPLETE, t.index = I, t.mediaType = r, t.mediaInfo = C.getMediaInfo(), R("Signal complete -", r)) : (f(e), t = p(n = (0, Q.getSegmentByIndex)(I, e)), !n && i && I--), t)) : null
								},
								generateSegmentRequestForTime : function(e, t) {
									var n = (e.segmentAvailabilityRange.end - e.segmentAvailabilityRange.start) / 2;
									return e.segments = null, e.segmentAvailabilityRange = {
											start : t - n,
											end : t + n
										}, r(e, t, {
											keepIdx : !1,
											ignoreIsFinished : !0
										})
								},
								updateRepresentation : function(e, t) {
									var n = U.default.hasInitialization(e),
										r = U.default.hasSegments(e),
										i = C ? C.getType() : null,
										a = C ? C.getStreamInfo().manifestInfo.isDynamic : null,
										o = void 0;
									if (e.segmentDuration || e.segments || s(e), e.segmentAvailabilityRange = m.calcSegmentAvailabilityRange(e, a), e.segmentAvailabilityRange.end < e.segmentAvailabilityRange.start && !e.useCalculatedLiveEdgeTime) return o = new L.default(1, "no segments are available yet", {
												availabilityDelay : e.segmentAvailabilityRange.start - e.segmentAvailabilityRange.end
											}), void g.trigger(F.default.REPRESENTATION_UPDATED, {
												sender : this,
												representation : e,
												error : o
											});
									t || (I = -1), e.segmentDuration && s(e), n || l.loadInitialization(e), r || l.loadSegments(e, i, e.indexRange), n && r && g.trigger(F.default.REPRESENTATION_UPDATED, {
										sender : this,
										representation : e
									})
								},
								updateSegmentList : s,
								setCurrentTime : function(e) {
									b = e
								},
								getCurrentTime : function() {
									return b
								},
								getEarliestTime : function() {
									return w
								},
								reset : function() {
									e(), g.off(F.default.INITIALIZATION_LOADED, t, T), g.off(F.default.SEGMENTS_LOADED, i, T)
								}
							}, R = (0, x.default)(a).getInstance().log.bind(T), e(), (l = (0, j.default)(a).getInstance()).setConfig({
								baseURLController : A,
								metricsModel : v,
								mediaPlayerModel : y,
								errHandler : E
							}), g.on(F.default.INITIALIZATION_LOADED, t, T), g.on(F.default.SEGMENTS_LOADED, i, T), T
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var O = r(e(59)),
						M = r(e(18)),
						N = r(e(114)),
						L = r(e(112)),
						P = e(129),
						F = r(e(12)),
						B = r(e(8)),
						a = r(e(9)),
						x = r(e(7)),
						k = r(e(108)),
						U = r(e(46)),
						Q = e(36),
						G = r(e(35)),
						j = r(e(17));
					i.__dashjs_factory_name = "DashHandler";
					var o = a.default.getClassFactory(i);
					o.SEGMENTS_UNAVAILABLE_ERROR_CODE = 1, a.default.updateClassFactory(i.__dashjs_factory_name, o), n.default = o, t.exports = n.default
				}, {
					108 : 108,
					112 : 112,
					114 : 114,
					12 : 12,
					129 : 129,
					17 : 17,
					18 : 18,
					35 : 35,
					36 : 36,
					46 : 46,
					59 : 59,
					7 : 7,
					8 : 8,
					9 : 9
				} ],
				16 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e) {
						function n(e) {
							return t(e, f.default.BUFFER_LEVEL)
						}
						function i(e) {
							if (!e) return null;
							var t = e.HttpList,
								n = null,
								r = void 0;
							if (!t || t.length <= 0) return null;
							for (r = t.length - 1; 0 <= r;) {
								if (t[r].responsecode) {
									n = t[r];break
								}
								r--
							}
							return n
						}
						function o(e) {
							return e && e.HttpList ? e.HttpList : []
						}
						function t(e, t) {
							if (!e) return null;
							var n = e[t];
							if (!n) return null;
							var r = n.length;
							return r <= 0 ? null : n[r - 1]
						}
						function s(e) {
							var t = {};
							if (!e) return t;
							for (var n = e.trim().split("\r\n"), r = 0, i = n.length; r < i; r++) {
								var a = n[r],
									o = a.indexOf(": ");
								0 < o && (t[a.substring(0, o)] = a.substring(o + 2))
							}
							return t
						}
						function a(e, t, n) {
							var r = void 0,
								i = void 0,
								a = void 0,
								o = void 0,
								s = void 0;
							if (e)
								for (r = e.AdaptationSet_asArray, o = 0; o < r.length; o += 1)
									for (a = r[o].Representation_asArray, s = 0; s < a.length; s += 1)
										if (t === (i = a[s]).id) return n ? s : i;
							return null
						}
						var u = (e = e || {}).dashManifestModel,
							l = e.manifestModel;
						return {
							getBandwidthForRepresentation : function(e, t) {
								var n;
								return null === (n = a(l.getValue().Period_asArray[t], e)) ? null : n.bandwidth
							},
							getIndexForRepresentation : function(e, t) {
								return n = l.getValue().Period_asArray[t], null !== (r = a(n, e, !0)) ? r : -1;
								var n,
									r
							},
							getMaxIndexForBufferType : function(e, t) {
								var n = l.getValue();
								return n ? function(e, t) {
									var n,
										r,
										i = void 0,
										a = void 0,
										o = void 0,
										s = void 0;
									if (!e || !t) return -1;
									for (a = e.AdaptationSet_asArray, s = 0; s < a.length; s += 1)
										if (i = a[s], o = i.Representation_asArray, n = i, r = t, u.getIsTypeOf(n, r)) return o.length;
									return -1
								}(n.Period_asArray[t], e) : -1
							},
							getCurrentRepresentationSwitch : function(e) {
								return t(e, f.default.TRACK_SWITCH)
							},
							getLatestBufferLevelVO : n,
							getCurrentBufferLevel : function(e) {
								var t = n(e);
								return t ? c.default.round10(t.level / 1e3, -3) : 0
							},
							getCurrentHttpRequest : i,
							getHttpRequests : o,
							getCurrentDroppedFrames : function(e) {
								return t(e, f.default.DROPPED_FRAMES)
							},
							getCurrentSchedulingInfo : function(e) {
								return t(e, f.default.SCHEDULING_INFO)
							},
							getCurrentDVRInfo : function(e) {
								return t(e, f.default.DVR_INFO)
							},
							getCurrentManifestUpdate : function(e) {
								return t(e, f.default.MANIFEST_UPDATE)
							},
							getLatestFragmentRequestHeaderValueByID : function(e, t) {
								var n = {},
									r = i(e);
								return r && (n = s(r._responseHeaders)), void 0 === n[t] ? null : n[t]
							},
							getLatestMPDRequestHeaderValueByID : function(e, t) {
								var n,
									r = {},
									i = void 0,
									a = void 0;
								for (a = (n = o(e)).length - 1; 0 <= a; a--)
									if ((i = n[a]).type === d.HTTPRequest.MPD_TYPE) {
										r = s(i._responseHeaders);break
								}
								return void 0 === r[t] ? null : r[t]
							},
							getRequestsQueue : function(e) {
								return e ? e.RequestsQueue : null
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var d = e(129),
						a = r(e(9)),
						f = r(e(61)),
						c = r(e(34));
					i.__dashjs_factory_name = "DashMetrics", n.default = a.default.getSingletonFactory(i), t.exports = n.default
				}, {
					129 : 129,
					34 : 34,
					61 : 61,
					9 : 9
				} ],
				17 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						function g() {
							if (!E || !E.hasOwnProperty("resolve"))
								throw new Error("setConfig function has to be called previously")
						}
						function m(e) {
							if (e.url) {
								var t = new p.default;
								return t.type = e.init ? f.HTTPRequest.INIT_SEGMENT_TYPE : f.HTTPRequest.MEDIA_SEGMENT_TYPE, t.url = e.url, t.urls = e.urls, t.range = e.range.start + "-" + e.range.end, t
							}
						}
						function s(e, t, n) {
							e ? c.trigger(h.default.SEGMENTS_LOADED, {
								segments : e,
								representation : t,
								mediaType : n
							}) : c.trigger(h.default.SEGMENTS_LOADED, {
								segments : null,
								representation : t,
								mediaType : n,
								error : new o.default(null, "error loading segments", null)
							})
						}
						var e = this.context,
							_ = (0, d.default)(e).getInstance().log,
							c = (0, u.default)(e).getInstance(),
							t = void 0,
							v = void 0,
							n = void 0,
							r = void 0,
							i = void 0,
							y = void 0,
							E = void 0;
						return {
							setConfig : function(e) {
								e.baseURLController && (E = e.baseURLController), e.metricsModel && (r = e.metricsModel), e.mediaPlayerModel && (i = e.mediaPlayerModel), e.errHandler && (t = e.errHandler)
							},
							initialize : function() {
								v = (0, l.default)(e).getInstance(), n = (0, a.default)(e).getInstance(), y = (0, T.default)(e).create({
									errHandler : t,
									metricsModel : r,
									mediaPlayerModel : i,
									requestModifier : n
								})
							},
							loadInitialization : function s(u, e) {
								g();
								var l = null,
									d = null,
									t = E.resolve(u.path),
									f = e || {
										init : !0,
										url : t ? t.url : void 0,
										range : {
											start : 0,
											end : 1500
										},
										searching : !1,
										bytesLoaded : 0,
										bytesToLoad : 1500
									};
								_("Start searching for initialization.");
								var n = m(f);
								y.load({
									request : n,
									success : function(e) {
										var t,
											n,
											r,
											i,
											a,
											o;
										f.bytesLoaded = f.range.end, d = v.parse(e), n = (t = d).getBox("ftyp"), r = t.getBox("moov"), i = null, o = a = void 0, _("Searching for initialization."), r && r.isComplete && (a = n ? n.offset : r.offset, o = r.offset + r.size - 1, _("Found the initialization.  Range: " + (i = a + "-" + o))), (l = i) ? (u.range = l, c.trigger(h.default.INITIALIZATION_LOADED, {
											representation : u
										})) : (f.range.end = f.bytesLoaded + f.bytesToLoad, s(u, f))
									},
									error : function() {
										c.trigger(h.default.INITIALIZATION_LOADED, {
											representation : u
										})
									}
								}), _("Perform init search: " + f.url)
							},
							loadSegments : function l(d, f, e, t, c) {
								if (g(), e && (void 0 === e.start || void 0 === e.end)) {
									var n = e ? e.toString().split("-") : null;
									e = n ? {
										start : parseFloat(n[0]),
										end : parseFloat(n[1])
									} : null
								}
								c = c || s;
								var o = null,
									h = null,
									r = !!e,
									i = E.resolve(d.path),
									p = {
										init : !1,
										url : i ? i.url : void 0,
										urls : i.urls,
										range : r ? e : {
											start : 0,
											end : 1500
										},
										searching : !r,
										bytesLoaded : t ? t.bytesLoaded : 0,
										bytesToLoad : 1500
									},
									a = m(p);
								y.load({
									request : a,
									success : function(e) {
										var t = p.bytesToLoad,
											n = e.byteLength;
										if (p.bytesLoaded = p.range.end - p.range.start, o = v.parse(e), (h = o.getBox("sidx")) && h.isComplete) {
											var u = h.references,
												r = void 0,
												i = void 0;
											null != u && 0 < u.length && (r = 1 === u[0].reference_type), r ? function() {
												_("Initiate multiple SIDX load."), p.range.end = p.range.start + h.size;
												var e = void 0,
													t = void 0,
													n = void 0,
													r = void 0,
													i = [],
													a = 0,
													o = (h.offset || p.range.start) + h.size,
													s = function(e) {
														e ? (i = i.concat(e), ++a >= t && c(i, d, f)) : c(null, d, f)
													};
												for (e = 0, t = u.length; e < t; e++) r = (n = o) + u[e].referenced_size - 1, o += u[e].referenced_size, l(d, null, {
														start : n,
														end : r
													}, p, s)
											}() : (_("Parsing segments from SIDX."), i = function(e, t) {
												for (var n = e.references, r = n.length, i = e.timescale, a = e.earliest_presentation_time, o = t.range.start + e.offset + e.first_offset + e.size, s = [], u = void 0, l = void 0, d = void 0, f = void 0, c = 0; c < r; c++) d = n[c].subsegment_duration, f = n[c].referenced_size, (u = new A.default).duration = d, u.startTime = a, u.timescale = i, l = o + f - 1, u.mediaRange = o + "-" + l, s.push(u), a += d, o += f;
												return s
											}(h, p), c(i, d, f))
										} else {
											if (h) p.range.start = h.offset || p.range.start, p.range.end = p.range.start + (h.size || t);else {
												if (n < p.bytesLoaded) return void c(null, d, f);
												var a = o.getLastBox();
												a && a.size ? (p.range.start = a.offset + a.size, p.range.end = p.range.start + t) : p.range.end += t
											}
											l(d, f, p.range, p, c)
										}
									},
									error : function() {
										c(null, d, f)
									}
								}), _("Perform SIDX load: " + p.url)
							},
							reset : function() {
								y.abort(), n = v = t = y = null
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var a = r(e(107)),
						A = r(e(47)),
						o = r(e(112)),
						h = r(e(12)),
						u = r(e(8)),
						l = r(e(99)),
						s = r(e(9)),
						d = r(e(7)),
						f = e(129),
						p = r(e(114)),
						T = r(e(82));
					i.__dashjs_factory_name = "SegmentBaseLoader", n.default = s.default.getSingletonFactory(i), t.exports = n.default
				}, {
					107 : 107,
					112 : 112,
					114 : 114,
					12 : 12,
					129 : 129,
					47 : 47,
					7 : 7,
					8 : 8,
					82 : 82,
					9 : 9,
					99 : 99
				} ],
				18 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						i = new (function() {
							function e() {
								(function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								})(this, e), this.init()
							}
							return r(e, [ {
									key : "init",
									value : function() {
										this.BASE_URL = "BaseURL", this.SEGMENT_BASE = "SegmentBase", this.SEGMENT_TEMPLATE = "SegmentTemplate", this.SEGMENT_LIST = "SegmentList", this.SEGMENT_URL = "SegmentURL", this.SEGMENT_TIMELINE = "SegmentTimeline", this.SEGMENT_PROFILES = "segmentProfiles", this.ADAPTATION_SET = "AdaptationSet", this.REPRESENTATION = "Representation", this.REPRESENTATION_INDEX = "RepresentationIndex", this.SUB_REPRESENTATION = "SubRepresentation", this.INITIALIZATION = "Initialization", this.INITIALIZATION_MINUS = "initialization", this.MPD = "MPD", this.PERIOD = "Period", this.ASSET_IDENTIFIER = "AssetIdentifier", this.EVENT_STREAM = "EventStream", this.ID = "id", this.PROFILES = "profiles", this.SERVICE_LOCATION = "serviceLocation", this.RANGE = "range", this.INDEX = "index", this.MEDIA = "media", this.BYTE_RANGE = "byteRange", this.INDEX_RANGE = "indexRange", this.MEDIA_RANGE = "mediaRange", this.VALUE = "value", this.CONTENT_TYPE = "contentType", this.MIME_TYPE = "mimeType", this.BITSTREAM_SWITCHING = "BitstreamSwitching", this.BITSTREAM_SWITCHING_MINUS = "bitstreamSwitching", this.CODECS = "codecs", this.DEPENDENCY_ID = "dependencyId", this.MEDIA_STREAM_STRUCTURE_ID = "mediaStreamStructureId", this.METRICS = "Metrics", this.METRICS_MINUS = "metrics", this.REPORTING = "Reporting", this.WIDTH = "width", this.HEIGHT = "height", this.SAR = "sar", this.FRAMERATE = "frameRate", this.AUDIO_SAMPLING_RATE = "audioSamplingRate", this.MAXIMUM_SAP_PERIOD = "maximumSAPPeriod", this.START_WITH_SAP = "startWithSAP", this.MAX_PLAYOUT_RATE = "maxPlayoutRate", this.CODING_DEPENDENCY = "codingDependency", this.SCAN_TYPE = "scanType", this.FRAME_PACKING = "FramePacking", this.AUDIO_CHANNEL_CONFIGURATION = "AudioChannelConfiguration", this.CONTENT_PROTECTION = "ContentProtection", this.ESSENTIAL_PROPERTY = "EssentialProperty", this.SUPPLEMENTAL_PROPERTY = "SupplementalProperty", this.INBAND_EVENT_STREAM = "InbandEventStream", this.ACCESSIBILITY = "Accessibility", this.ROLE = "Role", this.RATING = "Rating", this.CONTENT_COMPONENT = "ContentComponent", this.SUBSET = "Subset", this.LANG = "lang", this.VIEWPOINT = "Viewpoint", this.ROLE_ASARRAY = "Role_asArray", this.ACCESSIBILITY_ASARRAY = "Accessibility_asArray", this.AUDIOCHANNELCONFIGURATION_ASARRAY = "AudioChannelConfiguration_asArray", this.CONTENTPROTECTION_ASARRAY = "ContentProtection_asArray", this.MAIN = "main", this.DYNAMIC = "dynamic", this.MEDIA_PRESENTATION_DURATION = "mediaPresentationDuration", this.MINIMUM_UPDATE_PERIOD = "minimumUpdatePeriod", this.CODEC_PRIVATE_DATA = "codecPrivateData", this.BANDWITH = "bandwidth", this.SOURCE_URL = "sourceURL", this.TIMESCALE = "timescale", this.DURATION = "duration", this.START_NUMBER = "startNumber", this.PRESENTATION_TIME_OFFSET = "presentationTimeOffset", this.AVAILABILITY_START_TIME = "availabilityStartTime", this.AVAILABILITY_END_TIME = "availabilityEndTime", this.TIMESHIFT_BUFFER_DEPTH = "timeShiftBufferDepth", this.MAX_SEGMENT_DURATION = "maxSegmentDuration", this.PRESENTATION_TIME = "presentationTime", this.MIN_BUFFER_TIME = "minBufferTime", this.MAX_SUBSEGMENT_DURATION = "maxSubsegmentDuration", this.START = "start", this.AVAILABILITY_TIME_OFFSET = "availabilityTimeOffset", this.AVAILABILITY_TIME_COMPLETE = "availabilityTimeComplete", this.CENC_DEFAULT_KID = "cenc:default_KID", this.DVB_PRIORITY = "dvb:priority", this.DVB_WEIGHT = "dvb:weight"
									}
								} ]), e
						}());
					n.default = i, t.exports = n.default
				}, {} ],
				19 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						function h() {
							return A
						}
						function p() {
							return R
						}
						function e() {
							l = -1, A = !(E = null), T = [], C = w = c = f = b = S = I = null
						}
						function g() {
							var e = new Date,
								t = p(),
								n = 1e3 * S.getTime();
							b.addRepresentationSwitch(t.adaptation.type, e, n, t.id)
						}
						function m() {
							var e = D.getStreamInfo(),
								t = e ? e.manifestInfo : null,
								n = t ? t.isDynamic : null,
								r = c.calcSegmentAvailabilityRange(R, n);
							b.addDVRInfo(D.getType(), S.getTime(), t, r)
						}
						function u(e) {
							return T[e]
						}
						function _(e) {
							var t = e;
							A = !1, y.trigger(B.default.AST_IN_FUTURE, {
								delay : t
							}), setTimeout(function() {
								if (!h()) {
									A = !0, y.trigger(B.default.DATA_UPDATE_STARTED, {
										sender : s
									}), T.forEach(function(e) {
										e.segmentAvailabilityRange = null
									});
									for (var e = 0; e < T.length; e++) d.updateRepresentation(T[e], !0)
								}
							}, t)
						}
						function t(e) {
							if (e.sender.getStreamProcessor() === D && h()) {
								var t = e.representation,
									n = b.getMetricsFor(N.default.STREAM),
									r = p().adaptation.type,
									i = b.getMetricsFor(p().adaptation.type),
									a = C.getCurrentManifestUpdate(n),
									o = !1,
									s = 0,
									u = void 0,
									l = void 0;
								if (t.adaptation.period.mpd.manifest.type === L.default.DYNAMIC && !t.adaptation.period.mpd.manifest.ignorePostponeTimePeriod) {
									var d = t.segmentAvailabilityRange.end - t.segmentAvailabilityRange.start;
									s = 1e3 * (S.computeLiveDelay(R.segmentDuration, D.getStreamInfo().manifestInfo.DVRWindowSize) - d)
								}
								if (0 < s) return m(), _(s), l = new P.default(v, "Segments update failed", null), void y.trigger(B.default.DATA_UPDATE_COMPLETED, {
											sender : this,
											data : E,
											currentRepresentation : R,
											error : l
										});
								if (a) {
									for (var f = 0; f < a.representationInfo.length; f++)
										if ((u = a.representationInfo[f]).index === t.index && u.mediaType === D.getType()) {
											o = !0;break
									}
									o || b.addManifestUpdateRepresentationInfo(a, t.id, t.index, t.adaptation.period.index, D.getType(), t.presentationTimeOffset, t.startNumber, t.segmentInfoType)
								}
								(function(e) {
									var t = I.getDefaultQualityFor(e),
										n = D.getStreamInfo(),
										r = I.getTopQualityIndexFor(e, n.id),
										i = I.getMinAllowedIndexFor(e);
									void 0 !== i && t < i && (t = i), r < t && (t = r);
									for (var a = t; a < 1; a++) {
										var o = T[a].segmentInfoType;
										if (null === T[a].segmentAvailabilityRange || !x.default.hasInitialization(T[a]) || (o === L.default.SEGMENT_BASE || o === L.default.BASE_URL) && !T[a].segments) return !1
									}
									return !0
								})(r) && (A = !1, I.setPlaybackQuality(D.getType(), D.getStreamInfo(), (c = R, T.indexOf(c))), b.updateManifestUpdateInfo(a, {
									latency : R.segmentAvailabilityRange.end - S.getTime()
								}), C.getCurrentRepresentationSwitch(i) || g(), y.trigger(B.default.DATA_UPDATE_COMPLETED, {
									sender : this,
									data : E,
									currentRepresentation : R
								}))
							}
							var c
						}
						function n(e) {
							e.isDynamic && function(e) {
								for (var t = void 0, n = 0, r = T.length; n < r; n++) (t = T[n]).segmentAvailabilityRange = c.calcSegmentAvailabilityRange(t, e)
							}(e.isDynamic)
						}
						function r(e) {
							e.sender.getStreamProcessor() === D && (O.getValue().doNotUpdateDVRWindowOnBufferUpdated || m())
						}
						function i(e) {
							if (e.mediaType === D.getType() && D.getStreamInfo().id === e.streamInfo.id && e.oldQuality !== e.newQuality) {
								var t = e.newQuality;
								M[t] || (M[t] = !0, d.updateRepresentation(T[t], !0)), R = u(e.newQuality);
								var n = I.getThroughputHistory().getAverageThroughput(e.mediaType);
								isNaN(n) || f.setSavedBitrateSettings(e.mediaType, n), g()
							}
						}
						function a(e) {
							if (e.newDuration) {
								var t = p();
								t && t.adaptation.period && (t.adaptation.period.duration = e.newDuration)
							}
						}
						var v = 1,
							o = this.context,
							y = (0, F.default)(o).getInstance(),
							s = void 0,
							E = void 0,
							l = void 0,
							A = void 0,
							T = void 0,
							R = void 0,
							I = void 0,
							d = void 0,
							S = void 0,
							b = void 0,
							f = void 0,
							c = void 0,
							w = void 0,
							C = void 0,
							D = void 0,
							O = void 0,
							M = [];
						return s = {
								initialize : function() {
									d = D.getIndexHandler()
								},
								setConfig : function(e) {
									e.abrController && (I = e.abrController), e.domStorage && (f = e.domStorage), e.metricsModel && (b = e.metricsModel), e.dashMetrics && (C = e.dashMetrics), e.dashManifestModel && (w = e.dashManifestModel), e.playbackController && (S = e.playbackController), e.timelineConverter && (c = e.timelineConverter), e.manifestModel && (O = e.manifestModel), e.streamProcessor && (D = e.streamProcessor)
								},
								getData : function() {
									return E
								},
								getDataIndex : function() {
									return l
								},
								isUpdating : h,
								updateData : function(e, t, n) {
									var r,
										i = D.getStreamInfo(),
										a = I.getTopQualityIndexFor(n, i.id),
										o = I.getMinAllowedIndexFor(n),
										s = void 0;
									if (A = !0, y.trigger(B.default.DATA_UPDATE_STARTED, {
											sender : this
										}), r = t, l = w.getIndexForAdaptation(E, r.period.mpd.manifest, r.period.index), T = w.getRepresentationsForAdaptation(r), null !== E && E.id == e.id || n === N.default.FRAGMENTED_TEXT || I.getThroughputHistory().getAverageThroughput(n) || I.getInitialBitrateFor(n, i), s = I.getDefaultQualityFor(n), void 0 !== o && s < o && (s = o), a < s && (s = a), R = u(s), E = e, n !== N.default.VIDEO && n !== N.default.AUDIO && n !== N.default.FRAGMENTED_TEXT) return A = !1, void y.trigger(B.default.DATA_UPDATE_COMPLETED, {
												sender : this,
												data : E,
												currentRepresentation : R
											});
									M[s] = !0, d.updateRepresentation(T[s], !0)
								},
								getStreamProcessor : function() {
									return D
								},
								getCurrentRepresentation : p,
								getRepresentationForQuality : u,
								reset : function() {
									y.off(B.default.QUALITY_CHANGE_REQUESTED, i, s), y.off(B.default.REPRESENTATION_UPDATED, t, s), y.off(B.default.WALLCLOCK_TIME_UPDATED, n, s), y.off(B.default.BUFFER_LEVEL_UPDATED, r, s), y.off(B.default.MANIFEST_VALIDITY_CHANGED, a, s), e(), M = []
								}
							}, e(), y.on(B.default.QUALITY_CHANGE_REQUESTED, i, s), y.on(B.default.REPRESENTATION_UPDATED, t, s), y.on(B.default.WALLCLOCK_TIME_UPDATED, n, s), y.on(B.default.BUFFER_LEVEL_UPDATED, r, s), y.on(B.default.MANIFEST_VALIDITY_CHANGED, a, s), s
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var N = r(e(59)),
						L = r(e(18)),
						P = r(e(112)),
						F = r(e(8)),
						B = r(e(12)),
						a = r(e(9)),
						x = r(e(46));
					i.__dashjs_factory_name = "RepresentationController", n.default = a.default.getClassFactory(i), t.exports = n.default
				}, {
					112 : 112,
					12 : 12,
					18 : 18,
					46 : 46,
					59 : 59,
					8 : 8,
					9 : 9
				} ],
				20 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e) {
						function s(e, t) {
							var n = void 0,
								r = void 0,
								i = void 0,
								a = void 0,
								o = void 0,
								s = void 0,
								u = !1,
								l = !1;
							if (!e)
								throw new Error("adaptation is not defined");
							if (!t)
								throw new Error("type is not defined");
							if (e.hasOwnProperty("ContentComponent_asArray") && (a = e.ContentComponent_asArray), o = t !== C.default.TEXT ? new RegExp(t) : new RegExp("(vtt|ttml)"), e.Representation_asArray && e.Representation_asArray.length && 0 < e.Representation_asArray.length && e.Representation_asArray[0].hasOwnProperty(D.default.CODECS) && (0 === (s = e.Representation_asArray[0].codecs).search(C.default.STPP) || 0 === s.search(C.default.WVTT))) return t === C.default.FRAGMENTED_TEXT;
							if (a) {
								if (1 < a.length) return t === C.default.MUXED;
								a[0] && a[0].contentType === t && (l = u = !0)
							}
							if (e.hasOwnProperty(D.default.MIME_TYPE) && (u = o.test(e.mimeType), l = !0), !l)
								for (n = 0, r = e.Representation_asArray && e.Representation_asArray.length ? e.Representation_asArray.length : 0; !l && n < r;) (i = e.Representation_asArray[n]).hasOwnProperty(D.default.MIME_TYPE) && (u = o.test(i.mimeType), l = !0), n++;
							return u
						}
						function o(e) {
							return s(e, C.default.AUDIO)
						}
						function u(e) {
							return s(e, C.default.VIDEO)
						}
						function l(e) {
							return s(e, C.default.FRAGMENTED_TEXT)
						}
						function d(e) {
							return s(e, C.default.MUXED)
						}
						function f(e) {
							return s(e, C.default.IMAGE)
						}
						function c(e) {
							return "text/vtt" === e || "application/ttml+xml" === e
						}
						function t(e) {
							return e && e.hasOwnProperty(D.default.ROLE_ASARRAY) ? e.Role_asArray : []
						}
						function h(e) {
							return t(e).filter(function(e) {
								return e.value === D.default.MAIN
							})[0]
						}
						function n() {
							return function(e, t) {
								return e.bandwidth - t.bandwidth
							}
						}
						function p(e) {
							return e && void 0 !== e.Representation_asArray && null !== e.Representation_asArray && e.Representation_asArray.sort(function(e, t) {
									return e.bandwidth - t.bandwidth
								}), e
						}
						function g(e, t, n) {
							var r,
								i = e && e.Period_asArray && w(t) && e.Period_asArray[t] ? e.Period_asArray[t].AdaptationSet_asArray : [],
								a = void 0,
								o = [];
							for (a = 0, r = i.length; a < r; a++) s(i[a], n) && o.push(p(i[a]));
							return o
						}
						function m(e) {
							var t = !1;
							return e && e.hasOwnProperty("type") && (t = e.type === D.default.DYNAMIC), t
						}
						function _(e) {
							if (e && e.period && w(e.period.index)) {
								var t = e.period.mpd.manifest.Period_asArray[e.period.index];
								if (t && t.AdaptationSet_asArray && w(e.index)) return p(t.AdaptationSet_asArray[e.index])
							}
						}
						function v(e) {
							var t = e.S_asArray[e.S_asArray.length - 1];
							return !t.hasOwnProperty("r") || 0 <= t.r
						}
						function y(e, t) {
							if (!e)
								throw new Error("Period cannot be null or undefined");
							var n = N.default.DEFAULT_ID + "_" + t;
							return e.hasOwnProperty(D.default.ID) && 0 < e.id.length && "__proto__" !== e.id && (n = e.id), n
						}
						function E(e, t) {
							var n = [],
								r = void 0;
							if (!e) return n;
							for (r = 0; r < e.length; r++) {
								var i = new B.default;
								if (i.timescale = 1, i.representation = t, !e[r].hasOwnProperty(C.default.SCHEME_ID_URI))
									throw new Error("Invalid EventStream. SchemeIdUri has to be set");
								i.schemeIdUri = e[r].schemeIdUri, e[r].hasOwnProperty(D.default.TIMESCALE) && (i.timescale = e[r].timescale), e[r].hasOwnProperty(D.default.VALUE) && (i.value = e[r].value), n.push(i)
							}
							return n
						}
						function A(a) {
							var o = [],
								e = a.BaseURL_asArray || [ a.baseUri ],
								s = !1;
							return e.some(function(e) {
									if (e) {
										var t = new F.default,
											n = e.__text || e;
										R.isRelative(n) && (s = !0, a.baseUri && (n = R.resolve(n, a.baseUri))), t.url = n;
										for (var r = [], i = 1; e["backupUrl" + i]; i++) r.push(e["backupUrl" + i]);
										return t.urls = [ t.url ].concat(r), e.hasOwnProperty(D.default.SERVICE_LOCATION) && e.serviceLocation.length ? t.serviceLocation = e.serviceLocation : t.serviceLocation = n, e.hasOwnProperty(D.default.DVB_PRIORITY) && (t.dvb_priority = e[D.default.DVB_PRIORITY]), e.hasOwnProperty(D.default.DVB_WEIGHT) && (t.dvb_weight = e[D.default.DVB_WEIGHT]), e.hasOwnProperty(D.default.AVAILABILITY_TIME_OFFSET) && (t.availabilityTimeOffset = e[D.default.AVAILABILITY_TIME_OFFSET]), e.hasOwnProperty(D.default.AVAILABILITY_TIME_COMPLETE) && (t.availabilityTimeComplete = "false" !== e[D.default.AVAILABILITY_TIME_COMPLETE]), o.push(t), s
									}
								}), o
						}
						e = e || {};var T = this.context,
							R = (0, k.default)(T).getInstance(),
							I = e.mediaController,
							S = e.timelineConverter,
							b = e.adapter,
							i = "urn:dvb:dash:profile:dvb-dash:2014",
							w = Number.isInteger || function(e) {
								return "number" == typeof e && isFinite(e) && Math.floor(e) === e
							};
						return {
							getIsTypeOf : s,
							getIsAudio : o,
							getIsVideo : u,
							getIsText : function(e) {
								return s(e, C.default.TEXT)
							},
							getIsMuxed : d,
							getIsTextTrack : c,
							getIsFragmentedText : l,
							getIsImage : f,
							getIsMain : h,
							getLanguageForAdaptation : function(e) {
								var t = "";
								return e && e.hasOwnProperty(D.default.LANG) && (t = e.lang.replace(/[^A-Za-z0-9-]/g, "")), t
							},
							getViewpointForAdaptation : function(e) {
								return e && e.hasOwnProperty(D.default.VIEWPOINT) ? e.Viewpoint : null
							},
							getRolesForAdaptation : t,
							getAccessibilityForAdaptation : function(e) {
								return e && e.hasOwnProperty(D.default.ACCESSIBILITY_ASARRAY) ? e.Accessibility_asArray : []
							},
							getAudioChannelConfigurationForAdaptation : function(e) {
								return e && e.hasOwnProperty(D.default.AUDIOCHANNELCONFIGURATION_ASARRAY) ? e.AudioChannelConfiguration_asArray : []
							},
							getAdaptationForIndex : function(e, t, n) {
								var r = t && t.Period_asArray && w(n) && t.Period_asArray[n] ? t.Period_asArray[n].AdaptationSet_asArray : null;
								return r && w(e) ? r[e] : null
							},
							getIndexForAdaptation : function(e, t, n) {
								var r = t && t.Period_asArray && w(n) && t.Period_asArray[n] ? t.Period_asArray[n].AdaptationSet_asArray : [],
									i = r.length;
								if (e)
									for (var a = 0; a < i; a++)
										if ((0, x.default)(T).getInstance().areEqual(r[a], e)) return a;
								return -1
							},
							getAdaptationForId : function(e, t, n) {
								var r,
									i = t && t.Period_asArray && w(n) && t.Period_asArray[n] ? t.Period_asArray[n].AdaptationSet_asArray : [],
									a = void 0;
								for (a = 0, r = i.length; a < r; a++)
									if (i[a].hasOwnProperty(D.default.ID) && i[a].id === e) return i[a];
								return null
							},
							getAdaptationsForType : g,
							getAdaptationForType : function(e, t, n, r) {
								var i = g(e, t, n);
								if (!i || 0 === i.length) return null;
								if (1 < i.length && r) {
									var a = I.getCurrentTrackFor(n, r),
										o = b.getAllMediaInfoForType(r, n);
									if (a)
										for (var s = 0, u = i.length; s < u; s++)
											if (I.isTracksEqual(a, o[s])) return i[s];
									for (s = 0, u = i.length; s < u; s++)
										if (h(i[s])) return i[s]
								}
								return i[0]
							},
							getCodec : function(e, t, n) {
								if (e && e.Representation_asArray && 0 < e.Representation_asArray.length) {
									var r = w(t) && 0 <= t && t < e.Representation_asArray.length ? e.Representation_asArray[t] : e.Representation_asArray[0],
										i = r.mimeType + ';codecs="' + r.codecs + '"';
									return n && void 0 !== r.width && (i += ';width="' + r.width + '";height="' + r.height + '"'), i
								}
								return null
							},
							getMimeType : function(e) {
								return e && e.Representation_asArray && 0 < e.Representation_asArray.length ? e.Representation_asArray[0].mimeType : null
							},
							getKID : function(e) {
								return e && e.hasOwnProperty(D.default.CENC_DEFAULT_KID) ? e[D.default.CENC_DEFAULT_KID] : null
							},
							getContentProtectionData : function(e) {
								return e && e.hasOwnProperty(D.default.CONTENTPROTECTION_ASARRAY) && 0 !== e.ContentProtection_asArray.length ? e.ContentProtection_asArray : null
							},
							getIsDynamic : m,
							getIsDVB : function(e) {
								return n = i, r = !1, (t = e) && t.profiles && 0 < t.profiles.length && (r = -1 !== t.profiles.indexOf(n)), r;
								var t,
									n,
									r
							},
							getDuration : function(e) {
								return e && e.hasOwnProperty(D.default.MEDIA_PRESENTATION_DURATION) ? e.mediaPresentationDuration : Number.MAX_SAFE_INTEGER || Number.MAX_VALUE
							},
							getBandwidth : function(e) {
								return e && e.bandwidth ? e.bandwidth : NaN
							},
							getManifestUpdatePeriod : function(e) {
								var t = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1],
									n = NaN;
								return e && e.hasOwnProperty(D.default.MINIMUM_UPDATE_PERIOD) && (n = e.minimumUpdatePeriod), isNaN(n) ? n : Math.max(n - t, 1)
							},
							getRepresentationCount : function(e) {
								return e && e.Representation_asArray && e.Representation_asArray.length ? e.Representation_asArray.length : 0
							},
							getBitrateListForAdaptation : function(e) {
								return e && e.Representation_asArray && e.Representation_asArray.length ? p(e).Representation_asArray.map(function(e) {
									return {
										id : e.id || "",
										bandwidth : e.bandwidth,
										width : e.width || 0,
										height : e.height || 0,
										scanType : e.scanType || null
									}
								}) : null
							},
							getRepresentationFor : function(e, t) {
								return t && t.Representation_asArray && 0 < t.Representation_asArray.length && w(e) ? t.Representation_asArray[e] : null
							},
							getRepresentationsForAdaptation : function(e) {
								var t,
									n = [],
									r = _(e),
									i = void 0,
									a = void 0;
								if (e && e.period && w(e.period.index)) {
									var o = A(e.period.mpd.manifest);
									o && (a = o[0])
								}
								if (r && r.Representation_asArray)
									for (var s = 0, u = r.Representation_asArray.length; s < u; ++s) {
										var l = r.Representation_asArray[s],
											d = new O.default;
										if (d.index = s, d.adaptation = e, l.hasOwnProperty(D.default.ID) && (d.id = l.id), l.hasOwnProperty(D.default.CODECS) && (d.codecs = l.codecs), l.hasOwnProperty(D.default.CODEC_PRIVATE_DATA) && (d.codecPrivateData = l.codecPrivateData), l.hasOwnProperty(D.default.BANDWITH) && (d.bandwidth = l.bandwidth), l.hasOwnProperty(D.default.WIDTH) && (d.width = l.width), l.hasOwnProperty(D.default.HEIGHT) && (d.height = l.height), l.hasOwnProperty(D.default.SCAN_TYPE) && (d.scanType = l.scanType), l.hasOwnProperty(D.default.MAX_PLAYOUT_RATE) && (d.maxPlayoutRate = l.maxPlayoutRate), l.hasOwnProperty(D.default.SEGMENT_BASE) ? (i = l.SegmentBase, d.segmentInfoType = D.default.SEGMENT_BASE) : l.hasOwnProperty(D.default.SEGMENT_LIST) ? (i = l.SegmentList).hasOwnProperty(D.default.SEGMENT_TIMELINE) ? (d.segmentInfoType = D.default.SEGMENT_TIMELINE, d.useCalculatedLiveEdgeTime = v(i.SegmentTimeline)) : (d.segmentInfoType = D.default.SEGMENT_LIST, d.useCalculatedLiveEdgeTime = !0) : l.hasOwnProperty(D.default.SEGMENT_TEMPLATE) ? ((i = l.SegmentTemplate).hasOwnProperty(D.default.SEGMENT_TIMELINE) ? (d.segmentInfoType = D.default.SEGMENT_TIMELINE, d.useCalculatedLiveEdgeTime = v(i.SegmentTimeline)) : d.segmentInfoType = D.default.SEGMENT_TEMPLATE, i.hasOwnProperty(D.default.INITIALIZATION_MINUS) && (d.initialization = i.initialization.split("$Bandwidth$").join(l.bandwidth).split("$RepresentationID$").join(l.id))) : d.segmentInfoType = D.default.BASE_URL, d.essentialProperties = (t = l) && t.EssentialProperty_asArray && t.EssentialProperty_asArray.length ? t.EssentialProperty_asArray.map(function(e) {
												return {
													schemeIdUri : e.schemeIdUri,
													value : e.value
												}
											}) : null, i) {
											if (i.hasOwnProperty(D.default.INITIALIZATION)) {
												var f = i.Initialization;
												f.hasOwnProperty(D.default.SOURCE_URL) ? d.initialization = f.sourceURL : f.hasOwnProperty(D.default.RANGE) && (d.range = f.range)
											} else l.hasOwnProperty(D.default.MIME_TYPE) && c(l.mimeType) && (d.range = 0);
											i.hasOwnProperty(D.default.TIMESCALE) && (d.timescale = i.timescale), i.hasOwnProperty(D.default.DURATION) && (d.segmentDuration = i.duration / d.timescale), i.hasOwnProperty(D.default.MEDIA) && (d.media = i.media), i.hasOwnProperty(D.default.START_NUMBER) && (d.startNumber = i.startNumber), i.hasOwnProperty(D.default.INDEX_RANGE) && (d.indexRange = i.indexRange), i.hasOwnProperty(D.default.PRESENTATION_TIME_OFFSET) && (d.presentationTimeOffset = i.presentationTimeOffset / d.timescale), i.hasOwnProperty(D.default.AVAILABILITY_TIME_OFFSET) ? d.availabilityTimeOffset = i.availabilityTimeOffset : a && void 0 !== a.availabilityTimeOffset && (d.availabilityTimeOffset = a.availabilityTimeOffset), i.hasOwnProperty(D.default.AVAILABILITY_TIME_COMPLETE) ? d.availabilityTimeComplete = "false" !== i.availabilityTimeComplete : a && void 0 !== a.availabilityTimeComplete && (d.availabilityTimeComplete = a.availabilityTimeComplete)
										}
										d.MSETimeOffset = S.calcMSETimeOffset(d), d.path = [ e.period.index, e.index, s ], n.push(d)
								}
								return n
							},
							getAdaptationsForPeriod : function(e) {
								var t = e && w(e.index) ? e.mpd.manifest.Period_asArray[e.index] : null,
									n = [],
									r = void 0,
									i = void 0,
									a = void 0;
								if (t && t.AdaptationSet_asArray)
									for (a = 0; a < t.AdaptationSet_asArray.length; a++) i = t.AdaptationSet_asArray[a], r = new M.default, i.hasOwnProperty(D.default.ID) && (r.id = i.id), r.index = a, r.period = e, d(i) ? r.type = C.default.MUXED : o(i) ? r.type = C.default.AUDIO : u(i) ? r.type = C.default.VIDEO : l(i) ? r.type = C.default.FRAGMENTED_TEXT : f(i) ? r.type = C.default.IMAGE : r.type = C.default.TEXT, n.push(r);
								return n
							},
							getRegularPeriods : function(e) {
								var t,
									n = !!e && m(e.manifest),
									r = [],
									i = null,
									a = null,
									o = null,
									s = null,
									u = void 0;
								for (u = 0, t = e && e.manifest && e.manifest.Period_asArray ? e.manifest.Period_asArray.length : 0; u < t; u++) (a = e.manifest.Period_asArray[u]).hasOwnProperty(D.default.START) ? (s = new N.default).start = a.start : null !== i && a.hasOwnProperty(D.default.DURATION) && null !== o ? ((s = new N.default).start = parseFloat((o.start + o.duration).toFixed(5)), s.duration = a.duration) : 0 !== u || n || ((s = new N.default).start = 0), null !== o && isNaN(o.duration) && (o.duration = parseFloat((s.start - o.start).toFixed(5))), null !== s && (s.id = y(a, u)), null !== s && a.hasOwnProperty(D.default.DURATION) && (s.duration = a.duration), null !== s && (s.index = u, s.mpd = e, r.push(s), i = a, o = s), s = a = null;
								return 0 === r.length || null !== o && isNaN(o.duration) && (o.duration = parseFloat((function(e) {
										var t = m(e.mpd.manifest),
											n = void 0;
										if (e.mpd.manifest.mediaPresentationDuration)
											n = e.mpd.manifest.mediaPresentationDuration;
										else if (e.duration)
											n = e.duration;else {
											if (!t)
												throw new Error("Must have @mediaPresentationDuration on MPD or an explicit @duration on the last period.");
											n = Number.POSITIVE_INFINITY
										}
										return n
									}(o) - o.start).toFixed(5))), r
							},
							getMpd : function(e) {
								var t = new a.default;
								return e && ((t.manifest = e).hasOwnProperty(D.default.AVAILABILITY_START_TIME) ? t.availabilityStartTime = new Date(e.availabilityStartTime.getTime()) : t.availabilityStartTime = new Date(e.loadedTime.getTime()), e.hasOwnProperty(D.default.AVAILABILITY_END_TIME) && (t.availabilityEndTime = new Date(e.availabilityEndTime.getTime())), e.hasOwnProperty(D.default.MINIMUM_UPDATE_PERIOD) && (t.minimumUpdatePeriod = e.minimumUpdatePeriod), e.hasOwnProperty(D.default.MEDIA_PRESENTATION_DURATION) && (t.mediaPresentationDuration = e.mediaPresentationDuration), e.hasOwnProperty(C.default.SUGGESTED_PRESENTATION_DELAY) && (t.suggestedPresentationDelay = e.suggestedPresentationDelay), e.hasOwnProperty(D.default.TIMESHIFT_BUFFER_DEPTH) && (t.timeShiftBufferDepth = e.timeShiftBufferDepth), e.hasOwnProperty(D.default.MAX_SEGMENT_DURATION) && (t.maxSegmentDuration = e.maxSegmentDuration)), t
							},
							getEventsForPeriod : function(e) {
								var t = e && e.mpd && e.mpd.manifest ? e.mpd.manifest : null,
									n = t ? t.Period_asArray : null,
									r = n && e && w(e.index) ? n[e.index].EventStream_asArray : null,
									i = [],
									a = void 0,
									o = void 0;
								if (r)
									for (a = 0; a < r.length; a++) {
										var s = new B.default;
										if (s.period = e, s.timescale = 1, !r[a].hasOwnProperty(C.default.SCHEME_ID_URI))
											throw new Error("Invalid EventStream. SchemeIdUri has to be set");
										for (s.schemeIdUri = r[a].schemeIdUri, r[a].hasOwnProperty(D.default.TIMESCALE) && (s.timescale = r[a].timescale), r[a].hasOwnProperty(D.default.VALUE) && (s.value = r[a].value), o = 0; o < r[a].Event_asArray.length; o++) {
											var u = new P.default;
											u.presentationTime = 0, u.eventStream = s, r[a].Event_asArray[o].hasOwnProperty(D.default.PRESENTATION_TIME) && (u.presentationTime = r[a].Event_asArray[o].presentationTime), r[a].Event_asArray[o].hasOwnProperty(D.default.DURATION) && (u.duration = r[a].Event_asArray[o].duration), r[a].Event_asArray[o].hasOwnProperty(D.default.ID) && (u.id = r[a].Event_asArray[o].id), i.push(u)
										}
								}
								return i
							},
							getEventStreamForAdaptationSet : function(e, t) {
								var n = void 0,
									r = void 0,
									i = void 0;
								return e && e.Period_asArray && t && t.period && w(t.period.index) && (r = e.Period_asArray[t.period.index]) && r.AdaptationSet_asArray && w(t.index) && (i = r.AdaptationSet_asArray[t.index]) && (n = i.InbandEventStream_asArray), E(n, null)
							},
							getEventStreamForRepresentation : function(e, t) {
								var n = void 0,
									r = void 0,
									i = void 0,
									a = void 0;
								return e && e.Period_asArray && t && t.adaptation && t.adaptation.period && w(t.adaptation.period.index) && (r = e.Period_asArray[t.adaptation.period.index]) && r.AdaptationSet_asArray && w(t.adaptation.index) && (i = r.AdaptationSet_asArray[t.adaptation.index]) && i.Representation_asArray && w(t.index) && (a = i.Representation_asArray[t.index]) && (n = a.InbandEventStream_asArray), E(n, t)
							},
							getUTCTimingSources : function(e) {
								var t = m(e),
									n = !!e && e.hasOwnProperty(D.default.AVAILABILITY_START_TIME),
									r = e ? e.UTCTiming_asArray : null,
									i = [];
								return (t || n) && r && r.forEach(function(e) {
									var t = new L.default;
									e.hasOwnProperty(C.default.SCHEME_ID_URI) && (t.schemeIdUri = e.schemeIdUri, e.hasOwnProperty(D.default.VALUE) && (t.value = e.value.toString(), i.push(t)))
								}), i
							},
							getBaseURLsFromElement : A,
							getRepresentationSortFunction : n,
							getLocation : function(e) {
								if (e && e.hasOwnProperty(C.default.LOCATION)) return e.Location = e.Location_asArray[0], e.Location
							},
							getUseCalculatedLiveEdgeTimeForAdaptation : function(e) {
								var t = _(e).Representation_asArray[0],
									n = void 0;
								return t.hasOwnProperty(D.default.SEGMENT_LIST) ? !(n = t.SegmentList).hasOwnProperty(D.default.SEGMENT_TIMELINE) || v(n.SegmentTimeline) : !(!t.hasOwnProperty(D.default.SEGMENT_TEMPLATE) || !(n = t.SegmentTemplate).hasOwnProperty(D.default.SEGMENT_TIMELINE)) && v(n.SegmentTimeline)
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var C = r(e(59)),
						D = r(e(18)),
						O = r(e(46)),
						M = r(e(40)),
						N = r(e(45)),
						a = r(e(44)),
						L = r(e(48)),
						P = r(e(42)),
						F = r(e(41)),
						B = r(e(43)),
						x = r(e(106)),
						k = r(e(108)),
						o = r(e(9));
					i.__dashjs_factory_name = "DashManifestModel", n.default = o.default.getSingletonFactory(i), t.exports = n.default
				}, {
					106 : 106,
					108 : 108,
					18 : 18,
					40 : 40,
					41 : 41,
					42 : 42,
					43 : 43,
					44 : 44,
					45 : 45,
					46 : 46,
					48 : 48,
					59 : 59,
					9 : 9
				} ],
				21 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						var e,
							t = this.context,
							a = (0, o.default)(t).getInstance().log,
							n = void 0;
						return e = {
								parse : function(e) {
									var t = {},
										n = window.performance.now();
									if (t.ProgramInformation = {
											Title : ""
										}, t.loadedTime = new Date, t.mediaPresentationDuration = e.duration, t.minBufferTime = e.minBufferTime, t.profiles = "urn:mpeg:dash:profile:isoff-on-demand:2011", t.xmlns = "urn:mpeg:dash:profile:isoff-on-demand:2011", t.type = "static", t.originalUrl = location.href, t.url = location.href, t.Period = {
											duration : e.duration,
											AdaptationSet : []
										}, e.video && (t.Period.AdaptationSet[0] = {}, t.Period.AdaptationSet[0].Representation = e.video.filter(function(e) {
											return 7 === e.codecid
										}).map(function(e) {
											var n = {
												__text : e.baseUrl
											};
											return e.backupUrl && e.backupUrl.forEach(function(e, t) {
													n["backupUrl" + (t + 1)] = e
												}), {
													BaseURL : n,
													SegmentBase : {
														Initialization : {
															range : e.SegmentBase.Initialization
														},
														indexRange : e.SegmentBase.indexRange,
														indexRangeExact : "true"
													},
													bandwidth : e.bandwidth,
													codecs : e.codecs,
													frameRate : e.frameRate,
													height : e.height,
													width : e.width,
													id : e.id + "",
													mimeType : e.mimeType,
													sar : e.sar,
													startWithSAP : e.startWithSAP
											}
										})), e.audio && (t.Period.AdaptationSet[1] = {}, t.Period.AdaptationSet[1].Representation = e.audio.map(function(e) {
											return {
												BaseURL : {
													__text : e.baseUrl
												},
												SegmentBase : {
													Initialization : {
														range : e.SegmentBase.Initialization
													},
													indexRange : e.SegmentBase.indexRange,
													indexRangeExact : "true"
												},
												bandwidth : e.bandwidth,
												codecs : e.codecs,
												id : e.id + "",
												mimeType : e.mimeType
											}
										})), t.ProgramInformation = {
											Title : ""
										}, function e(t) {
											var n = "[object Array]" !== Object.prototype.toString.call(t);
											for (var r in t) "object" == Fe(t[r]) && (e(t[r]), n && (t[r + "_asArray"] = "[object Array]" === Object.prototype.toString.call(t[r]) ? t[r] : [ t[r] ]))
										}(t), !t)
										throw new Error("parsing the manifest failed");
									var r = window.performance.now(),
										i = window.performance.now();
									return a("Parsing complete: ( xml2json: " + (r - n).toPrecision(3) + "ms, objectiron: " + (i - r).toPrecision(3) + "ms, total: " + ((i - n) / 1e3).toPrecision(3) + "s)"), t
								},
								getMatchers : function() {
									return null
								},
								getIron : function() {
									return n
								}
							}, n = (0, s.default)(t).create({
								adaptationset : new u.default,
								period : new l.default
							}), e
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var a = r(e(9)),
						o = r(e(7)),
						s = r(e(32)),
						u = r(e(25)),
						l = r(e(26));
					i.__dashjs_factory_name = "DashBilibiliParser", n.default = a.default.getClassFactory(i), t.exports = n.default
				}, {
					25 : 25,
					26 : 26,
					32 : 32,
					7 : 7,
					9 : 9
				} ],
				22 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						var e,
							t = this.context,
							a = (0, u.default)(t).getInstance().log,
							n = void 0,
							o = void 0,
							s = void 0;
						return e = {
								parse : function(e) {
									var t,
										n = window.performance.now();
									if (!(t = o.xml_str2json(e)))
										throw new Error("parsing the manifest failed");
									var r = window.performance.now();
									s.run(t);
									var i = window.performance.now();
									return a("Parsing complete: ( xml2json: " + (r - n).toPrecision(3) + "ms, objectiron: " + (i - r).toPrecision(3) + "ms, total: " + ((i - n) / 1e3).toPrecision(3) + "s)"), t
								},
								getMatchers : function() {
									return n
								},
								getIron : function() {
									return s
								}
							}, n = [ new c.default, new h.default, new p.default, new f.default ], o = new d.default({
								escapeMode : !1,
								attributePrefix : "",
								arrayAccessForm : "property",
								emptyNodeForm : "object",
								stripWhitespaces : !1,
								enableToStringFunc : !1,
								ignoreRoot : !0,
								matchers : n
							}), s = (0, l.default)(t).create({
								adaptationset : new g.default,
								period : new m.default
							}), e
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var a = r(e(9)),
						u = r(e(7)),
						l = r(e(32)),
						d = r(e(3)),
						f = r(e(31)),
						c = r(e(29)),
						h = r(e(28)),
						p = r(e(30)),
						g = r(e(25)),
						m = r(e(26));
					i.__dashjs_factory_name = "DashParser", n.default = a.default.getClassFactory(i), t.exports = n.default
				}, {
					25 : 25,
					26 : 26,
					28 : 28,
					29 : 29,
					3 : 3,
					30 : 30,
					31 : 31,
					32 : 32,
					7 : 7,
					9 : 9
				} ],
				23 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						i = function() {
							function n(e) {
								!function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								}(this, n);var t;
								this._name = e, this._merge = (t = e) && t.length && t.charAt(0) === t.charAt(0).toUpperCase()
							}
							return r(n, [ {
									key : "name",
									get : function() {
										return this._name
									}
								}, {
									key : "merge",
									get : function() {
										return this._merge
									}
								} ]), n
						}();
					n.default = i, t.exports = n.default
				}, {} ],
				24 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r,
						a = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						i = e(23),
						o = (r = i) && r.__esModule ? r : {
							default : r
						},
						s = function() {
							function i(e, t, n) {
								var r = this;
								(function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								})(this, i), this._name = e || "", this._properties = [], this._children = n || [], Array.isArray(t) && t.forEach(function(e) {
									r._properties.push(new o.default(e))
								})
							}
							return a(i, [ {
									key : "name",
									get : function() {
										return this._name
									}
								}, {
									key : "children",
									get : function() {
										return this._children
									}
								}, {
									key : "properties",
									get : function() {
										return this._properties
									}
								} ]), i
						}();
					n.default = s, t.exports = n.default
				}, {
					23 : 23
				} ],
				25 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i = r(e(24)),
						a = r(e(18)),
						o = function(e) {
							function t() {
								!function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								}(this, t);var e = [ a.default.PROFILES, a.default.WIDTH, a.default.HEIGHT, a.default.SAR, a.default.FRAMERATE, a.default.AUDIO_SAMPLING_RATE, a.default.MIME_TYPE, a.default.SEGMENT_PROFILES, a.default.CODECS, a.default.MAXIMUM_SAP_PERIOD, a.default.START_WITH_SAP, a.default.MAX_PLAYOUT_RATE, a.default.CODING_DEPENDENCY, a.default.SCAN_TYPE, a.default.FRAME_PACKING, a.default.AUDIO_CHANNEL_CONFIGURATION, a.default.CONTENT_PROTECTION, a.default.ESSENTIAL_PROPERTY, a.default.SUPPLEMENTAL_PROPERTY, a.default.INBAND_EVENT_STREAM ];
								(function(e, t, n) {
									for (var r = !0; r;) {
										var i = e,
											a = t,
											o = n;
										r = !1, null === i && (i = Function.prototype);var s = Object.getOwnPropertyDescriptor(i, a);
										if (void 0 !== s) {
											if ("value" in s) return s.value;
											var u = s.get;
											if (void 0 === u) return;
											return u.call(o)
										}
										var l = Object.getPrototypeOf(i);
										if (null === l) return;
										e = l, t = a, n = o, r = !0, s = l = void 0
									}
								})(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, a.default.ADAPTATION_SET, e, [ new i.default(a.default.REPRESENTATION, e, [ new i.default(a.default.SUB_REPRESENTATION, e) ]) ])
							}
							return function(e, t) {
									if ("function" != typeof t && null !== t)
										throw new TypeError("Super expression must either be null or a function, not " + Fe(t));
									e.prototype = Object.create(t && t.prototype, {
										constructor : {
											value : e,
											enumerable : !1,
											writable : !0,
											configurable : !0
										}
									}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
								}(t, i.default), t
						}();
					n.default = o, t.exports = n.default
				}, {
					18 : 18,
					24 : 24
				} ],
				26 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i = r(e(24)),
						a = r(e(18)),
						o = function(e) {
							function t() {
								!function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								}(this, t);var e = [ a.default.SEGMENT_BASE, a.default.SEGMENT_TEMPLATE, a.default.SEGMENT_LIST ];
								(function(e, t, n) {
									for (var r = !0; r;) {
										var i = e,
											a = t,
											o = n;
										r = !1, null === i && (i = Function.prototype);var s = Object.getOwnPropertyDescriptor(i, a);
										if (void 0 !== s) {
											if ("value" in s) return s.value;
											var u = s.get;
											if (void 0 === u) return;
											return u.call(o)
										}
										var l = Object.getPrototypeOf(i);
										if (null === l) return;
										e = l, t = a, n = o, r = !0, s = l = void 0
									}
								})(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, a.default.PERIOD, e, [ new i.default(a.default.ADAPTATION_SET, e, [ new i.default(a.default.REPRESENTATION, e) ]) ])
							}
							return function(e, t) {
									if ("function" != typeof t && null !== t)
										throw new TypeError("Super expression must either be null or a function, not " + Fe(t));
									e.prototype = Object.create(t && t.prototype, {
										constructor : {
											value : e,
											enumerable : !1,
											writable : !0,
											configurable : !0
										}
									}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
								}(t, i.default), t
						}();
					n.default = o, t.exports = n.default
				}, {
					18 : 18,
					24 : 24
				} ],
				27 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						i = function() {
							function n(e, t) {
								(function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								})(this, n), this._test = e, this._converter = t
							}
							return r(n, [ {
									key : "test",
									get : function() {
										return this._test
									}
								}, {
									key : "converter",
									get : function() {
										return this._converter
									}
								} ]), n
						}();
					n.default = i, t.exports = n.default
				}, {} ],
				28 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r,
						i = e(27),
						a = (r = i) && r.__esModule ? r : {
							default : r
						},
						o = /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?(?:([+-])([0-9]{2})(?::?)([0-9]{2}))?/,
						s = function(e) {
							function t() {
								(function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								})(this, t), function(e, t, n) {
									for (var r = !0; r;) {
										var i = e,
											a = t,
											o = n;
										r = !1, null === i && (i = Function.prototype);var s = Object.getOwnPropertyDescriptor(i, a);
										if (void 0 !== s) {
											if ("value" in s) return s.value;
											var u = s.get;
											if (void 0 === u) return;
											return u.call(o)
										}
										var l = Object.getPrototypeOf(i);
										if (null === l) return;
										e = l, t = a, n = o, r = !0, s = l = void 0
									}
								}(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, function(e) {
									return o.test(e.value)
								}, function(e) {
									var t = o.exec(e),
										n = void 0;
									if (n = Date.UTC(parseInt(t[1], 10), parseInt(t[2], 10) - 1, parseInt(t[3], 10), parseInt(t[4], 10), parseInt(t[5], 10), t[6] && parseInt(t[6], 10) || 0, t[7] && 1e3 * parseFloat(t[7]) || 0), t[9] && t[10]) {
										var r = 60 * parseInt(t[9], 10) + parseInt(t[10], 10);
										n += ("+" === t[8] ? -1 : 1) * r * 60 * 1e3
									}
									return new Date(n)
								})
							}
							return function(e, t) {
									if ("function" != typeof t && null !== t)
										throw new TypeError("Super expression must either be null or a function, not " + Fe(t));
									e.prototype = Object.create(t && t.prototype, {
										constructor : {
											value : e,
											enumerable : !1,
											writable : !0,
											configurable : !0
										}
									}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
								}(t, a.default), t
						}();
					n.default = s, t.exports = n.default
				}, {
					27 : 27
				} ],
				29 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i = r(e(27)),
						a = r(e(59)),
						o = r(e(18)),
						s = /^([-])?P(([\d.]*)Y)?(([\d.]*)M)?(([\d.]*)D)?T?(([\d.]*)H)?(([\d.]*)M)?(([\d.]*)S)?/,
						u = function(e) {
							function t() {
								(function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								})(this, t), function(e, t, n) {
									for (var r = !0; r;) {
										var i = e,
											a = t,
											o = n;
										r = !1, null === i && (i = Function.prototype);var s = Object.getOwnPropertyDescriptor(i, a);
										if (void 0 !== s) {
											if ("value" in s) return s.value;
											var u = s.get;
											if (void 0 === u) return;
											return u.call(o)
										}
										var l = Object.getPrototypeOf(i);
										if (null === l) return;
										e = l, t = a, n = o, r = !0, s = l = void 0
									}
								}(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, function(e) {
									for (var t = [ o.default.MIN_BUFFER_TIME, o.default.MEDIA_PRESENTATION_DURATION, o.default.MINIMUM_UPDATE_PERIOD, o.default.TIMESHIFT_BUFFER_DEPTH, o.default.MAX_SEGMENT_DURATION, o.default.MAX_SUBSEGMENT_DURATION, a.default.SUGGESTED_PRESENTATION_DELAY, o.default.START, a.default.START_TIME, o.default.DURATION ], n = t.length, r = 0; r < n; r++)
										if (e.nodeName === t[r]) return s.test(e.value);
									return !1
								}, function(e) {
									var t = s.exec(e),
										n = 31536e3 * parseFloat(t[2] || 0) + 2592e3 * parseFloat(t[4] || 0) + 86400 * parseFloat(t[6] || 0) + 3600 * parseFloat(t[8] || 0) + 60 * parseFloat(t[10] || 0) + parseFloat(t[12] || 0);
									return void 0 !== t[1] && (n = -n), n
								})
							}
							return function(e, t) {
									if ("function" != typeof t && null !== t)
										throw new TypeError("Super expression must either be null or a function, not " + Fe(t));
									e.prototype = Object.create(t && t.prototype, {
										constructor : {
											value : e,
											enumerable : !1,
											writable : !0,
											configurable : !0
										}
									}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
								}(t, i.default), t
						}();
					n.default = u, t.exports = n.default
				}, {
					18 : 18,
					27 : 27,
					59 : 59
				} ],
				30 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r,
						i = e(27),
						a = (r = i) && r.__esModule ? r : {
							default : r
						},
						o = /^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/,
						s = function(e) {
							function t() {
								(function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								})(this, t), function(e, t, n) {
									for (var r = !0; r;) {
										var i = e,
											a = t,
											o = n;
										r = !1, null === i && (i = Function.prototype);var s = Object.getOwnPropertyDescriptor(i, a);
										if (void 0 !== s) {
											if ("value" in s) return s.value;
											var u = s.get;
											if (void 0 === u) return;
											return u.call(o)
										}
										var l = Object.getPrototypeOf(i);
										if (null === l) return;
										e = l, t = a, n = o, r = !0, s = l = void 0
									}
								}(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, function(e) {
									return o.test(e.value)
								}, function(e) {
									return parseFloat(e)
								})
							}
							return function(e, t) {
									if ("function" != typeof t && null !== t)
										throw new TypeError("Super expression must either be null or a function, not " + Fe(t));
									e.prototype = Object.create(t && t.prototype, {
										constructor : {
											value : e,
											enumerable : !1,
											writable : !0,
											configurable : !0
										}
									}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
								}(t, a.default), t
						}();
					n.default = s, t.exports = n.default
				}, {
					27 : 27
				} ],
				31 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function a(e, t, n) {
						return t in e ? Object.defineProperty(e, t, {
								value : n,
								enumerable : !0,
								configurable : !0,
								writable : !0
							}) : e[t] = n, e
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i = r(e(27)),
						o = r(e(18)),
						s = function(e) {
							function t() {
								(function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								})(this, t), function(e, t, n) {
									for (var r = !0; r;) {
										var i = e,
											a = t,
											o = n;
										r = !1, null === i && (i = Function.prototype);var s = Object.getOwnPropertyDescriptor(i, a);
										if (void 0 !== s) {
											if ("value" in s) return s.value;
											var u = s.get;
											if (void 0 === u) return;
											return u.call(o)
										}
										var l = Object.getPrototypeOf(i);
										if (null === l) return;
										e = l, t = a, n = o, r = !0, s = l = void 0
									}
								}(Object.getPrototypeOf(t.prototype), "constructor", this).call(this, function(e, t) {
									var n,
										r = (a(n = {}, o.default.MPD, [ o.default.ID, o.default.PROFILES ]), a(n, o.default.PERIOD, [ o.default.ID ]), a(n, o.default.BASE_URL, [ o.default.SERVICE_LOCATION, o.default.BYTE_RANGE ]), a(n, o.default.SEGMENT_BASE, [ o.default.INDEX_RANGE ]), a(n, o.default.INITIALIZATION, [ o.default.RANGE ]), a(n, o.default.REPRESENTATION_INDEX, [ o.default.RANGE ]), a(n, o.default.SEGMENT_LIST, [ o.default.INDEX_RANGE ]), a(n, o.default.BITSTREAM_SWITCHING, [ o.default.RANGE ]), a(n, o.default.SEGMENT_URL, [ o.default.MEDIA_RANGE, o.default.INDEX_RANGE ]), a(n, o.default.SEGMENT_TEMPLATE, [ o.default.INDEX_RANGE, o.default.MEDIA, o.default.INDEX, o.default.INITIALIZATION_MINUS, o.default.BITSTREAM_SWITCHING_MINUS ]), a(n, o.default.ASSET_IDENTIFIER, [ o.default.VALUE, o.default.ID ]), a(n, o.default.EVENT_STREAM, [ o.default.VALUE ]), a(n, o.default.ADAPTATION_SET, [ o.default.PROFILES, o.default.MIME_TYPE, o.default.SEGMENT_PROFILES, o.default.CODECS, o.default.CONTENT_TYPE ]), a(n, o.default.FRAME_PACKING, [ o.default.VALUE, o.default.ID ]), a(n, o.default.AUDIO_CHANNEL_CONFIGURATION, [ o.default.VALUE, o.default.ID ]), a(n, o.default.CONTENT_PROTECTION, [ o.default.VALUE, o.default.ID ]), a(n, o.default.ESSENTIAL_PROPERTY, [ o.default.VALUE, o.default.ID ]), a(n, o.default.SUPPLEMENTAL_PROPERTY, [ o.default.VALUE, o.default.ID ]), a(n, o.default.INBAND_EVENT_STREAM, [ o.default.VALUE, o.default.ID ]), a(n, o.default.ACCESSIBILITY, [ o.default.VALUE, o.default.ID ]), a(n, o.default.ROLE, [ o.default.VALUE, o.default.ID ]), a(n, o.default.RATING, [ o.default.VALUE, o.default.ID ]), a(n, o.default.VIEWPOINT, [ o.default.VALUE, o.default.ID ]), a(n, o.default.CONTENT_COMPONENT, [ o.default.CONTENT_TYPE ]), a(n, o.default.REPRESENTATION, [ o.default.ID, o.default.DEPENDENCY_ID, o.default.MEDIA_STREAM_STRUCTURE_ID ]), a(n, o.default.SUBSET, [ o.default.ID ]), a(n, o.default.METRICS, [ o.default.METRICS_MINUS ]), a(n, o.default.REPORTING, [ o.default.VALUE, o.default.ID ]), n);
									if (r.hasOwnProperty(t)) {
										var i = r[t];
										return void 0 !== i && 0 <= i.indexOf(e.name)
									}
									return !1
								}, function(e) {
									return String(e)
								})
							}
							return function(e, t) {
									if ("function" != typeof t && null !== t)
										throw new TypeError("Super expression must either be null or a function, not " + Fe(t));
									e.prototype = Object.create(t && t.prototype, {
										constructor : {
											value : e,
											enumerable : !1,
											writable : !0,
											configurable : !0
										}
									}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
								}(t, i.default), t
						}();
					n.default = s, t.exports = n.default
				}, {
					18 : 18,
					27 : 27
				} ],
				32 : [ function(e, t, n) {
					"use strict";
					function r(d) {
						function u(e, t) {
							for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n])
						}
						function l(e, t, n) {
							for (var r = 0, i = e.length; r < i; ++r) {
								var a = e[r];
								if (t[a.name])
									if (n[a.name]) {
										if (a.merge) {
											var o = t[a.name],
												s = n[a.name];
											"object" == Fe(o) && "object" == Fe(s) ? u(o, s) : n[a.name] = o + s
										}
									} else
										n[a.name] = t[a.name]
							}
						}
						function f(e, t) {
							for (var n = 0, r = e.children.length; n < r; ++n) {
								var i = e.children[n],
									a = t[i.name + "_asArray"];
								if (a)
									for (var o = 0, s = a.length; o < s; ++o) {
										var u = a[o];
										l(e.properties, t, u), f(i, u)
								}
							}
						}
						return {
							run : function(e) {
								if (null === e || "object" != Fe(e)) return e;
								if ("period" in d)
									for (var t = d.period, n = e.Period_asArray, r = 0, i = n.length; r < i; ++r) {
										var a = n[r];
										if (f(t, a), "adaptationset" in d) {
											var o = a.AdaptationSet_asArray;
											if (o)
												for (var s = d.adaptationset, u = 0, l = o.length; u < l; ++u) f(s, o[u])
										}
								}
								return e
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i,
						a = e(9),
						o = (i = a) && i.__esModule ? i : {
							default : i
						};
					r.__dashjs_factory_name = "ObjectIron";
					var s = o.default.getClassFactory(r);
					n.default = s, t.exports = n.default
				}, {
					9 : 9
				} ],
				33 : [ function(e, t, n) {
					"use strict";
					function r(e, p) {
						var g = (e = e || {}).timelineConverter;
						return {
							getSegments : function(e, t, n, r) {
								var i,
									a,
									o,
									s,
									u = e.adaptation.period.mpd.manifest.Period_asArray[e.adaptation.period.index].AdaptationSet_asArray[e.adaptation.index].Representation_asArray[e.index].SegmentList,
									l = u.SegmentURL_asArray.length,
									d = [],
									f = void 0,
									c = void 0,
									h = void 0;
								for (s = e.startNumber, i = (0, m.decideSegmentListRangeForTemplate)(g, p, e, t, n, r), a = Math.max(i.start, 0), o = Math.min(i.end, u.SegmentURL_asArray.length - 1), f = a; f <= o; f++) h = u.SegmentURL_asArray[f], (c = (0, m.getIndexBasedSegment)(g, p, e, f)).replacementTime = (s + f - 1) * e.segmentDuration, c.media = h.media ? h.media : "", c.mediaRange = h.mediaRange, c.index = h.index, c.indexRange = h.indexRange, d.push(c), c = null;
								return e.availableSegmentsNumber = l, d
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i,
						a = e(9),
						o = (i = a) && i.__esModule ? i : {
							default : i
						},
						m = e(36);
					r.__dashjs_factory_name = "ListSegmentsGetter";
					var s = o.default.getClassFactory(r);
					n.default = s, t.exports = n.default
				}, {
					36 : 36,
					9 : 9
				} ],
				34 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						i = function() {
							function e() {
								!function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								}(this, e)
							}
							return r(e, null, [ {
									key : "round10",
									value : function(e, t) {
										return n = "round", r = e, void 0 === (i = t) || 0 == +i ? Math[n](r) : (i = +i, null === (r = +r) || isNaN(r) || "number" != typeof i || i % 1 != 0 ? NaN : (r = r.toString().split("e"), +((r = (r = Math[n](+(r[0] + "e" + (r[1] ? +r[1] - i : -i)))).toString().split("e"))[0] + "e" + (r[1] ? +r[1] + i : i))));
										var n,
											r,
											i
									}
								} ]), e
						}();
					n.default = i, t.exports = n.default
				}, {} ],
				35 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e, t) {
						var n,
							r = this.context,
							f = void 0,
							c = void 0,
							h = void 0;
						return n = {
								getSegments : function(e, t, n, r, i) {
									var a,
										o,
										s,
										u,
										l = void 0,
										d = e.segmentInfoType;
									d !== p.default.SEGMENT_BASE && d !== p.default.BASE_URL && (a = n, o = e.segments, u = s = void 0, !o || 0 === o.length || (u = o[0].availabilityIdx, s = o[o.length - 1].availabilityIdx, a < u || s < a)) ? (d === p.default.SEGMENT_TIMELINE ? l = f.getSegments(e, t, n, i) : d === p.default.SEGMENT_TEMPLATE ? l = c.getSegments(e, t, n, i) : d === p.default.SEGMENT_LIST && (l = h.getSegments(e, t, n, i)), r && r(e, l)) : l = e.segments
								}
							}, f = (0, o.default)(r).create(e, t), c = (0, s.default)(r).create(e, t), h = (0, u.default)(r).create(e, t), n
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var p = r(e(18)),
						a = r(e(9)),
						o = r(e(39)),
						s = r(e(37)),
						u = r(e(33));
					i.__dashjs_factory_name = "SegmentsGetter";
					var l = a.default.getClassFactory(i);
					n.default = l, t.exports = n.default
				}, {
					18 : 18,
					33 : 33,
					37 : 37,
					39 : 39,
					9 : 9
				} ],
				36 : [ function(e, t, n) {
					"use strict";
					function f(e, t) {
						for (; e.length < t;) e = "0" + e;
						return e
					}
					function g(e, t) {
						return e.representation.startNumber + t
					}
					function m(e, t, n) {
						var r = void 0,
							i = void 0,
							a = void 0,
							o = void 0,
							s = void 0,
							u = void 0,
							l = t.length,
							d = "%0".length;
						if (!e) return e;
						for (;;) {
							if ((r = e.indexOf("$" + t)) < 0) return e;
							if ((i = e.indexOf("$", r + l)) < 0) return e;
							if ((a = e.indexOf("%0", r + l)) > r && a < i) switch (o = e.charAt(i - 1), s = parseInt(e.substring(a + d, i - 1), 10), o) {
								case "d":
								case "i":
								case "u":
									u = f(n.toString(), s);
									break;case "x":
									u = f(n.toString(16), s);
									break;case "X":
									u = f(n.toString(16), s).toUpperCase();
									break;case "o":
									u = f(n.toString(8), s);
									break;default:
									return e
							}
							else
								u = n;
							e = e.substring(0, r) + u + e.substring(i + 1)
						}
					}
					function _(e, t) {
						if (!t || !t.segments) return null;
						var n = t.segments.length,
							r = void 0,
							i = void 0;
						if (e < n && (r = t.segments[e]) && r.availabilityIdx === e) return r;
						for (i = 0; i < n; i++)
							if ((r = t.segments[i]) && r.availabilityIdx === e) return r;
						return null
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					}), n.unescapeDollarsInTemplate = function(e) {
						return e ? e.split("$$").join("$") : e
					}, n.replaceIDForTemplate = function(e, t) {
						if (!t || !e || -1 === e.indexOf("$RepresentationID$")) return e;
						var n = t.toString();
						return e.split("$RepresentationID$").join(n)
					}, n.replaceTokenForTemplate = m, n.getIndexBasedSegment = function(e, t, n, r) {
						var i,
							a,
							o = void 0,
							s = void 0;
						return s = n.segmentDuration, isNaN(s) && (s = n.adaptation.period.duration), i = parseFloat((n.adaptation.period.start + r * s).toFixed(5)), a = parseFloat((i + s).toFixed(5)), (o = new v.default).representation = n, o.duration = s, o.presentationStartTime = i, o.mediaStartTime = e.calcMediaTimeFromPresentationTime(o.presentationStartTime, n), o.availabilityStartTime = e.calcAvailabilityStartTimeFromPresentationTime(o.presentationStartTime, n.adaptation.period.mpd, t), o.availabilityEndTime = e.calcAvailabilityEndTimeFromPresentationTime(a, n.adaptation.period.mpd, t), o.wallStartTime = e.calcWallTimeForSegment(o, t), o.replacementNumber = g(o, r), o.availabilityIdx = r, o
					}, n.getTimeBasedSegment = function(e, t, n, r, i, a, o, s, u, l) {
						var d,
							f,
							c = r / a,
							h = Math.min(i / a, n.adaptation.period.mpd.maxSegmentDuration),
							p = void 0;
						return f = (d = e.calcPresentationTimeFromMediaTime(c, n)) + h, (p = new v.default).representation = n, p.duration = h, p.mediaStartTime = c, p.presentationStartTime = d, p.availabilityStartTime = n.adaptation.period.mpd.manifest.loadedTime, p.availabilityEndTime = e.calcAvailabilityEndTimeFromPresentationTime(f, n.adaptation.period.mpd, t), p.wallStartTime = e.calcWallTimeForSegment(p, t), p.replacementTime = l || r, p.replacementNumber = g(p, u), o = m(o = m(o, "Number", p.replacementNumber), "Time", p.replacementTime), p.media = o, p.mediaRange = s, p.availabilityIdx = u, p
					}, n.getSegmentByIndex = _, n.decideSegmentListRangeForTemplate = function(e, t, n, r, i, a) {
						var o = n.segmentDuration,
							s = n.adaptation.period.mpd.manifest.minBufferTime,
							u = n.segmentAvailabilityRange,
							l = {
								start : e.calcPeriodRelativeTimeFromMpdRelativeTime(n, u.start),
								end : e.calcPeriodRelativeTimeFromMpdRelativeTime(n, u.end)
							},
							d = n.segments,
							f = 2 * o,
							c = a || Math.max(2 * s, 10 * o),
							h = NaN,
							p = null,
							g = void 0,
							m = void 0;
						return l.start = Math.max(l.start, 0), m = t && !e.isTimeSyncCompleted() ? (g = Math.floor(l.start / o), Math.floor(l.end / o)) : (h = d && 0 < d.length ? (p = _(i, n)) ? e.calcPeriodRelativeTimeFromMpdRelativeTime(n, p.presentationStartTime) : 0 < i ? i * o : e.calcPeriodRelativeTimeFromMpdRelativeTime(n, r) : 0 < i ? i * o : t ? l.end : l.start, g = Math.floor(Math.max(h - f, l.start) / o), Math.floor(Math.min(g + c / o, l.end / o))), {
								start : g,
								end : m
						}
					};
					var r,
						i = e(47),
						v = (r = i) && r.__esModule ? r : {
							default : r
					}
				}, {
					47 : 47
				} ],
				37 : [ function(e, t, n) {
					"use strict";
					function r(e, g) {
						var m = e.timelineConverter;
						return {
							getSegments : function(e, t, n, r) {
								var i,
									a,
									o,
									s,
									u = e.adaptation.period.mpd.manifest.Period_asArray[e.adaptation.period.index].AdaptationSet_asArray[e.adaptation.index].Representation_asArray[e.index].SegmentTemplate,
									l = e.segmentDuration,
									d = e.segmentAvailabilityRange,
									f = [],
									c = null,
									h = null,
									p = void 0;
								for (s = e.startNumber, a = (i = isNaN(l) && !g ? {
										start : s,
										end : s
									} : (0, _.decideSegmentListRangeForTemplate)(m, g, e, t, n, r)).start, o = i.end, p = a; p <= o; p++) (h = (0, _.getIndexBasedSegment)(m, g, e, p)).replacementTime = (s + p - 1) * e.segmentDuration, c = u.media, c = (0, _.replaceTokenForTemplate)(c, "Number", h.replacementNumber), c = (0, _.replaceTokenForTemplate)(c, "Time", h.replacementTime), h.media = c, f.push(h), h = null;
								return isNaN(l) ? e.availableSegmentsNumber = 1 : e.availableSegmentsNumber = Math.ceil((d.end - d.start) / l), f
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i,
						a = e(9),
						o = (i = a) && i.__esModule ? i : {
							default : i
						},
						_ = e(36);
					r.__dashjs_factory_name = "TemplateSegmentsGetter";
					var s = o.default.getClassFactory(r);
					n.default = s, t.exports = n.default
				}, {
					36 : 36,
					9 : 9
				} ],
				38 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						function t(e) {
							o = e
						}
						function r(e, t, n, r) {
							return r ? n && t.timeShiftBufferDepth != Number.POSITIVE_INFINITY ? new Date(t.availabilityStartTime.getTime() + 1e3 * (e + t.timeShiftBufferDepth)) : t.availabilityEndTime : n ? new Date(t.availabilityStartTime.getTime() + 1e3 * (e - o)) : t.availabilityStartTime
						}
						function u(e, t) {
							return (e.getTime() - t.mpd.availabilityStartTime.getTime() + 1e3 * o) / 1e3
						}
						function e(e) {
							l || void 0 !== e.offset && (t(e.offset / 1e3), l = !0)
						}
						function n() {
							o = 0, l = !1, s = NaN
						}
						var i = this.context,
							a = (0, d.default)(i).getInstance(),
							o = void 0,
							l = void 0,
							s = void 0;
						return {
							initialize : function() {
								n(), a.on(f.default.TIME_SYNCHRONIZATION_COMPLETED, e, this)
							},
							isTimeSyncCompleted : function() {
								return l
							},
							setTimeSyncCompleted : function(e) {
								l = e
							},
							getClientTimeOffset : function() {
								return o
							},
							setClientTimeOffset : t,
							getExpectedLiveEdge : function() {
								return s
							},
							setExpectedLiveEdge : function(e) {
								s = e
							},
							calcAvailabilityStartTimeFromPresentationTime : function(e, t, n) {
								return r.call(this, e, t, n)
							},
							calcAvailabilityEndTimeFromPresentationTime : function(e, t, n) {
								return r.call(this, e, t, n, !0)
							},
							calcPresentationTimeFromWallTime : u,
							calcPresentationTimeFromMediaTime : function(e, t) {
								return e + (t.adaptation.period.start - t.presentationTimeOffset)
							},
							calcPeriodRelativeTimeFromMpdRelativeTime : function(e, t) {
								return t - e.adaptation.period.start
							},
							calcMediaTimeFromPresentationTime : function(e, t) {
								return e - t.adaptation.period.start + t.presentationTimeOffset
							},
							calcSegmentAvailabilityRange : function(e, t) {
								var n = e.adaptation.period,
									r = {
										start : n.start,
										end : n.start + n.duration
									};
								if (!t) return r;
								if (!l && e.segmentAvailabilityRange) return e.segmentAvailabilityRange;
								var i = e.segmentDuration || (e.segments && e.segments.length ? e.segments[e.segments.length - 1].duration : 0),
									a = u(new Date, n),
									o = n.start + n.duration;
								r.start = Math.max(a - n.mpd.timeShiftBufferDepth, n.start);
								var s = void 0 !== e.availabilityTimeOffset && e.availabilityTimeOffset < i ? i - e.availabilityTimeOffset : i;
								return r.end = o <= a && a - s < o ? o : a - s, r
							},
							calcWallTimeForSegment : function(e, t) {
								var n = void 0,
									r = void 0,
									i = void 0;
								return t && (n = e.representation.adaptation.period.mpd.suggestedPresentationDelay, r = e.presentationStartTime + n, i = new Date(e.availabilityStartTime.getTime() + 1e3 * r)), i
							},
							calcMSETimeOffset : function(e) {
								var t = e.presentationTimeOffset;
								return e.adaptation.period.start - t
							},
							reset : function() {
								a.off(f.default.TIME_SYNCHRONIZATION_COMPLETED, e, this), n()
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var d = r(e(8)),
						f = r(e(12)),
						a = r(e(9));
					i.__dashjs_factory_name = "TimelineConverter", n.default = a.default.getSingletonFactory(i), t.exports = n.default
				}, {
					12 : 12,
					8 : 8,
					9 : 9
				} ],
				39 : [ function(e, t, n) {
					"use strict";
					function r(e, w) {
						var C = (e = e || {}).timelineConverter;
						return {
							getSegments : function(i, e, t, n) {
								if (function() {
										if (!(C && C.hasOwnProperty("calcMediaTimeFromPresentationTime") && C.hasOwnProperty("calcSegmentAvailabilityRange") && C.hasOwnProperty("calcMediaTimeFromPresentationTime")))
											throw new Error("Missing config parameter(s)")
									}(), !i)
									throw new Error("no representation");
								void 0 === e && (e = null);
								var r,
									a = i.adaptation.period.mpd.manifest.Period_asArray[i.adaptation.period.index].AdaptationSet_asArray[i.adaptation.index].Representation_asArray[i.index].SegmentTemplate || i.adaptation.period.mpd.manifest.Period_asArray[i.adaptation.period.index].AdaptationSet_asArray[i.adaptation.index].Representation_asArray[i.index].SegmentList,
									o = a.SegmentTimeline,
									s = a.SegmentURL_asArray,
									u = 0 < i.availableSegmentsNumber;
								r = n || (-1 < t || null !== e ? 10 : 1 / 0);
								var l,
									d,
									f,
									c = 0,
									h = 0,
									p = -1,
									g = [],
									m = null,
									_ = void 0,
									v = void 0,
									y = void 0,
									E = void 0,
									A = void 0,
									T = void 0,
									R = void 0,
									I = void 0,
									S = function(e, t) {
										var n = a.media,
											r = e.mediaRange;
										return s && (n = s[t].media || "", r = s[t].mediaRange), (0, D.getTimeBasedSegment)(C, w, i, c, e.d, I, n, r, p, e.tManifest)
									};
								for (I = i.timescale, l = o.S_asArray, f = t, null !== e && (m = C.calcMediaTimeFromPresentationTime(e, i)), v = 0, d = l.length; v < d; v++) {
									if (E = 0, (_ = l[v]).hasOwnProperty("r") && (E = _.r), _.hasOwnProperty("t") && (h = (c = _.t) / I), E < 0) {
										if ((T = l[v + 1]) && T.hasOwnProperty("t"))
											A = T.t / I;else {
											var b = i.segmentAvailabilityRange ? i.segmentAvailabilityRange.end : C.calcSegmentAvailabilityRange(i, w).end;
											A = C.calcMediaTimeFromPresentationTime(b, i), i.segmentDuration = _.d / I
										}
										E = Math.ceil((A - h) / (_.d / I)) - 1
									}
									if (R) {
										if (u) break;
										p += E + 1
									} else
										for (y = 0; y <= E; y++)
											if (p++, g.length > r) {
												if (R = !0, u) break
											} else null !== m ? h >= m - _.d / I * 1.5 && g.push(S(_, p)) : f <= p && g.push(S(_, p)), h = (c += _.d) / I
								}
								return u || (i.availableSegmentsNumber = p + 1), g
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i,
						a = e(9),
						o = (i = a) && i.__esModule ? i : {
							default : i
						},
						D = e(36);
					r.__dashjs_factory_name = "TimelineSegmentsGetter";
					var s = o.default.getClassFactory(r);
					n.default = s, t.exports = n.default
				}, {
					36 : 36,
					9 : 9
				} ],
				40 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.period = null, this.index = -1, this.type = null
					}, t.exports = n.default
				}, {} ],
				41 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function e(t, n, r, i) {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.url = t || "", this.serviceLocation = n || t || "", this.dvb_priority = r || 1, this.dvb_weight = i || 1, this.availabilityTimeOffset = 0, this.availabilityTimeComplete = !0
					};
					r.DEFAULT_DVB_PRIORITY = 1, r.DEFAULT_DVB_WEIGHT = 1, n.default = r, t.exports = n.default
				}, {} ],
				42 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.duration = NaN, this.presentationTime = NaN, this.id = NaN, this.messageData = "", this.eventStream = null, this.presentationTimeDelta = NaN
					}, t.exports = n.default
				}, {} ],
				43 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.adaptionSet = null, this.representation = null, this.period = null, this.timescale = 1, this.value = "", this.schemeIdUri = ""
					}, t.exports = n.default
				}, {} ],
				44 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.manifest = null, this.suggestedPresentationDelay = 0, this.availabilityStartTime = null, this.availabilityEndTime = Number.POSITIVE_INFINITY, this.timeShiftBufferDepth = Number.POSITIVE_INFINITY, this.maxSegmentDuration = Number.POSITIVE_INFINITY, this.minimumUpdatePeriod = NaN, this.mediaPresentationDuration = NaN
					}, t.exports = n.default
				}, {} ],
				45 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.id = null, this.index = -1, this.duration = NaN, this.start = NaN, this.mpd = null
					};
					r.DEFAULT_ID = "defaultId", n.default = r, t.exports = n.default
				}, {} ],
				46 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r,
						i = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						a = e(18),
						o = (r = a) && r.__esModule ? r : {
							default : r
						},
						s = function() {
							function e() {
								(function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								})(this, e), this.id = null, this.index = -1, this.adaptation = null, this.segmentInfoType = null, this.initialization = null, this.codecs = null, this.codecPrivateData = null, this.segmentDuration = NaN, this.timescale = 1, this.startNumber = 1, this.indexRange = null, this.range = null, this.presentationTimeOffset = 0, this.MSETimeOffset = NaN, this.segmentAvailabilityRange = null, this.availableSegmentsNumber = 0, this.bandwidth = NaN, this.width = NaN, this.height = NaN, this.scanType = null, this.maxPlayoutRate = NaN, this.availabilityTimeOffset = 0, this.availabilityTimeComplete = !0
							}
							return i(e, null, [ {
									key : "hasInitialization",
									value : function(e) {
										return null !== e.initialization || null !== e.range
									}
								}, {
									key : "hasSegments",
									value : function(e) {
										return e.segmentInfoType !== o.default.BASE_URL && e.segmentInfoType !== o.default.SEGMENT_BASE && !e.indexRange
									}
								} ]), e
						}();
					n.default = s, t.exports = n.default
				}, {
					18 : 18
				} ],
				47 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.indexRange = null, this.index = null, this.mediaRange = null, this.media = null, this.duration = NaN, this.replacementTime = null, this.replacementNumber = NaN, this.mediaStartTime = NaN, this.presentationStartTime = NaN, this.availabilityStartTime = NaN, this.availabilityEndTime = NaN, this.availabilityIdx = NaN, this.wallStartTime = NaN, this.representation = null
					}, t.exports = n.default
				}, {} ],
				48 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.schemeIdUri = "", this.value = ""
					}, t.exports = n.default
				}, {} ],
				49 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e) {
						e = e || {};var t = this.context,
							s = (0, l.default)(t).getInstance(),
							n = void 0,
							r = void 0;
						return n = {
								checkForExistence : function(t) {
									var e = function(e) {
										s.trigger(d.default.CHECK_FOR_EXISTENCE_COMPLETED, {
											request : t,
											exists : e
										})
									};
									if (t) {
										var n = new o.default(t.url);
										r.load({
											request : n,
											success : function() {
												e(!0)
											},
											error : function() {
												e(!1)
											}
										})
									} else e(!1)
								},
								load : function i(a) {
									var o = function(e, t) {
										s.trigger(d.default.LOADING_COMPLETED, {
											request : a,
											response : e || null,
											error : t || null,
											sender : n
										})
									};
									a ? (void 0 === a.retry && (a.retry = 1), r.load({
										request : a,
										progress : function(e) {
											s.trigger(d.default.LOADING_PROGRESS, {
												request : a
											}), e && s.trigger(d.default.LOADING_DATA_PROGRESS, {
												request : a,
												response : e || null,
												error : null,
												sender : n
											})
										},
										success : function(e) {
											try {
												var t = a.range && a.range.split("-"),
													n = t[1] - t[0] + 1,
													r = {
														mediaType : a.mediaType,
														id : a.representationId,
														index : a.index,
														range : a.range,
														received : e && e.byteLength || 0,
														url : a.url,
														startTime : a.startTime
													};
												e && 3e7 < e.byteLength && (r.code = f.default.DOWNLOAD_FRAGMENT_ERROR_RANGE, s.trigger(d.default.FRAGMENT_LOADED_ERROR, r)), e && e.byteLength === n ? (1 === a.retry || (r.code = f.default.DOWNLOAD_FRAGMENT_ERROR_RETRY_SUCCESS, s.trigger(d.default.FRAGMENT_LOADED_ERROR, r)), o(e)) : a.retry && 0 < a.retry ? (r.code = f.default.DOWNLOAD_FRAGMENT_ERROR, s.trigger(d.default.FRAGMENT_LOADED_ERROR, r), a.retry--, i(a)) : (r.code = f.default.DOWNLOAD_FRAGMENT_ERROR_RETRY_FAILURE, s.trigger(d.default.FRAGMENT_LOADED_ERROR, r))
											} catch (e) {
												console.error("FragmentLoader Load Error: ", e)
											}
										},
										error : function(e, t, n) {
											o(void 0, new u.default(1, n, t))
										},
										abort : function(e) {
											e && s.trigger(d.default.LOADING_ABANDONED, {
												request : e,
												mediaType : e.mediaType,
												sender : n
											})
										}
									})) : o(void 0, new u.default(2, "request is null"))
								},
								abort : function() {
									r && r.abort()
								},
								reset : function() {
									r && (r.abort(), r = null)
								}
							}, r = (0, a.default)(t).create({
								errHandler : e.errHandler,
								metricsModel : e.metricsModel,
								mediaPlayerModel : e.mediaPlayerModel,
								requestModifier : e.requestModifier,
								useFetch : e.mediaPlayerModel.getLowLatencyEnabled()
							}), n
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var a = r(e(82)),
						o = r(e(115)),
						u = r(e(112)),
						l = r(e(8)),
						d = r(e(12)),
						s = r(e(9)),
						f = r(e(60));
					i.__dashjs_factory_name = "FragmentLoader";
					var c = s.default.getClassFactory(i);
					c.FRAGMENT_LOADER_ERROR_LOADING_FAILURE = 1, c.FRAGMENT_LOADER_ERROR_NULL_REQUEST = 2, s.default.updateClassFactory(i.__dashjs_factory_name, c), n.default = c, t.exports = n.default
				}, {
					112 : 112,
					115 : 115,
					12 : 12,
					60 : 60,
					8 : 8,
					82 : 82,
					9 : 9
				} ],
				50 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e) {
						function t(e) {
							d.trigger(T.default.INTERNAL_MANIFEST_LOADED, {
								manifest : e.manifest
							})
						}
						function r(t, e, n, r) {
							if (h) {
								var i = void 0,
									a = void 0,
									o = void 0;
								if (r && r !== t ? (a = f.parseBaseUrl(r), i = r) : (f.isRelative(t) && (t = f.resolve(t, window.location.href)), a = f.parseBaseUrl(t)), null === p && (u = null, p = (s = e).video || s.audio ? (0, I.default)(l).create() : -1 < s.indexOf("SmoothStreamingMedia") ? (g && (u = g.createMssParser(), g.registerEvents()), u) : -1 < s.indexOf("MPD") ? (0, R.default)(l).create() : u), null === p) return void d.trigger(T.default.INTERNAL_MANIFEST_LOADED, {
										manifest : null,
										error : new y.default(1, "Failed detecting manifest type or manifest type unsupported : " + (r ? t : "MPD String"), null, _.default.MANIFEST_TYPE_ERROR)
									});
								h.setMatchers(p.getMatchers()), h.setIron(p.getIron());try {
									o = p.parse(e)
								} catch (e) {
									return void d.trigger(T.default.INTERNAL_MANIFEST_LOADED, {
										manifest : null,
										error : new y.default(1, "Failed parsing manifest : " + (r ? t : "MPD String"), null, _.default.MANIFEST_RESOLVE_ERROR)
									})
								}
								o ? (o.url = i || t, o.originalUrl || (o.originalUrl = o.url), o.hasOwnProperty(m.default.LOCATION) && (a = f.parseBaseUrl(o.Location_asArray[0]), c("BaseURI set by Location to: " + a)), o.baseUri = a, o.loadedTime = new Date, h.resolveManifestOnLoad(o)) : d.trigger(T.default.INTERNAL_MANIFEST_LOADED, {
									manifest : null,
									error : new y.default(1, "parsing failed", null, _.default.MANIFEST_ERROR)
								})
							}
							var s,
								u
						}
						e = e || {};var l = this.context,
							d = (0, A.default)(l).getInstance(),
							f = (0, u.default)(l).getInstance(),
							c = (0, S.default)(l).getInstance().log,
							n = void 0,
							a = void 0,
							h = void 0,
							p = void 0,
							g = e.mssHandler,
							i = e.errHandler;
						return n = {
								load : function(i) {
									if (!i || "string" != typeof i || 0 !== i.indexOf("http") && 0 !== i.indexOf("/")) r("", i, 0, "");else {
										var e = new v.default(i, E.HTTPRequest.MPD_TYPE);
										a.load({
											request : e,
											success : function(e, t, n) {
												r(i, e, 0, n)
											},
											error : function(e, t, n, r) {
												d.trigger(T.default.INTERNAL_MANIFEST_LOADED, {
													manifest : null,
													error : new y.default(2, "Failed loading manifest: " + i + ", " + n, null, _.default.MANIFEST_DOWNLOAD_ERROR, r)
												})
											}
										})
									}
								},
								reset : function() {
									d.off(T.default.XLINK_READY, t, n), h && (h.reset(), h = null), a && (a.abort(), a = null), g && g.reset()
								}
							}, d.on(T.default.XLINK_READY, t, n), a = (0, s.default)(l).create({
								errHandler : i,
								metricsModel : e.metricsModel,
								mediaPlayerModel : e.mediaPlayerModel,
								requestModifier : e.requestModifier
							}), h = (0, o.default)(l).create({
								errHandler : i,
								metricsModel : e.metricsModel,
								mediaPlayerModel : e.mediaPlayerModel,
								requestModifier : e.requestModifier
							}), p = null, n
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var m = r(e(59)),
						_ = r(e(60)),
						o = r(e(73)),
						s = r(e(82)),
						u = r(e(108)),
						v = r(e(123)),
						y = r(e(112)),
						E = e(129),
						A = r(e(8)),
						T = r(e(12)),
						a = r(e(9)),
						R = r(e(22)),
						I = r(e(21)),
						S = r(e(7));
					i.__dashjs_factory_name = "ManifestLoader";
					var l = a.default.getClassFactory(i);
					l.MANIFEST_LOADER_ERROR_PARSING_FAILURE = 1, l.MANIFEST_LOADER_ERROR_LOADING_FAILURE = 2, a.default.updateClassFactory(i.__dashjs_factory_name, l), n.default = l, t.exports = n.default
				}, {
					108 : 108,
					112 : 112,
					12 : 12,
					123 : 123,
					129 : 129,
					21 : 21,
					22 : 22,
					59 : 59,
					60 : 60,
					7 : 7,
					73 : 73,
					8 : 8,
					82 : 82,
					9 : 9
				} ],
				51 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						function e() {
							h = NaN, g = !(m = !1), t()
						}
						function t() {
							null !== p && (clearInterval(p), p = null)
						}
						function r(e) {
							t(), isNaN(e) && !isNaN(h) && (e = 1e3 * h), isNaN(e) || (f("Refresh manifest in " + e + " milliseconds."), p = setTimeout(a, e))
						}
						function n() {
							m = !0;var e = v.getValue(),
								t = e.url,
								n = y.getLocation(e);
							n && (t = n), _.load(t)
						}
						function i(e) {
							v.setValue(e);var t = new Date,
								n = (t.getTime() - e.loadedTime.getTime()) / 1e3;
							2147483647 < 1e3 * (h = y.getManifestUpdatePeriod(e, n)) && (h = 2147483.647), c.trigger(R.default.MANIFEST_UPDATED, {
								manifest : e
							}), f("Manifest has been refreshed at " + t + "[" + t.getTime() / 1e3 + "] "), g || r()
						}
						function a() {
							if (!g || E.getScheduleWhilePaused()) return m ? void r(E.getManifestUpdateRetryInterval()) : void n()
						}
						function o(e) {
							e.error ? A.manifestError(e.error.message, e.error.code, "", "", e.error.errorCode, e.error.httpCode) : i(e.manifest)
						}
						function s() {
							g = !1, r()
						}
						function u() {
							g = !0, t()
						}
						function l() {
							m = !1
						}
						var d = this.context,
							f = (0, I.default)(d).getInstance().log,
							c = (0, T.default)(d).getInstance(),
							h = void 0,
							p = void 0,
							g = void 0,
							m = void 0,
							_ = void 0,
							v = void 0,
							y = void 0,
							E = void 0,
							A = void 0;
						return {
							initialize : function() {
								e(), c.on(R.default.STREAMS_COMPOSED, l, this), c.on(R.default.PLAYBACK_STARTED, s, this), c.on(R.default.PLAYBACK_PAUSED, u, this), c.on(R.default.INTERNAL_MANIFEST_LOADED, o, this)
							},
							setManifest : function(e) {
								i(e)
							},
							refreshManifest : n,
							setConfig : function(e) {
								e && (e.manifestModel && (v = e.manifestModel), e.dashManifestModel && (y = e.dashManifestModel), e.mediaPlayerModel && (E = e.mediaPlayerModel), e.manifestLoader && (_ = e.manifestLoader), e.errHandler && (A = e.errHandler))
							},
							reset : function() {
								c.off(R.default.PLAYBACK_STARTED, s, this), c.off(R.default.PLAYBACK_PAUSED, u, this), c.off(R.default.STREAMS_COMPOSED, l, this), c.off(R.default.INTERNAL_MANIFEST_LOADED, o, this), e()
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var T = r(e(8)),
						R = r(e(12)),
						a = r(e(9)),
						I = r(e(7));
					i.__dashjs_factory_name = "ManifestUpdater", n.default = a.default.getClassFactory(i), t.exports = n.default
				}, {
					12 : 12,
					7 : 7,
					8 : 8,
					9 : 9
				} ],
				52 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						function t() {
							return !!B && !!ie.getElement()
						}
						function r() {
							return (0, Oe.getVersionString)()
						}
						function e() {
							if (!Q)
								throw S;
							return ee.isPaused()
						}
						function o(e) {
							var t = y(),
								n = ee.getLiveDelay();
							if (!t) return 0;
							var r = t.range.start + e;
							return r > t.range.end - n && (r = t.range.end - n), r
						}
						function n(e) {
							if (!Q)
								throw S;
							var t = c().currentTime;
							if (void 0 !== e)
								t = $.getTimeRelativeToStreamId(t, e);
							else if (ee.getIsDynamic()) {
								var n = y();
								t = null === n ? 0 : i() - (n.range.end - n.time)
							}
							return t
						}
						function i() {
							if (!Q)
								throw S;
							var e = c().duration;
							if (ee.getIsDynamic()) {
								var t,
									n = y();
								if (!n) return 0;
								e = (t = n.range.end - n.range.start) < n.manifestInfo.DVRWindowSize ? t : n.manifestInfo.DVRWindowSize
							}
							return e
						}
						function a(e) {
							G = e
						}
						function s(e, t) {
							u(e, t);var n = new de.default;
							n.schemeIdUri = e, n.value = t, X.getUTCTimingSources().push(n)
						}
						function u(n, r) {
							var i = X.getUTCTimingSources();
							i.forEach(function(e, t) {
								e.schemeIdUri === n && e.value === r && i.splice(t, 1)
							})
						}
						function l() {
							s(Ee.default.DEFAULT_UTC_TIMING_SOURCE.scheme, Ee.default.DEFAULT_UTC_TIMING_SOURCE.value)
						}
						function d() {
							return te
						}
						function f(e) {
							return z.getReadOnlyMetricsFor(e)
						}
						function c() {
							if (!ie.getElement())
								throw b;
							return ie.getElement()
						}
						function h(e) {
							if (!k)
								throw C;
							ie.setElement(e), e && (v(), function() {
								if (!H) {
									var e = dashjs.MetricsReporting;
									if ("function" == typeof e) {
										var t = e(O).create();
										H = t.createMetricsReporting({
											log : L,
											eventBus : M,
											mediaElement : c(),
											dashManifestModel : ne,
											metricsModel : z,
											events : we.default,
											constants : ue.default,
											metricsConstants : le.default
										})
									}
								}
							}(), function() {
								if (!Y) {
									var e = dashjs.MssHandler;
									"function" == typeof e && (Y = e(O).create({
										eventBus : M,
										mediaPlayerModel : X,
										metricsModel : z,
										playbackController : ee,
										protectionController : K,
										errHandler : J,
										events : we.default,
										constants : ue.default,
										log : L,
										initSegmentType : Fe.HTTPRequest.INIT_SEGMENT_TYPE,
										BASE64 : Be.default,
										ISOBoxer : xe.default
									}))
								}
							}(), $ && $.switchToVideoElement()), Q && m(), T()
						}
						function p(e) {
							if (!U)
								throw I;
							var t = $.getActiveStreamInfo();
							return t ? V.getTracksFor(e, t) : []
						}
						function g(e) {
							if (!k)
								throw C;
							"string" == typeof e && (0, ve.default)(O).getInstance().initialize(e), B = e, (U || Q) && m(), t() && T()
						}
						function m() {
							U = Q = !1, W.reset(), $.reset(), ee.reset(), j.reset(), V.reset(), K && (K.reset(), K = null, v())
						}
						function _() {
							return (0, pe.default)(O).create({
								errHandler : J,
								metricsModel : z,
								mediaPlayerModel : X,
								requestModifier : (0, _e.default)(O).getInstance(),
								mssHandler : Y
							})
						}
						function v() {
							if (K) return K;
							var e = dashjs.Protection;
							if ("function" != typeof e) return null;
							var t = e(O).create();
							return we.default.extend(e.events), Ce.default.extend(e.events, {
									publicOnly : !0
								}), Z || (Z = (0, me.default)(O).getInstance()), K = t.createProtectionSystem({
									log : L,
									errHandler : J,
									videoModel : ie,
									capabilities : Z,
									eventBus : M,
									events : we.default,
									BASE64 : Be.default,
									constants : ue.default
								})
						}
						function y() {
							var e = z.getReadOnlyMetricsFor(ue.default.VIDEO) || z.getReadOnlyMetricsFor(ue.default.AUDIO);
							return te.getCurrentDVRInfo(e)
						}
						function E(e) {
							var t = y();
							return t ? e + (t.manifestInfo.availableFrom.getTime() / 1e3 + t.range.start) : 0
						}
						function A() {
							if (!U)
								throw I;
							var e = $.getActiveStreamInfo();
							return e ? $.getStreamById(e.id) : null
						}
						function T() {
							var e;
							!U && B && (U = !0, L("Streaming Initialized"), e = _(), $ || ($ = (0, ce.default)(O).getInstance()), V.setConfig({
								errHandler : J,
								domStorage : ae
							}), $.setConfig({
								capabilities : Z,
								manifestLoader : e,
								manifestModel : re,
								dashManifestModel : ne,
								mediaPlayerModel : X,
								protectionController : K,
								adapter : W,
								metricsModel : z,
								dashMetrics : te,
								errHandler : J,
								timelineConverter : q,
								videoModel : ie,
								playbackController : ee,
								domStorage : ae,
								abrController : j,
								mediaController : V
							}), ee.setConfig({
								streamController : $,
								metricsModel : z,
								dashMetrics : te,
								manifestModel : re,
								mediaPlayerModel : X,
								dashManifestModel : ne,
								adapter : W,
								videoModel : ie
							}), j.setConfig({
								streamController : $,
								domStorage : ae,
								mediaPlayerModel : X,
								metricsModel : z,
								dashMetrics : te,
								dashManifestModel : ne,
								manifestModel : re,
								videoModel : ie,
								adapter : W
							}), j.createAbrRulesCollection(), $.initialize(G, x), B.video || B.audio || "string" == typeof B ? $.load(B) : $.loadWithManifest(B)), !Q && t() && (Q = !0, L("Playback Initialized"))
						}
						function R(u) {
							try {
								u && u.mediaType && function() {
									var e = u.mediaType,
										t = oe[e],
										n = u.segments,
										r = u.representation && u.representation.index,
										i = !0,
										a = [],
										o = {};
									t.total && (t.segments.forEach(function(e, t) {
										e.duration !== n[t].duration && a.push(t)
									}), a.length && (i = !1, o = {
										old : t.qualityIndex,
										new : r
									}));
									var s = {
										total : n && n.length,
										segments : n,
										isDurationAllEqual : i,
										qualityIndex : r
									};
									i || (s.notEqualIndexList = a, s.notEqualQualityIndex = o), oe[u.mediaType] = s, "function" == typeof se && se(e, s)
								}()
							} catch (e) {
								throw new Error("Parse segment loaded error, " + e)
							}
						}
						var I = "You must first call initialize() and set a source before calling this method",
							S = "You must first call initialize() and set a valid source and view before calling this method",
							b = "You must first call attachView() to set the video element before calling this method",
							w = "You must first call attachSource() with a valid source before calling this method",
							C = "MediaPlayer not initialized!",
							D = "MediaPlayer Invalid Arguments!",
							O = this.context,
							M = (0, be.default)(O).getInstance(),
							N = (0, Se.default)(O).getInstance(),
							L = N.log,
							P = NaN,
							F = void 0,
							B = void 0,
							x = void 0,
							k = void 0,
							U = void 0,
							Q = void 0,
							G = void 0,
							j = void 0,
							q = void 0,
							V = void 0,
							K = void 0,
							H = void 0,
							Y = void 0,
							W = void 0,
							z = void 0,
							X = void 0,
							J = void 0,
							Z = void 0,
							$ = void 0,
							ee = void 0,
							te = void 0,
							ne = void 0,
							re = void 0,
							ie = void 0,
							ae = void 0,
							oe = {
								video : {},
								audio : {}
							},
							se = null;
						return G = !(U = Q = k = !(F = {
										initialize : function(e, t, n) {
											P = new Date, Z || (Z = (0, me.default)(O).getInstance()), J = (0, ge.default)(O).getInstance(), Z.supportsMediaSource() ? k || (k = !0, q = (0, Pe.default)(O).getInstance(), j || (j = (0, Te.default)(O).getInstance()), ee || (ee = (0, fe.default)(O).getInstance()), V || (V = (0, he.default)(O).getInstance()), W = (0, Me.default)(O).getInstance(), ne = (0, Ne.default)(O).getInstance({
												mediaController : V,
												timelineConverter : q,
												adapter : W
											}), re = (0, ye.default)(O).getInstance(), te = (0, Le.default)(O).getInstance({
												manifestModel : re,
												dashManifestModel : ne
											}), z = (0, Ae.default)(O).getInstance(), ae = (0, Ie.default)(O).getInstance({
												mediaPlayerModel : X
											}), W.setConfig({
												dashManifestModel : ne
											}), z.setConfig({
												adapter : W
											}), l(), a(void 0 === n || n), e && h(e), t && g(t), L("[dash.js " + r() + "] MediaPlayer has been initialized")) : J.capabilityError("mediasource")
										},
										setConfig : function(e) {
											e && (e.capabilities && (Z = e.capabilities), e.streamController && ($ = e.streamController), e.playbackController && (ee = e.playbackController), e.mediaPlayerModel && (X = e.mediaPlayerModel), e.abrController && (j = e.abrController), e.mediaController && (V = e.mediaController))
										},
										on : function(e, t, n) {
											M.on(e, t, n)
										},
										off : function(e, t, n) {
											M.off(e, t, n)
										},
										extend : function(e, t, n) {
											De.default.extend(e, t, n, O)
										},
										attachView : h,
										attachSource : g,
										isReady : t,
										preload : function() {
											if (ie.getElement() || U) return !1;
											if (!B)
												throw w;
											T()
										},
										play : function() {
											if (!Q)
												throw S;
											(!G || e() && Q) && ee.play()
										},
										isPaused : e,
										pause : function() {
											if (!Q)
												throw S;
											ee.pause()
										},
										isSeeking : function() {
											if (!Q)
												throw S;
											return ee.isSeeking()
										},
										isDynamic : function() {
											if (!Q)
												throw S;
											return ee.getIsDynamic()
										},
										seek : function(e) {
											if (!Q)
												throw S;
											if ("number" != typeof e || isNaN(e))
												throw D;
											var t = ee.getIsDynamic() ? o(e) : e;
											ee.seek(t)
										},
										setPlaybackRate : function(e) {
											if (!ie.getElement())
												throw b;
											c().playbackRate = e
										},
										getPlaybackRate : function() {
											if (!ie.getElement())
												throw b;
											return c().playbackRate
										},
										setMute : function(e) {
											if (!ie.getElement())
												throw b;
											c().muted = e
										},
										isMuted : function() {
											if (!ie.getElement())
												throw b;
											return c().muted
										},
										setVolume : function(e) {
											if (!ie.getElement())
												throw b;
											c().volume = e
										},
										getVolume : function() {
											if (!ie.getElement())
												throw b;
											return c().volume
										},
										time : n,
										duration : i,
										timeAsUTC : function() {
											if (!Q)
												throw S;
											return n() < 0 ? NaN : E(n())
										},
										durationAsUTC : function() {
											if (!Q)
												throw S;
											return E(i())
										},
										getActiveStream : A,
										getDVRWindowSize : function() {
											var e = y();
											return e ? e.manifestInfo.DVRWindowSize : 0
										},
										getDVRSeekOffset : o,
										convertToTimeCode : function(e) {
											e = Math.max(e, 0);
											var t = Math.floor(e / 3600),
												n = Math.floor(e % 3600 / 60),
												r = Math.floor(e % 3600 % 60);
											return (0 === t ? "" : t < 10 ? "0" + t.toString() + ":" : t.toString() + ":") + (n < 10 ? "0" + n.toString() : n.toString()) + ":" + (r < 10 ? "0" + r.toString() : r.toString())
										},
										formatUTC : function(e, t, n) {
											var r = !(arguments.length <= 3 || void 0 === arguments[3]) && arguments[3],
												i = new Date(1e3 * e),
												a = i.toLocaleDateString(t),
												o = i.toLocaleTimeString(t, {
													hour12 : n
												});
											return r ? o + " " + a : o
										},
										getVersion : r,
										getDebug : function() {
											return N
										},
										getBufferLength : function(e) {
											var t,
												n = [ ue.default.VIDEO, ue.default.AUDIO, ue.default.FRAGMENTED_TEXT ];
											return e ? -1 === n.indexOf(e) ? (L("Warning  - getBufferLength requested for invalid type"), NaN) : (t = d().getCurrentBufferLevel(f(e))) || NaN : (t = n.map(function(e) {
												return 0 < p(e).length ? d().getCurrentBufferLevel(f(e)) : Number.MAX_VALUE
											}).reduce(function(e, t) {
												return Math.min(e, t)
											})) === Number.MAX_VALUE ? NaN : t
										},
										getVideoContainer : function() {
											return ie ? ie.getVideoContainer() : null
										},
										getTTMLRenderingDiv : function() {
											return ie ? ie.getTTMLRenderingDiv() : null
										},
										getVideoElement : c,
										getSource : function() {
											if (!B)
												throw w;
											return B
										},
										setLiveDelayFragmentCount : function(e) {
											X.setLiveDelayFragmentCount(e)
										},
										setLiveDelay : function(e) {
											X.setLiveDelay(e)
										},
										getLiveDelay : function() {
											return X.getLiveDelay()
										},
										getCurrentLiveLatency : function() {
											if (!k)
												throw C;
											return Q ? ee.getCurrentLiveLatency() : NaN
										},
										useSuggestedPresentationDelay : function(e) {
											X.setUseSuggestedPresentationDelay(e)
										},
										enableLastBitrateCaching : function(e, t) {
											X.setLastBitrateCachingInfo(e, t)
										},
										enableLastMediaSettingsCaching : function(e, t) {
											X.setLastMediaSettingsCachingInfo(e, t)
										},
										setMaxAllowedBitrateFor : function(e, t) {
											j.setMaxAllowedBitrateFor(e, t)
										},
										getMaxAllowedBitrateFor : function(e) {
											return j.getMaxAllowedBitrateFor(e)
										},
										getTopBitrateInfoFor : function(e) {
											if (!U)
												throw I;
											return j.getTopBitrateInfoFor(e)
										},
										setMinAllowedBitrateFor : function(e, t) {
											j.setMinAllowedBitrateFor(e, t)
										},
										getMinAllowedBitrateFor : function(e) {
											return j.getMinAllowedBitrateFor(e)
										},
										setMaxAllowedRepresentationRatioFor : function(e, t) {
											j.setMaxAllowedRepresentationRatioFor(e, t)
										},
										getMaxAllowedRepresentationRatioFor : function(e) {
											return j.getMaxAllowedRepresentationRatioFor(e)
										},
										setAutoPlay : a,
										getAutoPlay : function() {
											return G
										},
										setScheduleWhilePaused : function(e) {
											X.setScheduleWhilePaused(e)
										},
										getScheduleWhilePaused : function() {
											return X.getScheduleWhilePaused()
										},
										getDashMetrics : d,
										getMetricsFor : f,
										getQualityFor : function(e) {
											if (!U)
												throw I;
											return j.getQualityFor(e, $.getActiveStreamInfo())
										},
										setQualityFor : function(e, t) {
											if (!U)
												throw I;
											j.setPlaybackQuality(e, $.getActiveStreamInfo(), t)
										},
										updatePortalSize : function() {
											j.setElementSize(), j.setWindowResizeEventCalled(!0)
										},
										getLimitBitrateByPortal : function() {
											return j.getLimitBitrateByPortal()
										},
										setLimitBitrateByPortal : function(e) {
											j.setLimitBitrateByPortal(e)
										},
										getUsePixelRatioInLimitBitrateByPortal : function() {
											return j.getUsePixelRatioInLimitBitrateByPortal()
										},
										setUsePixelRatioInLimitBitrateByPortal : function(e) {
											j.setUsePixelRatioInLimitBitrateByPortal(e)
										},
										getBitrateInfoListFor : function(e) {
											if (!U)
												throw I;
											var t = A();
											return t ? t.getBitrateListFor(e) : []
										},
										setInitialBitrateFor : function(e, t) {
											j.setInitialBitrateFor(e, t)
										},
										getInitialBitrateFor : function(e) {
											if (!U)
												throw I;
											return j.getInitialBitrateFor(e)
										},
										setInitialRepresentationRatioFor : function(e, t) {
											j.setInitialRepresentationRatioFor(e, t)
										},
										getInitialRepresentationRatioFor : function(e) {
											return j.getInitialRepresentationRatioFor(e)
										},
										getStreamsFromManifest : function(e) {
											if (!U)
												throw I;
											return W.getStreamsInfo(e)
										},
										getTracksFor : p,
										getTracksForTypeFromManifest : function(e, t, n) {
											if (!U)
												throw I;
											return (n = n || W.getStreamsInfo(t, 1)[0]) ? W.getAllMediaInfoForType(n, e, t) : []
										},
										getCurrentTrackFor : function(e) {
											if (!U)
												throw I;
											var t = $.getActiveStreamInfo();
											return t ? V.getCurrentTrackFor(e, t) : null
										},
										setInitialMediaSettingsFor : function(e, t) {
											if (!k)
												throw C;
											V.setInitialSettings(e, t)
										},
										getInitialMediaSettingsFor : function(e) {
											if (!k)
												throw C;
											return V.getInitialSettings(e)
										},
										setCurrentTrack : function(e) {
											if (!U)
												throw I;
											V.setTrack(e)
										},
										getTrackSwitchModeFor : function(e) {
											if (!k)
												throw C;
											return V.getSwitchMode(e)
										},
										setTrackSwitchModeFor : function(e, t) {
											if (!k)
												throw C;
											V.setSwitchMode(e, t)
										},
										setSelectionModeForInitialTrack : function(e) {
											if (!k)
												throw C;
											V.setSelectionModeForInitialTrack(e)
										},
										getSelectionModeForInitialTrack : function() {
											if (!k)
												throw C;
											return V.getSelectionModeForInitialTrack()
										},
										setFastSwitchEnabled : function(e) {
											X.setFastSwitchEnabled(e)
										},
										getFastSwitchEnabled : function() {
											return X.getFastSwitchEnabled()
										},
										setMovingAverageMethod : function(e) {
											e === ue.default.MOVING_AVERAGE_SLIDING_WINDOW || e === ue.default.MOVING_AVERAGE_EWMA ? X.setMovingAverageMethod(e) : L("Warning: Ignoring setMovingAverageMethod(" + e + ") - unknown value.")
										},
										getMovingAverageMethod : function() {
											return X.getMovingAverageMethod()
										},
										getAutoSwitchQualityFor : function(e) {
											return j.getAutoSwitchBitrateFor(e)
										},
										setAutoSwitchQualityFor : function(e, t) {
											j.setAutoSwitchBitrateFor(e, t)
										},
										setABRStrategy : function(e) {
											e === ue.default.ABR_STRATEGY_DYNAMIC || e === ue.default.ABR_STRATEGY_BOLA || e === ue.default.ABR_STRATEGY_THROUGHPUT ? X.setABRStrategy(e) : L("Warning: Ignoring setABRStrategy(" + e + ") - unknown value.")
										},
										getABRStrategy : function() {
											return X.getABRStrategy()
										},
										useDefaultABRRules : function(e) {
											X.setUseDefaultABRRules(e)
										},
										addABRCustomRule : function(e, t, n) {
											X.addABRCustomRule(e, t, n)
										},
										removeABRCustomRule : function(e) {
											X.removeABRCustomRule(e)
										},
										removeAllABRCustomRule : function() {
											X.removeAllABRCustomRule()
										},
										setBandwidthSafetyFactor : function(e) {
											X.setBandwidthSafetyFactor(e)
										},
										getBandwidthSafetyFactor : function() {
											return X.getBandwidthSafetyFactor()
										},
										getAverageThroughput : function(e) {
											var t = j.getThroughputHistory();
											return t ? t.getAverageThroughput(e) : 0
										},
										setAbandonLoadTimeout : function(e) {
											X.setAbandonLoadTimeout(e)
										},
										retrieveManifest : function(e, n) {
											var r = _(),
												i = this;
											M.on(we.default.INTERNAL_MANIFEST_LOADED, function e(t) {
												t.error ? n(null, t.error) : n(t.manifest), M.off(we.default.INTERNAL_MANIFEST_LOADED, e, i), r.reset()
											}, i), (0, ve.default)(O).getInstance().initialize(e), r.load(e)
										},
										addUTCTimingSource : s,
										removeUTCTimingSource : u,
										clearDefaultUTCTimingSources : function() {
											X.setUTCTimingSources([])
										},
										restoreDefaultUTCTimingSources : l,
										setBufferToKeep : function(e) {
											X.setBufferToKeep(e)
										},
										setBufferAheadToKeep : function(e) {
											X.setBufferAheadToKeep(e)
										},
										setBufferPruningInterval : function(e) {
											X.setBufferPruningInterval(e)
										},
										setStableBufferTime : function(e) {
											X.setStableBufferTime(e)
										},
										getStableBufferTime : function() {
											return X.getStableBufferTime()
										},
										setBufferTimeAtTopQuality : function(e) {
											X.setBufferTimeAtTopQuality(e)
										},
										getBufferTimeAtTopQuality : function() {
											return X.getBufferTimeAtTopQuality()
										},
										setBufferTimeAtTopQualityLongForm : function(e) {
											X.setBufferTimeAtTopQualityLongForm(e)
										},
										getBufferTimeAtTopQualityLongForm : function() {
											return X.getBufferTimeAtTopQualityLongForm()
										},
										setFragmentLoaderRetryAttempts : function(e) {
											X.setFragmentRetryAttempts(e)
										},
										setFragmentLoaderRetryInterval : function(e) {
											X.setFragmentRetryInterval(e)
										},
										setManifestLoaderRetryAttempts : function(e) {
											X.setManifestRetryAttempts(e)
										},
										setManifestLoaderRetryInterval : function(e) {
											X.setManifestRetryInterval(e)
										},
										setXHRWithCredentialsForType : function(e, t) {
											X.setXHRWithCredentialsForType(e, t)
										},
										getXHRWithCredentialsForType : function(e) {
											return X.getXHRWithCredentialsForType(e)
										},
										setJumpGaps : function(e) {
											X.setJumpGaps(e)
										},
										getJumpGaps : function() {
											return X.getJumpGaps()
										},
										setSmallGapLimit : function(e) {
											X.setSmallGapLimit(e)
										},
										getSmallGapLimit : function() {
											return X.getSmallGapLimit()
										},
										getLowLatencyEnabled : function() {
											return X.getLowLatencyEnabled()
										},
										setLowLatencyEnabled : function(e) {
											return X.setLowLatencyEnabled(e)
										},
										setManifestUpdateRetryInterval : function(e) {
											X.setManifestUpdateRetryInterval(e)
										},
										getManifestUpdateRetryInterval : function() {
											return X.getManifestUpdateRetryInterval()
										},
										setLongFormContentDurationThreshold : function(e) {
											X.setLongFormContentDurationThreshold(e)
										},
										setSegmentOverlapToleranceTime : function(e) {
											X.setSegmentOverlapToleranceTime(e)
										},
										setCacheLoadThresholdForType : function(e, t) {
											X.setCacheLoadThresholdForType(e, t)
										},
										getProtectionController : function() {
											return v()
										},
										attachProtectionController : function(e) {
											K = e
										},
										setProtectionData : function(e) {
											x = e, $ && $.setProtectionData(x)
										},
										enableManifestDateHeaderTimeSource : function(e) {
											X.setUseManifestDateHeaderTimeSource(e)
										},
										attachVideoContainer : function(e) {
											if (!ie.getElement())
												throw b;
											ie.setVideoContainer(e)
										},
										attachTTMLRenderingDiv : function(e) {
											if (!ie.getElement())
												throw b;
											ie.setTTMLRenderingDiv(e)
										},
										getUseDeadTimeLatencyForAbr : function() {
											return j.getUseDeadTimeLatency()
										},
										setUseDeadTimeLatencyForAbr : function(e) {
											j.setUseDeadTimeLatency(e)
										},
										getThumbnail : function(e) {
											if (e < 0) return null;
											var t = ee.getIsDynamic() ? o(e) : e,
												n = $.getStreamForTime(t);
											if (null === n) return null;
											var r = n.getThumbnailController(),
												i = n.getStreamInfo();
											if (!r || !i) return null;
											var a = $.getTimeRelativeToStreamId(t, n.getId());
											return r.get(a)
										},
										setDefaultQualityFor : function(e, t) {
											j.setDefaultQualityFor(e, t)
										},
										getDefaultQualityFor : function(e) {
											return j.getDefaultQualityFor(e)
										},
										getDroppedFramesInfo : function() {
											return j.getDroppedFramesInfo()
										},
										getCurrentSegmentInfoFor : function(e) {
											return j.getCurrentSegmentInfoFor(e)
										},
										onInitSegmentsLoaded : function(e) {
											se = e
										},
										getThroughputDict : function(e) {
											var t = j.getThroughputHistory();
											return t ? t.getDict(e) : {}
										},
										getInitializeDate : function() {
											return P
										},
										reset : function() {
											g(null), h(null), x = null, K && (K.reset(), K = null), H && (H.reset(), H = null), M.off(we.default.SEGMENTS_LOADED, R, F)
										}
									})), W = x = K = null, we.default.extend(Ce.default), X = (0, Ee.default)(O).getInstance(), ie = (0, Re.default)(O).getInstance(), M.on(we.default.SEGMENTS_LOADED, R, F), F
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var ue = r(e(59)),
						le = r(e(61)),
						de = r(e(48)),
						fe = r(e(69)),
						ce = r(e(71)),
						he = r(e(67)),
						pe = r(e(50)),
						ge = r(e(102)),
						me = r(e(100)),
						_e = r(e(107)),
						ve = r(e(79)),
						ye = r(e(76)),
						Ee = r(e(77)),
						Ae = r(e(78)),
						Te = r(e(62)),
						Re = r(e(80)),
						Ie = r(e(101)),
						Se = r(e(7)),
						be = r(e(8)),
						we = r(e(12)),
						Ce = r(e(53)),
						De = r(e(9)),
						Oe = e(10),
						Me = r(e(14)),
						Ne = r(e(20)),
						Le = r(e(16)),
						Pe = r(e(38)),
						Fe = e(129),
						Be = r(e(1)),
						xe = r(e(5));
					i.__dashjs_factory_name = "MediaPlayer";
					var a = De.default.getClassFactory(i);
					a.events = Ce.default, De.default.updateClassFactory(i.__dashjs_factory_name, a), n.default = a, t.exports = n.default
				}, {
					1 : 1,
					10 : 10,
					100 : 100,
					101 : 101,
					102 : 102,
					107 : 107,
					12 : 12,
					129 : 129,
					14 : 14,
					16 : 16,
					20 : 20,
					38 : 38,
					48 : 48,
					5 : 5,
					50 : 50,
					53 : 53,
					59 : 59,
					61 : 61,
					62 : 62,
					67 : 67,
					69 : 69,
					7 : 7,
					71 : 71,
					76 : 76,
					77 : 77,
					78 : 78,
					79 : 79,
					8 : 8,
					80 : 80,
					9 : 9
				} ],
				53 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r,
						i = e(13),
						a = (r = i) && r.__esModule ? r : {
							default : r
						},
						o = new (function(e) {
							function t() {
								(function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								})(this, t), function(e, t, n) {
									for (var r = !0; r;) {
										var i = e,
											a = t,
											o = n;
										r = !1, null === i && (i = Function.prototype);var s = Object.getOwnPropertyDescriptor(i, a);
										if (void 0 !== s) {
											if ("value" in s) return s.value;
											var u = s.get;
											if (void 0 === u) return;
											return u.call(o)
										}
										var l = Object.getPrototypeOf(i);
										if (null === l) return;
										e = l, t = a, n = o, r = !0, s = l = void 0
									}
								}(Object.getPrototypeOf(t.prototype), "constructor", this).call(this), this.AST_IN_FUTURE = "astInFuture", this.BUFFER_EMPTY = "bufferStalled", this.BUFFER_LOADED = "bufferLoaded", this.BUFFER_LEVEL_STATE_CHANGED = "bufferStateChanged", this.ERROR = "error", this.FRAGMENT_LOADING_COMPLETED = "fragmentLoadingCompleted", this.FRAGMENT_LOADING_PROGRESS = "fragmentLoadingProgress", this.FRAGMENT_LOADING_STARTED = "fragmentLoadingStarted", this.FRAGMENT_LOADING_ABANDONED = "fragmentLoadingAbandoned", this.FRAGMENT_LOADED_ERROR = "fragmentLoadedError", this.LOG = "log", this.MANIFEST_LOADED = "manifestLoaded", this.METRICS_CHANGED = "metricsChanged", this.METRIC_CHANGED = "metricChanged", this.METRIC_ADDED = "metricAdded", this.METRIC_UPDATED = "metricUpdated", this.PERIOD_SWITCH_COMPLETED = "periodSwitchCompleted", this.PERIOD_SWITCH_STARTED = "periodSwitchStarted", this.QUALITY_CHANGE_REQUESTED = "qualityChangeRequested", this.QUALITY_CHANGE_DOWNLOADED = "qualityChangeDownloaded", this.QUALITY_CHANGE_RENDERED = "qualityChangeRendered", this.TRACK_CHANGE_RENDERED = "trackChangeRendered", this.SOURCE_INITIALIZED = "sourceInitialized", this.STREAM_INITIALIZED = "streamInitialized", this.STREAM_TEARDOWN_COMPLETE = "streamTeardownComplete", this.TEXT_TRACKS_ADDED = "allTextTracksAdded", this.TEXT_TRACK_ADDED = "textTrackAdded", this.TTML_PARSED = "ttmlParsed", this.TTML_TO_PARSE = "ttmlToParse", this.CAN_PLAY = "canPlay", this.PLAYBACK_ENDED = "playbackEnded", this.PLAYBACK_ERROR = "playbackError", this.PLAYBACK_NOT_ALLOWED = "playbackNotAllowed", this.PLAYBACK_METADATA_LOADED = "playbackMetaDataLoaded", this.PLAYBACK_PAUSED = "playbackPaused", this.PLAYBACK_PLAYING = "playbackPlaying", this.PLAYBACK_PROGRESS = "playbackProgress", this.PLAYBACK_RATE_CHANGED = "playbackRateChanged", this.PLAYBACK_SEEKED = "playbackSeeked", this.PLAYBACK_SEEKING = "playbackSeeking", this.PLAYBACK_SEEK_ASKED = "playbackSeekAsked", this.PLAYBACK_STARTED = "playbackStarted", this.PLAYBACK_TIME_UPDATED = "playbackTimeUpdated", this.PLAYBACK_WAITING = "playbackWaiting", this.MANIFEST_VALIDITY_CHANGED = "manifestValidityChanged"
							}
							return function(e, t) {
									if ("function" != typeof t && null !== t)
										throw new TypeError("Super expression must either be null or a function, not " + Fe(t));
									e.prototype = Object.create(t && t.prototype, {
										constructor : {
											value : e,
											enumerable : !1,
											writable : !0,
											configurable : !0
										}
									}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
								}(t, a.default), t
						}());
					n.default = o, t.exports = n.default
				}, {
					13 : 13
				} ],
				54 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e) {
						function a(t, n) {
							o = o.filter(function(e) {
								return !((isNaN(n) || e.start < n) && (isNaN(t) || e.end > t))
							})
						}
						var t = this.context,
							n = (0, u.default)(t).getInstance().log,
							o = [],
							s = void 0,
							r = e;
						return {
							getAllBufferRanges : function() {
								for (var t = [], e = 0; e < o.length; e++) {
									var n = o[e];
									0 === t.length || n.start > t[t.length - 1].end ? t.push({
										start : n.start,
										end : n.end
									}) : t[t.length - 1].end = n.end
								}
								var r = {
									start : function(e) {
										return t[e].start
									},
									end : function(e) {
										return t[e].end
									}
								};
								return Object.defineProperty(r, "length", {
										get : function() {
											return t.length
										}
									}), r
							},
							append : function(e) {
								s = "InitializationSegment" !== e.segmentType ? (o.push(e), o.sort(function(e, t) {
									return e.start - t.start
								}), null) : e, n("PreBufferSink appended chunk s: " + e.start + "; e: " + e.end), r && r({
									chunk : e
								})
							},
							remove : a,
							abort : function() {},
							discharge : function(e, t) {
								var n,
									r,
									i = (n = e, r = t, o.filter(function(e) {
										return (isNaN(r) || e.start < r) && (isNaN(n) || e.end > n)
									}));
								return s && (i.push(s), s = null), a(e, t), i
							},
							reset : function() {
								o = [], r = s = null
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var u = r(e(7)),
						a = r(e(9));
					i.__dashjs_factory_name = "PreBufferSink";
					var o = a.default.getClassFactory(i);
					n.default = o, t.exports = n.default
				}, {
					7 : 7,
					9 : 9
				} ],
				55 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(i, t, e) {
						function l() {
							return c ? c.buffered : []
						}
						function d(t, n) {
							var r = void 0,
								i = function() {
									t.updating || (clearInterval(r), n())
								};
							if (t.updating)
								if ("function" == typeof t.addEventListener) try {
										t.addEventListener("updateend", function e() {
											t.updating || (t.removeEventListener("updateend", e, !1), n())
										}, !1)
									} catch (e) {
										r = setInterval(i, 50)
								} else
									r = setInterval(i, 50);
							else n()
						}
						var n = this.context,
							r = (0, o.default)(n).getInstance().log,
							f = (0, s.default)(n).getInstance(),
							c = void 0,
							h = void 0,
							p = [],
							g = e,
							a = {
								getAllBufferRanges : l,
								getBuffer : function() {
									return c
								},
								append : function(e) {
									p.push(e), h || d(c, function s() {
										var t = this,
											u = this;
										0 < p.length && function() {
											h = !0;
											var a = p[0];
											p.splice(0, 1);
											var o = [],
												e = function() {
													var e,
														t,
														n,
														r,
														i = l();
													e = u, n = i, r = a, (t = o) && 0 < t.length && t.length < n.length && function(e, t) {
														for (var n = 0; n < e.length; n++) {
															var r = Math.round(e.start(n)),
																i = Math.round(e.end(n));
															if (i === t.start || r === t.end || t.start >= r && t.end <= i) return !0
														}
														return !1
													}(t, r) && f.trigger(_.default.SOURCEBUFFER_REMOVE_COMPLETED, {
														buffer : e,
														from : n.end(n.length - 2),
														to : n.start(n.length - 1),
														unintended : !0
													}), 0 < p.length ? s.call(this) : (h = !1, g && g({
														chunk : a
													}))
												};
											try {
												0 === a.bytes.length ? e.call(t) : (o = l(), c.appendBuffer ? c.appendBuffer(a.bytes) : c.append(a.bytes, a), d(c, e.bind(t)))
											} catch (e) {
												r('SourceBuffer append failed "' + e + '"'), 0 < p.length ? s() : h = !1, g && g({
													chunk : a,
													error : new m.default(e.code, e.message, null)
												})
											}
										}()
									}.bind(this))
								},
								remove : function(t, n, e) {
									var r = this;
									d(c, function() {
										try {
											0 <= t && t < n && (e || "ended" !== i.readyState) && c.remove(t, n), d(c, function() {
												f.trigger(_.default.SOURCEBUFFER_REMOVE_COMPLETED, {
													buffer : r,
													from : t,
													to : n,
													unintended : !1
												})
											})
										} catch (e) {
											f.trigger(_.default.SOURCEBUFFER_REMOVE_COMPLETED, {
												buffer : r,
												from : t,
												to : n,
												unintended : !1,
												error : new m.default(e.code, e.message, null)
											})
										}
									})
								},
								abort : function() {
									try {
										"open" === i.readyState ? c.abort() : c.setTextTrack && "ended" === i.readyState && c.abort()
									} catch (e) {
										r('SourceBuffer append abort failed: "' + e + '"')
									}
									p = []
								},
								reset : function() {
									if (c) {
										try {
											i.removeSourceBuffer(c)
										} catch (e) {
											r("Failed to remove source buffer from media source.")
										} h = !1, c = null
									}
									p = [], g = null
								}
							};
						return function() {
								h = !1;
								var e = t.codec;
								try {
									if (e.match(/application\/mp4;\s*codecs="(stpp|wvtt).*"/i))
										throw new Error("not really supported");
									c = i.addSourceBuffer(e)
								} catch (e) {
									throw e
								}
							}(), a
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var o = r(e(7)),
						m = r(e(112)),
						s = r(e(8)),
						_ = r(e(12)),
						a = r(e(9));
					i.__dashjs_factory_name = "SourceBufferSink";
					var u = a.default.getClassFactory(i);
					n.default = u, t.exports = n.default
				}, {
					112 : 112,
					12 : 12,
					7 : 7,
					8 : 8,
					9 : 9
				} ],
				56 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(o) {
						function e() {
							for (var e = B ? B.length : 0, t = 0; t < e; t++) B[t].getFragmentModel().removeExecutedRequestsBeforeTime(i() + r()), B[t].reset();
							k = x = !(B = []), A.off(X.default.CURRENT_TRACK_CHANGED, l, F)
						}
						function t() {
							e(), U = null, G = !(Q = {})
						}
						function n() {
							N && N.pause(), j && (j.reset(), j = null), t(), E = null, A.off(X.default.DATA_UPDATE_COMPLETED, g, F), A.off(X.default.BUFFERING_COMPLETED, p, F), A.off(X.default.KEY_ERROR, s, F), A.off(X.default.SERVER_CERTIFICATE_UPDATED, s, F), A.off(X.default.LICENSE_REQUEST_COMPLETE, s, F), A.off(X.default.KEY_SYSTEM_SELECTED, s, F), A.off(X.default.KEY_SESSION_CREATED, s, F), A.off(X.default.KEY_STATUSES_CHANGED, s, F)
						}
						function r() {
							return U ? U.duration : NaN
						}
						function i() {
							return U ? U.start : NaN
						}
						function a() {
							if (!(M && M.hasOwnProperty("getBitrateList") && b && b.hasOwnProperty("getAllMediaInfoForType") && b.hasOwnProperty("getEventsFor")))
								throw new Error("Missing config parameter(s)")
						}
						function s(e) {
							e.error && (C.mediaKeySessionError(e.error), E(e.error), n())
						}
						function u(e) {
							var t,
								n = e.type,
								r = void 0;
							if (n === K.default.MUXED && e) return E(r = "Multiplexed representations are intentionally not supported, as they are not compliant with the DASH-AVC/264 guidelines"), C.manifestError(r, "multiplexedrep", T.getValue()), !1;
							if (n === K.default.TEXT || n === K.default.FRAGMENTED_TEXT || n === K.default.EMBEDDED_TEXT || n === K.default.IMAGE) return !0;
							if (t = e.codec, E(n + " codec: " + t), e.contentProtection && !w.supportsEncryptedMedia()) C.capabilityError("encryptedmedia");
							else if (!w.supportsCodec(t)) return E(r = n + "Codec (" + t + ") is not supported."), !1;
							return !0
						}
						function l(e) {
							if (e.newMediaInfo.streamInfo.id === U.id) {
								var t = m(e.oldMediaInfo);
								if (t) {
									var n = N.getTime();
									E("Stream -  Process track changed at current time " + n);
									var r = e.newMediaInfo,
										i = T.getValue();
									E("Stream -  Update stream controller"), i.refreshManifestOnSwitchTrack ? (E("Stream -  Refreshing manifest for switch track"), V = e, S.refreshManifest()) : (t.updateMediaInfo(r), r.type !== K.default.FRAGMENTED_TEXT && (M.updateTopQualityIndex(r), t.switchTrackAsked(), t.getFragmentModel().abortRequests()))
								}
							}
						}
						function d(e, t, n, r) {
							var i,
								a = (0, H.default)(y).create({
									type : (i = e, i.type === K.default.TEXT ? i.mimeType : i.type),
									mimeType : e.mimeType,
									timelineConverter : D,
									adapter : b,
									manifestModel : T,
									dashManifestModel : R,
									mediaPlayerModel : I,
									metricsModel : O,
									dashMetrics : o.dashMetrics,
									baseURLController : o.baseURLController,
									stream : F,
									abrController : M,
									domStorage : o.domStorage,
									playbackController : N,
									mediaController : L,
									streamController : o.streamController,
									errHandler : C
								});
							a.initialize(n), M.updateTopQualityIndex(e), r ? (a.setBuffer(r.buffer), a.getIndexHandler().setCurrentTime(r.currentTime), B[r.replaceIdx] = a) : B.push(a), r && r.ignoreMediaInfo || e.type === K.default.TEXT || e.type === K.default.FRAGMENTED_TEXT || a.updateMediaInfo(e)
						}
						function f(e, t) {
							var n = b.getAllMediaInfoForType(U, e),
								r = null;
							if (n && 0 !== n.length) {
								for (var i = 0, a = n.length; i < a; i++)
									if (r = n[i], e === K.default.EMBEDDED_TEXT)
										;else {
										if (!u(r)) continue;
										L.addTrack(r)
								}
								e !== K.default.EMBEDDED_TEXT && 0 !== L.getTracksFor(e, U).length && (L.checkInitialMediaSettingsForType(e, U), d(L.getCurrentTrackFor(e, U), 0, t))
							} else E("No " + e + " data.")
						}
						function c(e) {
							var r = R.getAdaptationForType(T.getValue(), U.index, e, U);
							if (!r || !Array.isArray(r.Representation_asArray)) return null;
							r.Representation_asArray = r.Representation_asArray.filter(function(e, t) {
								if (0 === t) return !0;
								var n = R.getCodec(r, t, !0);
								return !!w.supportsCodec(n) || (E("[Stream] codec not supported: " + n), !1)
							})
						}
						function h() {
							for (var e = B.length, t = !!Q.audio || !!Q.video ? new Error(v, "Data update failed", null) : null, n = 0; n < e; n++)
								if (B[n].isUpdating() || G) return;
							k && A.trigger(X.default.STREAM_INITIALIZED, {
								streamInfo : U,
								error : t
							})
						}
						function p(e) {
							if (e.streamInfo === U) {
								var t = _(),
									n = t.length;
								if (0 === n) return void E("[Stream] onBufferingCompleted - can't trigger STREAM_BUFFERING_COMPLETED because no streamProcessor is defined");
								for (var r = 0; r < n; r++)
									if (!t[r].isBufferingCompleted() && (t[r].getType() === K.default.AUDIO || t[r].getType() === K.default.VIDEO)) return void E("[Stream] onBufferingCompleted - can't trigger STREAM_BUFFERING_COMPLETED because streamProcessor " + t[r].getType() + " is not buffering completed");
								E("[Stream] onBufferingCompleted - trigger STREAM_BUFFERING_COMPLETED"), A.trigger(X.default.STREAM_BUFFERING_COMPLETED, {
									streamInfo : U
								})
							}
						}
						function g(e) {
							var t = e.sender.getStreamProcessor();
							t.getStreamInfo() === U && (Q[t.getType()] = e.error, h())
						}
						function m(t) {
							return !!t && _().filter(function(e) {
									return e.getType() === t.type
								})[0]
						}
						function _() {
							for (var e = B.length, t = [], n = void 0, r = void 0, i = 0; i < e; i++) (n = (r = B[i]).getType()) !== K.default.AUDIO && n !== K.default.VIDEO && n !== K.default.FRAGMENTED_TEXT || t.push(r);
							return t
						}
						var v = 1;
						o = o || {};var y = this.context,
							E = (0, J.default)(y).getInstance().log,
							A = (0, z.default)(y).getInstance(),
							T = o.manifestModel,
							R = o.dashManifestModel,
							I = o.mediaPlayerModel,
							S = o.manifestUpdater,
							b = o.adapter,
							w = o.capabilities,
							C = o.errHandler,
							D = o.timelineConverter,
							O = o.metricsModel,
							M = o.abrController,
							N = o.playbackController,
							L = o.mediaController,
							P = o.videoModel,
							F = void 0,
							B = void 0,
							x = void 0,
							k = void 0,
							U = void 0,
							Q = void 0,
							G = void 0,
							j = void 0,
							q = void 0,
							V = void 0;
						return F = {
								initialize : function(e) {
									U = e
								},
								activate : function(e) {
									x || (A.on(X.default.CURRENT_TRACK_CHANGED, l, F), function(e) {
										a();
										var t = void 0,
											n = P.getElement();
										if (q || ((q = (0, Y.default)(y).create()).setConfig({
												manifestModel : T,
												manifestUpdater : S,
												playbackController : N
											}), t = b.getEventsFor(U), q.addInlineEvents(t)), G = !0, c(K.default.VIDEO), c(K.default.AUDIO), (null === n || n && "VIDEO" === n.nodeName) && f(K.default.VIDEO, e), f(K.default.AUDIO, e), function() {
												for (var e = 0, t = B.length; e < t; e++) B[e].createBuffer()
											}(), G = !(k = !0), 0 === B.length) {
											var r = "No streams to play.";
											C.manifestError(r, "nostreams", T.getValue()), E(r)
										} else h()
									}(e), x = !0)
								},
								deactivate : e,
								getDuration : r,
								getStartTime : i,
								getId : function() {
									return U ? U.id : NaN
								},
								getStreamInfo : function() {
									return U
								},
								getFragmentController : function() {
									return j
								},
								getEventController : function() {
									return q
								},
								getBitrateListFor : function(e) {
									a();
									var t = function(e) {
										for (var t = B.length, n = null, r = 0; r < t; r++)
											if ((n = B[r]).getType() === e) return n.getMediaInfo();
										return null
									}(e);
									return M.getBitrateList(t)
								},
								startEventController : function() {
									q && q.start()
								},
								stopEventController : function() {
									q && q.stop()
								},
								updateData : function(e) {
									if (E("Manifest updated... updating data system wide."), G = !(x = !1), U = e, q) {
										var t = b.getEventsFor(U);
										q.addInlineEvents(t)
									}
									c(K.default.VIDEO), c(K.default.AUDIO);
									for (var n = 0, r = B.length; n < r; n++) {
										var i = B[n],
											a = b.getMediaInfoForType(U, i.getType());
										M.updateTopQualityIndex(a), i.updateMediaInfo(a)
									}
									if (V && "fragmentedText" !== (a = V.newMediaInfo).type) {
										var o = m(V.oldMediaInfo);
										if (!o) return;
										o.switchTrackAsked(), V = void 0
									}
									G = !1, h()
								},
								reset : n,
								getProcessors : _,
								setMediaSource : function(e) {
									for (var t = 0; t < B.length;) u(B[t].getMediaInfo()) ? (B[t].setMediaSource(e), t++) : (B[t].reset(), B.splice(t, 1));
									for (t = 0; t < B.length; t++) B[t].dischargePreBuffer();
									if (0 === B.length) {
										var n = "No streams to play.";
										C.manifestError(n, "nostreams", T.getValue()), E(n)
									}
								}
							}, t(), j = (0, W.default)(y).create({
								mediaPlayerModel : I,
								metricsModel : O,
								errHandler : C
							}), A.on(X.default.BUFFERING_COMPLETED, p, F), A.on(X.default.DATA_UPDATE_COMPLETED, g, F), F
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var K = r(e(59)),
						H = r(e(57)),
						Y = r(e(65)),
						W = r(e(66)),
						z = r(e(8)),
						X = r(e(12)),
						J = r(e(7)),
						a = r(e(9));
					i.__dashjs_factory_name = "Stream", n.default = a.default.getClassFactory(i), t.exports = n.default
				}, {
					12 : 12,
					57 : 57,
					59 : 59,
					65 : 65,
					66 : 66,
					7 : 7,
					8 : 8,
					9 : 9
				} ],
				57 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(r) {
						function e() {
							M = []
						}
						function t() {
							S = [], I = null, e()
						}
						function n() {
							return p ? p.getStreamInfo() : null
						}
						function i() {
							return I
						}
						r = r || {};var a = this.context,
							o = void 0,
							s = r.type,
							u = r.errHandler,
							l = r.mimeType,
							d = r.timelineConverter,
							f = r.adapter,
							c = r.manifestModel,
							h = r.mediaPlayerModel,
							p = r.stream,
							g = r.abrController,
							m = r.playbackController,
							_ = r.streamController,
							v = r.mediaController,
							y = r.domStorage,
							E = r.metricsModel,
							A = r.dashMetrics,
							T = r.dashManifestModel,
							R = void 0,
							I = void 0,
							S = void 0,
							b = void 0,
							w = void 0,
							C = void 0,
							D = void 0,
							O = void 0,
							M = void 0;
						return R = {
								initialize : function(e) {
									var t,
										n;
									(o = (0, x.default)(a).create({
										mimeType : l,
										timelineConverter : d,
										dashMetrics : A,
										metricsModel : E,
										mediaPlayerModel : h,
										baseURLController : r.baseURLController,
										errHandler : u
									})).initialize(R), g.registerStreamType(s, R), (O = p.getFragmentController().getModel(s)).setStreamProcessor(R), n = null, (t = s) !== N.default.VIDEO && t !== N.default.AUDIO || (n = (0, P.default)(a).create({
										type : t,
										metricsModel : E,
										mediaPlayerModel : h,
										manifestModel : c,
										errHandler : u,
										streamController : _,
										mediaController : v,
										adapter : f,
										abrController : g,
										playbackController : m,
										streamProcessor : R
									})), b = n, w = (0, F.default)(a).create({
										type : s,
										metricsModel : E,
										adapter : f,
										dashMetrics : A,
										dashManifestModel : T,
										timelineConverter : d,
										mediaPlayerModel : h,
										abrController : g,
										playbackController : m,
										streamController : _,
										streamProcessor : R,
										mediaController : v
									}), (D = (0, B.default)(a).create()).setConfig({
										abrController : g,
										domStorage : y,
										metricsModel : E,
										dashMetrics : A,
										dashManifestModel : T,
										manifestModel : c,
										playbackController : m,
										timelineConverter : d,
										streamProcessor : R
									}), b.initialize(e), w.initialize(), D.initialize()
								},
								isUpdating : function() {
									return !!D && D.isUpdating()
								},
								getType : function() {
									return s
								},
								getBufferController : function() {
									return b
								},
								getFragmentModel : function() {
									return O
								},
								getScheduleController : function() {
									return w
								},
								getLiveEdgeFinder : function() {
									return C
								},
								getEventController : function() {
									return p ? p.getEventController() : null
								},
								getFragmentController : function() {
									return p ? p.getFragmentController() : null
								},
								getRepresentationController : function() {
									return D
								},
								getIndexHandler : function() {
									return o
								},
								getCurrentRepresentationInfo : function() {
									return f.getCurrentRepresentationInfo(D)
								},
								getRepresentationInfoForQuality : function(e) {
									return f.getRepresentationInfoForQuality(D, e)
								},
								getBufferLevel : function() {
									return b.getBufferLevel()
								},
								switchInitData : function(e, t) {
									b && b.switchInitData(n().id, e, t)
								},
								isBufferingCompleted : function() {
									return !!b && b.getIsBufferingCompleted()
								},
								createBuffer : function() {
									return b.getBuffer() || b.createBuffer(I)
								},
								getStreamInfo : n,
								updateMediaInfo : function(e) {
									e === I || e && I && e.type !== I.type || (I = e), -1 === S.indexOf(e) && S.push(e), f.updateData(this)
								},
								switchTrackAsked : function() {
									w.switchTrackAsked()
								},
								getMediaInfoArr : function() {
									return S
								},
								getMediaInfo : i,
								getMediaSource : function() {
									return b.getMediaSource()
								},
								setMediaSource : function(e) {
									b.setMediaSource(e, i())
								},
								dischargePreBuffer : function() {
									b.dischargePreBuffer()
								},
								getBuffer : function() {
									return b.getBuffer()
								},
								setBuffer : function(e) {
									b.setBuffer(e)
								},
								registerExternalController : function(e) {
									M.push(e)
								},
								unregisterExternalController : function(e) {
									var t = M.indexOf(e);
									-1 !== t && M.splice(t, 1)
								},
								getExternalControllers : function() {
									return M
								},
								unregisterAllExternalController : e,
								reset : function(e) {
									o.reset(), b && (b.reset(e), b = null), w && (w.reset(), w = null), D && (D.reset(), D = null), g && g.unRegisterStreamType(s), M.forEach(function(e) {
										e.reset()
									}), t(), p = s = null, C && (C.reset(), C = null)
								}
							}, m && m.getIsDynamic() && (C = (0, L.default)(a).create({
								timelineConverter : d,
								streamProcessor : R
							})), t(), R
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var N = r(e(59)),
						L = r(e(105)),
						P = r(e(64)),
						F = r(e(70)),
						B = r(e(19)),
						a = r(e(9)),
						x = r(e(15));
					i.__dashjs_factory_name = "StreamProcessor", n.default = a.default.getClassFactory(i), t.exports = n.default
				}, {
					105 : 105,
					15 : 15,
					19 : 19,
					59 : 59,
					64 : 64,
					70 : 70,
					9 : 9
				} ],
				58 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e) {
						e = e || {};var a = "urn:mpeg:dash:resolve-to-zero:2013",
							t = this.context,
							o = (0, c.default)(t).getInstance(),
							s = (0, l.default)(t).create({
								errHandler : e.errHandler,
								metricsModel : e.metricsModel,
								mediaPlayerModel : e.mediaPlayerModel,
								requestModifier : e.requestModifier
							});
						return {
							load : function(n, r, i) {
								var t = function(e, t) {
									r.resolved = !0, r.resolvedContent = e || null, o.trigger(h.default.XLINK_ELEMENT_LOADED, {
										element : r,
										resolveObject : i,
										error : e || t ? null : new u.default(1, "Failed loading Xlink element: " + n)
									})
								};
								if (n === a) t(null, !0);else {
									var e = new f.default(n, d.HTTPRequest.XLINK_TYPE);
									s.load({
										request : e,
										success : function(e) {
											t(e)
										},
										error : function() {
											t(null)
										}
									})
								}
							},
							reset : function() {
								s && (s.abort(), s = null)
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var u = r(e(112)),
						l = r(e(82)),
						d = e(129),
						f = r(e(123)),
						c = r(e(8)),
						h = r(e(12)),
						a = r(e(9));
					i.__dashjs_factory_name = "XlinkLoader";
					var o = a.default.getClassFactory(i);
					o.XLINK_LOADER_ERROR_LOADING_FAILURE = 1, a.default.updateClassFactory(i.__dashjs_factory_name, o), n.default = o, t.exports = n.default
				}, {
					112 : 112,
					12 : 12,
					123 : 123,
					129 : 129,
					8 : 8,
					82 : 82,
					9 : 9
				} ],
				59 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						i = new (function() {
							function e() {
								(function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								})(this, e), this.init()
							}
							return r(e, [ {
									key : "init",
									value : function() {
										this.STREAM = "stream", this.VIDEO = "video", this.AUDIO = "audio", this.TEXT = "text", this.FRAGMENTED_TEXT = "fragmentedText", this.EMBEDDED_TEXT = "embeddedText", this.MUXED = "muxed", this.IMAGE = "image", this.LOCATION = "Location", this.INITIALIZE = "initialize", this.TEXT_SHOWING = "showing", this.TEXT_HIDDEN = "hidden", this.CC1 = "CC1", this.CC3 = "CC3", this.STPP = "stpp", this.TTML = "ttml", this.VTT = "vtt", this.WVTT = "wvtt", this.UTF8 = "utf-8", this.SUGGESTED_PRESENTATION_DELAY = "suggestedPresentationDelay", this.SCHEME_ID_URI = "schemeIdUri", this.START_TIME = "starttime", this.ABR_STRATEGY_DYNAMIC = "abrDynamic", this.ABR_STRATEGY_BOLA = "abrBola", this.ABR_STRATEGY_THROUGHPUT = "abrThroughput", this.MOVING_AVERAGE_SLIDING_WINDOW = "slidingWindow", this.MOVING_AVERAGE_EWMA = "ewma"
									}
								} ]), e
						}());
					n.default = i, t.exports = n.default
				}, {} ],
				60 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						i = new (function() {
							function e() {
								(function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								})(this, e), this.init()
							}
							return r(e, [ {
									key : "init",
									value : function() {
										this.DOWNLOAD_ERROR = 4, this.DOWNLOAD_MPD_ERROR = 4001, this.DOWNLOAD_XINK_ERROR = 4002, this.DOWNLOAD_INIT_SEGMENT_ERROR = 4003, this.DOWNLOAD_MEDIA_SEGMENT_ERROR = 4004, this.DOWNLOAD_INDEX_SEGMENT_ERROR = 4005, this.DOWNLOAD_SWITCHING_SEGMENT_ERROR = 4006, this.DOWNLOAD_OTHER_ERROR = 4007, this.DOWNLOAD_FRAGMENT_ERROR = 4101, this.DOWNLOAD_FRAGMENT_ERROR_RETRY_SUCCESS = 4102, this.DOWNLOAD_FRAGMENT_ERROR_RETRY_FAILURE = 4103, this.DOWNLOAD_FRAGMENT_ERROR_RANGE = 4104, this.MANIFEST_ERROR = 5, this.MANIFEST_TYPE_ERROR = 5001, this.MANIFEST_RESOLVE_ERROR = 5002, this.MEDIA_ERROR = 6, this.MEDIA_ABORTED_ERROR = 6001, this.MEDIA_NETWORK_ERROR = 6002, this.MEDIA_DECODE_ERROR = 6003, this.MEDIA_SUPPORTED_ERROR = 6004, this.MEDIA_ENCRYPTED_ERROR = 6005, this.MEDIA_UNKNOWN_ERROR = 6e3
									}
								} ]), e
						}());
					n.default = i, t.exports = n.default
				}, {} ],
				61 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						i = new (function() {
							function e() {
								(function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								})(this, e), this.init()
							}
							return r(e, [ {
									key : "init",
									value : function() {
										this.TCP_CONNECTION = "TcpList", this.HTTP_REQUEST = "HttpList", this.TRACK_SWITCH = "RepSwitchList", this.BUFFER_LEVEL = "BufferLevel", this.BUFFER_STATE = "BufferState", this.DVR_INFO = "DVRInfo", this.DROPPED_FRAMES = "DroppedFrames", this.SCHEDULING_INFO = "SchedulingInfo", this.REQUESTS_QUEUE = "RequestsQueue", this.MANIFEST_UPDATE = "ManifestUpdate", this.MANIFEST_UPDATE_STREAM_INFO = "ManifestUpdatePeriodInfo", this.MANIFEST_UPDATE_TRACK_INFO = "ManifestUpdateRepresentationInfo", this.PLAY_LIST = "PlayList", this.DVB_ERRORS = "DVBErrors"
									}
								} ]), e
						}());
					n.default = i, t.exports = n.default
				}, {} ],
				62 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						function e() {
							w = {
								video : !0,
								audio : !0
							}, C = {}, D = {}, O = {}, M = {}, L = {}, N = {}, H = {}, t = !(Z = !(F = !(z = {}))), void 0 === B && (B = !1), W = Y = K = void 0, clearTimeout(P), P = null
						}
						function n(e) {
							e.mediaType === ne.default.VIDEO && (K = e.oldQuality, Y.push(K, j.getPlaybackQuality()))
						}
						function r(e) {
							e.metric !== re.default.HTTP_REQUEST || !e.value || e.value.type !== he.HTTPRequest.MEDIA_SEGMENT_TYPE || e.mediaType !== ne.default.AUDIO && e.mediaType !== ne.default.VIDEO || W.push(e.mediaType, e.value, Z), e.metric !== re.default.BUFFER_LEVEL || e.mediaType !== ne.default.AUDIO && e.mediaType !== ne.default.VIDEO || function(e, t) {
								var n = q.getABRStrategy();
								if (n === ne.default.ABR_STRATEGY_BOLA) return z[e] = !0;
								if (n === ne.default.ABR_STRATEGY_THROUGHPUT) return z[e] = !1;
								var r = q.getStableBufferTime(),
									i = r,
									a = .5 * r,
									o = z[e],
									s = (o ? a : i) < t;
								(z[e] = s) !== o && I(s ? "AbrController (" + e + ") switching from throughput to buffer occupancy ABR rule (buffer: " + t.toFixed(3) + ")." : "AbrController (" + e + ") switching from buffer occupancy to throughput ABR rule (buffer: " + t.toFixed(3) + ").")
							}(e.mediaType, .001 * e.value.level)
						}
						function f(e, t) {
							var n,
								r,
								i,
								a,
								o = void 0;
							return C[t] = C[t] || {}, C[t].hasOwnProperty(e) || (C[t][e] = 0), o = function(e, t) {
									var n = e;
									if (!N[t]) return n;
									var r = c(t);
									void 0 !== r && (n = Math.max(e, r));
									var i = s(t);
									return void 0 !== i && (n = Math.min(n, i)), n
								}(C[t][e], e), n = o, r = e, i = C[t][e], a = u(r), function(e, t) {
									if (t !== ne.default.VIDEO || !F || !N[t]) return e;
									B || v();
									var n = U.getValue(),
										r = Q.getAdaptationForType(n, 0, t).Representation,
										i = e;
									if (0 < x && 0 < k) {
										for (; 0 < i && r[i] && x < r[i].width && x - r[i - 1].width < r[i].width - x;) i -= 1;
										r.length - 2 >= i && r[i].width === r[i + 1].width && (i = Math.min(e, i + 1))
									}
									return i
								}(o = isNaN(a) || 1 <= a || a < 0 ? n : Math.min(n, Math.round(i * a)), e)
						}
						function i(e) {
							return O.hasOwnProperty("max") && O.max.hasOwnProperty(e) ? O.max[e] : NaN
						}
						function a(e) {
							return O.hasOwnProperty("min") && O.min.hasOwnProperty(e) ? O.min[e] : NaN
						}
						function s(e) {
							var t = i(e);
							return t ? d(N[e].getMediaInfo(), t) : void 0
						}
						function c(e) {
							var t = a(e);
							if (t) {
								var n = g(N[e].getMediaInfo()),
									r = d(N[e].getMediaInfo(), t);
								return n[r] && r < n.length - 1 && n[r].bitrate < 1e3 * t && r++, r
							}
						}
						function u(e) {
							return M.hasOwnProperty("max") && M.max.hasOwnProperty(e) ? M.max[e] : 1
						}
						function h(e) {
							return w[e]
						}
						function o(e, t, n, r) {
							var i = t.id,
								a = _(e);
							if (null === n || isNaN(n) || n % 1 != 0)
								throw new Error("argument is not an integer");
							var o = f(e, i);
							n !== a && 0 <= n && n <= o && p(e, a, n, o, r)
						}
						function p(e, t, n, r, i) {
							if (e && N[e]) {
								var a = N[e].getStreamInfo(),
									o = a ? a.id : null;
								if (A.getLogToBrowserConsole()) {
									var s = J.getCurrentBufferLevel(X.getReadOnlyMetricsFor(e));
									I("AbrController (" + e + ") switch from " + t + " to " + n + "/" + r + " (buffer: " + s + ") " + (i ? JSON.stringify(i) : "."))
								}
								u = e, d = n, D[l = o] = D[l] || {}, D[l][u] = d, T.trigger(se.default.QUALITY_CHANGE_REQUESTED, {
									mediaType : e,
									streamInfo : a,
									oldQuality : t,
									newQuality : n,
									reason : i
								})
							}
							var u,
								l,
								d
						}
						function l(e, t) {
							L[e].state = t
						}
						function d(e, t, n) {
							if (Z && n && N[e.type].getCurrentRepresentationInfo() && N[e.type].getCurrentRepresentationInfo().fragmentDuration) {
								n /= 1e3;
								var r = N[e.type].getCurrentRepresentationInfo().fragmentDuration;
								if (r < n) return 0;
								t *= 1 - n / r
							}
							var i = g(e);
							if (!i || 0 === i.length) return 0;
							for (var a = i.length - 1; 0 <= a; a--)
								if (1e3 * t >= i[a].bitrate) return a;
							return 0
						}
						function g(e) {
							if (!e || !e.bitrateList) return null;
							for (var t = e.bitrateList, n = e.type, r = [], i = void 0, a = 0, o = t.length; a < o; a++) (i = new ie.default).mediaType = n, i.qualityIndex = a, i.id = t[a].id, i.bitrate = t[a].bandwidth, i.width = t[a].width, i.height = t[a].height, i.scanType = t[a].scanType, r.push(i);
							return r
						}
						function m(e) {
							return z[e]
						}
						function _(e) {
							if (e && N[e]) {
								var t = N[e].getStreamInfo(),
									n = t ? t.id : null;
								if (n) return D[n] = D[n] || {}, D[n].hasOwnProperty(e) || (D[n][e] = 0), D[n][e]
							}
							return 0
						}
						function v() {
							if (j) {
								var e = t && window.hasOwnProperty("devicePixelRatio") ? window.devicePixelRatio : 1;
								x = j.getClientWidth() * e, k = j.getClientHeight() * e
							}
						}
						function y(e) {
							var t = e.request.mediaType;
							if (h(t)) {
								var n = N[t];
								if (!n) return;
								var r = (0, ue.default)(E).create({
										abrController : R,
										streamProcessor : n,
										currentRequest : e.request,
										useBufferOccupancyABR : m(t)
									}),
									i = S.shouldAbandonFragment(r);
								if (i.quality > le.default.NO_CHANGE) {
									var a = n.getFragmentModel();
									a.getRequests({
										state : ae.default.FRAGMENT_MODEL_LOADING,
										index : e.request.index
									})[0] && (a.abortRequests(), l(t, ge), H[t].reset(), H[t].push({
										oldValue : _(t, b.getActiveStreamInfo()),
										newValue : i.quality,
										confidence : 1,
										reason : i.reason
									}), o(t, b.getActiveStreamInfo(), i.quality, i.reason), clearTimeout(P), P = setTimeout(function() {
										l(t, me), P = null
									}, q.getAbandonLoadTimeout()))
								}
							}
						}
						var E = this.context,
							A = (0, pe.default)(E).getInstance(),
							T = (0, oe.default)(E).getInstance(),
							R = void 0,
							I = void 0,
							S = void 0,
							b = void 0,
							w = void 0,
							C = void 0,
							D = void 0,
							O = void 0,
							M = void 0,
							N = void 0,
							L = void 0,
							P = void 0,
							F = void 0,
							t = void 0,
							B = void 0,
							x = void 0,
							k = void 0,
							U = void 0,
							Q = void 0,
							G = void 0,
							j = void 0,
							q = void 0,
							V = void 0,
							K = void 0,
							H = void 0,
							Y = void 0,
							W = void 0,
							z = void 0,
							X = void 0,
							J = void 0,
							Z = void 0,
							$ = {
								video : 0,
								audio : 0
							},
							ee = {
								video : {},
								audio : {}
							};
						return R = {
								isPlayingAtTopQuality : function(e) {
									var t = e.id,
										n = _(ne.default.AUDIO),
										r = _(ne.default.VIDEO);
									return n === f(ne.default.AUDIO, t) && r === f(ne.default.VIDEO, t)
								},
								updateTopQualityIndex : function(e) {
									var t,
										n,
										r,
										i = e.type,
										a = e.streamInfo.id,
										o = e.representationCount - 1;
									return t = i, r = o, C[n = a] = C[n] || {}, C[n][t] = r, o
								},
								getThroughputHistory : function() {
									return W
								},
								getBitrateList : g,
								getQualityForBitrate : d,
								getMaxAllowedBitrateFor : i,
								getTopBitrateInfoFor : function(e) {
									if (e && N && N[e]) {
										var t = N[e].getStreamInfo();
										if (t.id) {
											var n = f(e, t.id),
												r = g(N[e].getMediaInfo());
											return r[n] ? r[n] : null
										}
									}
									return null
								},
								getMinAllowedBitrateFor : a,
								setMaxAllowedBitrateFor : function(e, t) {
									O.max = O.max || {}, O.max[e] = t
								},
								setMinAllowedBitrateFor : function(e, t) {
									O.min = O.min || {}, O.min[e] = t
								},
								getMaxAllowedIndexFor : s,
								getMinAllowedIndexFor : c,
								getMaxAllowedRepresentationRatioFor : u,
								setMaxAllowedRepresentationRatioFor : function(e, t) {
									M.max = M.max || {}, M.max[e] = t
								},
								getInitialBitrateFor : function(e) {
									var t = V.getSavedBitrateSettings(e);
									if (!O.hasOwnProperty(e))
										if (M.hasOwnProperty(e)) {
											var n = U.getValue(),
												r = Q.getAdaptationForType(n, 0, e).Representation;
											if (Array.isArray(r)) {
												var i = Math.max(Math.round(r.length * M[e]) - 1, 0);
												O[e] = r[i].bandwidth
											} else
												O[e] = 0
										} else
											isNaN(t) ? O[e] = e === ne.default.VIDEO ? 1e3 : 100 : O[e] = t;
									return O[e]
								},
								setInitialBitrateFor : function(e, t) {
									O[e] = t
								},
								getInitialRepresentationRatioFor : function(e) {
									return M.hasOwnProperty(e) ? M[e] : null
								},
								setInitialRepresentationRatioFor : function(e, t) {
									M[e] = t
								},
								setAutoSwitchBitrateFor : function(e, t) {
									w[e] = t
								},
								getAutoSwitchBitrateFor : h,
								getUseDeadTimeLatency : function() {
									return Z
								},
								setUseDeadTimeLatency : function(e) {
									Z = e
								},
								setLimitBitrateByPortal : function(e) {
									F = e
								},
								getLimitBitrateByPortal : function() {
									return F
								},
								getUsePixelRatioInLimitBitrateByPortal : function() {
									return t
								},
								setUsePixelRatioInLimitBitrateByPortal : function(e) {
									t = e
								},
								getQualityFor : _,
								getAbandonmentStateFor : function(e) {
									return L[e] ? L[e].state : null
								},
								setPlaybackQuality : o,
								checkPlaybackQuality : function(e) {
									if (e && N && N[e]) {
										var t = N[e].getStreamInfo(),
											n = t ? t.id : null,
											r = _(e),
											i = (0, ue.default)(E).create({
												abrController : R,
												streamProcessor : N[e],
												currentValue : r,
												switchHistory : H[e],
												droppedFramesHistory : Y,
												useBufferOccupancyABR : m(e)
											});
										if (Y) {
											var a = j.getPlaybackQuality();
											a && Y.push(K, a)
										}
										if (h(e)) {
											var o = c(e),
												s = f(e, n),
												u = S.getMaxQuality(i),
												l = u.quality;
											if (void 0 !== o && l < o && (l = o), s < l && (l = s), H[e].push({
													oldValue : r,
													newValue : l
												}), l > le.default.NO_CHANGE && l != r) L[e].state !== me && l === r || p(e, r, l, s, u.reason);
											else if (A.getLogToBrowserConsole()) {
												var d = J.getCurrentBufferLevel(X.getReadOnlyMetricsFor(e));
												I("AbrController (" + e + ") stay on " + r + "/" + s + " (buffer: " + d + ")")
											}
										}
									}
								},
								getTopQualityIndexFor : f,
								setElementSize : v,
								setWindowResizeEventCalled : function(e) {
									B = e
								},
								createAbrRulesCollection : function() {
									(S = (0, te.default)(E).create({
										metricsModel : X,
										dashMetrics : J,
										mediaPlayerModel : q,
										adapter : G
									})).initialize()
								},
								registerStreamType : function(e, t) {
									H[e] = (0, de.default)(E).create(), N[e] = t, L[e] = L[e] || {}, L[e].state = me, z[e] = !1, T.on(se.default.LOADING_PROGRESS, y, this), e == ne.default.VIDEO && (T.on(se.default.QUALITY_CHANGE_RENDERED, n, this), Y = (0, fe.default)(E).create(), v()), T.on(se.default.METRIC_ADDED, r, this), W = (0, ce.default)(E).create({
										mediaPlayerModel : q
									})
								},
								unRegisterStreamType : function(e) {
									delete N[e]
								},
								setDefaultQualityFor : function(e, t) {
									$[e] = Number(t) || 0, I("Set default quality for " + e + " - " + $[e])
								},
								getDefaultQualityFor : function(e) {
									return $[e] || 0
								},
								getDroppedFramesInfo : function() {
									return Y && Y.getFrameInfo && Y.getFrameInfo() || {}
								},
								setCurrentSegmentInfoFor : function(e, t) {
									ee[e] = t
								},
								getCurrentSegmentInfoFor : function(e) {
									return ee[e]
								},
								setConfig : function(e) {
									e && (e.streamController && (b = e.streamController), e.domStorage && (V = e.domStorage), e.mediaPlayerModel && (q = e.mediaPlayerModel), e.metricsModel && (X = e.metricsModel), e.dashMetrics && (J = e.dashMetrics), e.dashManifestModel && (Q = e.dashManifestModel), e.adapter && (G = e.adapter), e.manifestModel && (U = e.manifestModel), e.videoModel && (j = e.videoModel))
								},
								reset : function() {
									e(), T.off(se.default.LOADING_PROGRESS, y, this), T.off(se.default.QUALITY_CHANGE_RENDERED, n, this), T.off(se.default.METRIC_ADDED, r, this), S && S.reset()
								}
							}, I = A.log.bind(R), e(), R
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var te = r(e(89)),
						ne = r(e(59)),
						re = r(e(61)),
						ie = r(e(111)),
						ae = r(e(75)),
						oe = r(e(8)),
						se = r(e(12)),
						a = r(e(9)),
						ue = r(e(85)),
						le = r(e(86)),
						de = r(e(87)),
						fe = r(e(84)),
						ce = r(e(88)),
						he = e(129),
						pe = r(e(7)),
						ge = "abandonload",
						me = "allowload";
					i.__dashjs_factory_name = "AbrController";
					var o = a.default.getSingletonFactory(i);
					o.ABANDON_LOAD = ge, o.QUALITY_DEFAULT = 0, a.default.updateSingletonFactory(i.__dashjs_factory_name, o), n.default = o, t.exports = n.default
				}, {
					111 : 111,
					12 : 12,
					129 : 129,
					59 : 59,
					61 : 61,
					7 : 7,
					75 : 75,
					8 : 8,
					84 : 84,
					85 : 85,
					86 : 86,
					87 : 87,
					88 : 88,
					89 : 89,
					9 : 9
				} ],
				63 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						function e(e) {
							o.invalidateSelectedIndexes(e.entry)
						}
						var t = void 0,
							n = void 0,
							r = this.context,
							i = (0, c.default)(r).getInstance(),
							a = (0, d.default)(r).getInstance(),
							o = void 0,
							s = void 0;
						return t = {
								reset : function() {
									o.reset(), s.reset()
								},
								initialize : function(e) {
									var t;
									o.setConfig({
										dashManifestModel : n
									}), s.setConfig({
										dashManifestModel : n
									}), t = e, o.update(t), s.chooseSelectorFromManifest(t)
								},
								resolve : function(e) {
									var t = o.getForPath(e).reduce(function(e, t) {
										var n = s.select(t);
										return n ? (a.isRelative(n.url) ? e.url = a.resolve(n.url, e.url) : (e.url = n.url, e.serviceLocation = n.serviceLocation), e.urls = n.urls, e.availabilityTimeOffset = n.availabilityTimeOffset, e.availabilityTimeComplete = n.availabilityTimeComplete, e) : new f.default
									}, new f.default);
									if (!a.isRelative(t.url)) return t
								},
								setConfig : function(e) {
									e.baseURLTreeModel && (o = e.baseURLTreeModel), e.baseURLSelector && (s = e.baseURLSelector), e.dashManifestModel && (n = e.dashManifestModel)
								}
							}, o = (0, u.default)(r).create(), s = (0, l.default)(r).create(), i.on(h.default.SERVICE_LOCATION_BLACKLIST_CHANGED, e, t), t
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var u = r(e(74)),
						l = r(e(98)),
						d = r(e(108)),
						f = r(e(41)),
						a = r(e(9)),
						c = r(e(8)),
						h = r(e(12));
					i.__dashjs_factory_name = "BaseURLController", n.default = a.default.getSingletonFactory(i), t.exports = n.default
				}, {
					108 : 108,
					12 : 12,
					41 : 41,
					74 : 74,
					8 : 8,
					9 : 9,
					98 : 98
				} ],
				64 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e) {
						function n(e) {
							if (!ie || !e || !G) return null;
							if (W) try {
									"function" == typeof (J = (0, he.default)(O).create(W, e, i.bind(this))).getBuffer().initialize && J.getBuffer().initialize(Q, G)
								} catch (e) {
									q("Caught error on create SourceBuffer: " + e), P.mediaSourceError("Error creating " + Q + " source buffer.")
							} else
								J = (0, pe.default)(O).create(i.bind(this));
							E(G.getRepresentationInfoForQuality(V).MSETimeOffset)
						}
						function t(e) {
							e.fragmentModel === G.getFragmentModel() && (q("Init fragment finished loading saving to", Q + "'s init cache"), ie.save(e.chunk), q("Append Init fragment", Q, " with representationId:", e.chunk.representationId, " and quality:", e.chunk.quality), l(e.chunk))
						}
						function r(e) {
							if (e.fragmentModel === G.getFragmentModel()) {
								var t = e.chunk,
									n = t.bytes,
									r = t.quality,
									i = G.getRepresentationInfoForQuality(r),
									a = x.getEventsFor(i.mediaInfo, G),
									o = x.getEventsFor(i, G);
								if (a && 0 < a.length || o && 0 < o.length) {
									var s = function(e, t, n, r) {
										for (var i = Math.max(!t || isNaN(t.startTime) ? 0 : t.startTime, 0), a = [], o = [], s = n.concat(r), u = 0, l = s.length; u < l; u++) a[s[u].schemeIdUri] = s[u];
										for (var d = (0, ye.default)(O).getInstance().parse(e).getBoxes("emsg"), u = 0, l = d.length; u < l; u++) {
											var f = x.getEvent(d[u], a, i);
											f && o.push(f)
										}
										return o
									}(n, G.getFragmentModel().getRequests({
										state : ce.default.FRAGMENT_MODEL_EXECUTED,
										quality : r,
										index : t.index
									})[0], a, o);
									G.getEventController().addInbandEvents(s)
								}
								if (le) {
									de = t;
									var u = J && J.getAllBufferRanges();
									u && 0 < u.length && .5 < U.getTimeToStreamEnd() && (q("Clearing buffer because track changed - " + (u.end(u.length - 1) + .5)), _([ {
										start : 0,
										end : u.end(u.length - 1) + .5,
										force : !0
									} ]))
								} else l(t)
							}
						}
						function l(e, t) {
							!ne || t ? (ne = !0, ee = e, J.append(e), e.mediaInfo.type === fe.default.VIDEO && M.trigger(ve.default.VIDEO_CHUNK_RECEIVED, {
								chunk : e
							})) : ue.push(e)
						}
						function i(e) {
							if (e.error) {
								if (22 === e.error.code && (Y = .8 * w(), q("Quota exceeded for type: " + Q + ", Critical Buffer: " + Y), 0 < Y)) {
									var t = Math.max(.2 * Y, 1),
										n = Y - t;
									L.setBufferToKeep(parseFloat(t).toFixed(5)), L.setBufferAheadToKeep(parseFloat(n).toFixed(5))
								}
								22 !== e.error.code && C() || (q("Clearing playback buffer to overcome quota exceed situation for type: " + Q), M.trigger(ve.default.QUOTA_EXCEEDED, {
									sender : j,
									criticalBufferLevel : Y
								}), s())
							} else {
								(ee = e.chunk) && !isNaN(ee.index) && (z = Math.max(ee.index, z), h());
								var r = J.getAllBufferRanges();
								if (ee.segmentType === Te.HTTPRequest.MEDIA_SEGMENT_TYPE) u();
								else if (le) {
									var i = U.getTime();
									q("[BufferController][", Q, "] appendToBuffer seek target should be " + i), G.getScheduleController().setSeekTarget(i), x.setIndexHandlerTime(G, i)
								}
								var a = {
									sender : j,
									quality : ee.quality,
									startTime : ee.start,
									index : ee.index,
									bufferedRanges : r
								};
								ee && !ee.endFragment ? M.trigger(ve.default.BYTES_APPENDED, a) : ee && M.trigger(ve.default.BYTES_APPENDED_END_FRAGMENT, a), 0 === ue.length ? ne = !1 : l(ue.shift(), !0)
							}
						}
						function a(e) {
							V !== e.newQuality && Q === e.mediaType && G.getStreamInfo().id === e.streamInfo.id && (E(G.getRepresentationInfoForQuality(e.newQuality).MSETimeOffset), V = e.newQuality)
						}
						function o() {
							if (K && (K = !(oe = !0), X = Number.POSITIVE_INFINITY), ne = !(ue = []), Q !== fe.default.FRAGMENTED_TEXT) {
								var e = J.getAllBufferRanges(),
									t = !0;
								if (e && 0 < e.length)
									for (var n = U.getTime(), r = 0, i = e.length; r < i; r++) n >= e.start(r) && n <= e.end(r) && (t = !1);
								t && s()
							} else u();
							ae = void 0
						}
						function s() {
							var e = function() {
								var e = [],
									t = J.getAllBufferRanges();
								if (!t || 0 === t.length) return e;
								var n = U.getTime(),
									r = t.end(t.length - 1) + .5,
									i = G.getFragmentModel().getRequests({
										state : ce.default.FRAGMENT_MODEL_EXECUTED,
										time : n,
										threshold : .01
									})[0];
								if (i) {
									var a = {
											start : 0,
											end : i.startTime - .5
										},
										o = G.getFragmentModel().getRequests({
											state : ce.default.FRAGMENT_MODEL_EXECUTED,
											time : i.startTime - i.duration / 2,
											threshold : .01
										})[0];
									o && o.startTime != i.startTime && (a.end = o.startTime), a.start < a.end && a.end > t.start(0) && e.push(a);
									var s = {
											start : i.startTime + i.duration + .5,
											end : r
										},
										u = G.getFragmentModel().getRequests({
											state : ce.default.FRAGMENT_MODEL_EXECUTED,
											time : i.startTime + i.duration + .5,
											threshold : .01
										})[0];
									u && u.startTime !== i.startTime && (s.start = u.startTime + u.duration + .5), s.start < s.end && s.start < r && e.push(s)
								} else q("getAllRangesWithSafetyFactor for", Q, "- No request found in current time position, removing full buffer 0 -", r), e.push({
										start : 0,
										end : r
									});
								return e
							}();
							e && 0 !== e.length || u(), _(e)
						}
						function u() {
							le || (f(), c())
						}
						function d(e, t) {
							var n = J.getAllBufferRanges(),
								r = 0,
								i = 0,
								a = null,
								o = null,
								s = 0,
								u = void 0,
								l = void 0,
								d = t || .15;
							if (null != n) {
								for (l = 0, u = n.length; l < u; l++)
									if (r = n.start(l), i = n.end(l), null === a) s = Math.abs(r - e), r <= e && e < i ? (a = r, o = i) : s <= d && (a = r, o = i);else {
										if (!((s = r - o) <= d)) break;
										o = i
								}
								if (null !== a) return {
										start : a,
										end : o
								}
							}
							return null
						}
						function f() {
							var e,
								t,
								n;
							U && (e = function() {
									var e = U.getTime();
									if (ae) {
										var t = J.getAllBufferRanges();
										t && t.length && (e = Math.max(t.start(0), ae))
									}
									return e
								}() || 0, H = null === (n = d(e, t)) ? 0 : n.end - e, M.trigger(ve.default.BUFFER_LEVEL_UPDATED, {
								sender : j,
								bufferLevel : H
							}), p())
						}
						function c() {
							G && F && G.getStreamInfo().id === F.getActiveStreamInfo().id && (N.addBufferState(Q, $, G.getScheduleController().getBufferTarget()), N.addBufferLevel(Q, new Date, 1e3 * H))
						}
						function h() {
							X - 1 <= z && !K && void 0 === J.discharge && (K = !0, q("[BufferController][" + Q + "] checkIfBufferingCompleted trigger BUFFERING_COMPLETED"), M.trigger(ve.default.BUFFERING_COMPLETED, {
								sender : j,
								streamInfo : G.getStreamInfo()
							}))
						}
						function p() {
							"audio" !== Q && "video" !== Q || (oe && !K && U && U.getTimeToStreamEnd() - H < .5 && (K = !(oe = !1), q("[BufferController][" + Q + "] checkIfSufficientBuffer trigger BUFFERING_COMPLETED"), M.trigger(ve.default.BUFFERING_COMPLETED, {
								sender : j,
								streamInfo : G.getStreamInfo()
							})), H < .5 && !K ? g(Ie) : (K || H >= L.getStableBufferTime()) && g(Re))
						}
						function g(e) {
							$ !== e && ($ = e, c(), M.trigger(ve.default.BUFFER_LEVEL_STATE_CHANGED, {
								sender : j,
								state : e,
								mediaType : Q,
								streamInfo : G.getStreamInfo()
							}), M.trigger(e === Re ? ve.default.BUFFER_LOADED : ve.default.BUFFER_EMPTY, {
								mediaType : Q
							}), q(e === Re ? "Got enough buffer to start for " + Q : "Waiting for more buffer before starting playback for " + Q))
						}
						function m() {
							J && Q !== fe.default.FRAGMENTED_TEXT && (K || _(function() {
								var e = [],
									t = J.getAllBufferRanges();
								if (!t || 0 === t.length) return e;
								var n = U.getTime(),
									r = {
										start : Math.max(0, n - L.getBufferToKeep()),
										end : n + L.getBufferAheadToKeep()
									},
									i = G.getFragmentModel().getRequests({
										state : ce.default.FRAGMENT_MODEL_EXECUTED,
										time : n,
										threshold : .01
									})[0];
								if (i) r.start = Math.min(i.startTime, r.start), r.end = Math.max(i.startTime + i.duration, r.end);
								else if (0 === n && U.getIsDynamic()) return [];
								if (t.start(0) <= r.start) {
									for (var a = {
												start : 0,
												end : r.start
											}, o = 0; o < t.length && t.end(o) <= r.start; o++) a.end = t.end(o);
									a.start < a.end && e.push(a)
								}
								if (t.end(t.length - 1) >= r.end) {
									var s = {
										start : r.end,
										end : t.end(t.length - 1) + .01
									};
									s.start < s.end && e.push(s)
								}
								return e
							}()))
						}
						function _(e) {
							e && J && 0 !== e.length && (se.push.apply(se, e), re || v())
						}
						function v() {
							if (0 === se.length || !J) return q("Nothing to prune, halt pruning"), void (re = !(se = []));
							var e = J.getBuffer();
							if (!e || !e.buffered || 0 === e.buffered.length) return q("SourceBuffer is empty (or does not exist), halt pruning"), void (re = !(se = []));
							var t = se.shift();
							q("Removing", Q, "buffer from:", t.start, "to", t.end), re = !0;var n = U.getTime();
							n < t.end && (K = !1, z = 0, le || (G.getScheduleController().setSeekTarget(n), x.setIndexHandlerTime(G, n))), J.remove(t.start, t.end, t.force)
						}
						function y(e) {
							J === e.buffer && (q("[BufferController][", Q, "] onRemoved buffer from:", e.from, "to", e.to), 0 === se.length && (re = !1), e.unintended && (q("[BufferController][", Q, "] detected unintended removal from:", e.from, "to", e.to, "setting index handler time to", e.from), x.setIndexHandlerTime(G, e.from)), re ? v() : (le ? (le = !1, de && l(de)) : (q("onRemoved : call updateBufferLevel"), f()), M.trigger(ve.default.BUFFER_CLEARED, {
								sender : j,
								from : e.from,
								to : e.to,
								unintended : e.unintended,
								hasEnoughSpaceToAppend : C()
							})))
						}
						function E(e) {
							var t = J && J.getBuffer ? J.getBuffer() : null;
							t && t.timestampOffset !== e && !isNaN(e) && (t.timestampOffset = e)
						}
						function A(e) {
							e.sender.getStreamProcessor() !== G || e.error || E(e.currentRepresentation.MSETimeOffset)
						}
						function T(e) {
							e.fragmentModel === G.getFragmentModel() && (X = e.request.index, h())
						}
						function R(e) {
							var t = J && J.getAllBufferRanges();
							t && e.newMediaInfo.type === Q && e.newMediaInfo.streamInfo.id === G.getStreamInfo().id && (q("[BufferController][" + Q + "] track change asked"), B.getSwitchMode(Q) === me.default.TRACK_SWITCH_MODE_ALWAYS_REPLACE && t && 0 < t.length && .5 < U.getTimeToStreamEnd() && (K = !1, X = Number.POSITIVE_INFINITY))
						}
						function I() {
							++te * (L.getWallclockTimeUpdateInterval() / 1e3) >= L.getBufferPruningInterval() && (te = 0, m())
						}
						function S() {
							p()
						}
						function b(e, t) {
							W = e, J && t && "function" == typeof J.discharge && (Z = J, n(t))
						}
						function w() {
							var e,
								t = J.getAllBufferRanges(),
								n = 0,
								r = void 0;
							if (!t) return n;
							for (r = 0, e = t.length; r < e; r++) n += t.end(r) - t.start(r);
							return n
						}
						function C() {
							return w() < Y
						}
						function D(e) {
							Y = Number.POSITIVE_INFINITY, $ = Ie, V = ge.default.QUALITY_DEFAULT, X = Number.POSITIVE_INFINITY, ee = null, oe = re = ne = K = !1, te = H = z = 0, se = [], J && (e || J.abort(), J.reset(), J = null), le = !1
						}
						e = e || {};var O = this.context,
							M = (0, _e.default)(O).getInstance(),
							N = e.metricsModel,
							L = e.mediaPlayerModel,
							P = e.errHandler,
							F = e.streamController,
							B = e.mediaController,
							x = e.adapter,
							k = e.abrController,
							U = e.playbackController,
							Q = e.type,
							G = e.streamProcessor,
							j = void 0,
							q = void 0,
							V = void 0,
							K = void 0,
							H = void 0,
							Y = void 0,
							W = void 0,
							z = void 0,
							X = void 0,
							J = void 0,
							Z = void 0,
							$ = void 0,
							ee = void 0,
							te = void 0,
							ne = void 0,
							re = void 0,
							ie = void 0,
							ae = void 0,
							oe = void 0,
							se = void 0,
							ue = void 0,
							le = void 0,
							de = void 0;
						return j = {
								getBufferControllerType : function() {
									return Se
								},
								initialize : function(e) {
									b(e), V = k.getQualityFor(Q, G.getStreamInfo()), M.on(ve.default.DATA_UPDATE_COMPLETED, A, this), M.on(ve.default.INIT_FRAGMENT_LOADED, t, this), M.on(ve.default.MEDIA_FRAGMENT_LOADED, r, this), M.on(ve.default.QUALITY_CHANGE_REQUESTED, a, this), M.on(ve.default.STREAM_COMPLETED, T, this), M.on(ve.default.PLAYBACK_PROGRESS, u, this), M.on(ve.default.PLAYBACK_TIME_UPDATED, u, this), M.on(ve.default.PLAYBACK_RATE_CHANGED, S, this), M.on(ve.default.PLAYBACK_SEEKING, o, this), M.on(ve.default.WALLCLOCK_TIME_UPDATED, I, this), M.on(ve.default.CURRENT_TRACK_CHANGED, R, this, _e.default.EVENT_PRIORITY_HIGH), M.on(ve.default.SOURCEBUFFER_REMOVE_COMPLETED, y, this)
								},
								createBuffer : n,
								dischargePreBuffer : function() {
									if (J && Z && "function" == typeof Z.discharge) {
										var e = Z.getAllBufferRanges();
										if (0 < e.length) {
											for (var t = "Beginning " + Q + "PreBuffer discharge, adding buffer for:", n = 0; n < e.length; n++) t += " start: " + e.start(n) + ", end: " + e.end(n) + ";";
											q(t)
										} else q("PreBuffer discharge requested, but there were no media segments in the PreBuffer.");
										for (var r = Z.discharge(), i = null, a = 0; a < r.length; a++) {
											var o = r[a],
												s = ie.extract(o.streamId, o.representationId);
											s && (i !== s && (J.append(s), i = s), J.append(o))
										}
										Z.reset(), Z = null
									}
								},
								getType : function() {
									return Q
								},
								getStreamProcessor : function() {
									return G
								},
								setSeekStartTime : function(e) {
									ae = e
								},
								getBuffer : function() {
									return J
								},
								getBufferLevel : function() {
									return H
								},
								getRangeAt : d,
								setMediaSource : b,
								getMediaSource : function() {
									return W
								},
								getIsBufferingCompleted : function() {
									return K
								},
								switchInitData : function(e, t, n) {
									var r = ie.extract(e, t);
									le = !0 === n && n, r ? (q("Append Init fragment", Q, " with representationId:", r.representationId, " and quality:", r.quality), l(r)) : M.trigger(ve.default.INIT_REQUESTED, {
										sender : j
									})
								},
								getIsPruningInProgress : function() {
									return re
								},
								reset : function(e) {
									M.off(ve.default.DATA_UPDATE_COMPLETED, A, this), M.off(ve.default.QUALITY_CHANGE_REQUESTED, a, this), M.off(ve.default.INIT_FRAGMENT_LOADED, t, this), M.off(ve.default.MEDIA_FRAGMENT_LOADED, r, this), M.off(ve.default.STREAM_COMPLETED, T, this), M.off(ve.default.CURRENT_TRACK_CHANGED, R, this), M.off(ve.default.PLAYBACK_PROGRESS, u, this), M.off(ve.default.PLAYBACK_TIME_UPDATED, u, this), M.off(ve.default.PLAYBACK_RATE_CHANGED, S, this), M.off(ve.default.PLAYBACK_SEEKING, o, this), M.off(ve.default.WALLCLOCK_TIME_UPDATED, I, this), M.off(ve.default.SOURCEBUFFER_REMOVE_COMPLETED, y, this), D(e)
								}
							}, q = (0, Ee.default)(O).getInstance().log.bind(j), ie = (0, Ae.default)(O).getInstance(), ue = [], D(), j
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var fe = r(e(59)),
						ce = r(e(75)),
						he = r(e(55)),
						pe = r(e(54)),
						ge = r(e(62)),
						me = r(e(67)),
						_e = r(e(8)),
						ve = r(e(12)),
						ye = r(e(99)),
						a = r(e(9)),
						Ee = r(e(7)),
						Ae = r(e(103)),
						Te = e(129),
						Re = "bufferLoaded",
						Ie = "bufferStalled",
						Se = "BufferController";
					i.__dashjs_factory_name = Se;
					var o = a.default.getClassFactory(i);
					o.BUFFER_LOADED = Re, o.BUFFER_EMPTY = Ie, a.default.updateClassFactory(i.__dashjs_factory_name, o), n.default = o, t.exports = n.default
				}, {
					103 : 103,
					12 : 12,
					129 : 129,
					54 : 54,
					55 : 55,
					59 : 59,
					62 : 62,
					67 : 67,
					7 : 7,
					75 : 75,
					8 : 8,
					9 : 9,
					99 : 99
				} ],
				65 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						function e() {
							A = !1, c = {}, h = {}, p = {}, g = null, _ = (m = 100) / 1e3
						}
						function s() {
							if (!v || !y || !E)
								throw new Error("setConfig function has to be called previously")
						}
						function t() {
							null !== g && A && (clearInterval(g), g = null, A = !1)
						}
						function r(e) {
							if (e.eventStream.value == l) {
								var t,
									n = e.eventStream.timescale || 1,
									r = e.presentationTime / n;
								t = 4294967295 == e.presentationTime ? NaN : (e.presentationTime + e.duration) / n, d("Manifest validity changed: Valid until: " + r + "; remaining duration: " + t), f.trigger(I.default.MANIFEST_VALIDITY_CHANGED, {
									id : e.id,
									validUntil : r,
									newDuration : t,
									newManifestValidAfter : NaN
								})
							}
						}
						function n() {
							i(h), i(c), function() {
								if (p)
									for (var e = E.getTime(), t = Object.keys(p), n = 0; n < t.length; n++) {
										var r = t[n],
											i = p[r];
										null !== i && (i.duration + i.presentationTime) / i.eventStream.timescale < e && (d("Remove Event " + r + " at time " + e), i = null,
										delete p[r]
										)
								}
							}()
						}
						function i(e) {
							var t,
								n = E.getTime();
							if (e)
								for (var r = Object.keys(e), i = 0; i < r.length; i++) {
									var a = r[i],
										o = e[a];
									void 0 !== o && (0 == (t = o.presentationTime / o.eventStream.timescale) || t <= n && n < t + _) && (d("Start Event " + a + " at " + n), 0 < o.duration && (p[a] = o), o.eventStream.schemeIdUri == u && o.eventStream.value == l ? 0 === o.duration && 0 === o.presentationTimeDelta || (s(), y.refreshManifest()) : f.trigger(o.eventStream.schemeIdUri, {
										event : o
									}),
									delete e[a]
									)
							}
						}
						var a,
							u = "urn:mpeg:dash:event:2012",
							l = 1,
							o = this.context,
							d = (0, T.default)(o).getInstance().log,
							f = (0, R.default)(o).getInstance(),
							c = void 0,
							h = void 0,
							p = void 0,
							g = void 0,
							m = void 0,
							_ = void 0,
							v = void 0,
							y = void 0,
							E = void 0,
							A = void 0;
						return a = {
								addInlineEvents : function(e) {
									if (s(), c = {}, e)
										for (var t = 0; t < e.length; t++) {
											var n = e[t];
											c[n.id] = n, d("Add inline event with id " + n.id)
									}
									d("Added " + e.length + " inline events")
								},
								addInbandEvents : function(e) {
									s();
									for (var t = 0; t < e.length; t++) {
										var n = e[t];
										n.id in h ? d("Repeated event with id " + n.id) : (n.eventStream.schemeIdUri === u && void 0 === h[n.id] && r(n), h[n.id] = n, d("Add inband event with id " + n.id))
									}
								},
								stop : t,
								start : function() {
									s(), d("Start Event Controller"), A || isNaN(m) || (A = !0, g = setInterval(n, m))
								},
								setConfig : function(e) {
									e && (e.manifestModel && (v = e.manifestModel), e.manifestUpdater && (y = e.manifestUpdater), e.playbackController && (E = e.playbackController))
								},
								reset : function() {
									t(), e()
								}
							}, e(), a
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var a = r(e(9)),
						T = r(e(7)),
						R = r(e(8)),
						I = r(e(12));
					i.__dashjs_factory_name = "EventController", n.default = a.default.getClassFactory(i), t.exports = n.default
				}, {
					12 : 12,
					7 : 7,
					8 : 8,
					9 : 9
				} ],
				66 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e) {
						function f(e) {
							return e && e.type && e.type === u.HTTPRequest.INIT_SEGMENT_TYPE
						}
						function t() {
							for (var e in p) p[e].reset();
							p = {}
						}
						function n(e) {
							if (p[e.request.mediaType] === e.sender) {
								var t = e.request,
									n = e.response,
									r = f(t),
									i = t.mediaInfo.streamInfo;
								if (e.error && (e.request.mediaType !== g.default.AUDIO && e.request.mediaType !== g.default.VIDEO && e.request.mediaType !== g.default.FRAGMENTED_TEXT || h.trigger(y.default.SERVICE_LOCATION_BLACKLIST_ADD, {
										entry : e.request.serviceLocation
									})), !n || !i) return void c("No " + t.mediaType + " bytes to push or stream is inactive.");
								var a = (o = n, s = t, u = i.id, l = e.type !== y.default.FRAGMENT_LOADING_PROGRESS, (d = new m.default).streamId = u, d.mediaInfo = s.mediaInfo, d.segmentType = s.type, d.start = s.startTime, d.duration = s.duration, d.end = d.start + d.duration, d.bytes = o, d.index = s.index, d.quality = s.quality, d.representationId = s.representationId, d.endFragment = l, d);
								h.trigger(r ? y.default.INIT_FRAGMENT_LOADED : y.default.MEDIA_FRAGMENT_LOADED, {
									chunk : a,
									fragmentModel : e.sender
								})
							}
							var o,
								s,
								u,
								l,
								d
						}
						e = e || {};var r = this.context,
							c = (0, E.default)(r).getInstance().log,
							h = (0, v.default)(r).getInstance(),
							i = e.errHandler,
							a = e.mediaPlayerModel,
							o = e.metricsModel,
							s = void 0,
							p = void 0;
						return s = {
								getModel : function(e) {
									var t = p[e];
									return t || (t = (0, l.default)(r).create({
											metricsModel : o,
											fragmentLoader : (0, d.default)(r).create({
												metricsModel : o,
												mediaPlayerModel : a,
												errHandler : i,
												requestModifier : (0, _.default)(r).getInstance()
											})
										}), p[e] = t), t
								},
								isInitializationRequest : f,
								reset : function() {
									h.off(y.default.FRAGMENT_LOADING_COMPLETED, n, this), h.off(y.default.FRAGMENT_LOADING_PROGRESS, n, this), t()
								}
							}, t(), h.on(y.default.FRAGMENT_LOADING_COMPLETED, n, s), h.on(y.default.FRAGMENT_LOADING_PROGRESS, n, s), s
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var g = r(e(59)),
						u = e(129),
						m = r(e(113)),
						l = r(e(75)),
						d = r(e(49)),
						_ = r(e(107)),
						v = r(e(8)),
						y = r(e(12)),
						a = r(e(9)),
						E = r(e(7));
					i.__dashjs_factory_name = "FragmentController", n.default = a.default.getClassFactory(i), t.exports = n.default
				}, {
					107 : 107,
					113 : 113,
					12 : 12,
					129 : 129,
					49 : 49,
					59 : 59,
					7 : 7,
					75 : 75,
					8 : 8,
					9 : 9
				} ],
				67 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						function a(e, t) {
							if (!e || !t) return [];
							var n = t.id;
							return _[n] && _[n][e] ? _[n][e].list : []
						}
						function u(e, t) {
							return !e || !t || t && !_[t.id] ? null : _[t.id][e].current
						}
						function s(e) {
							if (e) {
								var t = e.type,
									n = e.streamInfo,
									r = n.id,
									i = u(t, n);
								if (_[r] && _[r][t] && (!i || !c(e, i))) {
									_[r][t].current = e, i && m.trigger(R.default.CURRENT_TRACK_CHANGED, {
										oldMediaInfo : i,
										newMediaInfo : e,
										switchMode : v[t]
									});
									var a = (s = {
										lang : (o = e).lang,
										viewpoint : o.viewpoint,
										roles : o.roles,
										accessibility : o.accessibility,
										audioChannelConfiguration : o.audioChannelConfiguration
									}).lang || s.viewpoint || s.role && 0 < s.role.length || s.accessibility && 0 < s.accessibility.length || s.audioChannelConfiguration && 0 < s.audioChannelConfiguration.length ? s : null;
									a && _[r][t].storeLastSettings && (a.roles && (a.role = a.roles[0],
									delete a.roles
									), a.accessibility && (a.accessibility = a.accessibility[0]), a.audioChannelConfiguration && (a.audioChannelConfiguration = a.audioChannelConfiguration[0]), y.setSavedMediaSettings(t, a))
								}
							}
							var o,
								s
						}
						function o(e, t) {
							e && t && (r[e] = t)
						}
						function l(e) {
							return e ? r[e] : null
						}
						function d() {
							return i || O
						}
						function f(e) {
							return e === T.default.AUDIO || e === T.default.VIDEO || e === T.default.TEXT || e === T.default.FRAGMENTED_TEXT || e === T.default.IMAGE
						}
						function c(e, t) {
							var n = e.id === t.id,
								r = e.viewpoint === t.viewpoint,
								i = e.lang === t.lang,
								a = e.roles.toString() === t.roles.toString(),
								o = e.accessibility.toString() === t.accessibility.toString(),
								s = e.audioChannelConfiguration.toString() === t.audioChannelConfiguration.toString();
							return n && r && i && a && o && s
						}
						function e() {
							_ = {}, r = {
								audio : null,
								video : null
							}, v = {
								audio : w,
								video : b
							}
						}
						function h(t, e) {
							var n = !t.lang || t.lang === e.lang,
								r = !t.viewpoint || t.viewpoint === e.viewpoint,
								i = !t.role || !!e.roles.filter(function(e) {
										return e === t.role
									})[0],
								a = !t.accessibility || !!e.accessibility.filter(function(e) {
										return e === t.accessibility
									})[0],
								o = !t.audioChannelConfiguration || !!e.audioChannelConfiguration.filter(function(e) {
										return e === t.audioChannelConfiguration
									})[0];
							return n && r && i && a && o
						}
						function p(e) {
							var t = d(),
								n = [],
								r = function(e) {
									var t = 0,
										n = [],
										r = void 0;
									return e.forEach(function(e) {
											r = Math.max.apply(Math, e.bitrateList.map(function(e) {
												return e.bandwidth
											})), t < r ? (t = r, n = [ e ]) : r === t && n.push(e)
										}), n
								},
								i = function(e) {
									var t = 0,
										n = [],
										r = void 0;
									return e.forEach(function(e) {
											r = e.representationCount, t < r ? (t = r, n = [ e ]) : r === t && n.push(e)
										}), n
								};
							switch (t) {
							case C:
								1 < (n = r(e)).length && (n = i(n));
								break;case D:
								1 < (n = i(e)).length && (n = r(e));
								break;default:
								g("track selection mode is not supported: " + t)
							}
							return n[0]
						}
						var t,
							n = this.context,
							g = (0, S.default)(n).getInstance().log,
							m = (0, I.default)(n).getInstance(),
							_ = void 0,
							r = void 0,
							i = void 0,
							v = void 0,
							y = void 0,
							E = [ w, b ],
							A = [ C, D ];
						return t = {
								checkInitialMediaSettingsForType : function(e, t) {
									var n = l(e),
										r = a(e, t),
										i = [];
									e !== T.default.FRAGMENTED_TEXT ? (n || o(e, n = y.getSavedMediaSettings(e)), r && 0 !== r.length && (n && r.forEach(function(e) {
										h(n, e) && i.push(e)
									}), s(0 === i.length ? p(r) : 1 < i.length ? p(i) : i[0]))) : s(r[0])
								},
								addTrack : function(e) {
									if (e) {
										var t = e.type;
										if (f(t)) {
											var n = e.streamInfo.id;
											_[n] || (_[n] = {
												audio : {
													list : [],
													storeLastSettings : !0,
													current : null
												},
												video : {
													list : [],
													storeLastSettings : !0,
													current : null
												},
												text : {
													list : [],
													storeLastSettings : !0,
													current : null
												},
												fragmentedText : {
													list : [],
													storeLastSettings : !0,
													current : null
												},
												image : {
													list : [],
													storeLastSettings : !0,
													current : null
												}
											});
											for (var r = _[n][t].list, i = 0, a = r.length; i < a; ++i)
												if (c(r[i], e)) return;
											r.push(e);
											var o = l(t);
											o && h(o, e) && !u(t, e.streamInfo) && s(e)
										}
									}
								},
								getTracksFor : a,
								getCurrentTrackFor : u,
								isCurrentTrack : function(e) {
									var t = e.type,
										n = e.streamInfo.id;
									return _[n] && _[n][t] && c(_[n][t].current, e)
								},
								setTrack : s,
								setInitialSettings : o,
								getInitialSettings : l,
								setSwitchMode : function(e, t) {
									-1 !== E.indexOf(t) ? v[e] = t : g("track switch mode is not supported: " + t)
								},
								getSwitchMode : function(e) {
									return v[e]
								},
								setSelectionModeForInitialTrack : function(e) {
									-1 !== A.indexOf(e) ? i = e : g("track selection mode is not supported: " + e)
								},
								getSelectionModeForInitialTrack : d,
								isMultiTrackSupportedByType : f,
								isTracksEqual : c,
								setConfig : function(e) {
									e && (e.errHandler && e.errHandler, e.domStorage && (y = e.domStorage))
								},
								reset : e
							}, e(), t
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var T = r(e(59)),
						R = r(e(12)),
						I = r(e(8)),
						a = r(e(9)),
						S = r(e(7)),
						b = "neverReplace",
						w = "alwaysReplace",
						C = "highestBitrate",
						D = "widestRange",
						O = C;
					i.__dashjs_factory_name = "MediaController";
					var o = a.default.getSingletonFactory(i);
					o.TRACK_SWITCH_MODE_NEVER_REPLACE = b, o.TRACK_SWITCH_MODE_ALWAYS_REPLACE = w, o.TRACK_SELECTION_MODE_HIGHEST_BITRATE = C, o.TRACK_SELECTION_MODE_WIDEST_RANGE = D, o.DEFAULT_INIT_TRACK_SELECTION_MODE = O, a.default.updateSingletonFactory(i.__dashjs_factory_name, o), n.default = o, t.exports = n.default
				}, {
					12 : 12,
					59 : 59,
					7 : 7,
					8 : 8,
					9 : 9
				} ],
				68 : [ function(e, t, n) {
					"use strict";
					function r() {
						return {
							createMediaSource : function() {
								var e = "WebKitMediaSource" in window;
								return "MediaSource" in window ? new MediaSource : e ? new WebKitMediaSource : null
							},
							attachMediaSource : function(e, t) {
								var n = window.URL.createObjectURL(e);
								return t.setSource(n), n
							},
							detachMediaSource : function(e) {
								e.setSource(null)
							},
							setDuration : function(e, t) {
								return e.duration != t && (e.duration = t), e.duration
							},
							setSeekable : function(e, t, n) {
								e && "function" == typeof e.setLiveSeekableRange && "function" == typeof e.clearLiveSeekableRange && "open" === e.readyState && 0 <= t && t < n && (e.clearLiveSeekableRange(), e.setLiveSeekableRange(t, n))
							},
							signalEndOfStream : function(e) {
								var t = e.sourceBuffers,
									n = t.length;
								if ("open" === e.readyState) {
									for (var r = 0; r < n; r++) {
										if (t[r].updating) return;
										if (0 === t[r].buffered.length) return
									}
									e.endOfStream()
								}
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i,
						a = e(9),
						o = (i = a) && i.__esModule ? i : {
							default : i
						};
					r.__dashjs_factory_name = "MediaSourceController", n.default = o.default.getSingletonFactory(r), t.exports = n.default
				}, {
					9 : 9
				} ],
				69 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						function t(e) {
							!X && e.fromStreamInfo && void 0 !== H[e.fromStreamInfo.id] && (
							delete W[e.fromStreamInfo.id]
							,
							delete H[e.fromStreamInfo.id]
							)
						}
						function n() {
							var e = h(!0),
								t = X ? e - z.start : 0;
							return parseFloat((e + (z.duration - t) - a()).toFixed(5))
						}
						function r() {
							z && q && q.getElement() ? q.play() : Z = !0
						}
						function i() {
							return z && q ? q.isPaused() : null
						}
						function e() {
							z && q && q.pause()
						}
						function s() {
							return z && q ? q.isSeeking() : null
						}
						function u(e) {
							z && q && (B.trigger(ae.default.PLAYBACK_SEEK_ASKED), F("Requesting seek to time: " + e), q.setCurrentTime(e))
						}
						function a() {
							return z && q ? q.getTime() : null
						}
						function o() {
							return z && q ? q.getPlaybackRate() : null
						}
						function l() {
							return z && q ? q.getEnded() : null
						}
						function d() {
							return X
						}
						function f() {
							V = NaN, K = null, Z = !1, H = {}, ee = Y = 0, W = {}, q && (B.off(ae.default.DATA_UPDATE_COMPLETED, _, this), B.off(ae.default.BUFFER_LEVEL_STATE_CHANGED, N, this), B.off(ae.default.BYTES_APPENDED_END_FRAGMENT, M, this), B.off(ae.default.PERIOD_SWITCH_STARTED, t, this), g(), q.removeEventListener("canplay", v), q.removeEventListener("play", y), q.removeEventListener("waiting", E), q.removeEventListener("playing", A), q.removeEventListener("pause", T), q.removeEventListener("error", O), q.removeEventListener("seeking", R), q.removeEventListener("seeked", I), q.removeEventListener("timeupdate", S), q.removeEventListener("progress", b), q.removeEventListener("ratechange", w), q.removeEventListener("loadedmetadata", C), q.removeEventListener("ended", D)), X = z = q = null
						}
						function c() {
							var e = (0, re.default)(P).getInstance().getURIFragmentData(),
								t = void 0;
							if (e) {
								t = {};
								var n = parseInt(e.r, 10);
								0 <= n && z && n < z.manifestInfo.DVRWindowSize && null === e.t && (e.t = Math.floor(Date.now() / 1e3) - z.manifestInfo.DVRWindowSize + n), t.fragS = parseInt(e.s, 10), t.fragT = parseInt(e.t, 10)
							}
							return t
						}
						function h(e, t) {
							var n,
								r = void 0,
								i = c();
							if (n = i ? e ? z.start : isNaN(i.fragS) ? i.fragT : i.fragS : 0, X) isNaN(n) || ((r = n - z.manifestInfo.availableFrom.getTime() / 1e3) > V || r < (isNaN(t) ? NaN : t - z.manifestInfo.DVRWindowSize)) && (r = null), r = r || V;
							else if (!isNaN(n) && n < Math.max(z.manifestInfo.duration, z.duration) && 0 <= n)
								r = n;else {
								var a = H[z.id];
								r = void 0 !== a ? Math.max(void 0 !== a.audio ? a.audio : 0, void 0 !== a.video ? a.video : 0, z.start) : z.start
							}
							return r
						}
						function p() {
							if (null === K) {
								K = setInterval(function() {
									var e;
									B.trigger(ae.default.WALLCLOCK_TIME_UPDATED, {
										isDynamic : X,
										time : new Date
									}), d() && i() && (e = Date.now(), (!$ || $ + 500 < e) && ($ = e, S()))
								}, J.getWallclockTimeUpdateInterval())
							}
						}
						function g() {
							clearInterval(K), K = null
						}
						function m() {
							if (!i() && X && 0 !== q.getReadyState()) {
								var e = a(),
									t = function(e) {
										var t = k.getReadOnlyMetricsFor(te.default.VIDEO) || k.getReadOnlyMetricsFor(te.default.AUDIO),
											n = U.getCurrentDVRInfo(t),
											r = n ? n.range : null,
											i = void 0;
										if (!r) return NaN;
										if (e > r.end)
											i = Math.max(r.end - 2 * z.manifestInfo.minBufferTime, r.start);else {
											if (!(e + .25 < r.start)) return e;
											i = r.start
										}
										return i
									}(e);
								!isNaN(t) && t !== e && u(t)
							}
						}
						function _(e) {
							if (!e.error) {
								var t = j.convertDataToRepresentationInfo(e.currentRepresentation).mediaInfo.streamInfo;
								z.id === t.id && (z = t, m())
							}
						}
						function v() {
							B.trigger(ae.default.CAN_PLAY)
						}
						function y() {
							F("Native video element event: play"), m(), p(), B.trigger(ae.default.PLAYBACK_STARTED, {
								startTime : a()
							})
						}
						function E() {
							F("Native video element event: waiting"), B.trigger(ae.default.PLAYBACK_WAITING, {
								playingTime : a()
							})
						}
						function A() {
							F("Native video element event: playing"), B.trigger(ae.default.PLAYBACK_PLAYING, {
								playingTime : a()
							})
						}
						function T() {
							F("Native video element event: pause"), B.trigger(ae.default.PLAYBACK_PAUSED, {
								ended : l()
							})
						}
						function R() {
							var e = a();
							F("Seeking to: " + e), p(), B.trigger(ae.default.PLAYBACK_SEEKING, {
								seekTime : e
							})
						}
						function I() {
							F("Native video element event: seeked"), B.trigger(ae.default.PLAYBACK_SEEKED)
						}
						function S() {
							var e = a();
							e, B.trigger(ae.default.PLAYBACK_TIME_UPDATED, {
								timeToEnd : n(),
								time : e
							})
						}
						function b() {
							B.trigger(ae.default.PLAYBACK_PROGRESS)
						}
						function w() {
							var e = o();
							F("Native video element event: ratechange: ", e), B.trigger(ae.default.PLAYBACK_RATE_CHANGED, {
								playbackRate : e
							})
						}
						function C() {
							F("Native video element event: loadedmetadata"), B.trigger(ae.default.PLAYBACK_METADATA_LOADED), p()
						}
						function D() {
							F("Native video element event: ended"), e(), g(), B.trigger(ae.default.PLAYBACK_ENDED)
						}
						function O(e) {
							var t = e.target || e.srcElement;
							B.trigger(ae.default.PLAYBACK_ERROR, {
								error : t.error
							})
						}
						function M(e) {
							var t = void 0,
								n = void 0,
								r = e.bufferedRanges;
							if (r && r.length && (!H[z.id] || !0 !== H[z.id].started)) {
								var i = e.sender.getType();
								void 0 === W[z.id] && (W[z.id] = []), W[z.id][i] = r, void 0 === H[z.id] && (H[z.id] = [], H[z.id].started = !1), void 0 === H[z.id][i] && (H[z.id][i] = Math.max(r.start(0), z.start));
								var a = x.isVideoTrackPresent(),
									o = x.isAudioTrackPresent();
								n = h(!1), o && a ? isNaN(H[z.id].audio) || isNaN(H[z.id].video) || function(e, t) {
									if (t && 0 < t.length)
										for (var n = 0, r = t.length; n < r; n++)
											if (e >= t.start(n) && e < t.end(n)) return !0;
									return !1
								}(t, r = H[z.id].audio < H[z.id].video ? (t = H[z.id].video > n ? H[z.id].video : n, W[z.id].audio) : (t = H[z.id].audio > n ? H[z.id].audio : n, W[z.id].video)) && (s() || u(t), H[z.id].started = !0) : H[z.id][i] && (t = H[z.id][i] > n ? H[z.id][i] : n, s() || u(t), H[z.id].started = !0)
							}
						}
						function N(e) {
							e.streamInfo.id === z.id && q.setStallState(e.mediaType, e.state === ne.default.BUFFER_EMPTY)
						}
						var L,
							P = this.context,
							F = (0, oe.default)(P).getInstance().log,
							B = (0, ie.default)(P).getInstance(),
							x = void 0,
							k = void 0,
							U = void 0,
							Q = void 0,
							G = void 0,
							j = void 0,
							q = void 0,
							V = void 0,
							K = void 0,
							H = void 0,
							Y = void 0,
							W = void 0,
							z = void 0,
							X = void 0,
							J = void 0,
							Z = void 0,
							$ = void 0,
							ee = void 0;
						return L = {
								initialize : function(e) {
									z = e, q.addEventListener("canplay", v), q.addEventListener("play", y), q.addEventListener("waiting", E), q.addEventListener("playing", A), q.addEventListener("pause", T), q.addEventListener("error", O), q.addEventListener("seeking", R), q.addEventListener("seeked", I), q.addEventListener("timeupdate", S), q.addEventListener("progress", b), q.addEventListener("ratechange", w), q.addEventListener("loadedmetadata", C), q.addEventListener("ended", D), X = z.manifestInfo.isDynamic, V = z.start, B.on(ae.default.DATA_UPDATE_COMPLETED, _, this), B.on(ae.default.BYTES_APPENDED_END_FRAGMENT, M, this), B.on(ae.default.BUFFER_LEVEL_STATE_CHANGED, N, this), B.on(ae.default.PERIOD_SWITCH_STARTED, t, this), Z && (Z = !1, r())
								},
								setConfig : function(e) {
									e && (e.streamController && (x = e.streamController), e.metricsModel && (k = e.metricsModel), e.dashMetrics && (U = e.dashMetrics), e.manifestModel && (Q = e.manifestModel), e.dashManifestModel && (G = e.dashManifestModel), e.mediaPlayerModel && (J = e.mediaPlayerModel), e.adapter && (j = e.adapter), e.videoModel && (q = e.videoModel))
								},
								getStartTimeFromUriParameters : c,
								getStreamStartTime : h,
								getTimeToStreamEnd : n,
								getTime : a,
								getPlaybackRate : o,
								getPlayedRanges : function() {
									return z && q ? q.getPlayedRanges() : null
								},
								getEnded : l,
								getIsDynamic : d,
								getStreamController : function() {
									return x
								},
								setLiveStartTime : function(e) {
									V = e
								},
								getLiveStartTime : function() {
									return V
								},
								computeLiveDelay : function(e, t) {
									var n,
										r = G.getMpd(Q.getValue()),
										i = void 0;
									if (n = J.getUseSuggestedPresentationDelay() && r.hasOwnProperty(te.default.SUGGESTED_PRESENTATION_DELAY) ? r.suggestedPresentationDelay : J.getLowLatencyEnabled() ? 0 : J.getLiveDelay() ? J.getLiveDelay() : isNaN(e) ? 2 * z.manifestInfo.minBufferTime : e * J.getLiveDelayFragmentCount(), r.availabilityStartTime && (ee = r.availabilityStartTime.getTime()), 0 < t) {
										var a = Math.max(t - 10, t / 2);
										i = Math.min(n, a)
									} else
										i = n;
									return Y = i
								},
								getLiveDelay : function() {
									return Y
								},
								getCurrentLiveLatency : function() {
									if (!X || isNaN(ee)) return NaN;
									var e = a();
									return isNaN(e) || 0 === e ? 0 : (Math.round((new Date).getTime() - (1e3 * e + ee)) / 1e3).toFixed(3)
								},
								play : r,
								isPaused : i,
								pause : e,
								isSeeking : s,
								seek : u,
								reset : f
							}, f(), L
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var te = r(e(59)),
						ne = r(e(64)),
						re = r(e(79)),
						ie = r(e(8)),
						ae = r(e(12)),
						a = r(e(9)),
						oe = r(e(7));
					i.__dashjs_factory_name = "PlaybackController", n.default = a.default.getSingletonFactory(i), t.exports = n.default
				}, {
					12 : 12,
					59 : 59,
					64 : 64,
					7 : 7,
					79 : 79,
					8 : 8,
					9 : 9
				} ],
				70 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e) {
						function r() {
							z && !V.isBufferingCompleted() ? (Y("[ScheduleController][", q, "] start"), O(), J = !1, X && (X = !1), i(0)) : Y("[ScheduleController][", q, "] start denied")
						}
						function t() {
							J || (Y("[ScheduleController][", q, "] stop"), J = !0, clearTimeout(re))
						}
						function n() {
							if (J || te || !V.getBufferController() || G.isPaused() && !se) Y("[ScheduleController][", q, "] - schedule stop!");else {
								!function() {
									var e = 1.5 * (z.fragmentDuration || 5),
										t = W.getRequests({
											state : Re.default.FRAGMENT_MODEL_EXECUTED,
											time : G.getTime() + e,
											threshold : 0
										})[0];
									if (t && -1 === fe.indexOf(t) && !x.getIsTextTrack(q)) {
										var n = U.getFastSwitchEnabled(),
											r = V.getBufferLevel(),
											i = Q.getAbandonmentStateFor(q);
										t.mediaType && Q.setCurrentSegmentInfoFor(t.mediaType, {
											index : t.index,
											startTime : t.startTime,
											duration : t.duration,
											url : t.url
										});
										var a = !K.isCurrentTrack(t.mediaInfo) && K.getSwitchMode(t.mediaInfo.type) === we.default.TRACK_SWITCH_MODE_NEVER_REPLACE,
											o = t.quality !== z.quality;
										n && (a || o) && e <= r && i !== ye.default.ABANDON_LOAD ? (u(t), Y("Reloading outdated fragment at index: ", t.index)) : t.quality > z.quality && (Y("The buffer has better quality it in then what we would request so set append point to end of buffer!!"), w(G.getTime() + V.getBufferLevel()))
									}
								}();
								var e = 0 < fe.length,
									r = V.getStreamInfo();
								if (he || isNaN(de) || ce || e || function(e, t) {
										le[t] = le[t] || {};
										var n = Q.getTopQualityIndexFor(e, t);
										return le[t][e] != n && (Y("Top quality " + e + " index has changed from " + le[t][e] + " to " + n), le[t][e] = n, !0)
									}(z.mediaInfo.type, r.id) || ae.execute(V, q, j.isVideoTrackPresent())) {
									o(!0), e || ce || Q.checkPlaybackQuality(q), function() {
										var e = V.getFragmentController();
										if (z.quality !== de) Y("ScheduleController - " + q + " - quality has changed, get init request for representationid = " + z.id), de = z.quality, V.switchInitData(z.id);
										else if (ce) Y("ScheduleController - " + q + " - switch track has been asked, get init request for " + q + " with representationid = " + z.id), he = K.getSwitchMode(q) === we.default.TRACK_SWITCH_MODE_ALWAYS_REPLACE, V.switchInitData(z.id, he), de = z.quality, ce = !1;else {
											var t = fe.shift();
											if (e.isInitializationRequest(t)) V.switchInitData(t.representationId);else {
												var n = void 0;
												V.getBufferController().getIsPruningInProgress() || !(n = oe.execute(V, t)) && r.manifestInfo && r.manifestInfo.isDynamic && Y("getNextFragment - " + q + " - Playing at the bleeding live edge and frag is not available yet"), n ? (Y("ScheduleController - " + q + " - getNextFragment - request is " + n.url), W.executeRequest(n)) : (o(!1), i(500))
											}
										}
									}()
								} else i(500)
							}
						}
						function i(e) {
							clearTimeout(re), re = setTimeout(n, e)
						}
						function a(e) {
							e.sender && e.sender.getStreamProcessor() === V && s(z.quality)
						}
						function o(e) {
							te !== e ? te = e : Y("[ScheduleController][", q, "] isFragmentProcessingInProgress is already equal to", e)
						}
						function s(e) {
							var t = F.getInitRequest(V, e);
							t && (o(!0), W.executeRequest(t))
						}
						function u(e) {
							fe.push(e)
						}
						function l(e) {
							if (q === e.mediaType && V.getStreamInfo().id === e.streamInfo.id) {
								if (null === (z = V.getRepresentationInfoForQuality(e.newQuality)) || void 0 === z)
									throw new Error("Unexpected error! - currentRepresentationInfo is null or undefined");
								me[q] = e.newQuality, D(new Date, ve.PlayListTrace.REPRESENTATION_SWITCH_STOP_REASON), O(), G.isPaused() && (ge = {
									type : q,
									oldQuality : e.oldQuality
								})
							}
						}
						function d(e) {
							if (G && W) {
								var t = W.getRequests({
									state : Re.default.FRAGMENT_MODEL_EXECUTED,
									time : G.getTime(),
									threshold : 0
								})[0];
								t && G.getTime() >= t.startTime && ((!ue.mediaInfo || t.mediaInfo.type === ue.mediaInfo.type && t.mediaInfo.id !== ue.mediaInfo.id) && e && L.trigger(Se.default.TRACK_CHANGE_RENDERED, {
									mediaType : q,
									oldMediaInfo : ue.mediaInfo,
									newMediaInfo : t.mediaInfo
								}), t.quality === ue.quality && t.adaptationIndex === ue.adaptationIndex || !e || me[q] === t.quality && (L.trigger(Se.default.QUALITY_CHANGE_RENDERED, {
									mediaType : q,
									oldQuality : ue.quality,
									newQuality : t.quality
								}), me[q] = -1, ge = null), ue = {
									mediaInfo : t.mediaInfo,
									quality : t.quality,
									adaptationIndex : t.adaptationIndex
								})
							}
						}
						function f(e) {
							e.error || e.sender.getStreamProcessor() !== V || (z = F.convertDataToRepresentationInfo(e.currentRepresentation))
						}
						function c(e) {
							e.error || V.getStreamInfo().id !== e.streamInfo.id || (z = V.getCurrentRepresentationInfo(), X && (G.getIsDynamic() ? (k.setTimeSyncCompleted(!0), function() {
								var e = V.getLiveEdgeFinder();
								if (e) {
									var t = e.getLiveEdge(),
										n = z.mediaInfo.streamInfo.manifestInfo.DVRWindowSize / 2,
										r = t - G.computeLiveDelay(z.fragmentDuration, n),
										i = F.getFragmentRequestForTime(V, z, r, {
											ignoreIsFinished : !0
										});
									if (U.getLowLatencyEnabled()) {
										var a = i.duration < U.getLiveDelay() ? i.startTime : i.startTime + i.duration - U.getLiveDelay();
										G.setLiveStartTime(a)
									} else G.setLiveStartTime(i.startTime);
									(ie = G.getStreamStartTime(!1, t)) > z.mediaInfo.streamInfo.start + z.mediaInfo.streamInfo.duration && G.seek(ie);
									var o = B.getCurrentManifestUpdate(P.getMetricsFor(_e.default.STREAM));
									P.updateManifestUpdateInfo(o, {
										currentTime : ie,
										presentationStartTime : t,
										latency : t - ie,
										clientTimeOffset : k.getClientTimeOffset()
									})
								}
							}()) : (ie = G.getStreamStartTime(!1), V.getBufferController().setSeekStartTime(ie))), J && r())
						}
						function h(e) {
							e.fragmentModel === W && (t(), o(!1), Y("[ScheduleController] Stream is complete"))
						}
						function p(e) {
							e.sender === W && (Y("[ScheduleController][", q, "] - onFragmentLoadingCompleted"), x.getIsTextTrack(q) && o(!1), e.error && e.request.serviceLocation, he && (pe = e.request), G.isPaused() && ge && e.request.quality === me[q] && (L.trigger(Se.default.QUALITY_CHANGE_RENDERED, {
								mediaType : q,
								oldQuality : ue.quality || ge.oldQuality,
								newQuality : e.request.quality
							}), me[q] = -1, ge = null))
						}
						function g() {
							d(!0)
						}
						function m(e) {
							e.sender.getStreamProcessor() === V && (he && !isNaN(e.startTime) && (he = !1, W.addExecutedRequest(pe)), o(!1), i(0))
						}
						function _(e) {
							e.streamProcessor === V && (Y("[ScheduleController][onFragmentLoadingAbandoned] for " + q + ", request: " + e.request.url + " has been aborted"), G.isSeeking() || ce || (Y("[ScheduleController][onFragmentLoadingAbandoned] for " + q + ", request: " + e.request.url + " has to be downloaded again, origin is not seeking process or switch track call"), u(e.request)), o(!1), i(0))
						}
						function v(e) {
							e.sender.getStreamProcessor() === V && t()
						}
						function y(e) {
							e.sender.getStreamProcessor() === V && (e.unintended ? V.getFragmentModel().removeExecutedRequestsAfterTime(e.from, V.getStreamInfo().duration) : V.getFragmentModel().syncExecutedRequestsWithBufferedRange(V.getBufferController().getBuffer().getAllBufferRanges(), V.getStreamInfo().duration), e.hasEnoughSpaceToAppend && J && r())
						}
						function E(e) {
							e.sender.getStreamProcessor() !== V || e.state !== Ee.default.BUFFER_EMPTY || G.isSeeking() || (Y("[ScheduleController][", q, "] - Buffer is empty! Stalling!"), D(new Date, ve.PlayListTrace.REBUFFERING_REASON))
						}
						function A(e) {
							e.sender.getStreamProcessor() === V && (t(), o(!1))
						}
						function T() {
							W.abortRequests(), t()
						}
						function R(e) {
							e.sender.getStreamProcessor() === V && s(e.index)
						}
						function I() {
							!J && se || r()
						}
						function S(e) {
							ie = e.seekTime, C(0), J && r();var t = B.getCurrentManifestUpdate(P.getMetricsFor(_e.default.STREAM)),
								n = z.DVRWindow && G ? z.DVRWindow.end - G.getTime() : NaN;
							P.updateManifestUpdateInfo(t, {
								latency : n
							}), te ? Y("[ScheduleController][onPlaybackSeeking] for " + q + ", call fragmentModel.abortRequests in order to seek quicker") : i(0)
						}
						function b(e) {
							$ && ($.playbackspeed = e.playbackRate.toString())
						}
						function w(e) {
							ie = e
						}
						function C(e) {
							ne = e
						}
						function D(e, t) {
							if (Z && !1 === ee) {
								var n = $.start,
									r = e.getTime() - n.getTime();
								$.duration = r, $.stopreason = t, Z.trace.push($), ee = !0
							}
						}
						function O() {
							Z && !0 === ee && z && (ee = !1, ($ = new ve.PlayListTrace).representationid = z.id, $.start = new Date, $.mstart = 1e3 * G.getTime(), $.playbackspeed = G.getPlaybackRate().toString())
						}
						function M() {
							te = !1, ue = {
								mediaInfo : void (ne = 0),
								quality : de = ie = NaN,
								adaptationIndex : NaN
							}, le = {}, fe = [], he = ce = !(J = X = ee = !($ = Z = null)), pe = null
						}
						e = e || {};var N = this.context,
							L = (0, Ie.default)(N).getInstance(),
							P = e.metricsModel,
							F = e.adapter,
							B = e.dashMetrics,
							x = e.dashManifestModel,
							k = e.timelineConverter,
							U = e.mediaPlayerModel,
							Q = e.abrController,
							G = e.playbackController,
							j = e.streamController,
							q = e.type,
							V = e.streamProcessor,
							K = e.mediaController,
							H = void 0,
							Y = void 0,
							W = void 0,
							z = void 0,
							X = void 0,
							J = void 0,
							Z = void 0,
							$ = void 0,
							ee = void 0,
							te = void 0,
							ne = void 0,
							re = void 0,
							ie = void 0,
							ae = void 0,
							oe = void 0,
							se = void 0,
							ue = void 0,
							le = void 0,
							de = void 0,
							fe = void 0,
							ce = void 0,
							he = void 0,
							pe = void 0,
							ge = void 0,
							me = {
								video : -1,
								audio : -1
							};
						return H = {
								initialize : function() {
									W = V.getFragmentModel(), se = U.getScheduleWhilePaused(), ae = (0, Ae.default)(N).create({
										abrController : Q,
										dashMetrics : B,
										metricsModel : P,
										mediaPlayerModel : U
									}), oe = (0, Te.default)(N).create({
										adapter : F
									}), x.getIsTextTrack(q) && L.on(Se.default.TIMED_TEXT_REQUESTED, R, this), L.on(Se.default.QUALITY_CHANGE_REQUESTED, l, this), L.on(Se.default.DATA_UPDATE_STARTED, v, this), L.on(Se.default.DATA_UPDATE_COMPLETED, f, this), L.on(Se.default.FRAGMENT_LOADING_COMPLETED, p, this), L.on(Se.default.STREAM_COMPLETED, h, this), L.on(Se.default.STREAM_INITIALIZED, c, this), L.on(Se.default.BUFFER_LEVEL_STATE_CHANGED, E, this), L.on(Se.default.BUFFER_CLEARED, y, this), L.on(Se.default.BYTES_APPENDED_END_FRAGMENT, m, this), L.on(Se.default.INIT_REQUESTED, a, this), L.on(Se.default.QUOTA_EXCEEDED, A, this), L.on(Se.default.PLAYBACK_SEEKING, S, this), L.on(Se.default.PLAYBACK_STARTED, I, this), L.on(Se.default.PLAYBACK_RATE_CHANGED, b, this), L.on(Se.default.PLAYBACK_TIME_UPDATED, g, this), L.on(Se.default.URL_RESOLUTION_FAILED, T, this), L.on(Se.default.FRAGMENT_LOADING_ABANDONED, _, this)
								},
								getType : function() {
									return q
								},
								getSeekTarget : function() {
									return ie
								},
								setSeekTarget : w,
								setTimeToLoadDelay : C,
								getTimeToLoadDelay : function() {
									return ne
								},
								replaceRequest : u,
								switchTrackAsked : function() {
									ce = !0
								},
								isStarted : function() {
									return !1 === J
								},
								start : r,
								stop : t,
								reset : function() {
									L.off(Se.default.DATA_UPDATE_STARTED, v, this), L.off(Se.default.DATA_UPDATE_COMPLETED, f, this), L.off(Se.default.BUFFER_LEVEL_STATE_CHANGED, E, this), L.off(Se.default.QUALITY_CHANGE_REQUESTED, l, this), L.off(Se.default.FRAGMENT_LOADING_COMPLETED, p, this), L.off(Se.default.STREAM_COMPLETED, h, this), L.off(Se.default.STREAM_INITIALIZED, c, this), L.off(Se.default.QUOTA_EXCEEDED, A, this), L.off(Se.default.BYTES_APPENDED_END_FRAGMENT, m, this), L.off(Se.default.BUFFER_CLEARED, y, this), L.off(Se.default.INIT_REQUESTED, a, this), L.off(Se.default.PLAYBACK_RATE_CHANGED, b, this), L.off(Se.default.PLAYBACK_SEEKING, S, this), L.off(Se.default.PLAYBACK_STARTED, I, this), L.off(Se.default.PLAYBACK_TIME_UPDATED, g, this), L.off(Se.default.URL_RESOLUTION_FAILED, T, this), L.off(Se.default.FRAGMENT_LOADING_ABANDONED, _, this), x.getIsTextTrack(q) && L.off(Se.default.TIMED_TEXT_REQUESTED, R, this), t(), d(!1), M()
								},
								setPlayList : function(e) {
									Z = e
								},
								getBufferTarget : function() {
									return ae.getBufferTarget(V, q, j.isVideoTrackPresent())
								},
								finalisePlayList : function(e, t) {
									D(e, t), Z = null
								}
							}, Y = (0, be.default)(N).getInstance().log.bind(H), M(), H
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var _e = r(e(59)),
						ve = e(131),
						ye = r(e(62)),
						Ee = r(e(64)),
						Ae = r(e(96)),
						Te = r(e(97)),
						Re = r(e(75)),
						Ie = r(e(8)),
						Se = r(e(12)),
						a = r(e(9)),
						be = r(e(7)),
						we = r(e(67));
					i.__dashjs_factory_name = "ScheduleController", n.default = a.default.getClassFactory(i), t.exports = n.default
				}, {
					12 : 12,
					131 : 131,
					59 : 59,
					62 : 62,
					64 : 64,
					67 : 67,
					7 : 7,
					75 : 75,
					8 : 8,
					9 : 9,
					96 : 96,
					97 : 97
				} ],
				71 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						function n() {
							if (v()) {
								var e = se.getPlaybackQuality();
								e && Q.addDroppedFrames(ye.default.VIDEO, e)
							}
						}
						function r() {
							if (!(!le.getJumpGaps() || !$ || 0 === $.getProcessors().length || ue.isSeeking() || de || re || ie || ae) && ++_e >= D) {
								var e = ue.getTime();
								ve === e ? function(e) {
									for (var t = $.getProcessors(), n = le.getSmallGapLimit(), r = void 0, i = 0; i < t.length; i++) {
										var a = t[i].getBuffer(),
											o = a.getAllBufferRanges(),
											s = void 0;
										if (o && !(o.length <= 1)) {
											for (var u = 0; u < o.length; u++)
												if (e < o.start(u)) {
													s = o.start(u);break
											}
											if (0 < s) {
												var l = s - e;
												0 < l && l <= n && (void 0 === r || r < s) && (r = s)
											}
										}
									}
									var d = ue.getTimeToStreamEnd();
									void 0 === r && !isNaN(d) && d < n && (r = e + d), 0 < r && (!isNaN(d) && e + d <= r ? (M("Jumping media gap (discontinuity) at time ", e, ". Jumping to end of the stream"), N.trigger(Se.default.PLAYBACK_ENDED)) : (M("Jumping media gap (discontinuity) at time ", e, ". Jumping to time position", r), ue.seek(r)))
								}(e) : ve = e, _e = 0
							}
						}
						function i(e) {
							var t = l(e.seekTime);
							me && (s(), ge = !1), t && t !== $ ? (E(we.PlayListTrace.END_OF_PERIOD_STOP_REASON), f($, t, e.seekTime)) : E(we.PlayListTrace.USER_REQUEST_STOP_REASON), A(we.PlayList.SEEK_START_REASON)
						}
						function a() {
							M("[StreamController][onPlaybackStarted]"), fe ? (fe = !1, A(we.PlayList.INITIAL_PLAYOUT_START_REASON)) : de && (de = !1, A(we.PlayList.RESUME_FROM_PAUSE_START_REASON), t())
						}
						function o(e) {
							M("[StreamController][onPlaybackPaused]"), e.ended || (de = !0, E(we.PlayListTrace.USER_REQUEST_STOP_REASON), t())
						}
						function s() {
							M("[StreamController][toggleEndPeriodTimer] stop end period timer."), clearTimeout(me), me = void 0
						}
						function t() {
							if (ge)
								if (me) s();else {
									var e = ue.getTimeToStreamEnd(),
										t = 0 < e ? 1e3 * e : 0;
									M("[StreamController][toggleEndPeriodTimer] start-up of timer to notify PLAYBACK_ENDED event. It will be triggered in " + t + " milliseconds"), me = setTimeout(function() {
										N.trigger(Se.default.PLAYBACK_ENDED)
									}, t)
							}
						}
						function u() {
							var e = R().isLast;
							oe && e ? (M("[StreamController][onStreamBufferingCompleted] calls signalEndOfStream of mediaSourceController."), j.signalEndOfStream(oe)) : oe && void 0 === me && (M("[StreamController][onStreamBufferingCompleted] end of period detected"), !(ge = !0) === de && t())
						}
						function l(e) {
							var t = 0,
								n = null,
								r = Z.length;
							0 < r && (t += Z[0].getStartTime());
							for (var i = 0; i < r; i++)
								if (n = Z[i], e < (t = parseFloat((t + n.getDuration()).toFixed(5)))) return n;
							return null
						}
						function d() {
							var e = function() {
								if ($) {
									var e = (t = $.getStreamInfo().start, n = $.getStreamInfo().duration, {
										v : Z.filter(function(e) {
											return e.getStreamInfo().start === parseFloat((t + n).toFixed(5))
										})[0]
									});
									if ("object" == Fe(e)) return e.v
								}
								var t,
									n
							}();
							e ? (he = pe = void 0, f($, e, NaN)) : M("StreamController no next stream found"), E(e ? we.PlayListTrace.END_OF_PERIOD_STOP_REASON : we.PlayListTrace.END_OF_CONTENT_STOP_REASON), me = void 0, ge = !1
						}
						function f(e, t, n) {
							!re && t && e !== t && (re = !0, N.trigger(Se.default.PERIOD_SWITCH_STARTED, {
								fromStreamInfo : e ? e.getStreamInfo() : null,
								toStreamInfo : t.getStreamInfo()
							}), e && (e.stopEventController(), e.deactivate()), $ = t, ue.initialize($.getStreamInfo()), se.getElement() ? c(n, e, !1) : h(n))
						}
						function c(e, t, n) {
							function r() {
								oe && (M("MediaSource is open!"), window.URL.revokeObjectURL(i), oe.removeEventListener("sourceopen", r), oe.removeEventListener("webkitsourceopen", r), p(), t || N.trigger(Se.default.SOURCE_INITIALIZED), n ? $.setMediaSource(oe) : h(e))
							}
							var i = void 0;
							oe ? j.detachMediaSource(se) : oe = j.createMediaSource(), oe.addEventListener("sourceopen", r, !1), oe.addEventListener("webkitsourceopen", r, !1), i = j.attachMediaSource(oe, se), M("MediaSource attached to element.  Waiting on open...")
						}
						function h(e) {
							var t;
							$.activate(oe), pe = y(ye.default.AUDIO), he = y(ye.default.VIDEO), fe || (isNaN(e) ? (t = ue.getStreamStartTime(!0), $.getProcessors().forEach(function(e) {
								U.setIndexHandlerTime(e, t)
							})) : ue.seek(e)), $.startEventController(), !ne && fe || ue.play(), re = !1, N.trigger(Se.default.PERIOD_SWITCH_COMPLETED, {
								toStreamInfo : $.getStreamInfo()
							})
						}
						function p() {
							var e = $.getStreamInfo().manifestInfo.duration,
								t = j.setDuration(oe, e);
							M("Duration successfully set to: " + t)
						}
						function g(e) {
							for (var t = 0, n = Z.length; t < n; t++)
								if (Z[t].getId() === e.id) return Z[t];
							return null
						}
						function m() {
							var e = x.getValue();
							ee && (N.trigger(Se.default.PROTECTION_CREATED, {
								controller : ee,
								manifest : e
							}), ee.setMediaElement(se.getElement()), te && ee.setProtectionData(te)), function() {
								try {
									var e = U.getStreamsInfo();
									if (0 === e.length)
										throw new Error("There are no streams");
									var t = G.getCurrentManifestUpdate(Q.getMetricsFor(ye.default.STREAM));
									Q.updateManifestUpdateInfo(t, {
										currentTime : ue.getTime(),
										buffered : se.getBufferRange(),
										presentationStartTime : e[0].start,
										clientTimeOffset : J.getClientTimeOffset()
									});
									for (var n = 0, r = e.length; n < r; n++) {
										var i = e[n],
											a = g(i);
										a ? a.updateData(i) : (a = (0, Te.default)(O).create({
											manifestModel : x,
											dashManifestModel : k,
											mediaPlayerModel : le,
											metricsModel : Q,
											dashMetrics : G,
											manifestUpdater : F,
											adapter : U,
											timelineConverter : J,
											capabilities : P,
											errHandler : X,
											baseURLController : V,
											domStorage : K,
											abrController : H,
											playbackController : ue,
											mediaController : Y,
											videoModel : se,
											streamController : L
										}), Z.push(a), a.initialize(i, ee)), Q.addManifestUpdateStreamInfo(t, i.id, i.index, i.start, i.duration)
									}
									if (!$) {
										var o = ue.getStartTimeFromUriParameters(),
											s = null;
										o && (s = l(isNaN(o.fragS) ? o.fragT : o.fragS)), f(null, null !== s ? s : Z[0], NaN)
									}
									N.trigger(Se.default.STREAMS_COMPOSED)
								} catch (e) {
									X.manifestError(e.message, "nostreamscomposed", x.getValue()), ae = !0, w()
								}
							}()
						}
						function _(s) {
							s.error ? (ae = !0, w()) : function() {
								var e = s.manifest;
								U.updatePeriods(e);
								var t = U.getStreamsInfo(void 0, 1)[0],
									n = U.getMediaInfoForType(t, ye.default.VIDEO) || U.getMediaInfoForType(t, ye.default.AUDIO),
									r = void 0;
								n && (r = k.getUseCalculatedLiveEdgeTimeForAdaptation(U.getDataForMedia(n))) && (M("SegmentTimeline detected using calculated Live Edge Time"), le.setUseManifestDateHeaderTimeSource(!1));
								var i = k.getUTCTimingSources(s.manifest),
									a = !k.getIsDynamic(e) || r ? i : i.concat(le.getUTCTimingSources()),
									o = z.isHTTPS(s.manifest.url);
								a.forEach(function(e) {
									e.value.replace(/.*?:\/\//g, "") === be.default.DEFAULT_UTC_TIMING_SOURCE.value.replace(/.*?:\/\//g, "") && (e.value = e.value.replace(o ? new RegExp(/^(http:)?\/\//i) : new RegExp(/^(https:)?\/\//i), o ? "https://" : "http://"), M("Matching default timing source protocol to manifest protocol: ", e.value))
								}), V.initialize(e), q.setConfig({
									metricsModel : Q,
									dashMetrics : G,
									baseURLController : V
								}), q.initialize(a, le.getUseManifestDateHeaderTimeSource())
							}()
						}
						function v() {
							return he
						}
						function y(t) {
							var n = !1;
							return $ && $.getProcessors().forEach(function(e) {
									e.getMediaInfo().type === t && (n = !0)
								}), n
						}
						function E(n, r) {
							r = r || new Date, ce && ($ && $.getProcessors().forEach(function(e) {
								var t = e.getScheduleController();
								t && t.finalisePlayList(r, n)
							}), Q.addPlayList(ce), ce = null)
						}
						function A(e) {
							(ce = new we.PlayList).start = new Date, ce.mstart = 1e3 * ue.getTime(), ce.starttype = e, $ && $.getProcessors().forEach(function(e) {
								var t = e.getScheduleController();
								t && t.setPlayList(ce)
							})
						}
						function T(e) {
							if (e.error) {
								var t = "",
									n = Ee.default.MEDIA_ERROR;
								switch (this.MEDIA_DOWNLOAD_ERROR = 5001, e.error.code) {
								case 1:
									t = "MEDIA_ERR_ABORTED", n = Ee.default.MEDIA_ABORTED_ERROR;
									break;case 2:
									t = "MEDIA_ERR_NETWORK", n = Ee.default.MEDIA_NETWORK_ERROR;
									break;case 3:
									t = "MEDIA_ERR_DECODE", n = Ee.default.MEDIA_DECODE_ERROR;
									break;case 4:
									t = "MEDIA_ERR_SRC_NOT_SUPPORTED", n = Ee.default.MEDIA_SUPPORTED_ERROR;
									break;case 5:
									t = "MEDIA_ERR_ENCRYPTED", n = Ee.default.MEDIA_ENCRYPTED_ERROR;
									break;default:
									t = "UNKNOWN", n = Ee.default.MEDIA_UNKNOWN_ERROR
								}
								e.errorCode = n, ie = !0, e.error.message && (t += " (" + e.error.message + ")"), e.error.msExtendedCode && (t += " (0x" + (e.error.msExtendedCode >>> 0).toString(16).toUpperCase() + ")"), M("Video Element Error: " + t), e.error && M(e.error), X.mediaSourceError(t, n), w()
							}
						}
						function R() {
							return $ ? $.getStreamInfo() : null
						}
						function I() {
							if (!(B && B.hasOwnProperty("load") && J && J.hasOwnProperty("initialize") && J.hasOwnProperty("reset") && J.hasOwnProperty("getClientTimeOffset")))
								throw new Error("setConfig function has to be called previously")
						}
						function S(e) {
							isNaN(e.newDuration) || p(e.newDuration)
						}
						function b() {
							ce = $ = ee = null, me = pe = he = void 0, ge = !(ne = !(de = !(fe = !(ae = ie = re = !(Z = []))))), _e = 0
						}
						function w() {
							I(), q.reset(), E(ie || ae ? we.PlayListTrace.FAILURE_STOP_REASON : we.PlayListTrace.USER_REQUEST_STOP_REASON);
							for (var e = 0, t = Z ? Z.length : 0; e < t; e++) Z[e].reset(ie);
							N.off(Se.default.PLAYBACK_TIME_UPDATED, n, this), N.off(Se.default.PLAYBACK_SEEKING, i, this), N.off(Se.default.PLAYBACK_ERROR, T, this), N.off(Se.default.PLAYBACK_STARTED, a, this), N.off(Se.default.PLAYBACK_PAUSED, o, this), N.off(Se.default.PLAYBACK_ENDED, d, this), N.off(Se.default.MANIFEST_UPDATED, _, this), N.off(Se.default.STREAM_BUFFERING_COMPLETED, u, this), N.off(Me.default.METRIC_ADDED, C, this), N.off(Se.default.MANIFEST_VALIDITY_CHANGED, S, this), V.reset(), F.reset(), Q.clearAllCurrentMetrics(), x.setValue(null), B.reset(), J.reset(), W.reset(), oe && (j.detachMediaSource(se), oe = null), se = null, ee && (ee.setMediaElement(null), te = ee = null, x.getValue() && N.trigger(Se.default.PROTECTION_DESTROYED, {
								data : x.getValue().url
							})), N.trigger(Se.default.STREAM_TEARDOWN_COMPLETE), b()
						}
						function C(e) {
							e.metric === Ae.default.DVR_INFO && e.mediaType === ye.default.AUDIO && j.setSeekable(oe, e.value.range.start, e.value.range.end)
						}
						var D = 40,
							O = this.context,
							M = (0, Ce.default)(O).getInstance().log,
							N = (0, Ie.default)(O).getInstance(),
							L = void 0,
							P = void 0,
							F = void 0,
							B = void 0,
							x = void 0,
							k = void 0,
							U = void 0,
							Q = void 0,
							G = void 0,
							j = void 0,
							q = void 0,
							V = void 0,
							K = void 0,
							H = void 0,
							Y = void 0,
							W = void 0,
							z = void 0,
							X = void 0,
							J = void 0,
							Z = void 0,
							$ = void 0,
							ee = void 0,
							te = void 0,
							ne = void 0,
							re = void 0,
							ie = void 0,
							ae = void 0,
							oe = void 0,
							se = void 0,
							ue = void 0,
							le = void 0,
							de = void 0,
							fe = void 0,
							ce = void 0,
							he = void 0,
							pe = void 0,
							ge = void 0,
							me = void 0,
							_e = void 0,
							ve = void 0;
						return L = {
								initialize : function(e, t) {
									I(), ne = e, te = t, J.initialize(), (F = (0, Re.default)(O).create()).setConfig({
										manifestModel : x,
										dashManifestModel : k,
										mediaPlayerModel : le,
										manifestLoader : B,
										errHandler : X
									}), F.initialize(), V.setConfig({
										dashManifestModel : k
									}), N.on(Se.default.TIME_SYNCHRONIZATION_COMPLETED, m, this), N.on(Se.default.PLAYBACK_SEEKING, i, this), N.on(Se.default.PLAYBACK_TIME_UPDATED, n, this), N.on(Se.default.PLAYBACK_ENDED, d, this), N.on(Se.default.PLAYBACK_ERROR, T, this), N.on(Se.default.PLAYBACK_STARTED, a, this), N.on(Se.default.PLAYBACK_PAUSED, o, this), N.on(Se.default.MANIFEST_UPDATED, _, this), N.on(Se.default.STREAM_BUFFERING_COMPLETED, u, this), N.on(Se.default.MANIFEST_VALIDITY_CHANGED, S, this), N.on(Se.default.WALLCLOCK_TIME_UPDATED, r, this), N.on(Me.default.METRIC_ADDED, C, this)
								},
								getActiveStreamInfo : R,
								isVideoTrackPresent : v,
								isAudioTrackPresent : function() {
									return pe
								},
								switchToVideoElement : function(e) {
									ue.initialize($.getStreamInfo()), c(e, null, !0)
								},
								getStreamById : function(t) {
									return Z.filter(function(e) {
										return e.getId() === t
									})[0]
								},
								getStreamForTime : l,
								getTimeRelativeToStreamId : function(e, t) {
									for (var n = null, r = 0, i = 0, a = null, o = Z.length, s = 0; s < o; s++) {
										if (i = (n = Z[s]).getStartTime(), a = n.getDuration(), Number.isFinite(i) && (r = i), n.getId() === t) return e - r;
										Number.isFinite(a) && (r += a)
									}
									return null
								},
								load : function(e) {
									I(), B.load(e)
								},
								loadWithManifest : function(e) {
									(function() {
										if (!F || !F.hasOwnProperty("setManifest"))
											throw new Error("initialize function has to be called previously")
									})(), F.setManifest(e)
								},
								getActiveStreamProcessors : function() {
									return $ ? $.getProcessors() : []
								},
								setConfig : function(e) {
									e && (e.capabilities && (P = e.capabilities), e.manifestLoader && (B = e.manifestLoader), e.manifestModel && (x = e.manifestModel), e.dashManifestModel && (k = e.dashManifestModel), e.mediaPlayerModel && (le = e.mediaPlayerModel), e.protectionController && (ee = e.protectionController), e.adapter && (U = e.adapter), e.metricsModel && (Q = e.metricsModel), e.dashMetrics && (G = e.dashMetrics), e.errHandler && (X = e.errHandler), e.timelineConverter && (J = e.timelineConverter), e.videoModel && (se = e.videoModel), e.playbackController && (ue = e.playbackController), e.domStorage && (K = e.domStorage), e.abrController && (H = e.abrController), e.mediaController && (Y = e.mediaController))
								},
								setProtectionData : function(e) {
									te = e
								},
								reset : w
							}, q = (0, Ne.default)(O).getInstance(), V = (0, Le.default)(O).getInstance(), j = (0, Pe.default)(O).getInstance(), W = (0, De.default)(O).getInstance(), z = (0, Oe.default)(O).getInstance(), b(), L
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var ye = r(e(59)),
						Ee = r(e(60)),
						Ae = r(e(61)),
						Te = r(e(56)),
						Re = r(e(51)),
						Ie = r(e(8)),
						Se = r(e(12)),
						be = r(e(77)),
						a = r(e(9)),
						we = e(131),
						Ce = r(e(7)),
						De = r(e(103)),
						Oe = r(e(108)),
						Me = r(e(53)),
						Ne = r(e(72)),
						Le = r(e(63)),
						Pe = r(e(68));
					i.__dashjs_factory_name = "StreamController", n.default = a.default.getSingletonFactory(i), t.exports = n.default
				}, {
					103 : 103,
					108 : 108,
					12 : 12,
					131 : 131,
					51 : 51,
					53 : 53,
					56 : 56,
					59 : 59,
					60 : 60,
					61 : 61,
					63 : 63,
					68 : 68,
					7 : 7,
					72 : 72,
					77 : 77,
					8 : 8,
					9 : 9
				} ],
				72 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						function o(e) {
							_ = e
						}
						function n(e) {
							e
						}
						function s(e) {
							m = e
						}
						function i(e) {
							var t,
								n,
								r,
								i = Date.parse(e);
							return isNaN(i) && (n = t = void 0, r = /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?(?:([+\-])([0-9]{2})([0-9]{2}))?/.exec(e), t = Date.UTC(parseInt(r[1], 10), parseInt(r[2], 10) - 1, parseInt(r[3], 10), parseInt(r[4], 10), parseInt(r[5], 10), r[6] && (parseInt(r[6], 10) || 0), r[7] && 1e3 * parseFloat(r[7]) || 0), r[9] && r[10] && (n = 60 * parseInt(r[9], 10) + parseInt(r[10], 10), t += ("+" === r[8] ? -1 : 1) * n * 60 * 1e3), i = new Date(t).getTime()), i
						}
						function r(e) {
							return Date.parse(e)
						}
						function a(e) {
							return Date.parse(e)
						}
						function u(e, t, n) {
							n()
						}
						function l(e, t, n) {
							var r = i(e);
							isNaN(r) ? n() : t(r)
						}
						function c(n, e, r, t, i) {
							var a,
								o,
								s = !1,
								u = new XMLHttpRequest,
								l = i ? S.HTTPRequest.HEAD : S.HTTPRequest.GET,
								d = e.match(/\S+/g);
							if (e = d.shift(), a = function() {
									s || (s = !0, d.length ? c(n, d.join(" "), r, t, i) : t())
								}, o = function() {
									var e = void 0,
										t = void 0;
									200 === u.status && (e = i ? u.getResponseHeader("Date") : u.response, t = n(e), isNaN(t) || (r(t), s = !0))
								}, g.isRelative(e)) {
								var f = T.resolve();
								f && (e = g.resolve(e, f.url))
							}
							u.open(l, e), u.timeout = 5e3, u.onload = o, u.onloadend = a, u.send()
						}
						function d(e, t, n) {
							c(a, e, t, n, !0)
						}
						function f(e, t, n) {
							o(!1), p.trigger(w.default.TIME_SYNCHRONIZATION_COMPLETED, {
								time : t,
								offset : n,
								error : e ? new I.default(1) : null
							})
						}
						var e = this.context,
							h = (0, C.default)(e).getInstance().log,
							p = (0, b.default)(e).getInstance(),
							g = (0, D.default)(e).getInstance(),
							m = void 0,
							_ = void 0,
							v = void 0,
							y = void 0,
							E = void 0,
							A = void 0,
							T = void 0;
						return {
							initialize : function(e, t) {
								v = t, m = 0, _ = !1, y = {
									"urn:mpeg:dash:utc:http-head:2014" : d,
									"urn:mpeg:dash:utc:http-xsdate:2014" : c.bind(null, i),
									"urn:mpeg:dash:utc:http-iso:2014" : c.bind(null, r),
									"urn:mpeg:dash:utc:direct:2014" : l,
									"urn:mpeg:dash:utc:http-head:2012" : d,
									"urn:mpeg:dash:utc:http-xsdate:2012" : c.bind(null, i),
									"urn:mpeg:dash:utc:http-iso:2012" : c.bind(null, r),
									"urn:mpeg:dash:utc:direct:2012" : l,
									"urn:mpeg:dash:utc:http-ntp:2014" : u,
									"urn:mpeg:dash:utc:ntp:2014" : u,
									"urn:mpeg:dash:utc:sntp:2014" : u
								}, _ || (function e(t, n) {
									var r = n || 0,
										i = t[r],
										a = function(e, t) {
											var n,
												r,
												i,
												a = !e || !t;
											a && v ? (n = E.getReadOnlyMetricsFor(R.default.STREAM), r = A.getLatestMPDRequestHeaderValueByID(n, "Date"), i = null !== r ? new Date(r).getTime() : Number.NaN, isNaN(i) ? f(!0) : (s(i - (new Date).getTime()), f(!1, i / 1e3, m))) : f(a, e, t)
										};
									o(!0), i ? y.hasOwnProperty(i.schemeIdUri) ? y[i.schemeIdUri](i.value, function(e) {
										var t = (new Date).getTime(),
											n = e - t;
										s(n), h("Local time:      " + new Date(t)), h("Server time:     " + new Date(e)), h("Difference (ms): " + n), a(e, n)
									}, function() {
										e(t, r + 1)
									}) : e(t, r + 1) : (s(0), a())
								}(e), n(!0))
							},
							getOffsetToDeviceTimeMs : function() {
								return m
							},
							setConfig : function(e) {
								e && (e.metricsModel && (E = e.metricsModel), e.dashMetrics && (A = e.dashMetrics), e.baseURLController && (T = e.baseURLController))
							},
							reset : function() {
								n(!1), o(!1)
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var R = r(e(59)),
						I = r(e(112)),
						S = e(129),
						b = r(e(8)),
						w = r(e(12)),
						a = r(e(9)),
						C = r(e(7)),
						D = r(e(108));
					i.__dashjs_factory_name = "TimeSyncController";
					var o = a.default.getSingletonFactory(i);
					o.TIME_SYNC_FAILED_ERROR_CODE = 1, o.HTTP_TIMEOUT_MS = 5e3, a.default.updateSingletonFactory(i.__dashjs_factory_name, o), n.default = o, t.exports = n.default
				}, {
					108 : 108,
					112 : 112,
					12 : 12,
					129 : 129,
					59 : 59,
					7 : 7,
					8 : 8,
					9 : 9
				} ],
				73 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e) {
						function i(e, t, n) {
							var r = {},
								i = void 0,
								a = void 0;
							r.elements = e, r.type = t, r.resolveType = n, 0 === r.elements.length && s(r);
							for (var o = 0; o < r.elements.length; o++) i = r.elements[o], a = u.isHTTPURL(i.url) ? i.url : i.originalContent.BaseURL + i.url, h.load(a, i, r)
						}
						function t(e) {
							var t,
								n = void 0,
								r = "";
							if (n = e.element, t = e.resolveObject, n.resolvedContent) {
								var i = 0;
								0 === n.resolvedContent.indexOf("<?xml") && (i = n.resolvedContent.indexOf("?>") + 2), r = n.resolvedContent.substr(0, i) + "<response>" + n.resolvedContent.substr(i) + "</response>", n.resolvedContent = c.xml_str2json(r)
							}
							(function(e) {
								var t = void 0;
								for (t = 0; t < e.elements.length; t++)
									if (!1 === e.elements[t].resolved) return !1;
								return !0
							})(t) && s(t)
						}
						function s(e) {
							var t = [],
								n = void 0,
								r = void 0;
							if (function(e) {
									var t = [],
										n = void 0,
										r = void 0,
										i = void 0,
										a = void 0,
										o = void 0,
										s = void 0;
									for (a = e.elements.length - 1; 0 <= a; a--) {
										if (n = e.elements[a], r = n.type + "_asArray", n.resolvedContent) {
											if (n.resolvedContent)
												for (o = 0; o < n.resolvedContent[r].length; o++) i = n.resolvedContent[r][o], t.push(i)
										} else
											delete n.originalContent["xlink:actuate"]
											,
											delete n.originalContent["xlink:href"]
											, t.push(n.originalContent);
										for (n.parentElement[r].splice(n.index, 1), s = 0; s < t.length; s++) n.parentElement[r].splice(n.index + s, 0, t[s]);
										t = []
									}
									0 < e.elements.length && d.run(f)
								}(e), "onActuate" === e.resolveType && o.trigger(m.default.XLINK_READY, {
									manifest : f
								}), e.resolveType === y) switch (e.type) {
								case E:
									for (n = 0; n < f.Period_asArray.length; n++) (r = f.Period_asArray[n]).hasOwnProperty(A + "_asArray") && (t = t.concat(a(r[A + "_asArray"], r, A, y))), r.hasOwnProperty(T + "_asArray") && (t = t.concat(a(r[T + "_asArray"], r, T, y)));
									i(t, A, y);
									break;case A:
									o.trigger(m.default.XLINK_READY, {
										manifest : f
									})
							}
						}
						function a(e, t, n, r) {
							var i = [],
								a = void 0,
								o = void 0,
								s = void 0;
							for (o = e.length - 1; 0 <= o; o--) (a = e[o]).hasOwnProperty("xlink:href") && "urn:mpeg:dash:resolve-to-zero:2013" === a["xlink:href"] && e.splice(o, 1);
							for (o = 0; o < e.length; o++) (a = e[o]).hasOwnProperty("xlink:href") && a.hasOwnProperty("xlink:actuate") && a["xlink:actuate"] === r && (s = {
									url : a["xlink:href"],
									parentElement : t,
									type : n,
									index : o,
									resolveType : r,
									originalContent : a,
									resolvedContent : null,
									resolved : !1
								}, i.push(s));
							return i
						}
						e = e || {};var n = this.context,
							o = (0, g.default)(n).getInstance(),
							u = (0, v.default)(n).getInstance(),
							r = void 0,
							l = void 0,
							d = void 0,
							f = void 0,
							c = void 0,
							h = void 0;
						return r = {
								resolveManifestOnLoad : function(e) {
									c = new _.default({
										escapeMode : !1,
										attributePrefix : "",
										arrayAccessForm : "property",
										emptyNodeForm : "object",
										stripWhitespaces : !1,
										enableToStringFunc : !1,
										ignoreRoot : !0,
										matchers : l
									}), i(a((f = e).Period_asArray, f, E, y), E, y)
								},
								setMatchers : function(e) {
									e && (l = e)
								},
								setIron : function(e) {
									e && (d = e)
								},
								reset : function() {
									o.off(m.default.XLINK_ELEMENT_LOADED, t, r), h && (h.reset(), h = null)
								}
							}, o.on(m.default.XLINK_ELEMENT_LOADED, t, r), h = (0, p.default)(n).create({
								errHandler : e.errHandler,
								metricsModel : e.metricsModel,
								mediaPlayerModel : e.mediaPlayerModel,
								requestModifier : e.requestModifier
							}), r
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var p = r(e(58)),
						g = r(e(8)),
						m = r(e(12)),
						a = r(e(9)),
						_ = r(e(3)),
						v = r(e(108)),
						y = "onLoad",
						E = "Period",
						A = "AdaptationSet",
						T = "EventStream";
					i.__dashjs_factory_name = "XlinkController", n.default = a.default.getClassFactory(i), t.exports = n.default
				}, {
					108 : 108,
					12 : 12,
					3 : 3,
					58 : 58,
					8 : 8,
					9 : 9
				} ],
				74 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						function i(e, t, n) {
							var r = o.getBaseURLsFromElement(n);
							e[t] ? s.areEqual(r, e[t].data.baseUrls) || (e[t].data.baseUrls = r, e[t].data.selectedIdx = l) : e[t] = new d(r)
						}
						function e() {
							a = new d
						}
						var t,
							a = void 0,
							o = void 0,
							n = this.context,
							s = (0, u.default)(n).getInstance();
						return t = {
								reset : e,
								update : function(e) {
									var t,
										n;
									t = e, n = o.getBaseURLsFromElement(t), s.areEqual(n, a.data.baseUrls) || (a.data.baseUrls = n, a.data.selectedIdx = l), t.Period_asArray && t.Period_asArray.forEach(function(e, r) {
										i(a.children, r, e), e.AdaptationSet_asArray && e.AdaptationSet_asArray.forEach(function(e, n) {
											i(a.children[r].children, n, e), e.Representation_asArray && e.Representation_asArray.sort(o.getRepresentationSortFunction()).forEach(function(e, t) {
												i(a.children[r].children[n].children, t, e)
											})
										})
									})
								},
								getForPath : function(e) {
									var t = a,
										n = [ t.data ];
									return e && e.forEach(function(e) {
											(t = t.children[e]) && n.push(t.data)
										}), n.filter(function(e) {
											return e.baseUrls.length
										})
								},
								invalidateSelectedIndexes : function(t) {
									!function t(n, e) {
										var r = e || a;
										n(r.data), r.children && r.children.forEach(function(e) {
											return t(n, e)
										})
									}(function(e) {
										isNaN(e.selectedIdx) || t === e.baseUrls[e.selectedIdx].serviceLocation && (e.selectedIdx = l)
									})
								},
								setConfig : function(e) {
									e.dashManifestModel && (o = e.dashManifestModel)
								}
							}, e(), t
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var u = r(e(106)),
						a = r(e(9)),
						l = NaN,
						d = function e(t, n) {
							(function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							})(this, e), this.data = {
								baseUrls : t || null,
								selectedIdx : n || l
							}, this.children = []
						};
					i.__dashjs_factory_name = "BaseURLTreeModel", n.default = a.default.getClassFactory(i), t.exports = n.default
				}, {
					106 : 106,
					9 : 9
				} ],
				75 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e) {
						function i(s) {
							var u;
							return !!s && (u = !1, _.some(function(e) {
									if (a = s, o = e, !isNaN(a.index) && a.startTime === o.startTime && a.adaptationIndex === o.adaptationIndex && a.type === o.type || (r = s, i = e, isNaN(r.index) && isNaN(i.index) && r.quality === i.quality) || (n = e, (t = s).action === A.default.ACTION_COMPLETE && t.action === n.action)) return u = !0;
									var t,
										n,
										r,
										i,
										a,
										o
								}), u)
						}
						function s(e) {
							return isNaN(e.duration) ? .25 : e.duration / 8
						}
						function a(n) {
							_ = _.filter(function(e) {
								var t = s(e);
								return isNaN(e.startTime) || void 0 !== n && e.startTime >= n - t
							})
						}
						function o(n, r) {
							r <= n + .5 || (_ = _.filter(function(e) {
								var t = s(e);
								return isNaN(e.startTime) || e.startTime >= r - t || isNaN(e.duration) || e.startTime + e.duration <= n + t
							}))
						}
						function n(e, t) {
							h.addSchedulingInfo(e.mediaType, new Date, e.type, e.startTime, e.availabilityStartTime, e.duration, e.quality, e.range, t), h.addRequestsQueue(e.mediaType, v, _)
						}
						function t(e) {
							e.sender === p && (v.splice(v.indexOf(e.request), 1), e.response && !e.error && _.push(e.request), n(e.request, e.error ? "failed" : I), c.trigger(E.default.FRAGMENT_LOADING_COMPLETED, {
								request : e.request,
								response : e.response,
								error : e.error,
								sender : this
							}))
						}
						function r(e) {
							e.sender === p && c.trigger(E.default.FRAGMENT_LOADING_PROGRESS, {
								request : e.request,
								response : e.response,
								error : e.error,
								sender : this
							})
						}
						function u(e) {
							e.sender === p && c.trigger(E.default.FRAGMENT_LOADING_ABANDONED, {
								streamProcessor : this.getStreamProcessor(),
								request : e.request,
								mediaType : e.mediaType
							})
						}
						function l() {
							_ = [], v = []
						}
						e = e || {};var d = this.context,
							f = (0, T.default)(d).getInstance().log,
							c = (0, y.default)(d).getInstance(),
							h = e.metricsModel,
							p = e.fragmentLoader,
							g = void 0,
							m = void 0,
							_ = void 0,
							v = void 0;
						return g = {
								setStreamProcessor : function(e) {
									m = e
								},
								getStreamProcessor : function() {
									return m
								},
								getRequests : function(i) {
									var e = i ? i.state instanceof Array ? i.state : [ i.state ] : [],
										a = [];
									return e.forEach(function(e) {
											var t,
												n,
												r = function(e) {
													var t = void 0;
													switch (e) {
													case R:
														t = v;
														break;case I:
														t = _;
														break;default:
														t = []
													}
													return t
												}(e);
											a = a.concat((t = r, (n = i).hasOwnProperty("time") ? [ function(e, t, n) {
												for (var r = e.length - 1; 0 <= r; r--) {
													var i = e[r],
														a = i.startTime,
														o = a + i.duration;
													if (n = isNaN(n) ? s(i) : n, !isNaN(a) && !isNaN(o) && a <= t + n && t - n < o || isNaN(a) && isNaN(t)) return i
												}
												return null
											}(t, n.time, n.threshold) ] : t.filter(function(e) {
												for (var t in n)
													if ("state" !== t && n.hasOwnProperty(t) && e[t] != n[t]) return !1;
												return !0
											})))
										}), a
								},
								isFragmentLoaded : i,
								isFragmentLoadedOrPending : function(e) {
									var t = !1,
										n = 0,
										r = void 0;
									if (!(t = i(e)))
										for (n = 0; n < v.length; n++) r = v[n], e.url === r.url && e.startTime === r.startTime && (t = !0);
									return t
								},
								removeExecutedRequestsBeforeTime : a,
								removeExecutedRequestsAfterTime : function(t) {
									_ = _.filter(function(e) {
										return isNaN(e.startTime) || void 0 !== t && e.startTime <= t
									})
								},
								syncExecutedRequestsWithBufferedRange : function(e, t) {
									if (e && 0 !== e.length) {
										for (var n = 0, r = 0, i = e.length; r < i; r++) o(n, e.start(r)), n = e.end(r);
										0 < t && o(n, t)
									} else a()
								},
								abortRequests : function() {
									p.abort(), v = []
								},
								executeRequest : function(e) {
									switch (e.action) {
									case A.default.ACTION_COMPLETE:
										_.push(e), n(e, I), f("[FragmentModel] executeRequest trigger STREAM_COMPLETED"), c.trigger(E.default.STREAM_COMPLETED, {
											request : e,
											fragmentModel : this
										});
										break;case A.default.ACTION_DOWNLOAD:
										n(e, R), v.push(e), t = e, c.trigger(E.default.FRAGMENT_LOADING_STARTED, {
											sender : g,
											request : t
										}), p.load(t);
										break;default:
										f("Unknown request action.")
									}
									var t
								},
								reset : function() {
									c.off(E.default.LOADING_COMPLETED, t, this), c.off(E.default.LOADING_DATA_PROGRESS, r, this), c.off(E.default.LOADING_ABANDONED, u, this), p && p.reset(), l()
								},
								addExecutedRequest : function(e) {
									_.push(e)
								}
							}, l(), c.on(E.default.LOADING_COMPLETED, t, g), c.on(E.default.LOADING_DATA_PROGRESS, r, g), c.on(E.default.LOADING_ABANDONED, u, g), g
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var y = r(e(8)),
						E = r(e(12)),
						a = r(e(9)),
						A = r(e(114)),
						T = r(e(7)),
						R = "loading",
						I = "executed";
					i.__dashjs_factory_name = "FragmentModel";
					var o = a.default.getClassFactory(i);
					o.FRAGMENT_MODEL_LOADING = R, o.FRAGMENT_MODEL_EXECUTED = I, o.FRAGMENT_MODEL_CANCELED = "canceled", o.FRAGMENT_MODEL_FAILED = "failed", a.default.updateClassFactory(i.__dashjs_factory_name, o), n.default = o, t.exports = n.default
				}, {
					114 : 114,
					12 : 12,
					7 : 7,
					8 : 8,
					9 : 9
				} ],
				76 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						var e = this.context,
							t = (0, a.default)(e).getInstance(),
							n = void 0;
						return {
							getValue : function() {
								return n
							},
							setValue : function(e) {
								(n = e) && t.trigger(o.default.MANIFEST_LOADED, {
									data : e
								})
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var a = r(e(8)),
						o = r(e(12)),
						s = r(e(9));
					i.__dashjs_factory_name = "ManifestModel", n.default = s.default.getSingletonFactory(i), t.exports = n.default
				}, {
					12 : 12,
					8 : 8,
					9 : 9
				} ],
				77 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function B(e, t, n) {
						return t in e ? Object.defineProperty(e, t, {
								value : n,
								enumerable : !0,
								configurable : !0,
								writable : !0
							}) : e[t] = n, e
					}
					function i() {
						function i(e) {
							var t = void 0;
							for (t = 0; t < D.length; t++)
								if (D[t].rulename === e) return t;
							return -1
						}
						var e,
							t,
							n,
							r = void 0,
							a = void 0,
							o = void 0,
							s = void 0,
							u = void 0,
							l = void 0,
							d = void 0,
							f = void 0,
							c = void 0,
							h = void 0,
							p = void 0,
							g = void 0,
							m = void 0,
							_ = void 0,
							v = void 0,
							y = void 0,
							E = void 0,
							A = void 0,
							T = void 0,
							R = void 0,
							I = void 0,
							S = void 0,
							b = void 0,
							w = void 0,
							C = void 0,
							D = void 0,
							O = void 0,
							M = void 0,
							N = void 0,
							L = void 0,
							P = void 0,
							F = void 0;
						return e = {
								setABRStrategy : function(e) {
									S = e
								},
								getABRStrategy : function() {
									return S
								},
								setUseDefaultABRRules : function(e) {
									b = e
								},
								getUseDefaultABRRules : function() {
									return b
								},
								getABRCustomRules : function() {
									return D
								},
								addABRCustomRule : function(e, t, n) {
									var r = i(t);
									-1 === r ? D.push({
										type : e,
										rulename : t,
										rule : n
									}) : (D[r].type = e, D[r].rule = n)
								},
								removeABRCustomRule : function(e) {
									var t = i(e);
									-1 !== t && D.splice(t, 1)
								},
								removeAllABRCustomRule : function() {
									D = []
								},
								setBandwidthSafetyFactor : function(e) {
									E = e
								},
								getBandwidthSafetyFactor : function() {
									return E
								},
								setAbandonLoadTimeout : function(e) {
									A = e
								},
								getAbandonLoadTimeout : function() {
									return A
								},
								setLastBitrateCachingInfo : function(e, t) {
									h.enabled = e, void 0 === t || isNaN(t) || "number" != typeof t || (h.ttl = t)
								},
								getLastBitrateCachingInfo : function() {
									return h
								},
								setLastMediaSettingsCachingInfo : function(e, t) {
									p.enabled = e, void 0 === t || isNaN(t) || "number" != typeof t || (p.ttl = t)
								},
								getLastMediaSettingsCachingInfo : function() {
									return p
								},
								setStableBufferTime : function(e) {
									g = e
								},
								getStableBufferTime : function() {
									return isNaN(g) ? C ? 20 : 12 : g
								},
								setBufferTimeAtTopQuality : function(e) {
									m = e
								},
								getBufferTimeAtTopQuality : function() {
									return m
								},
								setBufferTimeAtTopQualityLongForm : function(e) {
									_ = e
								},
								getBufferTimeAtTopQualityLongForm : function() {
									return _
								},
								setLongFormContentDurationThreshold : function(e) {
									v = e
								},
								getLongFormContentDurationThreshold : function() {
									return v
								},
								setSegmentOverlapToleranceTime : function(e) {
									y = e
								},
								getSegmentOverlapToleranceTime : function() {
									return y
								},
								getCacheLoadThresholdForType : function(e) {
									return M[e]
								},
								setCacheLoadThresholdForType : function(e, t) {
									M[e] = t
								},
								setBufferToKeep : function(e) {
									d = e
								},
								getBufferToKeep : function() {
									return d
								},
								setBufferAheadToKeep : function(e) {
									f = e
								},
								getBufferAheadToKeep : function() {
									return f
								},
								setBufferPruningInterval : function(e) {
									c = e
								},
								getBufferPruningInterval : function() {
									return c
								},
								setFragmentRetryAttempts : function(e) {
									T[x.HTTPRequest.MEDIA_SEGMENT_TYPE] = e
								},
								getFragmentRetryAttempts : function() {
									return T[x.HTTPRequest.MEDIA_SEGMENT_TYPE]
								},
								setManifestRetryAttempts : function(e) {
									T[x.HTTPRequest.MPD_TYPE] = e
								},
								getManifestRetryAttempts : function() {
									return T[x.HTTPRequest.MPD_TYPE]
								},
								setRetryAttemptsForType : function(e, t) {
									T[e] = t
								},
								getRetryAttemptsForType : function(e) {
									return T[e]
								},
								setFragmentRetryInterval : function(e) {
									R[x.HTTPRequest.MEDIA_SEGMENT_TYPE] = e
								},
								getFragmentRetryInterval : function() {
									return R[x.HTTPRequest.MEDIA_SEGMENT_TYPE]
								},
								setManifestRetryInterval : function(e) {
									R[x.HTTPRequest.MPD_TYPE] = e
								},
								getManifestRetryInterval : function() {
									return R[x.HTTPRequest.MPD_TYPE]
								},
								setRetryIntervalForType : function(e, t) {
									R[e] = t
								},
								getRetryIntervalForType : function(e) {
									return R[e]
								},
								setWallclockTimeUpdateInterval : function(e) {
									I = e
								},
								getWallclockTimeUpdateInterval : function() {
									return I
								},
								setScheduleWhilePaused : function(e) {
									l = e
								},
								getScheduleWhilePaused : function() {
									return l
								},
								getUseSuggestedPresentationDelay : function() {
									return a
								},
								setUseSuggestedPresentationDelay : function(e) {
									a = e
								},
								setLiveDelayFragmentCount : function(e) {
									s = e
								},
								getLiveDelayFragmentCount : function() {
									return s
								},
								getLiveDelay : function() {
									return P ? u || 3 : u
								},
								setLiveDelay : function(e) {
									u = e
								},
								setUseManifestDateHeaderTimeSource : function(e) {
									r = e
								},
								getUseManifestDateHeaderTimeSource : function() {
									return r
								},
								setUTCTimingSources : function(e) {
									o = e
								},
								getUTCTimingSources : function() {
									return o
								},
								setXHRWithCredentialsForType : function t(e, n) {
									e ? w[e] = !!n : Object.keys(w).forEach(function(e) {
										t(e, n)
									})
								},
								getXHRWithCredentialsForType : function(e) {
									var t = w[e];
									return void 0 === t ? w.default : t
								},
								setFastSwitchEnabled : function(e) {
									C = e
								},
								getFastSwitchEnabled : function() {
									return C
								},
								setMovingAverageMethod : function(e) {
									O = e
								},
								getMovingAverageMethod : function() {
									return O
								},
								setJumpGaps : function(e) {
									N = e
								},
								getJumpGaps : function() {
									return N
								},
								setSmallGapLimit : function(e) {
									L = e
								},
								getSmallGapLimit : function() {
									return L
								},
								getLowLatencyEnabled : function() {
									return P
								},
								setLowLatencyEnabled : function(e) {
									P = e
								},
								setManifestUpdateRetryInterval : function(e) {
									F = e
								},
								getManifestUpdateRetryInterval : function() {
									return F
								},
								reset : function() {}
							}, l = r = !(a = !(o = [])), S = k.default.ABR_STRATEGY_DYNAMIC, h = {
								enabled : !(C = !(b = !0)),
								ttl : 36e4
							}, p = {
								enabled : !0,
								ttl : 36e4
							}, s = 4, u = void 0, d = 20, f = 80, c = 10, g = NaN, m = 30, _ = 60, v = 600, y = .2, A = 1e4, N = !(I = 50), L = E = .8, w = {
								default : !(F = 100)
							}, D = [], O = k.default.MOVING_AVERAGE_SLIDING_WINDOW, P = !1, B(t = {}, x.HTTPRequest.MPD_TYPE, 3), B(t, x.HTTPRequest.XLINK_EXPANSION_TYPE, 1), B(t, x.HTTPRequest.MEDIA_SEGMENT_TYPE, 3), B(t, x.HTTPRequest.INIT_SEGMENT_TYPE, 3), B(t, x.HTTPRequest.BITSTREAM_SWITCHING_SEGMENT_TYPE, 3), B(t, x.HTTPRequest.INDEX_SEGMENT_TYPE, 3), B(t, x.HTTPRequest.OTHER_TYPE, 3), T = t, B(n = {}, x.HTTPRequest.MPD_TYPE, 500), B(n, x.HTTPRequest.XLINK_EXPANSION_TYPE, 500), B(n, x.HTTPRequest.MEDIA_SEGMENT_TYPE, 1e3), B(n, x.HTTPRequest.INIT_SEGMENT_TYPE, 1e3), B(n, x.HTTPRequest.BITSTREAM_SWITCHING_SEGMENT_TYPE, 1e3), B(n, x.HTTPRequest.INDEX_SEGMENT_TYPE, 1e3), B(n, x.HTTPRequest.OTHER_TYPE, 1e3), R = n, (M = {})[k.default.VIDEO] = 50, M[k.default.AUDIO] = 5, e
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var a = r(e(9)),
						x = e(129),
						k = r(e(59));
					i.__dashjs_factory_name = "MediaPlayerModel";
					var o = a.default.getSingletonFactory(i);
					o.DEFAULT_UTC_TIMING_SOURCE = {
						scheme : "urn:mpeg:dash:utc:http-xsdate:2014",
						value : "http://time.akamai.com/?iso"
					}, a.default.updateSingletonFactory(i.__dashjs_factory_name, o), n.default = o, t.exports = n.default
				}, {
					129 : 129,
					59 : 59,
					9 : 9
				} ],
				78 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						function t() {
							o.trigger(b.default.METRICS_CHANGED)
						}
						function r(e) {
							o.trigger(b.default.METRIC_CHANGED, {
								mediaType : e
							}), t()
						}
						function l(e, t, n) {
							o.trigger(b.default.METRIC_UPDATED, {
								mediaType : e,
								metric : t,
								value : n
							}), r(e)
						}
						function f(e, t, n) {
							o.trigger(b.default.METRIC_ADDED, {
								mediaType : e,
								metric : t,
								value : n
							}), r(e)
						}
						function i(e) {
							var t = void 0;
							return s.hasOwnProperty(e) ? t = s[e] : (t = new u.default, s[e] = t), t
						}
						function c(e, t, n) {
							var r = i(e);
							r[t].push(n), r[t].length > a && r[t].shift()
						}
						function m(e, t, n) {
							c(e, t, n), f(e, t, n)
						}
						var e,
							a = 1e3,
							n = this.context,
							o = (0, I.default)(n).getInstance(),
							s = void 0;
						return e = {
								clearCurrentMetricsForType : function(e) {
									delete s[e]
									, r(e)
								},
								clearAllCurrentMetrics : function() {
									s = {}, t()
								},
								getReadOnlyMetricsFor : function(e) {
									return s.hasOwnProperty(e) ? s[e] : null
								},
								getMetricsFor : i,
								addTcpConnection : function(e, t, n, r, i, a) {
									var o = new d.default;
									return o.tcpid = t, o.dest = n, o.topen = r, o.tclose = i, o.tconnect = a, m(e, _.default.TCP_CONNECTION, o), o
								},
								addHttpRequest : function e(t, n, r, i, a, o, s, u, l, d, f, c, h, p) {
									var g = new v.HTTPRequest;
									return a && a !== i && (e(t, null, r, i, null, null, s, u, null, null, null, c, null, null), g.actualurl = a), g.tcpid = n, g.type = r, g.url = i, g.range = s, g.trequest = u, g.tresponse = l, g.responsecode = f, g._tfinish = d, g._stream = t, g._mediaduration = c, g._responseHeaders = h, g._serviceLocation = o, p ? p.forEach(function(e) {
											var t,
												n,
												r,
												i,
												a;
											t = g, n = e.s, r = e.d, i = e.b, (a = new v.HTTPRequestTrace).s = n, a.d = r, a.b = i, t.trace.push(a), t.interval || (t.interval = 0), t.interval += r
										}) : (
											delete g.interval
											,
											delete g.trace
											), m(t, _.default.HTTP_REQUEST, g), g
								},
								addRepresentationSwitch : function(e, t, n, r, i) {
									var a = new p.default;
									return a.t = t, a.mt = n, a.to = r, i ? a.lto = i :
											delete a.lto
										, m(e, _.default.TRACK_SWITCH, a), a
								},
								addBufferLevel : function(e, t, n) {
									var r = new g.default;
									return r.t = t, r.level = n, m(e, _.default.BUFFER_LEVEL, r), r
								},
								addBufferState : function(e, t, n) {
									var r = new y.default;
									return r.target = n, r.state = t, m(e, _.default.BUFFER_STATE, r), r
								},
								addDVRInfo : function(e, t, n, r) {
									var i = new E.default;
									return i.time = t, i.range = r, i.manifestInfo = n, m(e, _.default.DVR_INFO, i), i
								},
								addDroppedFrames : function(e, t) {
									var n = new A.default,
										r = i(e).DroppedFrames;
									return n.time = t.creationTime, n.droppedFrames = t.droppedVideoFrames, 0 < r.length && r[r.length - 1] == n ? r[r.length - 1] : (m(e, _.default.DROPPED_FRAMES, n), n)
								},
								addSchedulingInfo : function(e, t, n, r, i, a, o, s, u) {
									var l = new R.default;
									return l.mediaType = e, l.t = t, l.type = n, l.startTime = r, l.availabilityStartTime = i, l.duration = a, l.quality = o, l.range = s, l.state = u, m(e, _.default.SCHEDULING_INFO, l), l
								},
								addRequestsQueue : function(e, t, n) {
									var r = new S.default;
									r.loadingRequests = t, r.executedRequests = n, i(e).RequestsQueue = r, f(e, _.default.REQUESTS_QUEUE, r)
								},
								addManifestUpdate : function(e, t, n, r, i, a, o, s, u, l) {
									var d = new T.ManifestUpdate;
									return d.mediaType = e, d.type = t, d.requestTime = n, d.fetchTime = r, d.availabilityStartTime = i, d.presentationStartTime = a, d.clientTimeOffset = o, d.currentTime = s, d.buffered = u, d.latency = l, c(h.default.STREAM, _.default.MANIFEST_UPDATE, d), f(e, _.default.MANIFEST_UPDATE, d), d
								},
								updateManifestUpdateInfo : function(e, t) {
									if (e) {
										for (var n in t) e[n] = t[n];
										l(e.mediaType, _.default.MANIFEST_UPDATE, e)
									}
								},
								addManifestUpdateStreamInfo : function(e, t, n, r, i) {
									if (e) {
										var a = new T.ManifestUpdateStreamInfo;
										return a.id = t, a.index = n, a.start = r, a.duration = i, e.streamInfo.push(a), l(e.mediaType, _.default.MANIFEST_UPDATE_STREAM_INFO, e), a
									}
									return null
								},
								addManifestUpdateRepresentationInfo : function(e, t, n, r, i, a, o, s) {
									if (e) {
										var u = new T.ManifestUpdateRepresentationInfo;
										return u.id = t, u.index = n, u.streamIndex = r, u.mediaType = i, u.startNumber = o, u.fragmentInfoType = s, u.presentationTimeOffset = a, e.representationInfo.push(u), l(e.mediaType, _.default.MANIFEST_UPDATE_TRACK_INFO, e), u
									}
									return null
								},
								addPlayList : function(e) {
									var t = h.default.STREAM;
									return e.trace && Array.isArray(e.trace) ? e.trace.forEach(function(e) {
											e.hasOwnProperty("subreplevel") && !e.subreplevel &&
											delete e.subreplevel
										}) :
											delete e.trace
										, m(t, _.default.PLAY_LIST, e), e
								},
								addDVBErrors : function(e) {
									return m(h.default.STREAM, _.default.DVB_ERRORS, e), e
								},
								setConfig : function(e) {
									e && e.adapter && e.adapter
								}
							}, s = {}, e
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var h = r(e(59)),
						_ = r(e(61)),
						u = r(e(120)),
						d = r(e(135)),
						v = e(129),
						p = r(e(132)),
						g = r(e(125)),
						y = r(e(126)),
						E = r(e(127)),
						A = r(e(128)),
						T = e(130),
						R = r(e(134)),
						I = r(e(8)),
						S = r(e(133)),
						b = r(e(12)),
						a = r(e(9));
					i.__dashjs_factory_name = "MetricsModel", n.default = a.default.getSingletonFactory(i), t.exports = n.default
				}, {
					12 : 12,
					120 : 120,
					125 : 125,
					126 : 126,
					127 : 127,
					128 : 128,
					129 : 129,
					130 : 130,
					132 : 132,
					133 : 133,
					134 : 134,
					135 : 135,
					59 : 59,
					61 : 61,
					8 : 8,
					9 : 9
				} ],
				79 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						var u = void 0;
						return {
							initialize : function(e) {
								if (u = new l.default, !e) return null;
								var t = e.indexOf("#");
								if (-1 !== t)
									for (var n = e.substr(t + 1).split("&"), r = 0, i = n.length; r < i; ++r) {
										var a = n[r],
											o = a.indexOf("=");
										if (-1 !== o) {
											var s = a.substring(0, o);
											u.hasOwnProperty(s) && (u[s] = a.substr(o + 1))
										}
								}
							},
							getURIFragmentData : function() {
								return u
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var l = r(e(124)),
						a = r(e(9));
					i.__dashjs_factory_name = "URIFragmentModel", n.default = a.default.getSingletonFactory(i), t.exports = n.default
				}, {
					124 : 124,
					9 : 9
				} ],
				80 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						function l() {
							f && (f.playbackRate = c || 1, f.removeEventListener("canplay", l))
						}
						function d() {
							return 0 < h.length
						}
						function e() {
							if (f && d() && 0 === f.playbackRate) {
								var e = document.createEvent("Event");
								e.initEvent("waiting", !0, !1), f.dispatchEvent(e)
							}
						}
						var f = void 0,
							t = void 0,
							n = void 0,
							c = void 0,
							r = "element is not video or audio DOM type!",
							i = this.context,
							a = (0, p.default)(i).getInstance().log,
							o = (0, s.default)(i).getInstance(),
							h = [];
						return {
							initialize : function() {
								o.on(u.default.PLAYBACK_PLAYING, e, this)
							},
							setCurrentTime : function(t) {
								if (f) {
									if (f.currentTime == t) return;
									try {
										f.currentTime = t
									} catch (e) {
										0 === f.readyState && e.code === e.INVALID_STATE_ERR && setTimeout(function() {
											f.currentTime = t
										}, 400)
									}
								}
							},
							play : function() {
								if (f) {
									f.autoplay = !0;
									var e = f.play();
									e && "undefined" != typeof Promise && e instanceof Promise && e.catch(function(e) {
										"NotAllowedError" === e.name && o.trigger(u.default.PLAYBACK_NOT_ALLOWED), a("Caught pending play exception - continuing (" + e + ")")
									})
								}
							},
							isPaused : function() {
								return f ? f.paused : null
							},
							pause : function() {
								f && (f.pause(), f.autoplay = !1)
							},
							isSeeking : function() {
								return f ? f.seeking : null
							},
							getTime : function() {
								return f ? f.currentTime : null
							},
							getPlaybackRate : function() {
								return f ? f.playbackRate : null
							},
							getPlayedRanges : function() {
								return f ? f.played : null
							},
							getEnded : function() {
								return f ? f.ended : null
							},
							setStallState : function(e, t) {
								var n,
									r,
									i,
									a,
									o,
									s,
									u;
								n = e, t ? (u = void 0, null === (s = n) || f.seeking || -1 !== h.indexOf(s) || (h.push(s), f && 1 === h.length && ((u = document.createEvent("Event")).initEvent("waiting", !0, !1), c = f.playbackRate, f.dispatchEvent(u)))) : (r = n, i = h.indexOf(r), a = void 0, null !== r && (-1 !== i && h.splice(i, 1), f && !1 === d() && 0 === f.playbackRate && (o = c || 1, f && (f.readyState <= 2 && 0 < o ? f.addEventListener("canplay", l) : f.playbackRate = o), f.paused || ((a = document.createEvent("Event")).initEvent("playing", !0, !1), f.dispatchEvent(a)))))
							},
							getElement : function() {
								return f
							},
							setElement : function(e) {
								if (null != e && (!e || !e.nodeName || "VIDEO" !== e.nodeName && "AUDIO" !== e.nodeName))
									throw r;
								(f = e) && (f.preload = "auto")
							},
							setSource : function(e) {
								f && (e ? f.src = e : (f.removeAttribute("src"), f.load()))
							},
							getSource : function() {
								return f ? f.src : null
							},
							getVideoContainer : function() {
								return n
							},
							setVideoContainer : function(e) {
								n = e
							},
							getTTMLRenderingDiv : function() {
								return t
							},
							setTTMLRenderingDiv : function(e) {
								(t = e).style.position = "absolute", t.style.display = "flex", t.style.overflow = "hidden", t.style.pointerEvents = "none", t.style.top = 0, t.style.left = 0
							},
							getPlaybackQuality : function() {
								if (!f) return null;
								var e = "webkitDroppedFrameCount" in f && "webkitDecodedFrameCount" in f,
									t = null;
								return "getVideoPlaybackQuality" in f ? t = f.getVideoPlaybackQuality() : e && (t = {
										droppedVideoFrames : f.webkitDroppedFrameCount,
										totalVideoFrames : f.webkitDroppedFrameCount + f.webkitDecodedFrameCount,
										creationTime : new Date
									}), t
							},
							addEventListener : function(e, t) {
								f && f.addEventListener(e, t)
							},
							removeEventListener : function(e, t) {
								f && f.removeEventListener(e, t)
							},
							getReadyState : function() {
								return f ? f.readyState : NaN
							},
							getBufferRange : function() {
								return f ? f.buffered : null
							},
							getClientWidth : function() {
								return f ? f.clientWidth : NaN
							},
							getClientHeight : function() {
								return f ? f.clientHeight : NaN
							},
							getTextTracks : function() {
								return f ? f.textTracks : []
							},
							getTextTrack : function(e, t, n, r, i) {
								if (f)
									for (var a = 0; a < f.textTracks.length; a++)
										if (f.textTracks[a].kind === e && (!t || f.textTracks[a].label == t) && f.textTracks[a].language === n && f.textTracks[a].isTTML === r && f.textTracks[a].isEmbedded === i) return f.textTracks[a];
								return null
							},
							addTextTrack : function(e, t, n) {
								return f ? f.addTextTrack(e, t, n) : null
							},
							appendChild : function(e) {
								f && (f.appendChild(e), void 0 !== e.isTTML && (f.textTracks[f.textTracks.length - 1].isTTML = e.isTTML, f.textTracks[f.textTracks.length - 1].isEmbedded = e.isEmbedded))
							},
							removeChild : function(e) {
								f && f.removeChild(e)
							},
							getVideoWidth : function() {
								return f ? f.videoWidth : NaN
							},
							getVideoHeight : function() {
								return f ? f.videoHeight : NaN
							},
							getVideoRelativeOffsetTop : function() {
								return f && f.parentNode ? f.getBoundingClientRect().top - f.parentNode.getBoundingClientRect().top : NaN
							},
							getVideoRelativeOffsetLeft : function() {
								return f && f.parentNode ? f.getBoundingClientRect().left - f.parentNode.getBoundingClientRect().left : NaN
							},
							reset : function() {
								o.off(u.default.PLAYBACK_PLAYING, e, this)
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var a = r(e(9)),
						s = r(e(8)),
						u = r(e(12)),
						p = r(e(7));
					i.__dashjs_factory_name = "VideoModel", n.default = a.default.getSingletonFactory(i), t.exports = n.default
				}, {
					12 : 12,
					7 : 7,
					8 : 8,
					9 : 9
				} ],
				81 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e) {
						function p(e, t) {
							e.reader.read().then(t).catch(function() {})
						}
						var a = (e = e || {}).requestModifier;
						return {
							load : function(h) {
								var e = new Date,
									t = h.request,
									n = new Headers;
								t.range && n.append("Range", "bytes=" + t.range), t.requestStartDate || (t.requestStartDate = e), a && a.modifyRequestHeader({
									setRequestHeader : function(e, t) {
										n.append(e, t)
									}
								});
								var r = void 0;
								"function" == typeof window.AbortController && (r = new AbortController, h.abortController = r);
								var i = {
									method : h.method,
									headers : n,
									credentials : h.withCredentials ? "include" : void 0,
									signal : r ? r.signal : void 0
								};
								fetch(h.url, i).then(function(e) {
									h.response || (h.response = {}), h.response.status = e.status, h.response.statusText = e.statusText, h.response.responseURL = e.url, e.ok || h.onerror();
									var t = "",
										n = !0,
										r = !1,
										i = void 0;
									try {
										for (var a, o = e.headers.keys()[Symbol.iterator](); !(n = (a = o.next()).done); n = !0) {
											var s = a.value;
											t += s + ": " + e.headers.get(s) + "\n"
										}
									} catch (e) {
										r = !0, i = e
									} finally {
										try {
											!n && o.return && o.return()
										} finally {
											if (r)
												throw i
										}
									}
									if (h.response.responseHeaders = t, h.onHeadersReceived(), !e.body) return e.arrayBuffer().then(function(e) {
											var t = {
												loaded : (h.response.response = e).byteLength,
												total : e.byteLength
											};
											h.progress(t), h.onload(), h.onend()
										});
									var u = parseInt(e.headers.get("Content-Length"), 10),
										l = 0,
										d = !1,
										f = new Uint8Array,
										c = 0;
									h.reader = e.body.getReader(), p(h, function e(t) {
										var n = t.value;
										if (t.done) return f && (h.progress({
													loaded : l,
													total : isNaN(u) ? l : u,
													lengthComputable : !0
												}), h.response.response = f.buffer), h.onload(), void h.onend();
										if (n && 0 < n.length) {
											f = function(e, t) {
												if (0 === e.length) return t;
												var n = new Uint8Array(e.length + t.length);
												return n.set(e), n.set(t, e.length), n
											}(f, n), l += n.length;
											var r = (0, g.default)().getInstance().findLastTopIsoBoxCompleted([ "moov", "mdat" ], f, c);
											if (r.found) {
												var i = r.lastCompletedOffset + r.size,
													a = void 0;
												f = i === f.length ? (a = f, new Uint8Array) : (a = new Uint8Array(f.subarray(0, i)), f.subarray(i)), h.progress({
													data : a.buffer,
													lengthComputable : !1,
													noTrace : !0
												}), c = 0
											} else c = r.lastCompletedOffset, d || (h.progress({
													lengthComputable : !1,
													noTrace : !0
												}), d = !0)
										}
										p(h, e)
									})
								}).catch(function(e) {
									h.onerror && h.onerror(e)
								})
							},
							abort : function(e) {
								if (e.abortController) e.abortController.abort();
								else if (e.reader) try {
										e.reader.cancel()
									} catch (e) {}
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var a = r(e(9)),
						g = r(e(99));
					i.__dashjs_factory_name = "FetchLoader";
					var o = a.default.getClassFactory(i);
					n.default = o, t.exports = n.default
				}, {
					9 : 9,
					99 : 99
				} ],
				82 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e, t, n) {
						return t in e ? Object.defineProperty(e, t, {
								value : n,
								enumerable : !0,
								configurable : !0,
								writable : !0
							}) : e[t] = n, e
					}
					function a(e) {
						e = e || {};var t,
							n,
							T = this.context,
							R = (0, l.default)(T).getInstance(),
							I = e.errHandler,
							S = e.metricsModel,
							b = e.mediaPlayerModel,
							w = e.requestModifier,
							C = e.useFetch || !1,
							D = void 0,
							O = void 0,
							M = void 0,
							N = void 0,
							L = {};
						return t = {
								load : function(e) {
									e.request && function e(n, t) {
										var r = arguments.length <= 2 || void 0 === arguments[2] ? 0 : arguments[2],
											i = n.request,
											a = [],
											o = i.representationId,
											s = !0,
											u = !0,
											l = new Date,
											d = l,
											f = 0,
											c = void 0,
											h = L[o] || 0;
										if (i.urls && 1 < i.urls.length && h && (i.url = i.urls[h], n.url = i.urls[h]), !w || !S || !I)
											throw new Error("config object is not correct or missing");
										var p = function(e) {
												u = !1, i.requestStartDate = l, i.requestEndDate = new Date, i.firstByteDate = i.firstByteDate || l, i.checkExistenceOnly || S.addHttpRequest(i.mediaType, null, i.type, i.url, c.response ? c.response.responseURL : null, i.serviceLocation || null, i.range || null, i.requestStartDate, i.firstByteDate, i.requestEndDate, c.response ? c.response.status : null, i.duration, c.response && c.response.getAllResponseHeaders ? c.response.getAllResponseHeaders() : c.response.responseHeaders, e ? a : null)
											},
											g = function() {
												-1 !== D.indexOf(c) && (D.splice(D.indexOf(c), 1), u && (p(!1), 0 < t ? (r++, R.trigger(x.default.REQUEST_RETRYED, {
													retryTimes : r,
													representationId : o,
													status : c.response && c.response.status,
													url : i.url,
													mediaType : i.mediaType,
													range : i.range
												}), n.request.urls && 1 < n.request.urls.length ? (L[o] = r % i.urls.length, h = L[o], n.request.url = i.urls[h], n.url = i.urls[h], 0 === h && t--, M.push(setTimeout(function() {
													e(n, t, r)
												}, b.getRetryIntervalForType(i.type) / n.request.urls.length))) : (t--, M.push(setTimeout(function() {
													e(n, t, r)
												}, b.getRetryIntervalForType(i.type))))) : (I.downloadError(N[i.type].type, i.url, i, N[i.type].code, c.response.status), n.error && n.error(i, "error", c.response.statusText, c.response.status), n.complete && n.complete(i, c.response.statusText))))
											},
											m = void 0;
										m = C && window.fetch && "arraybuffer" === i.responseType ? (0, F.default)(T).create({
											requestModifier : w
										}) : (0, P.default)(T).create({
											requestModifier : w
										});
										var _ = w.modifyRequestURL(i.url),
											v = i.checkExistenceOnly ? B.HTTPRequest.HEAD : B.HTTPRequest.GET,
											y = b.getXHRWithCredentialsForType(i.type);
										c = {
											url : _,
											method : v,
											withCredentials : y,
											request : i,
											onload : function() {
												200 <= c.response.status && c.response.status <= 299 && (p(!0), n.success && n.success(c.response.response, c.response.statusText, c.response.responseURL), n.complete && n.complete(i, c.response.statusText))
											},
											onend : g,
											onerror : g,
											progress : function(e) {
												var t = new Date;
												s && (s = !1, (!e.lengthComputable || e.lengthComputable && e.total !== e.loaded) && (i.firstByteDate = t)), e.lengthComputable && (i.bytesLoaded = e.loaded, i.bytesTotal = e.total), e.noTrace || (a.push({
													s : d,
													d : t.getTime() - d.getTime(),
													b : [ e.loaded ? e.loaded - f : 0 ]
												}), d = t, f = e.loaded), n.progress && e.data && n.progress(e.data)
											},
											onabort : function() {
												n.abort && n.abort(i)
											},
											onHeadersReceived : function() {
												i.headersReceivedDate = new Date
											},
											loader : m
										};
										var E,
											A = (new Date).getTime();
										isNaN(i.delayLoadingTime) || A >= i.delayLoadingTime ? (D.push(c), m.load(c)) : (E = {
											httpRequest : c
										}, O.push(E), E.delayTimeout = setTimeout(function() {
											if (-1 !== O.indexOf(E)) {
												O.splice(O.indexOf(E), 1);try {
													l = new Date, d = l, D.push(E.httpRequest), m.load(E.httpRequest)
												} catch (e) {
													E.httpRequest.onerror()
												}
											}
										}, i.delayLoadingTime - A))
									}(e, b.getRetryAttemptsForType(e.request.type))
								},
								abort : function() {
									M.forEach(function(e) {
										return clearTimeout(e)
									}), M = [], O.forEach(function(e) {
										return clearTimeout(e.delayTimeout)
									}), O = [], D.forEach(function(e) {
										e.onloadend = e.onerror = e.onprogress = void 0, e.loader.abort(e), e.onabort()
									}), D = []
								}
							}, D = [], O = [], M = [], i(n = {}, B.HTTPRequest.MPD_TYPE, {
								type : u.default.DOWNLOAD_ERROR_ID_MANIFEST,
								code : o.default.DOWNLOAD_MPD_ERROR
							}), i(n, B.HTTPRequest.XLINK_EXPANSION_TYPE, {
								type : u.default.DOWNLOAD_ERROR_ID_XLINK,
								code : o.default.DOWNLOAD_XINK_ERROR
							}), i(n, B.HTTPRequest.INIT_SEGMENT_TYPE, {
								type : u.default.DOWNLOAD_ERROR_ID_INITIALIZATION,
								code : o.default.DOWNLOAD_INIT_SEGMENT_ERROR
							}), i(n, B.HTTPRequest.MEDIA_SEGMENT_TYPE, {
								type : u.default.DOWNLOAD_ERROR_ID_CONTENT,
								code : o.default.DOWNLOAD_MEDIA_SEGMENT_ERROR
							}), i(n, B.HTTPRequest.INDEX_SEGMENT_TYPE, {
								type : u.default.DOWNLOAD_ERROR_ID_CONTENT,
								code : o.default.DOWNLOAD_INDEX_SEGMENT_ERROR
							}), i(n, B.HTTPRequest.BITSTREAM_SWITCHING_SEGMENT_TYPE, {
								type : u.default.DOWNLOAD_ERROR_ID_CONTENT,
								code : o.default.DOWNLOAD_SWITCHING_SEGMENT_ERROR
							}), i(n, B.HTTPRequest.OTHER_TYPE, {
								type : u.default.DOWNLOAD_ERROR_ID_CONTENT,
								code : o.default.DOWNLOAD_OTHER_ERROR
							}), N = n, t
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var P = r(e(83)),
						o = r(e(60)),
						F = r(e(81)),
						B = e(129),
						s = r(e(9)),
						u = r(e(102)),
						l = r(e(8)),
						x = r(e(12));
					a.__dashjs_factory_name = "HTTPLoader";
					var d = s.default.getClassFactory(a);
					n.default = d, t.exports = n.default
				}, {
					102 : 102,
					12 : 12,
					129 : 129,
					60 : 60,
					8 : 8,
					81 : 81,
					83 : 83,
					9 : 9
				} ],
				83 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						var i = (e = e || {}).requestModifier;
						return {
							load : function(e) {
								var t = new Date,
									n = e.request,
									r = new XMLHttpRequest;
								r.open(e.method, e.url, !0), n.responseType && (r.responseType = n.responseType), n.range && r.setRequestHeader("Range", "bytes=" + n.range), n.requestStartDate || (n.requestStartDate = t), i && (r = i.modifyRequestHeader(r)), r.withCredentials = e.withCredentials, r.onload = e.onload, r.onloadend = e.onend, r.onerror = e.onerror, r.onprogress = e.progress, r.onabort = e.onabort, r.onreadystatechange = function() {
									2 === r.readyState && e.onHeadersReceived()
								}, r.send(), e.response = r
							},
							abort : function(e) {
								e.response.abort()
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i,
						a = e(9),
						o = (i = a) && i.__esModule ? i : {
							default : i
						};
					r.__dashjs_factory_name = "XHRLoader";
					var s = o.default.getClassFactory(r);
					n.default = s, t.exports = n.default
				}, {
					9 : 9
				} ],
				84 : [ function(e, t, n) {
					"use strict";
					function r() {
						var o = [],
							s = 0,
							u = 0;
						return {
							push : function(e, t) {
								var n = t && t.droppedVideoFrames ? t.droppedVideoFrames : 0,
									r = t && t.totalVideoFrames ? t.totalVideoFrames : 0,
									i = n - s;
								s = n;
								var a = r - u;
								u = r, isNaN(e) || (o[e] ? (o[e].droppedVideoFrames += i, o[e].totalVideoFrames += a) : o[e] = {
									droppedVideoFrames : i,
									totalVideoFrames : a
								})
							},
							getFrameHistory : function() {
								return o
							},
							getFrameInfo : function() {
								return {
									droppedFrames : s,
									totalFrames : u
								}
							},
							reset : function(e) {
								o = [], s = e.droppedVideoFrames, u = e.totalVideoFrames
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i,
						a = e(9),
						o = (i = a) && i.__esModule ? i : {
							default : i
						};
					r.__dashjs_factory_name = "DroppedFramesHistory";
					var s = o.default.getClassFactory(r);
					n.default = s, t.exports = n.default
				}, {
					9 : 9
				} ],
				85 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						var t = (e = e || {}).abrController,
							n = e.streamProcessor,
							r = e.streamProcessor.getCurrentRepresentationInfo(),
							i = e.switchHistory,
							a = e.droppedFramesHistory,
							o = e.currentRequest,
							s = e.useBufferOccupancyABR;
						return {
							getMediaType : function() {
								return r.mediaInfo.type
							},
							getMediaInfo : function() {
								return r.mediaInfo
							},
							getDroppedFramesHistory : function() {
								return a
							},
							getCurrentRequest : function() {
								return o
							},
							getSwitchHistory : function() {
								return i
							},
							getStreamInfo : function() {
								return r.mediaInfo.streamInfo
							},
							getStreamProcessor : function() {
								return n
							},
							getAbrController : function() {
								return t
							},
							getRepresentationInfo : function() {
								return r
							},
							useBufferOccupancyABR : function() {
								return s
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i,
						a = e(9),
						o = (i = a) && i.__esModule ? i : {
							default : i
						};
					r.__dashjs_factory_name = "RulesContext", n.default = o.default.getClassFactory(r), t.exports = n.default
				}, {
					9 : 9
				} ],
				86 : [ function(e, t, n) {
					"use strict";
					function r(e, t, n) {
						var r,
							i;
						return (r = n) !== (i = s.DEFAULT) && r !== s.STRONG && r !== s.WEAK || (i = r), {
							quality : void 0 === e ? -1 : e,
							reason : void 0 === t ? null : t,
							priority : i
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i,
						a = e(9),
						o = (i = a) && i.__esModule ? i : {
							default : i
						},
						s = {
							DEFAULT : .5,
							STRONG : 1,
							WEAK : 0
						};
					r.__dashjs_factory_name = "SwitchRequest";
					var u = o.default.getClassFactory(r);
					u.NO_CHANGE = -1, u.PRIORITY = s, o.default.updateClassFactory(r.__dashjs_factory_name, u), n.default = u, t.exports = n.default
				}, {
					9 : 9
				} ],
				87 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						var o = [],
							s = [];
						return {
							push : function(e) {
								e.newValue === u.default.NO_CHANGE && (e.newValue = e.oldValue), o[e.oldValue] || (o[e.oldValue] = {
									noDrops : 0,
									drops : 0,
									dropSize : 0
								});
								var t = e.newValue - e.oldValue,
									n = t < 0 ? 1 : 0,
									r = n ? -t : 0,
									i = n ? 0 : 1;
								if (o[e.oldValue].drops += n, o[e.oldValue].dropSize += r, o[e.oldValue].noDrops += i, s.push({
										idx : e.oldValue,
										noDrop : i,
										drop : n,
										dropSize : r
									}), 8 < s.length) {
									var a = s.shift();
									o[a.idx].drops -= a.drop, o[a.idx].dropSize -= a.dropSize, o[a.idx].noDrops -= a.noDrop
								}
							},
							getSwitchRequests : function() {
								return o
							},
							reset : function() {
								o = [], s = []
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var a = r(e(9)),
						u = r(e(86));
					i.__dashjs_factory_name = "SwitchRequestHistory";
					var o = a.default.getClassFactory(i);
					n.default = o, t.exports = n.default
				}, {
					86 : 86,
					9 : 9
				} ],
				88 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e) {
						function f(e, t, n, r) {
							var i = Math.pow(.5, n / r.fast);
							e.fastEstimate = (1 - i) * t + i * e.fastEstimate;var a = Math.pow(.5, n / r.slow);
							e.slowEstimate = (1 - a) * t + a * e.slowEstimate, e.totalWeight += n
						}
						function n(e, t, n) {
							return p.getMovingAverageMethod() !== E.default.MOVING_AVERAGE_SLIDING_WINDOW ? function(e, t) {
								var n = e ? y.throughputHalfLife : y.latencyHalfLife,
									r = e ? _[t] : v[t];
								if (!r || r.totalWeight <= 0) return NaN;
								var i = r.fastEstimate / (1 - Math.pow(.5, r.totalWeight / n.fast)),
									a = r.slowEstimate / (1 - Math.pow(.5, r.totalWeight / n.slow));
								return e ? Math.min(i, a) : Math.max(i, a)
							}(e, t) : (a = function(e, t, n) {
								var r = void 0,
									i = void 0;
								if (i = e ? (r = g[t], n ? s : u) : (r = m[t], l), r) {
									if (i >= r.length)
										i = r.length;
									else if (e)
										for (var a = 1; a < i; ++a) {
											var o = r[a] / r[a - 1];
											if ((h <= o || o <= 1 / d) && (i += 1) === r.length) break
									}
								} else
									i = 0;
								return i
							}(r = e, i = t, n), o = (r ? g : m)[i], 0 !== a && o && 0 !== o.length ? (o = o.slice(-a)).reduce(function(e, t) {
								return e + t
							}) / o.length : NaN);var r,
								i,
								a,
								o
						}
						function r(e, t) {
							return n(!0, e, t)
						}
						function c(e) {
							g[e] = g[e] || [], m[e] = m[e] || [], _[e] = _[e] || {
								fastEstimate : 0,
								slowEstimate : 0,
								totalWeight : 0
							}, v[e] = v[e] || {
								fastEstimate : 0,
								slowEstimate : 0,
								totalWeight : 0
							}
						}
						function t() {
							g = {}, m = {}, _ = {}, v = {}
						}
						var s = 3,
							u = 4,
							l = 4,
							d = 1.3,
							h = 1.3,
							p = (e = e || {}).mediaPlayerModel,
							g = void 0,
							m = void 0,
							_ = void 0,
							v = void 0,
							y = void 0,
							i = {
								push : function(e, t, n) {
									if (t.trace && t.trace.length) {
										var r = t.tresponse.getTime() - t.trequest.getTime() || 1,
											i = t._tfinish.getTime() - t.tresponse.getTime() || 1,
											a = t.trace.reduce(function(e, t) {
												return e + t.b[0]
											}, 0),
											o = n ? i : r + i,
											s = Math.round(8 * a / o);
										if (c(e), d = i, (l = e) === E.default.VIDEO ? d < p.getCacheLoadThresholdForType(E.default.VIDEO) : l === E.default.AUDIO ? d < p.getCacheLoadThresholdForType(E.default.AUDIO) : void 0) {
											if (0 < g[e].length && !g[e].hasCachedEntries) return;
											g[e].hasCachedEntries = !0
										} else g[e] && g[e].hasCachedEntries && (
											delete g[u = e]
											,
											delete m[u]
											,
											delete _[u]
											,
											delete v[u]
											, c(u));
										g[e].push(s), 3 < g[e].length && g[e].shift(), m[e].push(r), 3 < m[e].length && m[e].shift(), f(_[e], s, .001 * i, y.throughputHalfLife), f(v[e], r, 1, y.latencyHalfLife)
									}
									var u,
										l,
										d
								},
								getAverageThroughput : r,
								getSafeAverageThroughput : function(e, t) {
									var n = r(e, t);
									return isNaN(n) || (n *= p.getBandwidthSafetyFactor()), n
								},
								getAverageLatency : function(e) {
									return n(!1, e)
								},
								getDict : function(e) {
									return {
										throughput : g[e],
										latency : m[e]
									}
								},
								reset : t
							};
						return y = {
								throughputHalfLife : {
									fast : 3,
									slow : 8
								},
								latencyHalfLife : {
									fast : 1,
									slow : 2
								}
							}, t(), i
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var E = r(e(59)),
						a = r(e(9));
					i.__dashjs_factory_name = "ThroughputHistory", n.default = a.default.getClassFactory(i), t.exports = n.default
				}, {
					59 : 59,
					9 : 9
				} ],
				89 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e) {
						function n(e) {
							return e.filter(function(e) {
								return e.quality > g.default.NO_CHANGE
							})
						}
						function r(e) {
							var t = {},
								n = void 0,
								r = void 0,
								i = void 0,
								a = void 0,
								o = void 0;
							if (0 !== e.length) {
								for (t[g.default.PRIORITY.STRONG] = g.default.NO_CHANGE, t[g.default.PRIORITY.WEAK] = g.default.NO_CHANGE, t[g.default.PRIORITY.DEFAULT] = g.default.NO_CHANGE, n = 0, r = e.length; n < r; n += 1) (i = e[n]).quality !== g.default.NO_CHANGE && (t[i.priority] = t[i.priority] > g.default.NO_CHANGE ? Math.min(t[i.priority], i.quality) : i.quality);
								return t[g.default.PRIORITY.WEAK] !== g.default.NO_CHANGE && (a = t[g.default.PRIORITY.WEAK]), t[g.default.PRIORITY.DEFAULT] !== g.default.NO_CHANGE && (a = t[g.default.PRIORITY.DEFAULT]), t[g.default.PRIORITY.STRONG] !== g.default.NO_CHANGE && (a = t[g.default.PRIORITY.STRONG]), a !== g.default.NO_CHANGE && (o = a), (0, g.default)(s).create(o)
							}
						}
						e = e || {};var s = this.context,
							t = e.mediaPlayerModel,
							i = e.metricsModel,
							a = e.dashMetrics,
							o = void 0,
							u = void 0;
						return {
							initialize : function() {
								o = [], u = [], t.getUseDefaultABRRules() && (o.push((0, p.default)(s).create({
									metricsModel : i,
									dashMetrics : a,
									mediaPlayerModel : t
								})), o.push((0, l.default)(s).create({
									metricsModel : i,
									dashMetrics : a
								})), o.push((0, d.default)(s).create({
									metricsModel : i,
									dashMetrics : a
								})), o.push((0, h.default)(s).create()), o.push((0, c.default)(s).create()), u.push((0, f.default)(s).create({
									metricsModel : i,
									dashMetrics : a,
									mediaPlayerModel : t
								}))), t.getABRCustomRules().forEach(function(e) {
									e.type === m && o.push(e.rule(s).create()), e.type === _ && u.push(e.rule(s).create())
								})
							},
							reset : function() {
								[ o, u ].forEach(function(e) {
									e && e.length && e.forEach(function(e) {
										return e.reset && e.reset()
									})
								}), o = [], u = []
							},
							getMaxQuality : function(t) {
								return r(n(o.map(function(e) {
										return e.getMaxIndex(t)
									}))) || (0, g.default)(s).create()
							},
							shouldAbandonFragment : function(t) {
								return r(n(u.map(function(e) {
										return e.shouldAbandon(t)
									}))) || (0, g.default)(s).create()
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var l = r(e(95)),
						d = r(e(93)),
						f = r(e(90)),
						c = r(e(92)),
						h = r(e(94)),
						p = r(e(91)),
						a = r(e(9)),
						g = r(e(86)),
						m = "qualitySwitchRules",
						_ = "abandonFragmentRules";
					i.__dashjs_factory_name = "ABRRulesCollection";
					var o = a.default.getClassFactory(i);
					o.QUALITY_SWITCH_RULES = m, o.ABANDON_FRAGMENT_RULES = _, a.default.updateSingletonFactory(i.__dashjs_factory_name, o), n.default = o, t.exports = n.default
				}, {
					86 : 86,
					9 : 9,
					90 : 90,
					91 : 91,
					92 : 92,
					93 : 93,
					94 : 94,
					95 : 95
				} ],
				90 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function w(e) {
						function t() {
							I = {}, S = {}, b = []
						}
						e = e || {};var m = 1.8,
							_ = 500,
							v = 5,
							y = this.context,
							E = (0, a.default)(y).getInstance().log,
							A = e.mediaPlayerModel,
							T = e.metricsModel,
							R = e.dashMetrics,
							I = void 0,
							S = void 0,
							b = void 0,
							n = {
								shouldAbandon : function(e) {
									var t = (0, C.default)(y).create(C.default.NO_CHANGE, {
										name : w.__dashjs_factory_name
									});
									if (!(e && e.hasOwnProperty("getMediaInfo") && e.hasOwnProperty("getMediaType") && e.hasOwnProperty("getCurrentRequest") && e.hasOwnProperty("getRepresentationInfo") && e.hasOwnProperty("getAbrController"))) return t;
									var n,
										r,
										i,
										a,
										o = e.getMediaInfo(),
										s = e.getMediaType(),
										u = e.getCurrentRequest();
									if (!isNaN(u.index)) {
										i = s, a = u.index, I[i] = I[i] || {}, I[i][a] = I[i][a] || {};
										var l = A.getStableBufferTime();
										if (R.getCurrentBufferLevel(T.getReadOnlyMetricsFor(s)) > l) return t;
										var d = I[s][u.index];
										if (null === d || null === u.firstByteDate || S.hasOwnProperty(d.id)) return t;
										if (void 0 === d.firstByteTime && (b[s] = [], d.firstByteTime = u.firstByteDate.getTime(), d.segmentDuration = u.duration, d.bytesTotal = u.bytesTotal, d.id = u.index), d.bytesLoaded = u.bytesLoaded, d.elapsedTime = (new Date).getTime() - d.firstByteTime, 0 < d.bytesLoaded && 0 < d.elapsedTime && (n = s, r = Math.round(8 * d.bytesLoaded / d.elapsedTime), b[n] = b[n] || [], b[n].push(r)), b[s].length >= v && d.elapsedTime > _ && d.bytesLoaded < d.bytesTotal) {
											var f = b[s].reduce(function(e, t) {
												return e + t
											}, 0);
											if (d.measuredBandwidthInKbps = Math.round(f / b[s].length), d.estimatedTimeOfDownload = +(8 * d.bytesTotal / d.measuredBandwidthInKbps / 1e3).toFixed(2), d.estimatedTimeOfDownload < d.segmentDuration * m || 0 === e.getRepresentationInfo().quality) return t;
											if (!S.hasOwnProperty(d.id)) {
												var c = e.getAbrController(),
													h = d.bytesTotal - d.bytesLoaded,
													p = c.getBitrateList(o),
													g = c.getQualityForBitrate(o, d.measuredBandwidthInKbps * A.getBandwidthSafetyFactor());
												h > d.bytesTotal * p[g].bitrate / p[c.getQualityFor(s, o.streamInfo)].bitrate && (t.quality = g, t.reason.throughput = d.measuredBandwidthInKbps, t.reason.fragmentID = d.id, S[d.id] = d, E("AbandonRequestsRule ( ", s, "frag id", d.id, ") is asking to abandon and switch to quality to ", g, " measured bandwidth was", d.measuredBandwidthInKbps),
												delete I[s][d.id]
												)
											}
										} else d.bytesLoaded === d.bytesTotal &&
											delete I[s][d.id]
									}
									return t
								},
								reset : t
							};
						return t(), n
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var C = r(e(86)),
						i = r(e(9)),
						a = r(e(7));
					w.__dashjs_factory_name = "AbandonRequestsRule", n.default = i.default.getClassFactory(w), t.exports = n.default
				}, {
					7 : 7,
					86 : 86,
					9 : 9
				} ],
				91 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e) {
						function o(e, t, r) {
							var n = r.reduce(function(e, t, n) {
								return t > r[e] ? n : e
							}, 0);
							if (0 === n) return null;
							var i = Math.max(e, 10 + 2 * t.length),
								a = (r[n] - 1) / (i / 10 - 1);
							return {
								gp : a,
								Vp : 10 / a
							}
						}
						function R(e) {
							var t = {},
								n = e.getMediaInfo().bitrateList.map(function(e) {
									return e.bandwidth
								}),
								r = n.map(function(e) {
									return Math.log(e)
								});
							r = r.map(function(e) {
								return e - r[0] + 1
							});var i = f.getStableBufferTime(),
								a = o(i, n, r);
							return a ? (t.state = 1, t.bitrates = n, t.utilities = r, t.stableBufferTime = i, t.Vp = a.Vp, t.gp = a.gp, t.lastQuality = 0, I(t)) : t.state = 0, t
						}
						function I(e) {
							e.placeholderBuffer = 0, e.mostAdvancedSegmentStart = NaN, e.lastSegmentWasReplacement = !1, e.lastSegmentStart = NaN, e.lastSegmentDurationS = NaN, e.lastSegmentRequestTimeMs = NaN, e.lastSegmentFinishTimeMs = NaN
						}
						function S(e, t) {
							var n = f.getStableBufferTime();
							if (e.stableBufferTime !== n) {
								var r = o(n, e.bitrates, e.utilities);
								if (r.Vp !== e.Vp || r.gp !== e.gp) {
									var i = O.getCurrentBufferLevel(M.getReadOnlyMetricsFor(t)),
										a = i + e.placeholderBuffer;
									a -= 10, a *= r.Vp / e.Vp, a += 10, e.stableBufferTime = n, e.Vp = r.Vp, e.gp = r.gp, e.placeholderBuffer = Math.max(0, a - i)
								}
							}
						}
						function b(e, t) {
							return e.Vp * (e.utilities[t] + e.gp)
						}
						function w(e, t) {
							for (var n = e.bitrates[t], r = e.utilities[t], i = 0, a = t - 1; 0 <= a; --a)
								if (e.utilities[a] < e.utilities[t]) {
									var o = e.bitrates[a],
										s = e.utilities[a],
										u = e.Vp * (e.gp + (n * s - o * r) / (n - o));
									i = Math.max(i, u)
							}
							return i
						}
						function t() {
							for (var e in N) N.hasOwnProperty(e) && 2 === N[e].state && (N[e].placeholderBuffer = 0)
						}
						function n() {
							for (var e in N)
								if (N.hasOwnProperty(e)) {
									var t = N[e];
									0 !== t.state && (t.state = 1, I(t))
							}
						}
						function r() {
						}
						function i(e) {
							if (e && e.chunk && e.chunk.mediaInfo) {
								var t = N[e.chunk.mediaInfo.type];
								if (t && 0 !== t.state) {
									var n = e.chunk.start;
									isNaN(t.mostAdvancedSegmentStart) || n > t.mostAdvancedSegmentStart ? (t.mostAdvancedSegmentStart = n, t.lastSegmentWasReplacement = !1) : t.lastSegmentWasReplacement = !0, t.lastSegmentStart = n, t.lastSegmentDurationS = e.chunk.duration, t.lastQuality = e.chunk.quality, s(t, e.chunk.mediaInfo.type)
								}
							}
						}
						function a(e) {
							if (e && e.metric === p.default.HTTP_REQUEST && e.value && e.value.type === g.HTTPRequest.MEDIA_SEGMENT_TYPE && e.value.trace && e.value.trace.length) {
								var t = N[e.mediaType];
								t && 0 !== t.state && (t.lastSegmentRequestTimeMs = e.value.trequest.getTime(), t.lastSegmentFinishTimeMs = e.value._tfinish.getTime(), s(t, e.mediaType))
							}
						}
						function s(e, t) {
							if (!isNaN(e.lastSegmentStart) && !isNaN(e.lastSegmentRequestTimeMs) && !isNaN(e.placeholderBuffer)) {
								if (e.placeholderBuffer *= .99, !isNaN(e.lastSegmentFinishTimeMs)) {
									var n = O.getCurrentBufferLevel(M.getReadOnlyMetricsFor(t)) + .001 * (e.lastSegmentFinishTimeMs - e.lastSegmentRequestTimeMs),
										r = b(e, e.lastQuality),
										i = Math.max(0, r - n);
									e.placeholderBuffer = Math.min(i, e.placeholderBuffer)
								}
								e.lastSegmentWasReplacement && !isNaN(e.lastSegmentDurationS) && (e.placeholderBuffer += e.lastSegmentDurationS), e.lastSegmentStart = NaN, e.lastSegmentRequestTimeMs = NaN
							}
						}
						function u(e) {
							if (e) {
								var t = N[e.mediaType];
								t && 0 !== t.state && (t.abrQuality = e.newQuality)
							}
						}
						function l(e) {
							if (e) {
								var t = N[e.mediaType];
								if (t && 0 !== t.state) {
									var n,
										r = O.getCurrentBufferLevel(M.getReadOnlyMetricsFor(e.mediaType));
									n = 0 < t.abrQuality ? w(t, t.abrQuality) : 10;
									var i = Math.max(0, n - r);
									t.placeholderBuffer = Math.min(t.placeholderBuffer, i)
								}
							}
						}
						function d() {
							N = {}
						}
						e = e || {};var C = this.context,
							D = (0, v.default)(C).getInstance().log,
							O = e.dashMetrics,
							M = e.metricsModel,
							f = e.mediaPlayerModel,
							c = (0, m.default)(C).getInstance(),
							h = void 0,
							N = void 0;
						return h = {
								getMaxIndex : function(e) {
									var t = e.getMediaInfo(),
										n = e.getMediaType(),
										r = M.getReadOnlyMetricsFor(n),
										i = e.getStreamProcessor(),
										a = e.getStreamInfo(),
										o = e.getAbrController(),
										s = o.getThroughputHistory(),
										u = a ? a.id : null,
										l = a && a.manifestInfo && a.manifestInfo.isDynamic,
										d = e.useBufferOccupancyABR(),
										f = (0, L.default)(C).create();
									if (f.reason = f.reason || {}, !d) return f;
									i.getScheduleController().setTimeToLoadDelay(0);
									var c,
										h,
										p,
										g = (h = (c = e).getMediaType(), (p = N[h]) ? 0 !== p.state && S(p, h) : (p = R(c), N[h] = p), p);
									if (0 === g.state) return f;
									var m = O.getCurrentBufferLevel(r),
										_ = s.getAverageThroughput(n, l),
										v = s.getSafeAverageThroughput(n, l),
										y = s.getAverageLatency(n),
										E = void 0;
									if (f.reason.state = g.state, f.reason.throughput = _, f.reason.latency = y, isNaN(_)) return f;
									switch (g.state) {
									case 1:
										E = o.getQualityForBitrate(t, v, y), f.quality = E, f.reason.throughput = v, g.placeholderBuffer = Math.max(0, w(g, E) - m), g.lastQuality = E, !isNaN(g.lastSegmentDurationS) && m >= g.lastSegmentDurationS && (g.state = 2);
										break;case 2:
										(function(e, t) {
											var n = Date.now();
											if (isNaN(e.lastSegmentFinishTimeMs)) {
												if (!isNaN(e.lastCallTimeMs)) {
													var r = .001 * (n - e.lastCallTimeMs);
													e.placeholderBuffer += Math.max(0, r)
												}
											} else r = .001 * (n - e.lastSegmentFinishTimeMs), e.placeholderBuffer += Math.max(0, r);
											e.lastCallTimeMs = n, e.lastSegmentStart = NaN, e.lastSegmentRequestTimeMs = NaN, e.lastSegmentFinishTimeMs = NaN, S(e, t)
										})(g, n), E = function(e, t) {
											for (var n = e.bitrates.length, r = NaN, i = NaN, a = 0; a < n; ++a) {
												var o = (e.Vp * (e.utilities[a] + e.gp) - t) / e.bitrates[a];
												(isNaN(i) || i <= o) && (i = o, r = a)
											}
											return r
										}(g, m + g.placeholderBuffer);var A = o.getQualityForBitrate(t, v, y);
										E > g.lastQuality && A < E && (E = Math.max(A, g.lastQuality));var T = Math.max(0, m + g.placeholderBuffer - b(g, E));
										T <= g.placeholderBuffer ? (g.placeholderBuffer -= T, T = 0) : (T -= g.placeholderBuffer, g.placeholderBuffer = 0, E < o.getTopQualityIndexFor(n, u) ? i.getScheduleController().setTimeToLoadDelay(1e3 * T) : T = 0), f.quality = E, f.reason.throughput = _, f.reason.latency = y, f.reason.bufferLevel = m, f.reason.placeholderBuffer = g.placeholderBuffer, f.reason.delay = T, g.lastQuality = E;
										break;default:
										D("BOLA ABR rule invoked in bad state."), f.quality = o.getQualityForBitrate(t, v, y), f.reason.state = g.state, f.reason.throughput = v, f.reason.latency = y, g.state = 1, I(g)
									}
									return f
								},
								reset : function() {
									d(), c.off(_.default.BUFFER_EMPTY, t, h), c.off(_.default.PLAYBACK_SEEKING, n, h), c.off(_.default.PERIOD_SWITCH_STARTED, r, h), c.off(_.default.MEDIA_FRAGMENT_LOADED, i, h), c.off(_.default.METRIC_ADDED, a, h), c.off(_.default.QUALITY_CHANGE_REQUESTED, u, h), c.off(_.default.FRAGMENT_LOADING_ABANDONED, l, h)
								}
							}, d(), c.on(_.default.BUFFER_EMPTY, t, h), c.on(_.default.PLAYBACK_SEEKING, n, h), c.on(_.default.PERIOD_SWITCH_STARTED, r, h), c.on(_.default.MEDIA_FRAGMENT_LOADED, i, h), c.on(_.default.METRIC_ADDED, a, h), c.on(_.default.QUALITY_CHANGE_REQUESTED, u, h), c.on(_.default.FRAGMENT_LOADING_ABANDONED, l, h), h
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var p = r(e(61)),
						L = r(e(86)),
						a = r(e(9)),
						g = e(129),
						m = r(e(8)),
						_ = r(e(12)),
						v = r(e(7));
					i.__dashjs_factory_name = "BolaRule", n.default = a.default.getClassFactory(i), t.exports = n.default
				}, {
					12 : 12,
					129 : 129,
					61 : 61,
					7 : 7,
					8 : 8,
					86 : 86,
					9 : 9
				} ],
				92 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						var s = this.context,
							u = (0, o.default)(s).getInstance().log,
							l = .15,
							d = 375;
						return {
							getMaxIndex : function(e) {
								var t = e.getDroppedFramesHistory();
								if (t) {
									for (var n = t.getFrameHistory(), r = 0, i = 0, a = f.default.NO_CHANGE, o = 1; o < n.length; o++)
										if (n[o] && (r = n[o].droppedVideoFrames, (i = n[o].totalVideoFrames) > d && l < r / i)) {
											u("DroppedFramesRule, index: " + (a = o - 1) + " Dropped Frames: " + r + " Total Frames: " + i);break
									}
									return (0, f.default)(s).create(a, {
										droppedFrames : r
									})
								}
								return (0, f.default)(s).create()
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var a = r(e(9)),
						f = r(e(86)),
						o = r(e(7));
					i.__dashjs_factory_name = "DroppedFramesRule", n.default = a.default.getClassFactory(i), t.exports = n.default
				}, {
					7 : 7,
					86 : 86,
					9 : 9
				} ],
				93 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e) {
						function t() {
							v = {}
						}
						function n() {
							t()
						}
						e = e || {};var h = .5,
							p = this.context,
							g = (0, u.default)(p).getInstance().log,
							r = (0, a.default)(p).getInstance(),
							m = e.metricsModel,
							_ = e.dashMetrics,
							i = void 0,
							v = void 0;
						return i = {
								getMaxIndex : function(e) {
									var t = (0, E.default)(p).create();
									if (!e || !e.hasOwnProperty("getMediaType")) return t;
									!function() {
										if (!(m && m.hasOwnProperty("getReadOnlyMetricsFor") && _ && _.hasOwnProperty("getCurrentBufferLevel")))
											throw new Error("Missing config parameter(s)")
									}();
									var n = e.getMediaType(),
										r = m.getReadOnlyMetricsFor(n),
										i = 0 < r.BufferState.length ? r.BufferState[r.BufferState.length - 1] : null,
										a = e.getRepresentationInfo().fragmentDuration;
									if (!i || !function(e, t) {
											v[e] = v[e] || {};
											var n = !1;
											return v[e].firstBufferLoadedEvent ? n = !0 : t && t.state === y.default.BUFFER_LOADED && (v[e].firstBufferLoadedEvent = !0, n = !0), n
										}(n, i) || !a) return t;
									if (i.state === y.default.BUFFER_EMPTY) g("Switch to index 0; buffer is empty."), t.quality = 0, t.reason = "InsufficientBufferRule: Buffer is empty";else {
										var o = e.getMediaInfo(),
											s = e.getAbrController(),
											u = s.getThroughputHistory(),
											l = _.getCurrentBufferLevel(r),
											d = u.getAverageThroughput(n),
											f = u.getAverageLatency(n),
											c = d * (l / a) * h;
										t.quality = s.getQualityForBitrate(o, c, f), t.reason = "InsufficientBufferRule: being conservative to avoid immediate rebuffering"
									}
									return t
								},
								reset : function() {
									t(), r.off(o.default.PLAYBACK_SEEKING, n, i)
								}
							}, t(), r.on(o.default.PLAYBACK_SEEKING, n, i), i
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var y = r(e(64)),
						a = r(e(8)),
						o = r(e(12)),
						s = r(e(9)),
						u = r(e(7)),
						E = r(e(86));
					i.__dashjs_factory_name = "InsufficientBufferRule", n.default = s.default.getClassFactory(i), t.exports = n.default
				}, {
					12 : 12,
					64 : 64,
					7 : 7,
					8 : 8,
					86 : 86,
					9 : 9
				} ],
				94 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						var u = this.context,
							l = (0, o.default)(u).getInstance().log,
							d = .075,
							f = 6;
						return {
							getMaxIndex : function(e) {
								for (var t = e ? e.getSwitchHistory() : null, n = t ? t.getSwitchRequests() : [], r = 0, i = 0, a = 0, o = (0, c.default)(u).create(), s = 0; s < n.length; s++)
									if (void 0 !== n[s] && (r += n[s].drops, i += n[s].noDrops, a += n[s].dropSize, f <= r + i && d < r / i)) {
										o.quality = 0 < s && 0 < n[s].drops ? s - 1 : s, o.reason = {
											index : o.quality,
											drops : r,
											noDrops : i,
											dropSize : a
										}, l("Switch history rule index: " + o.quality + " samples: " + (r + i) + " drops: " + r);break
								}
								return o
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var a = r(e(9)),
						o = r(e(7)),
						c = r(e(86));
					i.__dashjs_factory_name = "SwitchHistoryRule", n.default = a.default.getClassFactory(i), t.exports = n.default
				}, {
					7 : 7,
					86 : 86,
					9 : 9
				} ],
				95 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e) {
						e = e || {};var p = this.context,
							g = (0, o.default)(p).getInstance().log,
							m = e.metricsModel;
						return {
							getMaxIndex : function(e) {
								var t = (0, v.default)(p).create();
								if (!(e && e.hasOwnProperty("getMediaInfo") && e.hasOwnProperty("getMediaType") && e.hasOwnProperty("useBufferOccupancyABR") && e.hasOwnProperty("getAbrController") && e.hasOwnProperty("getStreamProcessor"))) return t;
								!function() {
									if (!m || !m.hasOwnProperty("getReadOnlyMetricsFor"))
										throw new Error("Missing config parameter(s)")
								}();
								var n = e.getMediaInfo(),
									r = e.getMediaType(),
									i = m.getReadOnlyMetricsFor(r),
									a = e.getStreamProcessor(),
									o = e.getAbrController(),
									s = e.getStreamInfo(),
									u = s && s.manifestInfo ? s.manifestInfo.isDynamic : null,
									l = o.getThroughputHistory(),
									d = l.getSafeAverageThroughput(r, u),
									f = l.getAverageLatency(r),
									c = 0 < i.BufferState.length ? i.BufferState[i.BufferState.length - 1] : null,
									h = e.useBufferOccupancyABR();
								return !i || isNaN(d) || !c || h || o.getAbandonmentStateFor(r) !== _.default.ABANDON_LOAD && (c.state || u) && (t.quality = o.getQualityForBitrate(n, d, f), a.getScheduleController().setTimeToLoadDelay(0), g("ThroughputRule requesting switch to index: ", t.quality, "type: ", r, "Average throughput", Math.round(d), "kbps"), t.reason = {
										throughput : d,
										latency : f
									}), t
							},
							reset : function() {}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var _ = r(e(62)),
						a = r(e(9)),
						o = r(e(7)),
						v = r(e(86));
					i.__dashjs_factory_name = "ThroughputRule", n.default = a.default.getClassFactory(i), t.exports = n.default
				}, {
					62 : 62,
					7 : 7,
					86 : 86,
					9 : 9
				} ],
				96 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e) {
						function r(e, t, n) {
							var r = NaN,
								i = e.getCurrentRepresentationInfo();
							if (t === f.default.FRAGMENTED_TEXT)
								;
							else if (t === f.default.AUDIO && n) {
								var a = s.getCurrentBufferLevel(u.getReadOnlyMetricsFor(f.default.VIDEO));
								r = isNaN(i.fragmentDuration) ? a : Math.max(a, i.fragmentDuration)
							} else {
								var o = i.mediaInfo.streamInfo;
								if (d.isPlayingAtTopQuality(o))
									r = o.manifestInfo.duration >= l.getLongFormContentDurationThreshold() ? l.getBufferTimeAtTopQualityLongForm() : l.getBufferTimeAtTopQuality();else
									r = l.getStableBufferTime()
							}
							return r
						}
						var s = (e = e || {}).dashMetrics,
							u = e.metricsModel,
							l = e.mediaPlayerModel,
							d = e.abrController;
						return {
							execute : function(e, t, n) {
								return s.getCurrentBufferLevel(u.getReadOnlyMetricsFor(t)) < r(e, t, n)
							},
							getBufferTarget : r
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var f = r(e(59)),
						a = r(e(9));
					i.__dashjs_factory_name = "BufferLevelRule", n.default = a.default.getClassFactory(i), t.exports = n.default
				}, {
					59 : 59,
					9 : 9
				} ],
				97 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e) {
						e = e || {};var t = this.context,
							f = (0, a.default)(t).getInstance().log,
							c = e.adapter;
						return {
							execute : function(e, t) {
								var n = e.getCurrentRepresentationInfo(),
									r = n.mediaInfo.type,
									i = e.getScheduleController(),
									a = i.getSeekTarget(),
									o = !isNaN(a),
									s = e.getBufferController(),
									u = o ? a : c.getIndexHandlerTime(e);
								if (isNaN(u)) return null;
								if (o && i.setSeekTarget(NaN), s) {
									var l = s.getRangeAt(u);
									null === l || o || (f("Prior to making a request for time, NextFragmentRequestRule is aligning index handler's currentTime with bufferedRange.end for", r, ".", u, "was changed to", l.end), u = l.end)
								}
								var d = void 0;
								if (t) u = t.startTime + t.duration / 2, d = c.getFragmentRequestForTime(e, n, u, {
										timeThreshold : 0,
										ignoreIsFinished : !0
									});else {
									for (d = c.getFragmentRequestForTime(e, n, u, {
											keepIdx : !o
										}); d && d.action !== h.default.ACTION_COMPLETE && e.getFragmentModel().isFragmentLoaded(d);) d = c.getNextFragmentRequest(e, n);
									d && (isNaN(d.startTime + d.duration) || c.setIndexHandlerTime(e, d.startTime + d.duration), d.delayLoadingTime = (new Date).getTime() + i.getTimeToLoadDelay(), i.setTimeToLoadDelay(0))
								}
								return d
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var a = r(e(7)),
						o = r(e(9)),
						h = r(e(114));
					i.__dashjs_factory_name = "NextFragmentRequestRule", n.default = o.default.getClassFactory(i), t.exports = n.default
				}, {
					114 : 114,
					7 : 7,
					9 : 9
				} ],
				98 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						function e() {
						}
						var t,
							n = this.context,
							i = (0, u.default)(n).getInstance(),
							r = void 0,
							a = void 0,
							o = void 0,
							s = void 0;
						return t = {
								chooseSelectorFromManifest : function(e) {
									(function() {
										if (!r || !r.hasOwnProperty("getIsDVB"))
											throw new Error("Missing config parameter(s)")
									})(), s = r.getIsDVB(e) ? o : a
								},
								select : function(e) {
									var t = e.baseUrls,
										n = e.selectedIdx;
									if (!isNaN(n)) return t[n];
									var r = s.select(t);
									return r ? (e.selectedIdx = t.indexOf(r), r) : void i.trigger(l.default.URL_RESOLUTION_FAILED, {
										error : new Error(1, c)
									})
								},
								reset : e,
								setConfig : function(e) {
									e.selector && (s = e.selector), e.dashManifestModel && (r = e.dashManifestModel)
								}
							}, a = (0, f.default)(n).create({}), o = (0, d.default)(n).create({}), s = a, t
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var u = r(e(8)),
						l = r(e(12)),
						d = r(e(110)),
						f = r(e(109)),
						a = r(e(9)),
						c = "Failed to resolve a valid URL";
					i.__dashjs_factory_name = "BaseURLSelector";
					var o = a.default.getClassFactory(i);
					o.URL_RESOLUTION_FAILED_GENERIC_ERROR_CODE = 1, o.URL_RESOLUTION_FAILED_GENERIC_ERROR_MESSAGE = c, a.default.updateClassFactory(i.__dashjs_factory_name, o), n.default = o, t.exports = n.default
				}, {
					109 : 109,
					110 : 110,
					12 : 12,
					8 : 8,
					9 : 9
				} ],
				99 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						var r = this.context;
						return {
							parse : function(e) {
								if (!e) return null;
								void 0 === e.fileStart && (e.fileStart = 0);
								var t = s.default.parseBuffer(e),
									n = (0, a.default)(r).create();
								return n.setData(t), n
							},
							findLastTopIsoBoxCompleted : function(e, t, n) {
								if (void 0 === n && (n = 0), !t || n + 8 >= t.byteLength) return new c.default(0, !1);
								for (var r = t instanceof ArrayBuffer ? new Uint8Array(t) : t, i = void 0, a = 0; n < r.byteLength;) {
									var o = (d = r)[(f = n) + 3] >>> 0 | d[f + 2] << 8 >>> 0 | d[f + 1] << 16 >>> 0 | d[f] << 24 >>> 0,
										s = (u = r, l = n + 4, String.fromCharCode(u[l++]) + String.fromCharCode(u[l++]) + String.fromCharCode(u[l++]) + String.fromCharCode(u[l]));
									if (0 === o) break;
									n + o <= r.byteLength && (0 <= e.indexOf(s) ? i = new c.default(n, !0, o) : a = n + o), n += o
								}
								var u,
									l,
									d,
									f;
								return i || new c.default(a, !1)
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var a = r(e(104)),
						o = r(e(9)),
						s = r(e(5)),
						c = r(e(117));
					i.__dashjs_factory_name = "BoxParser", n.default = o.default.getSingletonFactory(i), t.exports = n.default
				}, {
					104 : 104,
					117 : 117,
					5 : 5,
					9 : 9
				} ],
				100 : [ function(e, t, n) {
					"use strict";
					function r() {
						var e,
							t = void 0;
						return t = !(e = {
									supportsMediaSource : function() {
										var e = "WebKitMediaSource" in window,
											t = "MediaSource" in window;
										return e || t
									},
									supportsEncryptedMedia : function() {
										return t
									},
									supportsCodec : function(e) {
										return !!("MediaSource" in window && MediaSource.isTypeSupported(e)) || !!("WebKitMediaSource" in window && WebKitMediaSource.isTypeSupported(e))
									},
									setEncryptedMediaSupported : function(e) {
										t = e
									}
								}), e
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i,
						a = e(9),
						o = (i = a) && i.__esModule ? i : {
							default : i
						};
					r.__dashjs_factory_name = "Capabilities", n.default = o.default.getSingletonFactory(r), t.exports = n.default
				}, {
					9 : 9
				} ],
				101 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i(e) {
						function n(e) {
							if (void 0 !== a) return a;
							a = !1;var t = void 0;
							try {
								"undefined" != typeof window && (t = window[e])
							} catch (e) {
								return u("Warning: DOMStorage access denied: " + e.message), a
							}
							if (!t || e !== p && "sessionStorage" !== e) return a;
							try {
								t.setItem("1", "1"), t.removeItem("1"), a = !0
							} catch (e) {
								u("Warning: DOMStorage is supported, but cannot be used: " + e.message)
							} return a
						}
						function r() {
							return 6e5 * Math.round((new Date).getTime() / 6e5)
						}
						function o(e, t) {
							return n(e) && l["get" + t + "CachingInfo"]().enabled
						}
						function s() {
							if (!l || !l.hasOwnProperty("getLastMediaSettingsCachingInfo"))
								throw new Error("Missing config parameter(s)")
						}
						e = e || {};var t,
							i = this.context,
							u = (0, d.default)(i).getInstance().log,
							l = e.mediaPlayerModel,
							a = void 0;
						return t = {
								getSavedBitrateSettings : function(e) {
									var t = NaN;
									if (s(), o(p, g)) {
										var n = c.replace(/\?/, e);
										try {
											var r = JSON.parse(localStorage.getItem(n)) || {},
												i = (new Date).getTime() - parseInt(r.timestamp, 10) >= l.getLastMediaSettingsCachingInfo().ttl || !1,
												a = parseFloat(r.bitrate);
											isNaN(a) || i ? i && localStorage.removeItem(n) : u("Last saved bitrate for " + e + " was " + (t = a))
										} catch (e) {
											return null
										}
									}
									return t
								},
								setSavedBitrateSettings : function(e, t) {
									if (o(p, g) && t) {
										var n = c.replace(/\?/, e);
										try {
											localStorage.setItem(n, JSON.stringify({
												bitrate : t.toFixed(3),
												timestamp : r()
											}))
										} catch (e) {
											u(e.message)
										}
									}
								},
								getSavedMediaSettings : function(e) {
									if (s(), !o(p, m)) return null;
									var t = null,
										n = h.replace(/\?/, e);
									try {
										var r = JSON.parse(localStorage.getItem(n)) || {},
											i = (new Date).getTime() - parseInt(r.timestamp, 10) >= l.getLastMediaSettingsCachingInfo().ttl || !1;
										t = r.settings, i && (localStorage.removeItem(n), t = null)
									} catch (e) {
										return null
									} return t
								},
								setSavedMediaSettings : function(e, t) {
									if (o(p, m)) {
										var n = h.replace(/\?/, e);
										try {
											localStorage.setItem(n, JSON.stringify({
												settings : t,
												timestamp : r()
											}))
										} catch (e) {
											u(e.message)
										}
									}
								}
							}, n(p) && f.forEach(function(e) {
								var t = localStorage.getItem(e.oldKey);
								if (t) {
									localStorage.removeItem(e.oldKey);try {
										localStorage.setItem(e.newKey, t)
									} catch (e) {
										u(e.message)
									}
								}
							}), t
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var a = r(e(9)),
						d = r(e(7)),
						f = [ {
							oldKey : "dashjs_vbitrate",
							newKey : "dashjs_video_bitrate"
						}, {
							oldKey : "dashjs_abitrate",
							newKey : "dashjs_audio_bitrate"
						}, {
							oldKey : "dashjs_vsettings",
							newKey : "dashjs_video_settings"
						}, {
							oldKey : "dashjs_asettings",
							newKey : "dashjs_audio_settings"
						} ],
						c = "dashjs_?_bitrate",
						h = "dashjs_?_settings",
						p = "localStorage",
						g = "LastBitrate",
						m = "LastMediaSettings";
					i.__dashjs_factory_name = "DOMStorage";
					var o = a.default.getSingletonFactory(i);
					n.default = o, t.exports = n.default
				}, {
					7 : 7,
					9 : 9
				} ],
				102 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						var e = this.context,
							o = (0, a.default)(e).getInstance();
						return {
							capabilityError : function(e) {
								o.trigger(s.default.ERROR, {
									error : "capability",
									event : e
								})
							},
							downloadError : function(e, t, n, r, i) {
								o.trigger(s.default.ERROR, {
									error : "download",
									event : {
										id : e,
										url : t,
										request : n
									},
									code : r,
									httpCode : i
								})
							},
							manifestError : function(e, t, n, r, i, a) {
								o.trigger(s.default.ERROR, {
									error : "manifestError",
									event : {
										message : e,
										id : t,
										manifest : n,
										event : r
									},
									code : i,
									httpCode : a
								})
							},
							timedTextError : function(e, t, n) {
								o.trigger(s.default.ERROR, {
									error : "cc",
									event : {
										message : e,
										id : t,
										cc : n
									}
								})
							},
							mediaSourceError : function(e, t) {
								o.trigger(s.default.ERROR, {
									error : "mediasource",
									event : e,
									code : t
								})
							},
							mediaKeySessionError : function(e) {
								o.trigger(s.default.ERROR, {
									error : "key_session",
									event : e
								})
							},
							mediaKeyMessageError : function(e) {
								o.trigger(s.default.ERROR, {
									error : "key_message",
									event : e
								})
							},
							mssError : function(e) {
								o.trigger(s.default.ERROR, {
									error : "mssError",
									event : e
								})
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var a = r(e(8)),
						s = r(e(12)),
						o = r(e(9));
					i.__dashjs_factory_name = "ErrorHandler";
					var u = o.default.getSingletonFactory(i);
					u.CAPABILITY_ERROR_MEDIASOURCE = "mediasource", u.CAPABILITY_ERROR_MEDIAKEYS = "mediakeys", u.DOWNLOAD_ERROR_ID_MANIFEST = "manifest", u.DOWNLOAD_ERROR_ID_SIDX = "SIDX", u.DOWNLOAD_ERROR_ID_CONTENT = "content", u.DOWNLOAD_ERROR_ID_INITIALIZATION = "initialization", u.DOWNLOAD_ERROR_ID_XLINK = "xlink", u.MANIFEST_ERROR_ID_CODEC = "codec", u.MANIFEST_ERROR_ID_PARSE = "parse", u.MANIFEST_ERROR_ID_NOSTREAMS = "nostreams", u.TIMED_TEXT_ERROR_ID_PARSE = "parse", o.default.updateSingletonFactory(i.__dashjs_factory_name, u), n.default = u, t.exports = n.default
				}, {
					12 : 12,
					8 : 8,
					9 : 9
				} ],
				103 : [ function(e, t, n) {
					"use strict";
					function r() {
						var r = {};
						return {
							save : function(e) {
								var t = e.streamId,
									n = e.representationId;
								r[t] = r[t] || {}, r[t][n] = e
							},
							extract : function(e, t) {
								return r && r[e] && r[e][t] ? r[e][t] : null
							},
							reset : function() {
								r = {}
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i,
						a = e(9),
						o = (i = a) && i.__esModule ? i : {
							default : i
						};
					r.__dashjs_factory_name = "InitCache", n.default = o.default.getSingletonFactory(r), t.exports = n.default
				}, {
					9 : 9
				} ],
				104 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						function t(e) {
							var t = [];
							if (!e || !s || "function" != typeof s.fetchAll) return t;
							for (var n = s.fetchAll(e), r = void 0, i = 0, a = n.length; i < a; i++) (r = o(n[i])) && t.push(r);
							return t
						}
						function o(e) {
							if (!e) return null;
							var t = new a.default(e);
							return e.hasOwnProperty("_incomplete") && (t.isComplete = !e._incomplete), t
						}
						var s = void 0;
						return {
							getBox : function(e) {
								return e && s && s.boxes && 0 !== s.boxes.length && "function" == typeof s.fetch ? o(s.fetch(e)) : null
							},
							getBoxes : t,
							setData : function(e) {
								s = e
							},
							getLastBox : function() {
								if (!s || !s.boxes || !s.boxes.length) return null;
								var e = t(s.boxes[s.boxes.length - 1].type);
								return 0 < e.length ? e[e.length - 1] : null
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var a = r(e(116)),
						o = r(e(9));
					i.__dashjs_factory_name = "IsoFile", n.default = o.default.getClassFactory(i), t.exports = n.default
				}, {
					116 : 116,
					9 : 9
				} ],
				105 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						var n = (e = e || {}).timelineConverter,
							r = e.streamProcessor;
						return {
							getLiveEdge : function() {
								!function() {
									if (!(n && n.hasOwnProperty("getExpectedLiveEdge") && r && r.hasOwnProperty("getCurrentRepresentationInfo")))
										throw new Error("Missing config parameter(s)")
								}();
								var e = r.getCurrentRepresentationInfo(),
									t = e.DVRWindow.end;
								return e.useCalculatedLiveEdgeTime && (t = n.getExpectedLiveEdge(), n.setClientTimeOffset(t - e.DVRWindow.end)), t
							},
							reset : function() {
								r = n = null
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i,
						a = e(9),
						o = (i = a) && i.__esModule ? i : {
							default : i
						};
					r.__dashjs_factory_name = "LiveEdgeFinder", n.default = o.default.getClassFactory(r), t.exports = n.default
				}, {
					9 : 9
				} ],
				106 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					function i() {
						return {
							areEqual : function(e, t) {
								return (0, o.default)(e, t)
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var a = r(e(9)),
						o = r(e(6));
					i.__dashjs_factory_name = "ObjectUtils", n.default = a.default.getSingletonFactory(i), t.exports = n.default
				}, {
					6 : 6,
					9 : 9
				} ],
				107 : [ function(e, t, n) {
					"use strict";
					function r() {
						return {
							modifyRequestURL : function(e) {
								return e
							},
							modifyRequestHeader : function(e) {
								return e
							}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i,
						a = e(9),
						o = (i = a) && i.__esModule ? i : {
							default : i
						};
					r.__dashjs_factory_name = "RequestModifier", n.default = o.default.getSingletonFactory(r), t.exports = n.default
				}, {
					9 : 9
				} ],
				108 : [ function(e, t, n) {
					"use strict";
					function r() {
						function i(e) {
							var t = e.indexOf("/"),
								n = e.lastIndexOf("/");
							return -1 !== t ? n === t + 1 ? e : (-1 !== e.indexOf("?") && (e = e.substring(0, e.indexOf("?"))), e.substring(0, n + 1)) : ""
						}
						function a(e) {
							var t = e.match(f);
							return t ? t[1] : ""
						}
						function o(e) {
							var t = e.match(r);
							return t ? t[0] : ""
						}
						function s(e) {
							return !r.test(e)
						}
						function u(e) {
							return s(e) && "/" === e.charAt(0)
						}
						function l(e) {
							return 0 === e.indexOf("//")
						}
						var n = void 0,
							r = /^[a-z][a-z0-9+\-.]*:/i,
							t = /^https?:\/\//i,
							d = /^https:\/\//i,
							f = /^([a-z][a-z0-9+\-.]*:\/\/[^\/]+)\/?/i,
							e = function(t, e) {
								try {
									return new window.URL(t, e).toString()
								} catch (e) {
									return t
								}
							},
							c = function(e, t) {
								var n = i;
								if (!t) return e;
								if (!s(e)) return e;
								u(e) && (n = a), l(e) && (n = o);
								var r = n(t);
								return [ r, e ].join("/" !== r.charAt(r.length - 1) && "/" !== e.charAt(0) ? "/" : "")
							};
						return function() {
								try {
									new window.URL("x", "http://y"), n = e
								} catch (e) {} finally {
									n = n || c
								}
							}(), {
								parseBaseUrl : i,
								parseOrigin : a,
								parseScheme : o,
								isRelative : s,
								isPathAbsolute : u,
								isSchemeRelative : l,
								isHTTPURL : function(e) {
									return t.test(e)
								},
								isHTTPS : function(e) {
									return d.test(e)
								},
								resolve : function(e, t) {
									return n(e, t)
								}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i,
						a = e(9),
						o = (i = a) && i.__esModule ? i : {
							default : i
						};
					r.__dashjs_factory_name = "URLUtils", n.default = o.default.getSingletonFactory(r), t.exports = n.default
				}, {
					9 : 9
				} ],
				109 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e = e || {}, {
								select : function(e) {
									var n = 0,
										t = void 0;
									return e && e.some(function(e, t) {
											return n = t, !0
										}) && (t = e[n]), t
								}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i,
						a = e(9),
						o = (i = a) && i.__esModule ? i : {
							default : i
						};
					r.__dashjs_factory_name = "BasicSelector", n.default = o.default.getClassFactory(r), t.exports = n.default
				}, {
					9 : 9
				} ],
				110 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e = e || {}, {
								select : function(e) {
									return e && function(e) {
											var t = 0,
												n = [],
												r = 0,
												i = void 0,
												a = void 0;
											if ((a = e.sort(function(e, t) {
													var n = e.dvb_priority - t.dvb_priority;
													return isNaN(n) ? 0 : n
												}).filter(function(e, t, n) {
													return !t || n[0].dvb_priority && e.dvb_priority && n[0].dvb_priority === e.dvb_priority
												})).length) return 1 < a.length && (a.forEach(function(e) {
														t += e.dvb_weight, n.push(t)
													}), i = Math.floor(Math.random() * (t - 1)), n.every(function(e, t) {
														return r = t, !(i < e)
													})), a[r]
										}((t = [], e.filter(function() {
											return !0
										}).filter(function(e) {
											return !t.length || !e.dvb_priority || -1 === t.indexOf(e.dvb_priority)
										})));
									var t
								}
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i,
						a = e(9),
						o = (i = a) && i.__esModule ? i : {
							default : i
						};
					r.__dashjs_factory_name = "DVBSelector", n.default = o.default.getClassFactory(r), t.exports = n.default
				}, {
					9 : 9
				} ],
				111 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.mediaType = null, this.bitrate = null, this.width = null, this.height = null, this.scanType = null, this.qualityIndex = NaN, this.id = ""
					}, t.exports = n.default
				}, {} ],
				112 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e(t, n, r, i, a) {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.code = t || null, this.message = n || null, this.data = r || null, this.errorCode = i || null, this.httpCode = a || null
					}, t.exports = n.default
				}, {} ],
				113 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.streamId = null, this.mediaInfo = null, this.segmentType = null, this.quality = NaN, this.index = NaN, this.bytes = null, this.start = NaN, this.end = NaN, this.duration = NaN, this.representationId = null, this.endFragment = null
					}, t.exports = n.default
				}, {} ],
				114 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.action = e.ACTION_DOWNLOAD, this.startTime = NaN, this.mediaType = null, this.mediaInfo = null, this.type = null, this.duration = NaN, this.timescale = NaN, this.range = null, this.url = null, this.serviceLocation = null, this.requestStartDate = null, this.firstByteDate = null, this.requestEndDate = null, this.quality = NaN, this.index = NaN, this.availabilityStartTime = null, this.availabilityEndTime = null, this.wallStartTime = null, this.bytesLoaded = NaN, this.bytesTotal = NaN, this.delayLoadingTime = NaN, this.responseType = "arraybuffer", this.representationId = null
					};
					r.ACTION_DOWNLOAD = "download", r.ACTION_COMPLETE = "complete", n.default = r, t.exports = n.default
				}, {} ],
				115 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r,
						i = e(114),
						a = (r = i) && r.__esModule ? r : {
							default : r
						},
						o = function(e) {
							function t(e) {
								(function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								})(this, t), function(e, t, n) {
									for (var r = !0; r;) {
										var i = e,
											a = t,
											o = n;
										r = !1, null === i && (i = Function.prototype);var s = Object.getOwnPropertyDescriptor(i, a);
										if (void 0 !== s) {
											if ("value" in s) return s.value;
											var u = s.get;
											if (void 0 === u) return;
											return u.call(o)
										}
										var l = Object.getPrototypeOf(i);
										if (null === l) return;
										e = l, t = a, n = o, r = !0, s = l = void 0
									}
								}(Object.getPrototypeOf(t.prototype), "constructor", this).call(this), this.url = e || null, this.checkForExistenceOnly = !0
							}
							return function(e, t) {
									if ("function" != typeof t && null !== t)
										throw new TypeError("Super expression must either be null or a function, not " + Fe(t));
									e.prototype = Object.create(t && t.prototype, {
										constructor : {
											value : e,
											enumerable : !1,
											writable : !0,
											configurable : !0
										}
									}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
								}(t, a.default), t
						}();
					n.default = o, t.exports = n.default
				}, {
					114 : 114
				} ],
				116 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						i = function() {
							function a(e) {
								if (function(e, t) {
										if (!(e instanceof t))
											throw new TypeError("Cannot call a class as a function")
									}(this, a), this.offset = e._offset, this.type = e.type, this.size = e.size, this.boxes = [], e.boxes)
									for (var t = 0; t < e.boxes.length; t++) this.boxes.push(new a(e.boxes[t]));
								switch (this.isComplete = !0, e.type) {
								case "sidx":
									if (this.timescale = e.timescale, this.earliest_presentation_time = e.earliest_presentation_time, this.first_offset = e.first_offset, this.references = e.references, e.references) {
										this.references = [];
										for (t = 0; t < e.references.length; t++) {
											var n = {
												reference_type : e.references[t].reference_type,
												referenced_size : e.references[t].referenced_size,
												subsegment_duration : e.references[t].subsegment_duration
											};
											this.references.push(n)
										}
									}
									break;case "emsg":
									this.id = e.id, this.value = e.value, this.timescale = e.timescale, this.scheme_id_uri = e.scheme_id_uri, this.presentation_time_delta = e.presentation_time_delta, this.event_duration = e.event_duration, this.message_data = e.message_data;
									break;case "mdhd":
									this.timescale = e.timescale;
									break;case "mfhd":
									this.sequence_number = e.sequence_number;
									break;case "subs":
									this.entry_count = e.entry_count, this.entries = e.entries;
									break;case "tfhd":
									this.base_data_offset = e.base_data_offset, this.sample_description_index = e.sample_description_index, this.default_sample_duration = e.default_sample_duration, this.default_sample_size = e.default_sample_size, this.default_sample_flags = e.default_sample_flags, this.flags = e.flags;
									break;case "tfdt":
									this.version = e.version, this.baseMediaDecodeTime = e.baseMediaDecodeTime, this.flags = e.flags;
									break;case "trun":
									if (this.sample_count = e.sample_count, this.first_sample_flags = e.first_sample_flags, this.data_offset = e.data_offset, this.flags = e.flags, this.samples = e.samples, e.samples) {
										this.samples = [];
										t = 0;
										for (var r = e.samples.length; t < r; t++) {
											var i = {
												sample_size : e.samples[t].sample_size,
												sample_duration : e.samples[t].sample_duration,
												sample_composition_time_offset : e.samples[t].sample_composition_time_offset
											};
											this.samples.push(i)
										}
									}
								}
							}
							return r(a, [ {
									key : "getChildBox",
									value : function(e) {
										for (var t = 0; t < this.boxes.length; t++)
											if (this.boxes[t].type === e) return this.boxes[t]
									}
								}, {
									key : "getChildBoxes",
									value : function(e) {
										for (var t = [], n = 0; n < this.boxes.length; n++) this.boxes[n].type === e && t.push(this.boxes[n]);
										return t
									}
								} ]), a
						}();
					n.default = i, t.exports = n.default
				}, {} ],
				117 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e(t, n, r) {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.lastCompletedOffset = t, this.found = n, this.size = r
					}, t.exports = n.default
				}, {} ],
				118 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.DVRWindowSize = NaN, this.loadedTime = null, this.availableFrom = null, this.minBufferTime = NaN, this.duration = NaN, this.isDynamic = !1, this.maxFragmentDuration = null
					}, t.exports = n.default
				}, {} ],
				119 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.id = null, this.index = null, this.type = null, this.streamInfo = null, this.representationCount = 0, this.lang = null, this.viewpoint = null, this.accessibility = null, this.audioChannelConfiguration = null, this.roles = null, this.codec = null, this.mimeType = null, this.contentProtection = null, this.isText = !1, this.KID = null, this.bitrateList = null
					}, t.exports = n.default
				}, {} ],
				120 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.TcpList = [], this.HttpList = [], this.RepSwitchList = [], this.BufferLevel = [], this.BufferState = [], this.PlayList = [], this.DroppedFrames = [], this.SchedulingInfo = [], this.DVRInfo = [], this.ManifestUpdate = [], this.RequestsQueue = null, this.DVBErrors = []
					}, t.exports = n.default
				}, {} ],
				121 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.id = null, this.quality = null, this.DVRWindow = null, this.fragmentDuration = null, this.mediaInfo = null, this.MSETimeOffset = null
					}, t.exports = n.default
				}, {} ],
				122 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.id = null, this.index = null, this.start = NaN, this.duration = NaN, this.manifestInfo = null, this.isLast = !0
					}, t.exports = n.default
				}, {} ],
				123 : [ function(e, t, n) {
					"use strict";
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i = r(e(59)),
						a = r(e(114)),
						o = function(e) {
							function n(e, t) {
								(function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								})(this, n), function(e, t, n) {
									for (var r = !0; r;) {
										var i = e,
											a = t,
											o = n;
										r = !1, null === i && (i = Function.prototype);var s = Object.getOwnPropertyDescriptor(i, a);
										if (void 0 !== s) {
											if ("value" in s) return s.value;
											var u = s.get;
											if (void 0 === u) return;
											return u.call(o)
										}
										var l = Object.getPrototypeOf(i);
										if (null === l) return;
										e = l, t = a, n = o, r = !0, s = l = void 0
									}
								}(Object.getPrototypeOf(n.prototype), "constructor", this).call(this), this.url = e || null, this.type = t || null, this.mediaType = i.default.STREAM, this.responseType = ""
							}
							return function(e, t) {
									if ("function" != typeof t && null !== t)
										throw new TypeError("Super expression must either be null or a function, not " + Fe(t));
									e.prototype = Object.create(t && t.prototype, {
										constructor : {
											value : e,
											enumerable : !1,
											writable : !0,
											configurable : !0
										}
									}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
								}(n, a.default), n
						}();
					n.default = o, t.exports = n.default
				}, {
					114 : 114,
					59 : 59
				} ],
				124 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.t = null, this.xywh = null, this.track = null, this.id = null, this.s = null, this.r = null
					}, t.exports = n.default
				}, {} ],
				125 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.t = null, this.level = null
					}, t.exports = n.default
				}, {} ],
				126 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r,
						i = e(64),
						a = (r = i) && r.__esModule ? r : {
							default : r
						};
					n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.target = null, this.state = a.default.BUFFER_EMPTY
					}, t.exports = n.default
				}, {
					64 : 64
				} ],
				127 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.time = null, this.range = null, this.manifestInfo = null
					}, t.exports = n.default
				}, {} ],
				128 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.time = null, this.droppedFrames = null
					}, t.exports = n.default
				}, {} ],
				129 : [ function(e, t, n) {
					"use strict";
					function r(e, t) {
						if (!(e instanceof t))
							throw new TypeError("Cannot call a class as a function")
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i = function e() {
						r(this, e), this.tcpid = null, this.type = null, this.url = null, this.actualurl = null, this.range = null, this.trequest = null, this.tresponse = null, this.responsecode = null, this.interval = null, this.trace = [], this._stream = null, this._tfinish = null, this._mediaduration = null, this._responseHeaders = null, this._serviceLocation = null
					};
					i.GET = "GET", i.HEAD = "HEAD", i.MPD_TYPE = "MPD", i.XLINK_EXPANSION_TYPE = "XLinkExpansion", i.INIT_SEGMENT_TYPE = "InitializationSegment", i.INDEX_SEGMENT_TYPE = "IndexSegment", i.MEDIA_SEGMENT_TYPE = "MediaSegment", i.BITSTREAM_SWITCHING_SEGMENT_TYPE = "BitstreamSwitchingSegment", i.OTHER_TYPE = "other", n.HTTPRequest = i, n.HTTPRequestTrace = function e() {
						r(this, e), this.s = null, this.d = null, this.b = []
					}
				}, {} ],
				130 : [ function(e, t, n) {
					"use strict";
					function r(e, t) {
						if (!(e instanceof t))
							throw new TypeError("Cannot call a class as a function")
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});n.ManifestUpdate = function e() {
						r(this, e), this.mediaType = null, this.type = null, this.requestTime = null, this.fetchTime = null, this.availabilityStartTime = null, this.presentationStartTime = 0, this.clientTimeOffset = 0, this.currentTime = null, this.buffered = null, this.latency = 0, this.streamInfo = [], this.representationInfo = []
					}, n.ManifestUpdateStreamInfo = function e() {
						r(this, e), this.id = null, this.index = null, this.start = null, this.duration = null
					}, n.ManifestUpdateRepresentationInfo = function e() {
						r(this, e), this.id = null, this.index = null, this.mediaType = null, this.streamIndex = null, this.presentationTimeOffset = null, this.startNumber = null, this.fragmentInfoType = null
					}
				}, {} ],
				131 : [ function(e, t, n) {
					"use strict";
					function r(e, t) {
						if (!(e instanceof t))
							throw new TypeError("Cannot call a class as a function")
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i = function e() {
						r(this, e), this.start = null, this.mstart = null, this.starttype = null, this.trace = []
					};
					i.INITIAL_PLAYOUT_START_REASON = "initial_playout", i.SEEK_START_REASON = "seek", i.RESUME_FROM_PAUSE_START_REASON = "resume", i.METRICS_COLLECTION_START_REASON = "metrics_collection_start";
					var a = function e() {
						r(this, e), this.representationid = null, this.subreplevel = null, this.start = null, this.mstart = null, this.duration = null, this.playbackspeed = null, this.stopreason = null
					};
					a.REPRESENTATION_SWITCH_STOP_REASON = "representation_switch", a.REBUFFERING_REASON = "rebuffering", a.USER_REQUEST_STOP_REASON = "user_request", a.END_OF_PERIOD_STOP_REASON = "end_of_period", a.END_OF_CONTENT_STOP_REASON = "end_of_content", a.METRICS_COLLECTION_STOP_REASON = "metrics_collection_end", a.FAILURE_STOP_REASON = "failure", n.PlayList = i, n.PlayListTrace = a
				}, {} ],
				132 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.t = null, this.mt = null, this.to = null, this.lto = null
					}, t.exports = n.default
				}, {} ],
				133 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.loadingRequests = [], this.executedRequests = []
					}, t.exports = n.default
				}, {} ],
				134 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.mediaType = null, this.t = null, this.type = null, this.startTime = null, this.availabilityStartTime = null, this.duration = null, this.quality = null, this.range = null, this.state = null
					}, t.exports = n.default
				}, {} ],
				135 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});n.default = function e() {
						(function(e, t) {
							if (!(e instanceof t))
								throw new TypeError("Cannot call a class as a function")
						})(this, e), this.tcpid = null, this.dest = null, this.topen = null, this.tclose = null, this.tconnect = null
					}, t.exports = n.default
				}, {} ]
			}, {}, [ 4 ])
		}).call(this, t(127)(e))
	}, function(e, t, n) {
		var r,
			i,
			a,
			o;
		function q(e) {
			return (q = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			})(e)
		}
		o = function() {
			return function i(a, o, s) {
				function u(t, e) {
					if (!o[t]) {
						if (!a[t]) {
							if (l) return l(t, !0);
							var n = new Error("Cannot find module '" + t + "'");
							throw n.code = "MODULE_NOT_FOUND", n
						}
						var r = o[t] = {
							exports : {}
						};
						a[t][0].call(r.exports, function(e) {
							return u(a[t][1][e] || e)
						}, r, r.exports, i, a, o, s)
					}
					return o[t].exports
				}
				for (var l = !1, e = 0; e < s.length; e++) u(s[e]);
				return u
			}({
				1 : [ function(j, n, r) {
					(function(Q, G) {
						var e,
							t;
						e = this, t = function() {
							"use strict";
							function l(e) {
								return "function" == typeof e
							}
							var n = Array.isArray ? Array.isArray : function(e) {
									return "[object Array]" === Object.prototype.toString.call(e)
								},
								r = 0,
								t = void 0,
								i = void 0,
								s = function(e, t) {
									c[r] = e, c[r + 1] = t, 2 === (r += 2) && (i ? i(h) : v())
								};
							var e = "undefined" != typeof window ? window : void 0,
								a = e || {},
								o = a.MutationObserver || a.WebKitMutationObserver,
								u = "undefined" == typeof self && void 0 !== Q && "[object process]" === {}.toString.call(Q),
								d = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;
							function f() {
								var e = setTimeout;
								return function() {
									return e(h, 1)
								}
							}
							var c = new Array(1e3);
							function h() {
								for (var e = 0; e < r; e += 2) {
									(0, c[e])(c[e + 1]), c[e] = void 0, c[e + 1] = void 0
								}
								r = 0
							}
							var p,
								g,
								m,
								_,
								v = void 0;
							function y(e, t) {
								var n = this,
									r = new this.constructor(T);
								void 0 === r[A] && x(r);var i = n._state;
								if (i) {
									var a = arguments[i - 1];
									s(function() {
										return F(i, r, a, n._result)
									})
								} else L(n, r, e, t);
								return r
							}
							function E(e) {
								if (e && "object" === q(e) && e.constructor === this) return e;
								var t = new this(T);
								return D(t, e), t
							}
							v = u ? function() {
								return Q.nextTick(h)
							} : o ? (g = 0, m = new o(h), _ = document.createTextNode(""), m.observe(_, {
								characterData : !0
							}), function() {
								_.data = g = ++g % 2
							}) : d ? ((p = new MessageChannel).port1.onmessage = h, function() {
								return p.port2.postMessage(0)
							}) : void 0 === e && "function" == typeof j ? function() {
								try {
									var e = Function("return this")().require("vertx");
									return void 0 !== (t = e.runOnLoop || e.runOnContext) ? function() {
										t(h)
									} : f()
								} catch (e) {
									return f()
								}
							}() : f();
							var A = Math.random().toString(36).substring(2);
							function T() {
							}
							var R = void 0,
								I = 1,
								S = 2,
								b = {
									error : null
								};
							function w(e) {
								try {
									return e.then
								} catch (e) {
									return b.error = e, b
								}
							}
							function C(e, t, n) {
								var r,
									i,
									a,
									o;
								t.constructor === e.constructor && n === y && t.constructor.resolve === E ? (a = e, (o = t)._state === I ? M(a, o._result) : o._state === S ? N(a, o._result) : L(o, void 0, function(e) {
									return D(a, e)
								}, function(e) {
									return N(a, e)
								})) : n === b ? (N(e, b.error), b.error = null) : void 0 === n ? M(e, t) : l(n) ? (r = t, i = n, s(function(t) {
									var n = !1,
										e = function(e, t, n, r) {
											try {
												e.call(t, n, r)
											} catch (e) {
												return e
											}
										}(i, r, function(e) {
											n || (n = !0, r !== e ? D(t, e) : M(t, e))
										}, function(e) {
											n || (n = !0, N(t, e))
										}, t._label);
									!n && e && (n = !0, N(t, e))
								}, e)) : M(e, t)
							}
							function D(e, t) {
								var n,
									r;
								e === t ? N(e, new TypeError("You cannot resolve a promise with itself")) : (r = q(n = t), null === n || "object" !== r && "function" !== r ? M(e, t) : C(e, t, w(t)))
							}
							function O(e) {
								e._onerror && e._onerror(e._result), P(e)
							}
							function M(e, t) {
								e._state === R && (e._result = t, e._state = I, 0 !== e._subscribers.length && s(P, e))
							}
							function N(e, t) {
								e._state === R && (e._state = S, e._result = t, s(O, e))
							}
							function L(e, t, n, r) {
								var i = e._subscribers,
									a = i.length;
								e._onerror = null, i[a] = t, i[a + I] = n, i[a + S] = r, 0 === a && e._state && s(P, e)
							}
							function P(e) {
								var t = e._subscribers,
									n = e._state;
								if (0 !== t.length) {
									for (var r = void 0, i = void 0, a = e._result, o = 0; o < t.length; o += 3) r = t[o], i = t[o + n], r ? F(n, r, i, a) : i(a);
									e._subscribers.length = 0
								}
							}
							function F(e, t, n, r) {
								var i = l(n),
									a = void 0,
									o = void 0,
									s = void 0,
									u = void 0;
								if (i) {
									if ((a = function(e, t) {
											try {
												return e(t)
											} catch (e) {
												return b.error = e, b
											}
										}(n, r)) === b ? (u = !0, o = a.error, a.error = null) : s = !0, t === a) return void N(t, new TypeError("A promises callback cannot return that same promise."))
								} else a = r, s = !0;
								t._state !== R || (i && s ? D(t, a) : u ? N(t, o) : e === I ? M(t, a) : e === S && N(t, a))
							}
							var B = 0;
							function x(e) {
								e[A] = B++, e._state = void 0, e._result = void 0, e._subscribers = []
							}
							var k = function() {
								function e(e, t) {
									this._instanceConstructor = e, this.promise = new e(T), this.promise[A] || x(this.promise), n(t) ? (this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? M(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(t), 0 === this._remaining && M(this.promise, this._result))) : N(this.promise, new Error("Array Methods must be provided an Array"))
								}
								return e.prototype._enumerate = function(e) {
										for (var t = 0; this._state === R && t < e.length; t++) this._eachEntry(e[t], t)
									}, e.prototype._eachEntry = function(t, e) {
										var n = this._instanceConstructor,
											r = n.resolve;
										if (r === E) {
											var i = w(t);
											if (i === y && t._state !== R) this._settledAt(t._state, e, t._result);
											else if ("function" != typeof i) this._remaining--, this._result[e] = t;
											else if (n === U) {
												var a = new n(T);
												C(a, t, i), this._willSettleAt(a, e)
											} else this._willSettleAt(new n(function(e) {
													return e(t)
												}), e)
										} else this._willSettleAt(r(t), e)
									}, e.prototype._settledAt = function(e, t, n) {
										var r = this.promise;
										r._state === R && (this._remaining--, e === S ? N(r, n) : this._result[t] = n), 0 === this._remaining && M(r, this._result)
									}, e.prototype._willSettleAt = function(e, t) {
										var n = this;
										L(e, void 0, function(e) {
											return n._settledAt(I, t, e)
										}, function(e) {
											return n._settledAt(S, t, e)
										})
									}, e
							}();
							var U = function() {
								function t(e) {
									this[A] = B++, this._result = this._state = void 0, this._subscribers = [], T !== e && ("function" != typeof e && function() {
										throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
									}(), this instanceof t ? function(t, e) {
										try {
											e(function(e) {
												D(t, e)
											}, function(e) {
												N(t, e)
											})
										} catch (e) {
											N(t, e)
										}
									}(this, e) : function() {
										throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
									}())
								}
								return t.prototype.catch = function(e) {
										return this.then(null, e)
									}, t.prototype.finally = function(t) {
										var n = this.constructor;
										return this.then(function(e) {
											return n.resolve(t()).then(function() {
												return e
											})
										}, function(e) {
											return n.resolve(t()).then(function() {
												throw e
											})
										})
									}, t
							}();
							return U.prototype.then = y, U.all = function(e) {
									return new k(this, e).promise
								}, U.race = function(i) {
									var a = this;
									return n(i) ? new a(function(e, t) {
										for (var n = i.length, r = 0; r < n; r++) a.resolve(i[r]).then(e, t)
									}) : new a(function(e, t) {
										return t(new TypeError("You must pass an array to race."))
									})
								}, U.resolve = E, U.reject = function(e) {
									var t = new this(T);
									return N(t, e), t
								}, U._setScheduler = function(e) {
									i = e
								}, U._setAsap = function(e) {
									s = e
								}, U._asap = s, U.polyfill = function() {
									var e = void 0;
									if (void 0 !== G)
										e = G;
									else if ("undefined" != typeof self)
										e = self;else try {
											e = Function("return this")()
										} catch (e) {
											throw new Error("polyfill failed because global object is unavailable in this environment")
									}
									var t = e.Promise;
									if (t) {
										var n = null;
										try {
											n = Object.prototype.toString.call(t.resolve())
										} catch (e) {}
										if ("[object Promise]" === n && !t.cast) return
									}
									e.Promise = U
								}, U.Promise = U
						}, "object" === q(r) && void 0 !== n ? n.exports = t() : e.ES6Promise = t()
					}).call(this, j("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
				}, {
					_process : 3
				} ],
				2 : [ function(e, t, n) {
					function r() {
						this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
					}
					function u(e) {
						return "function" == typeof e
					}
					function l(e) {
						return "object" === q(e) && null !== e
					}
					function d(e) {
						return void 0 === e
					}
					((t.exports = r).EventEmitter = r).prototype._events = void 0, r.prototype._maxListeners = void 0, r.defaultMaxListeners = 10, r.prototype.setMaxListeners = function(e) {
						if ("number" != typeof e || e < 0 || isNaN(e))
							throw TypeError("n must be a positive number");
						return this._maxListeners = e, this
					}, r.prototype.emit = function(e) {
						var t,
							n,
							r,
							i,
							a,
							o;
						if (this._events || (this._events = {}), "error" === e && (!this._events.error || l(this._events.error) && !this._events.error.length)) {
							if ((t = arguments[1]) instanceof Error)
								throw t;
							var s = new Error('Uncaught, unspecified "error" event. (' + t + ")");
							throw s.context = t, s
						}
						if (d(n = this._events[e])) return !1;
						if (u(n)) switch (arguments.length) {
							case 1:
								n.call(this);
								break;case 2:
								n.call(this, arguments[1]);
								break;case 3:
								n.call(this, arguments[1], arguments[2]);
								break;default:
								i = Array.prototype.slice.call(arguments, 1), n.apply(this, i)
						}
						else if (l(n))
							for (i = Array.prototype.slice.call(arguments, 1), r = (o = n.slice()).length, a = 0; a < r; a++) o[a].apply(this, i);
						return !0
					}, r.prototype.on = r.prototype.addListener = function(e, t) {
						var n;
						if (!u(t))
							throw TypeError("listener must be a function");
						return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, u(t.listener) ? t.listener : t), this._events[e] ? l(this._events[e]) ? this._events[e].push(t) : this._events[e] = [ this._events[e], t ] : this._events[e] = t, l(this._events[e]) && !this._events[e].warned && (n = d(this._maxListeners) ? r.defaultMaxListeners : this._maxListeners) && 0 < n && this._events[e].length > n && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace()), this
					}, r.prototype.once = function(e, t) {
						if (!u(t))
							throw TypeError("listener must be a function");
						var n = !1;
						function r() {
							this.removeListener(e, r), n || (n = !0, t.apply(this, arguments))
						}
						return r.listener = t, this.on(e, r), this
					}, r.prototype.removeListener = function(e, t) {
						var n,
							r,
							i,
							a;
						if (!u(t))
							throw TypeError("listener must be a function");
						if (!this._events || !this._events[e]) return this;
						if (i = (n = this._events[e]).length, r = -1, n === t || u(n.listener) && n.listener === t)
							delete this._events[e]
							, this._events.removeListener && this.emit("removeListener", e, t);
						else if (l(n)) {
							for (a = i; 0 < a--;)
								if (n[a] === t || n[a].listener && n[a].listener === t) {
									r = a;break
							}
							if (r < 0) return this;
							1 === n.length ? (n.length = 0,
							delete this._events[e]
								) : n.splice(r, 1), this._events.removeListener && this.emit("removeListener", e, t)
						}
						return this
					}, r.prototype.removeAllListeners = function(e) {
						var t,
							n;
						if (!this._events) return this;
						if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] &&
								delete this._events[e]
								, this;
						if (0 === arguments.length) {
							for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
							return this.removeAllListeners("removeListener"), this._events = {}, this
						}
						if (u(n = this._events[e])) this.removeListener(e, n);
						else if (n)
							for (; n.length;) this.removeListener(e, n[n.length - 1]);
						return delete this._events[e]
							, this
					}, r.prototype.listeners = function(e) {
						return this._events && this._events[e] ? u(this._events[e]) ? [ this._events[e] ] : this._events[e].slice() : []
					}, r.prototype.listenerCount = function(e) {
						if (this._events) {
							var t = this._events[e];
							if (u(t)) return 1;
							if (t) return t.length
						}
						return 0
					}, r.listenerCount = function(e, t) {
						return e.listenerCount(t)
					}
				}, {} ],
				3 : [ function(e, t, n) {
					var r,
						i,
						a = t.exports = {};
					function o() {
						throw new Error("setTimeout has not been defined")
					}
					function s() {
						throw new Error("clearTimeout has not been defined")
					}
					function u(t) {
						if (r === setTimeout) return setTimeout(t, 0);
						if ((r === o || !r) && setTimeout) return r = setTimeout, setTimeout(t, 0);
						try {
							return r(t, 0)
						} catch (e) {
							try {
								return r.call(null, t, 0)
							} catch (e) {
								return r.call(this, t, 0)
							}
						}
					}
					!function() {
						try {
							r = "function" == typeof setTimeout ? setTimeout : o
						} catch (e) {
							r = o
						} try {
							i = "function" == typeof clearTimeout ? clearTimeout : s
						} catch (e) {
							i = s
						}
					}();
					var l,
						d = [],
						f = !1,
						c = -1;
					function h() {
						f && l && (f = !1, l.length ? d = l.concat(d) : c = -1, d.length && p())
					}
					function p() {
						if (!f) {
							var e = u(h);
							f = !0;
							for (var t = d.length; t;) {
								for (l = d, d = []; ++c < t;) l && l[c].run();
								c = -1, t = d.length
							}
							l = null, f = !1, function(t) {
								if (i === clearTimeout) return clearTimeout(t);
								if ((i === s || !i) && clearTimeout) return i = clearTimeout, clearTimeout(t);
								try {
									i(t)
								} catch (e) {
									try {
										return i.call(null, t)
									} catch (e) {
										return i.call(this, t)
									}
								}
							}(e)
						}
					}
					function g(e, t) {
						this.fun = e, this.array = t
					}
					function m() {
					}
					a.nextTick = function(e) {
						var t = new Array(arguments.length - 1);
						if (1 < arguments.length)
							for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
						d.push(new g(e, t)), 1 !== d.length || f || u(p)
					}, g.prototype.run = function() {
						this.fun.apply(null, this.array)
					}, a.title = "browser", a.browser = !0, a.env = {}, a.argv = [], a.version = "", a.versions = {}, a.on = m, a.addListener = m, a.once = m, a.off = m, a.removeListener = m, a.removeAllListeners = m, a.emit = m, a.prependListener = m, a.prependOnceListener = m, a.listeners = function(e) {
						return []
					}, a.binding = function(e) {
						throw new Error("process.binding is not supported")
					}, a.cwd = function() {
						return "/"
					}, a.chdir = function(e) {
						throw new Error("process.chdir is not supported")
					}, a.umask = function() {
						return 0
					}
				}, {} ],
				4 : [ function(e, t, n) {
					var _ = arguments[3],
						v = arguments[4],
						y = arguments[5],
						E = JSON.stringify;
					t.exports = function(e, t) {
						for (var n, r = Object.keys(y), i = 0, a = r.length; i < a; i++) {
							var o = r[i],
								s = y[o].exports;
							if (s === e || s && s.default === e) {
								n = o;break
							}
						}
						if (!n) {
							n = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
							var u = {};
							for (i = 0, a = r.length; i < a; i++) {
								u[o = r[i]] = o
							}
							v[n] = [ "function(require,module,exports){" + e + "(self); }", u ]
						}
						var l = Math.floor(Math.pow(16, 8) * Math.random()).toString(16),
							d = {};
						d[n] = n, v[l] = [ "function(require,module,exports){var f = require(" + E(n) + ");(f.default ? f.default : f)(self);}", d ];
						var f = {};
						!function e(t) {
							f[t] = !0;
							for (var n in v[t][1]) {
								var r = v[t][1][n];
								f[r] || e(r)
							}
						}(l);
						var c = "(" + _ + ")({" + Object.keys(f).map(function(e) {
									return E(e) + ":[" + v[e][0] + "," + E(v[e][1]) + "]"
								}).join(",") + "},{},[" + E(l) + "])",
							h = window.URL || window.webkitURL || window.mozURL || window.msURL,
							p = new Blob([ c ], {
								type : "text/javascript"
							});
						if (t && t.bare) return p;
						var g = h.createObjectURL(p),
							m = new Worker(g);
						return m.objectURL = g, m
					}
				}, {} ],
				5 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					}), n.createDefaultConfig = function() {
						return Object.assign({}, r)
					};
					var r = n.defaultConfig = {
						enableWorker : !1,
						enableStashBuffer : !0,
						stashInitialSize : void 0,
						isLive : !1,
						lazyLoad : !0,
						lazyLoadMaxDuration : 180,
						lazyLoadRecoverDuration : 30,
						deferLoadAfterSourceOpen : !0,
						autoCleanupMaxBackwardDuration : 180,
						autoCleanupMinBackwardDuration : 120,
						statisticsInfoReportInterval : 600,
						fixAudioTimestampGap : !0,
						accurateSeek : !1,
						seekType : "range",
						seekParamStart : "bstart",
						seekParamEnd : "bend",
						rangeLoadZeroStart : !1,
						customSeekHandler : void 0,
						reuseRedirectedURL : !1
					}
				}, {} ],
				6 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r,
						i = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						a = e("../io/io-controller.js"),
						o = (r = a) && r.__esModule ? r : {
							default : r
						},
						s = e("../config.js");
					var u = function() {
						function n() {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, n)
						}
						return i(n, null, [ {
								key : "supportMSEH264Playback",
								value : function() {
									return window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
								}
							}, {
								key : "supportNetworkStreamIO",
								value : function() {
									var e = new o.default({}, (0, s.createDefaultConfig)()),
										t = e.loaderType;
									return e.destroy(), "fetch-stream-loader" == t || "xhr-moz-chunked-loader" == t
								}
							}, {
								key : "getNetworkLoaderTypeName",
								value : function() {
									var e = new o.default({}, (0, s.createDefaultConfig)()),
										t = e.loaderType;
									return e.destroy(), t
								}
							}, {
								key : "supportNativeMediaPlayback",
								value : function(e) {
									null == n.videoElement && (n.videoElement = window.document.createElement("video"));
									var t = n.videoElement.canPlayType(e);
									return "probably" === t || "maybe" == t
								}
							}, {
								key : "getFeatureList",
								value : function() {
									var e = {
										mseFlvPlayback : !1,
										mseLiveFlvPlayback : !1,
										networkStreamIO : !1,
										networkLoaderName : "",
										nativeMP4H264Playback : !1,
										nativeWebmVP8Playback : !1,
										nativeWebmVP9Playback : !1
									};
									return e.mseFlvPlayback = n.supportMSEH264Playback(), e.networkStreamIO = n.supportNetworkStreamIO(), e.networkLoaderName = n.getNetworkLoaderTypeName(), e.mseLiveFlvPlayback = e.mseFlvPlayback && e.networkStreamIO, e.nativeMP4H264Playback = n.supportNativeMediaPlayback('video/mp4; codecs="avc1.42001E, mp4a.40.2"'), e.nativeWebmVP8Playback = n.supportNativeMediaPlayback('video/webm; codecs="vp8.0, vorbis"'), e.nativeWebmVP9Playback = n.supportNativeMediaPlayback('video/webm; codecs="vp9"'), e
								}
							} ]), n
					}();
					n.default = u
				}, {
					"../config.js" : 5,
					"../io/io-controller.js" : 23
				} ],
				7 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
						function r(e, t) {
							for (var n = 0; n < t.length; n++) {
								var r = t[n];
								r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
							}
						}
						return function(e, t, n) {
							return t && r(e.prototype, t), n && r(e, n), e
						}
					}();
					var i = function() {
						function e() {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, e), this.mimeType = null, this.duration = null, this.hasAudio = null, this.hasVideo = null, this.audioCodec = null, this.videoCodec = null, this.audioDataRate = null, this.videoDataRate = null, this.audioSampleRate = null, this.audioChannelCount = null, this.width = null, this.height = null, this.fps = null, this.profile = null, this.level = null, this.chromaFormat = null, this.sarNum = null, this.sarDen = null, this.metadata = null, this.segments = null, this.segmentCount = null, this.hasKeyframesIndex = null, this.keyframesIndex = null
						}
						return r(e, [ {
								key : "isComplete",
								value : function() {
									var e = !1 === this.hasAudio || !0 === this.hasAudio && null != this.audioCodec && null != this.audioSampleRate && null != this.audioChannelCount,
										t = !1 === this.hasVideo || !0 === this.hasVideo && null != this.videoCodec && null != this.width && null != this.height && null != this.fps && null != this.profile && null != this.level && null != this.chromaFormat && null != this.sarNum && null != this.sarDen;
									return null != this.mimeType && null != this.duration && null != this.metadata && null != this.hasKeyframesIndex && e && t
								}
							}, {
								key : "isSeekable",
								value : function() {
									return !0 === this.hasKeyframesIndex
								}
							}, {
								key : "getNearestKeyframe",
								value : function(e) {
									if (null == this.keyframesIndex) return null;
									var t = this.keyframesIndex,
										n = this._search(t.times, e);
									return {
										index : n,
										milliseconds : t.times[n],
										fileposition : t.filepositions[n]
									}
								}
							}, {
								key : "_search",
								value : function(e, t) {
									var n = 0,
										r = e.length - 1,
										i = 0,
										a = 0,
										o = r;
									for (t < e[0] && (n = 0, a = o + 1); a <= o;) {
										if ((i = a + Math.floor((o - a) / 2)) === r || t >= e[i] && t < e[i + 1]) {
											n = i;break
										}
										e[i] < t ? a = i + 1 : o = i - 1
									}
									return n
								}
							} ]), e
					}();
					n.default = i
				}, {} ],
				8 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
						function r(e, t) {
							for (var n = 0; n < t.length; n++) {
								var r = t[n];
								r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
							}
						}
						return function(e, t, n) {
							return t && r(e.prototype, t), n && r(e, n), e
						}
					}();
					function o(e, t) {
						if (!(e instanceof t))
							throw new TypeError("Cannot call a class as a function")
					}
					n.SampleInfo = function e(t, n, r, i, a) {
						o(this, e), this.dts = t, this.pts = n, this.duration = r, this.originalDts = i, this.isSyncPoint = a, this.fileposition = null
					}, n.MediaSegmentInfo = function() {
						function e() {
							o(this, e), this.beginDts = 0, this.endDts = 0, this.beginPts = 0, this.endPts = 0, this.originalBeginDts = 0, this.originalEndDts = 0, this.syncPoints = [], this.firstSample = null, this.lastSample = null
						}
						return r(e, [ {
								key : "appendSyncPoint",
								value : function(e) {
									e.isSyncPoint = !0, this.syncPoints.push(e)
								}
							} ]), e
					}(), n.IDRSampleList = function() {
						function e() {
							o(this, e), this._list = []
						}
						return r(e, [ {
								key : "clear",
								value : function() {
									this._list = []
								}
							}, {
								key : "appendArray",
								value : function(e) {
									var t = this._list;
									0 !== e.length && (0 < t.length && e[0].originalDts < t[t.length - 1].originalDts && this.clear(), Array.prototype.push.apply(t, e))
								}
							}, {
								key : "getLastSyncPointBeforeDts",
								value : function(e) {
									if (0 == this._list.length) return null;
									var t = this._list,
										n = 0,
										r = t.length - 1,
										i = 0,
										a = 0,
										o = r;
									for (e < t[0].dts && (n = 0, a = o + 1); a <= o;) {
										if ((i = a + Math.floor((o - a) / 2)) === r || e >= t[i].dts && e < t[i + 1].dts) {
											n = i;break
										}
										t[i].dts < e ? a = i + 1 : o = i - 1
									}
									return this._list[n]
								}
							} ]), e
					}(), n.MediaSegmentInfoList = function() {
						function t(e) {
							o(this, t), this._type = e, this._list = [], this._lastAppendLocation = -1
						}
						return r(t, [ {
								key : "isEmpty",
								value : function() {
									return 0 === this._list.length
								}
							}, {
								key : "clear",
								value : function() {
									this._list = [], this._lastAppendLocation = -1
								}
							}, {
								key : "_searchNearestSegmentBefore",
								value : function(e) {
									var t = this._list;
									if (0 === t.length) return -2;
									var n = t.length - 1,
										r = 0,
										i = 0,
										a = n,
										o = 0;
									if (e < t[0].originalBeginDts) return o = -1;
									for (; i <= a;) {
										if ((r = i + Math.floor((a - i) / 2)) === n || e > t[r].lastSample.originalDts && e < t[r + 1].originalBeginDts) {
											o = r;break
										}
										t[r].originalBeginDts < e ? i = r + 1 : a = r - 1
									}
									return o
								}
							}, {
								key : "_searchNearestSegmentAfter",
								value : function(e) {
									return this._searchNearestSegmentBefore(e) + 1
								}
							}, {
								key : "append",
								value : function(e) {
									var t = this._list,
										n = e,
										r = this._lastAppendLocation,
										i = 0;
									-1 !== r && r < t.length && n.originalBeginDts >= t[r].lastSample.originalDts && (r === t.length - 1 || r < t.length - 1 && n.originalBeginDts < t[r + 1].originalBeginDts) ? i = r + 1 : 0 < t.length && (i = this._searchNearestSegmentBefore(n.originalBeginDts) + 1), this._lastAppendLocation = i, this._list.splice(i, 0, n)
								}
							}, {
								key : "getLastSegmentBefore",
								value : function(e) {
									var t = this._searchNearestSegmentBefore(e);
									return 0 <= t ? this._list[t] : null
								}
							}, {
								key : "getLastSampleBefore",
								value : function(e) {
									var t = this.getLastSegmentBefore(e);
									return null != t ? t.lastSample : null
								}
							}, {
								key : "getLastSyncPointBefore",
								value : function(e) {
									for (var t = this._searchNearestSegmentBefore(e), n = this._list[t].syncPoints; 0 === n.length && 0 < t;) t--, n = this._list[t].syncPoints;
									return 0 < n.length ? n[n.length - 1] : null
								}
							}, {
								key : "type",
								get : function() {
									return this._type
								}
							}, {
								key : "length",
								get : function() {
									return this._list.length
								}
							} ]), t
					}()
				}, {} ],
				9 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						i = d(e("events")),
						u = d(e("../utils/logger.js")),
						l = d(e("../utils/browser.js")),
						o = d(e("./mse-events.js")),
						a = e("./media-segment-info.js"),
						s = e("../utils/exception.js");
					function d(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					var f = function() {
						function t(e) {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, t), this.TAG = "MSEController", this._config = e, this._emitter = new i.default, this._config.isLive && null == this._config.autoCleanupSourceBuffer && (this._config.autoCleanupSourceBuffer = !0), this.e = {
								onSourceOpen : this._onSourceOpen.bind(this),
								onSourceEnded : this._onSourceEnded.bind(this),
								onSourceClose : this._onSourceClose.bind(this),
								onSourceBufferError : this._onSourceBufferError.bind(this),
								onSourceBufferUpdateEnd : this._onSourceBufferUpdateEnd.bind(this)
							}, this._mediaSource = null, this._mediaSourceObjectURL = null, this._mediaElement = null, this._isBufferFull = !1, this._hasPendingEos = !1, this._requireSetMediaDuration = !1, this._pendingMediaDuration = 0, this._pendingSourceBufferInit = [], this._mimeTypes = {
								video : null,
								audio : null
							}, this._sourceBuffers = {
								video : null,
								audio : null
							}, this._lastInitSegments = {
								video : null,
								audio : null
							}, this._pendingSegments = {
								video : [],
								audio : []
							}, this._pendingRemoveRanges = {
								video : [],
								audio : []
							}, this._idrList = new a.IDRSampleList
						}
						return r(t, [ {
								key : "destroy",
								value : function() {
									(this._mediaElement || this._mediaSource) && this.detachMediaElement(), this.e = null, this._emitter.removeAllListeners(), this._emitter = null
								}
							}, {
								key : "on",
								value : function(e, t) {
									this._emitter.addListener(e, t)
								}
							}, {
								key : "off",
								value : function(e, t) {
									this._emitter.removeListener(e, t)
								}
							}, {
								key : "attachMediaElement",
								value : function(e) {
									if (this._mediaSource)
										throw new s.IllegalStateException("MediaSource has been attached to an HTMLMediaElement!");
									var t = this._mediaSource = new window.MediaSource;
									t.addEventListener("sourceopen", this.e.onSourceOpen), t.addEventListener("sourceended", this.e.onSourceEnded), t.addEventListener("sourceclose", this.e.onSourceClose), this._mediaElement = e, this._mediaSourceObjectURL = window.URL.createObjectURL(this._mediaSource), e.src = this._mediaSourceObjectURL
								}
							}, {
								key : "detachMediaElement",
								value : function() {
									if (this._mediaSource) {
										var e = this._mediaSource;
										for (var t in this._sourceBuffers) {
											var n = this._pendingSegments[t];
											n.splice(0, n.length), this._pendingSegments[t] = null, this._pendingRemoveRanges[t] = null, this._lastInitSegments[t] = null;var r = this._sourceBuffers[t];
											r && ("closed" !== e.readyState && (e.removeSourceBuffer(r), r.removeEventListener("error", this.e.onSourceBufferError), r.removeEventListener("updateend", this.e.onSourceBufferUpdateEnd)), this._mimeTypes[t] = null, this._sourceBuffers[t] = null)
										}
										if ("open" === e.readyState) try {
												e.endOfStream()
											} catch (e) {
												u.default.e(this.TAG, e.message)
										} e.removeEventListener("sourceopen", this.e.onSourceOpen), e.removeEventListener("sourceended", this.e.onSourceEnded), e.removeEventListener("sourceclose", this.e.onSourceClose), this._pendingSourceBufferInit = [], this._isBufferFull = !1, this._idrList.clear(), this._mediaSource = null
									}
									this._mediaElement && (this._mediaElement.src = "", this._mediaElement.removeAttribute("src"), this._mediaElement = null), this._mediaSourceObjectURL && (window.URL.revokeObjectURL(this._mediaSourceObjectURL), this._mediaSourceObjectURL = null)
								}
							}, {
								key : "appendInitSegment",
								value : function(e, t) {
									if (!this._mediaSource || "open" !== this._mediaSource.readyState) return this._pendingSourceBufferInit.push(e), void this._pendingSegments[e.type].push(e);
									var n = e,
										r = "" + n.container;
									n.codec && 0 < n.codec.length && (r += ";codecs=" + n.codec);
									var i = !1;
									if (u.default.v(this.TAG, "Received Initialization Segment, mimeType: " + r), this._lastInitSegments[n.type] = n, r !== this._mimeTypes[n.type]) {
										if (this._mimeTypes[n.type]) u.default.v(this.TAG, "Notice: " + n.type + " mimeType changed, origin: " + this._mimeTypes[n.type] + ", target: " + r);else {
											i = !0;try {
												var a = this._sourceBuffers[n.type] = this._mediaSource.addSourceBuffer(r);
												a.addEventListener("error", this.e.onSourceBufferError), a.addEventListener("updateend", this.e.onSourceBufferUpdateEnd)
											} catch (e) {
												return u.default.e(this.TAG, e.message), void this._emitter.emit(o.default.ERROR, {
														code : e.code,
														msg : e.message
													})
											}
										}
										this._mimeTypes[n.type] = r
									}
									t || this._pendingSegments[n.type].push(n), i || this._sourceBuffers[n.type] && !this._sourceBuffers[n.type].updating && this._doAppendSegments(), l.default.safari && "audio/mpeg" === n.container && 0 < n.mediaDuration && (this._requireSetMediaDuration = !0, this._pendingMediaDuration = n.mediaDuration / 1e3, this._updateMediaSourceDuration())
								}
							}, {
								key : "appendMediaSegment",
								value : function(e) {
									var t = e;
									this._pendingSegments[t.type].push(t), this._config.autoCleanupSourceBuffer && this._needCleanupSourceBuffer() && this._doCleanupSourceBuffer();
									var n = this._sourceBuffers[t.type];
									!n || n.updating || this._hasPendingRemoveRanges() || this._doAppendSegments()
								}
							}, {
								key : "seek",
								value : function(e) {
									for (var t in this._sourceBuffers)
										if (this._sourceBuffers[t]) {
											var n = this._sourceBuffers[t];
											if ("open" === this._mediaSource.readyState) try {
													n.abort()
												} catch (e) {
													u.default.e(this.TAG, e.message)
											} this._idrList.clear();
											var r = this._pendingSegments[t];
											if (r.splice(0, r.length), "closed" !== this._mediaSource.readyState) {
												for (var i = 0; i < n.buffered.length; i++) {
													var a = n.buffered.start(i),
														o = n.buffered.end(i);
													this._pendingRemoveRanges[t].push({
														start : a,
														end : o
													})
												}
												if (n.updating || this._doRemoveRanges(), l.default.safari) {
													var s = this._lastInitSegments[t];
													s && (this._pendingSegments[t].push(s), n.updating || this._doAppendSegments())
												}
											}
									}
								}
							}, {
								key : "endOfStream",
								value : function() {
									var e = this._mediaSource,
										t = this._sourceBuffers;
									e && "open" === e.readyState ? t.video && t.video.updating || t.audio && t.audio.updating ? this._hasPendingEos = !0 : (this._hasPendingEos = !1, e.endOfStream()) : e && "closed" === e.readyState && this._hasPendingSegments() && (this._hasPendingEos = !0)
								}
							}, {
								key : "getNearestKeyframe",
								value : function(e) {
									return this._idrList.getLastSyncPointBeforeDts(e)
								}
							}, {
								key : "_needCleanupSourceBuffer",
								value : function() {
									if (!this._config.autoCleanupSourceBuffer) return !1;
									var e = this._mediaElement.currentTime;
									for (var t in this._sourceBuffers) {
										var n = this._sourceBuffers[t];
										if (n) {
											var r = n.buffered;
											if (1 <= r.length && e - r.start(0) >= this._config.autoCleanupMaxBackwardDuration) return !0
										}
									}
									return !1
								}
							}, {
								key : "_doCleanupSourceBuffer",
								value : function() {
									var e = this._mediaElement.currentTime;
									for (var t in this._sourceBuffers) {
										var n = this._sourceBuffers[t];
										if (n) {
											for (var r = n.buffered, i = !1, a = 0; a < r.length; a++) {
												var o = r.start(a),
													s = r.end(a);
												if (o <= e && e < s + 3) {
													if (e - o >= this._config.autoCleanupMaxBackwardDuration) {
														i = !0;
														var u = e - this._config.autoCleanupMinBackwardDuration;
														this._pendingRemoveRanges[t].push({
															start : o,
															end : u
														})
													}
												} else s < e && (i = !0, this._pendingRemoveRanges[t].push({
														start : o,
														end : s
													}))
											}
											i && !n.updating && this._doRemoveRanges()
										}
									}
								}
							}, {
								key : "_updateMediaSourceDuration",
								value : function() {
									var e = this._sourceBuffers;
									if (0 !== this._mediaElement.readyState && "open" === this._mediaSource.readyState && !(e.video && e.video.updating || e.audio && e.audio.updating)) {
										var t = this._mediaSource.duration,
											n = this._pendingMediaDuration;
										0 < n && (isNaN(t) || t < n) && (u.default.v(this.TAG, "Update MediaSource duration from " + t + " to " + n), this._mediaSource.duration = n), this._requireSetMediaDuration = !1, this._pendingMediaDuration = 0
									}
								}
							}, {
								key : "_doRemoveRanges",
								value : function() {
									for (var e in this._pendingRemoveRanges)
										if (this._sourceBuffers[e] && !this._sourceBuffers[e].updating)
											for (var t = this._sourceBuffers[e], n = this._pendingRemoveRanges[e]; n.length && !t.updating;) {
												var r = n.shift();
												t.remove(r.start, r.end)
									}
								}
							}, {
								key : "_doAppendSegments",
								value : function() {
									var e = this._pendingSegments;
									for (var t in e)
										if (this._sourceBuffers[t] && !this._sourceBuffers[t].updating && 0 < e[t].length) {
											var n = e[t].shift();
											if (n.timestampOffset) {
												var r = this._sourceBuffers[t].timestampOffset,
													i = n.timestampOffset / 1e3;
												.1 < Math.abs(r - i) && (u.default.v(this.TAG, "Update MPEG audio timestampOffset from " + r + " to " + i), this._sourceBuffers[t].timestampOffset = i),
												delete n.timestampOffset
											}
											if (!n.data || 0 === n.data.byteLength) continue;
											try {
												this._sourceBuffers[t].appendBuffer(n.data), this._isBufferFull = !1, "video" === t && n.hasOwnProperty("info") && this._idrList.appendArray(n.info.syncPoints)
											} catch (e) {
												this._pendingSegments[t].unshift(n), 22 === e.code ? (this._isBufferFull || this._emitter.emit(o.default.BUFFER_FULL), this._isBufferFull = !0) : (u.default.e(this.TAG, e.message), this._emitter.emit(o.default.ERROR, {
													code : e.code,
													msg : e.message
												}))
											}
									}
								}
							}, {
								key : "_onSourceOpen",
								value : function() {
									if (u.default.v(this.TAG, "MediaSource onSourceOpen"), this._mediaSource.removeEventListener("sourceopen", this.e.onSourceOpen), 0 < this._pendingSourceBufferInit.length)
										for (var e = this._pendingSourceBufferInit; e.length;) {
											var t = e.shift();
											this.appendInitSegment(t, !0)
									}
									this._hasPendingSegments() && this._doAppendSegments(), this._emitter.emit(o.default.SOURCE_OPEN)
								}
							}, {
								key : "_onSourceEnded",
								value : function() {
									u.default.v(this.TAG, "MediaSource onSourceEnded")
								}
							}, {
								key : "_onSourceClose",
								value : function() {
									u.default.v(this.TAG, "MediaSource onSourceClose"), this._mediaSource && null != this.e && (this._mediaSource.removeEventListener("sourceopen", this.e.onSourceOpen), this._mediaSource.removeEventListener("sourceended", this.e.onSourceEnded), this._mediaSource.removeEventListener("sourceclose", this.e.onSourceClose))
								}
							}, {
								key : "_hasPendingSegments",
								value : function() {
									var e = this._pendingSegments;
									return 0 < e.video.length || 0 < e.audio.length
								}
							}, {
								key : "_hasPendingRemoveRanges",
								value : function() {
									var e = this._pendingRemoveRanges;
									return 0 < e.video.length || 0 < e.audio.length
								}
							}, {
								key : "_onSourceBufferUpdateEnd",
								value : function() {
									this._requireSetMediaDuration ? this._updateMediaSourceDuration() : this._hasPendingRemoveRanges() ? this._doRemoveRanges() : this._hasPendingSegments() ? this._doAppendSegments() : this._hasPendingEos && this.endOfStream(), this._emitter.emit(o.default.UPDATE_END)
								}
							}, {
								key : "_onSourceBufferError",
								value : function(e) {
									u.default.e(this.TAG, "SourceBuffer Error: " + e)
								}
							} ]), t
					}();
					n.default = f
				}, {
					"../utils/browser.js" : 39,
					"../utils/exception.js" : 40,
					"../utils/logger.js" : 41,
					"./media-segment-info.js" : 8,
					"./mse-events.js" : 10,
					events : 2
				} ],
				10 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					n.default = {
						ERROR : "error",
						SOURCE_OPEN : "source_open",
						UPDATE_END : "update_end",
						BUFFER_FULL : "buffer_full"
					}
				}, {} ],
				11 : [ function(o, e, t) {
					"use strict";Object.defineProperty(t, "__esModule", {
						value : !0
					});
					var n = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						s = i(o("events")),
						u = i(o("../utils/logger.js")),
						l = i(o("../utils/logging-control.js")),
						d = i(o("./transmuxing-controller.js")),
						f = i(o("./transmuxing-events.js")),
						c = i(o("./transmuxing-worker.js")),
						r = i(o("./media-info.js")),
						h = o("../player/player-events.js");
					function i(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					var a = function() {
						function a(t, n) {
							var r = this;
							if (function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								}(this, a), this.TAG = "Transmuxer", this._emitter = new s.default, n.enableWorker && "undefined" != typeof Worker) try {
									var e = o("webworkify");
									this._worker = e(c.default), this._workerDestroying = !1, this._worker.addEventListener("message", this._onWorkerMessage.bind(this)), this._worker.postMessage({
										cmd : "init",
										param : [ t, n ]
									}), this.e = {
										onLoggingConfigChanged : this._onLoggingConfigChanged.bind(this)
									}, l.default.registerListener(this.e.onLoggingConfigChanged), this._worker.postMessage({
										cmd : "logging_config",
										param : l.default.getConfig()
									})
								} catch (e) {
									u.default.e(this.TAG, "Error while initialize transmuxing worker, fallback to inline transmuxing"), this._worker = null, this._controller = new d.default(t, n)
							} else
								this._controller = new d.default(t, n);
							if (this._controller) {
								var i = this._controller;
								i.on(f.default.IO_ERROR, this._onIOError.bind(this)), i.on(f.default.DEMUX_ERROR, this._onDemuxError.bind(this)), i.on(f.default.INIT_SEGMENT, this._onInitSegment.bind(this)), i.on(f.default.MEDIA_SEGMENT, this._onMediaSegment.bind(this)), i.on(f.default.LOADING_COMPLETE, this._onLoadingComplete.bind(this)), i.on(f.default.RECOVERED_EARLY_EOF, this._onRecoveredEarlyEof.bind(this)), i.on(f.default.MEDIA_INFO, this._onMediaInfo.bind(this)), i.on(f.default.STATISTICS_INFO, this._onStatisticsInfo.bind(this)), i.on(f.default.RECOMMEND_SEEKPOINT, this._onRecommendSeekpoint.bind(this)), i.on(h.OTHER_EVENTS_POLYMER, function(e) {
									return r._emitter.emit(h.OTHER_EVENTS_POLYMER, e)
								})
							}
						}
						return n(a, [ {
								key : "destroy",
								value : function() {
									this._worker ? this._workerDestroying || (this._workerDestroying = !0, this._worker.postMessage({
										cmd : "destroy"
									}), l.default.removeListener(this.e.onLoggingConfigChanged), this.e = null) : (this._controller.destroy(), this._controller = null), this._emitter.removeAllListeners(), this._emitter = null
								}
							}, {
								key : "on",
								value : function(e, t) {
									this._emitter.addListener(e, t)
								}
							}, {
								key : "off",
								value : function(e, t) {
									this._emitter.removeListener(e, t)
								}
							}, {
								key : "hasWorker",
								value : function() {
									return null != this._worker
								}
							}, {
								key : "open",
								value : function() {
									this._worker ? this._worker.postMessage({
										cmd : "start"
									}) : this._controller.start()
								}
							}, {
								key : "close",
								value : function() {
									this._worker ? this._worker.postMessage({
										cmd : "stop"
									}) : this._controller.stop()
								}
							}, {
								key : "seek",
								value : function(e) {
									this._worker ? this._worker.postMessage({
										cmd : "seek",
										param : e
									}) : this._controller.seek(e)
								}
							}, {
								key : "pause",
								value : function() {
									this._worker ? this._worker.postMessage({
										cmd : "pause"
									}) : this._controller.pause()
								}
							}, {
								key : "resume",
								value : function() {
									this._worker ? this._worker.postMessage({
										cmd : "resume"
									}) : this._controller.resume()
								}
							}, {
								key : "_onInitSegment",
								value : function(e, t) {
									var n = this;
									Promise.resolve().then(function() {
										n._emitter.emit(f.default.INIT_SEGMENT, e, t)
									})
								}
							}, {
								key : "_onMediaSegment",
								value : function(e, t) {
									var n = this;
									Promise.resolve().then(function() {
										n._emitter.emit(f.default.MEDIA_SEGMENT, e, t)
									})
								}
							}, {
								key : "_onLoadingComplete",
								value : function(e, t, n) {
									var r = this;
									Promise.resolve().then(function() {
										r._emitter.emit(f.default.LOADING_COMPLETE, e, t, n)
									})
								}
							}, {
								key : "_onRecoveredEarlyEof",
								value : function() {
									var e = this;
									Promise.resolve().then(function() {
										e._emitter.emit(f.default.RECOVERED_EARLY_EOF)
									})
								}
							}, {
								key : "_onMediaInfo",
								value : function(e) {
									var t = this;
									Promise.resolve().then(function() {
										t._emitter.emit(f.default.MEDIA_INFO, e)
									})
								}
							}, {
								key : "_onStatisticsInfo",
								value : function(e) {
									var t = this;
									Promise.resolve().then(function() {
										t._emitter.emit(f.default.STATISTICS_INFO, e)
									})
								}
							}, {
								key : "_onIOError",
								value : function(e, t) {
									var n = this;
									Promise.resolve().then(function() {
										n._emitter.emit(f.default.IO_ERROR, e, t)
									})
								}
							}, {
								key : "_onDemuxError",
								value : function(e, t) {
									var n = this;
									Promise.resolve().then(function() {
										n._emitter.emit(f.default.DEMUX_ERROR, e, t)
									})
								}
							}, {
								key : "_onRecommendSeekpoint",
								value : function(e) {
									var t = this;
									Promise.resolve().then(function() {
										t._emitter.emit(f.default.RECOMMEND_SEEKPOINT, e)
									})
								}
							}, {
								key : "_onLoggingConfigChanged",
								value : function(e) {
									this._worker && this._worker.postMessage({
										cmd : "logging_config",
										param : e
									})
								}
							}, {
								key : "_onWorkerMessage",
								value : function(e) {
									var t = e.data,
										n = t.data;
									if ("destroyed" === t.msg || this._workerDestroying) return this._workerDestroying = !1, this._worker.terminate(), void (this._worker = null);
									switch (t.msg) {
									case h.OTHER_EVENTS_POLYMER:
										this._emitter.emit(h.OTHER_EVENTS_POLYMER, n);
										break;case f.default.INIT_SEGMENT:
									case f.default.MEDIA_SEGMENT:
										this._emitter.emit(t.msg, n.type, n.data);
										break;case f.default.LOADING_COMPLETE:
										this._emitter.emit(t.msg, n.from, n.to, n.requestUrl);
										break;case f.default.RECOVERED_EARLY_EOF:
										this._emitter.emit(t.msg);
										break;case f.default.MEDIA_INFO:
										Object.setPrototypeOf(n, r.default.prototype), this._emitter.emit(t.msg, n);
										break;case f.default.STATISTICS_INFO:
										this._emitter.emit(t.msg, n);
										break;case f.default.IO_ERROR:
									case f.default.DEMUX_ERROR:
										this._emitter.emit(t.msg, n.type, n.info);
										break;case f.default.RECOMMEND_SEEKPOINT:
										this._emitter.emit(t.msg, n);
										break;case "logcat_callback":
										u.default.emitter.emit("log", n.type, n.logcat)
									}
								}
							} ]), a
					}();
					t.default = a
				}, {
					"../player/player-events.js" : 35,
					"../utils/logger.js" : 41,
					"../utils/logging-control.js" : 42,
					"./media-info.js" : 7,
					"./transmuxing-controller.js" : 12,
					"./transmuxing-events.js" : 13,
					"./transmuxing-worker.js" : 14,
					events : 2,
					webworkify : 4
				} ],
				12 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						i = p(e("events")),
						o = p(e("../utils/logger.js")),
						a = p(e("../utils/browser.js")),
						s = p(e("./media-info.js")),
						u = p(e("../demux/flv-demuxer.js")),
						l = p(e("../remux/mp4-remuxer.js")),
						d = p(e("../demux/demux-errors.js")),
						f = p(e("../io/io-controller.js")),
						c = p(e("./transmuxing-events.js")),
						h = (e("../io/loader.js"), e("../player/player-events.js"));
					function p(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					var g = function() {
						function e(t, n) {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, e), this.TAG = "TransmuxingController", this._emitter = new i.default, this._config = n, t.segments || (t.segments = [ {
								duration : t.duration,
								filesize : t.filesize,
								url : t.url
							} ]), "boolean" != typeof t.cors && (t.cors = !0), "boolean" != typeof t.withCredentials && (t.withCredentials = !1), this._mediaDataSource = t;var r = this._currentSegmentIndex = 0;
							this._mediaDataSource.segments.forEach(function(e) {
								e.timestampBase = r, r += e.duration, e.cors = t.cors, e.withCredentials = t.withCredentials, n.referrerPolicy && (e.referrerPolicy = n.referrerPolicy)
							}), isNaN(r) || this._mediaDataSource.duration === r || (this._mediaDataSource.duration = r), this._mediaInfo = null, this._demuxer = null, this._remuxer = null, this._ioctl = null, this._pendingSeekTime = null, this._pendingResolveSeekPoint = null, this._statisticsReporter = null
						}
						return r(e, [ {
								key : "destroy",
								value : function() {
									this._mediaInfo = null, this._mediaDataSource = null, this._statisticsReporter && this._disableStatisticsReporter(), this._ioctl && (this._ioctl.destroy(), this._ioctl = null), this._demuxer && (this._demuxer.destroy(), this._demuxer = null), this._remuxer && (this._remuxer.destroy(), this._remuxer = null), this._emitter.removeAllListeners(), this._emitter = null
								}
							}, {
								key : "on",
								value : function(e, t) {
									this._emitter.addListener(e, t)
								}
							}, {
								key : "off",
								value : function(e, t) {
									this._emitter.removeListener(e, t)
								}
							}, {
								key : "start",
								value : function() {
									this._loadSegment(0), this._enableStatisticsReporter()
								}
							}, {
								key : "_loadSegment",
								value : function(e, t) {
									var n = this;
									this._currentSegmentIndex = e;
									var r = this._mediaDataSource.segments[e],
										i = this._ioctl = new f.default(r, this._config, e);
									i.onError = this._onIOException.bind(this), i.onSeeked = this._onIOSeeked.bind(this), i.onComplete = this._onIOComplete.bind(this), i.onRedirect = this._onIORedirect.bind(this), i.onRecoveredEarlyEof = this._onIORecoveredEarlyEof.bind(this), i.on(h.OTHER_EVENTS_POLYMER, function(e) {
										return n._emitter.emit(h.OTHER_EVENTS_POLYMER, e)
									}), t ? this._demuxer.bindDataSource(this._ioctl) : i.onDataArrival = this._onInitChunkArrival.bind(this), i.open(t)
								}
							}, {
								key : "stop",
								value : function() {
									this._internalAbort(), this._disableStatisticsReporter()
								}
							}, {
								key : "_internalAbort",
								value : function() {
									this._ioctl && (this._ioctl.destroy(), this._ioctl = null)
								}
							}, {
								key : "pause",
								value : function() {
									this._ioctl && this._ioctl.isWorking() && (this._ioctl.pause(), this._disableStatisticsReporter())
								}
							}, {
								key : "resume",
								value : function() {
									this._ioctl && this._ioctl.isPaused() && (this._ioctl.resume(), this._enableStatisticsReporter())
								}
							}, {
								key : "seek",
								value : function(e) {
									if (null != this._mediaInfo && this._mediaInfo.isSeekable()) {
										var t = this._searchSegmentIndexContains(e);
										if (t === this._currentSegmentIndex) {
											var n = this._mediaInfo.segments[t];
											if (null == n)
												this._pendingSeekTime = e;else {
												var r = n.getNearestKeyframe(e);
												this._remuxer.seek(r.milliseconds), this._ioctl.seek(r.fileposition), this._pendingResolveSeekPoint = r.milliseconds
											}
										} else {
											var i = this._mediaInfo.segments[t];
											if (null == i) this._pendingSeekTime = e, this._internalAbort(), this._remuxer.seek(), this._remuxer.insertDiscontinuity(), this._loadSegment(t);else {
												var a = i.getNearestKeyframe(e);
												this._internalAbort(), this._remuxer.seek(e), this._remuxer.insertDiscontinuity(), this._demuxer.resetMediaInfo(), this._demuxer.timestampBase = this._mediaDataSource.segments[t].timestampBase, this._loadSegment(t, a.fileposition), this._pendingResolveSeekPoint = a.milliseconds, this._reportSegmentMediaInfo(t)
											}
										}
										this._enableStatisticsReporter()
									}
								}
							}, {
								key : "_searchSegmentIndexContains",
								value : function(e) {
									for (var t = this._mediaDataSource.segments, n = t.length - 1, r = 0; r < t.length; r++)
										if (e < t[r].timestampBase) {
											n = r - 1;break
									}
									return n
								}
							}, {
								key : "_onInitChunkArrival",
								value : function(e, t) {
									var n = this,
										r = null,
										i = 0;
									if (0 < t) this._demuxer.bindDataSource(this._ioctl), this._demuxer.timestampBase = this._mediaDataSource.segments[this._currentSegmentIndex].timestampBase, i = this._demuxer.parseChunks(e, t);
									else if ((r = u.default.probe(e)).match) {
										this._demuxer = new u.default(r, this._config), this._remuxer || (this._remuxer = new l.default(this._config));
										var a = this._mediaDataSource;
										null == a.duration || isNaN(a.duration) || (this._demuxer.overridedDuration = a.duration), "boolean" == typeof a.hasAudio && (this._demuxer.overridedHasAudio = a.hasAudio), "boolean" == typeof a.hasVideo && (this._demuxer.overridedHasVideo = a.hasVideo), this._demuxer.timestampBase = a.segments[this._currentSegmentIndex].timestampBase, this._demuxer.onError = this._onDemuxException.bind(this), this._demuxer.onMediaInfo = this._onMediaInfo.bind(this), this._demuxer.onFlvFrameDecoded = this._onFlvFrameDecoded.bind(this), this._remuxer.bindDataSource(this._demuxer.bindDataSource(this._ioctl)), this._remuxer.onInitSegment = this._onRemuxerInitSegmentArrival.bind(this), this._remuxer.onMediaSegment = this._onRemuxerMediaSegmentArrival.bind(this), i = this._demuxer.parseChunks(e, t)
									} else r = null, o.default.e(this.TAG, "Non-FLV, Unsupported media type!"), Promise.resolve().then(function() {
											n._internalAbort()
										}), this._emitter.emit(c.default.DEMUX_ERROR, d.default.FORMAT_UNSUPPORTED, "Non-FLV, Unsupported media type"), i = 0;
									return i
								}
							}, {
								key : "_onFlvFrameDecoded",
								value : function(e, t) {
									this._emitter.emit(h.OTHER_EVENTS_POLYMER, {
										eventName : e,
										eventParams : [ t ]
									})
								}
							}, {
								key : "_onMediaInfo",
								value : function(e) {
									var t = this;
									null == this._mediaInfo && (this._mediaInfo = Object.assign({}, e), this._mediaInfo.keyframesIndex = null, this._mediaInfo.segments = [], this._mediaInfo.segmentCount = this._mediaDataSource.segments.length, Object.setPrototypeOf(this._mediaInfo, s.default.prototype));
									var n = Object.assign({}, e);
									Object.setPrototypeOf(n, s.default.prototype), this._mediaInfo.segments[this._currentSegmentIndex] = n, this._reportSegmentMediaInfo(this._currentSegmentIndex), null != this._pendingSeekTime && Promise.resolve().then(function() {
										var e = t._pendingSeekTime;
										t._pendingSeekTime = null, t.seek(e)
									})
								}
							}, {
								key : "_onIOSeeked",
								value : function() {
									this._remuxer.insertDiscontinuity()
								}
							}, {
								key : "_onIOComplete",
								value : function(e, t, n, r) {
									var i = e + 1;
									i < this._mediaDataSource.segments.length ? (this._internalAbort(), this._loadSegment(i)) : (this._emitter.emit(c.default.LOADING_COMPLETE, t, n, r), this._disableStatisticsReporter())
								}
							}, {
								key : "_onIORedirect",
								value : function(e) {
									var t = this._ioctl.extraData;
									this._mediaDataSource.segments[t].redirectedURL = e
								}
							}, {
								key : "_onIORecoveredEarlyEof",
								value : function() {
									this._emitter.emit(c.default.RECOVERED_EARLY_EOF)
								}
							}, {
								key : "_onIOException",
								value : function(e, t) {
									o.default.e(this.TAG, "IOException: type = " + e + ", code = " + t.code + ", msg = " + t.msg), this._emitter.emit(c.default.IO_ERROR, e, t), this._disableStatisticsReporter()
								}
							}, {
								key : "_onDemuxException",
								value : function(e, t) {
									o.default.e(this.TAG, "DemuxException: type = " + e + ", info = " + t), this._emitter.emit(c.default.DEMUX_ERROR, e, t)
								}
							}, {
								key : "_onRemuxerInitSegmentArrival",
								value : function(e, t) {
									this._emitter.emit(c.default.INIT_SEGMENT, e, t)
								}
							}, {
								key : "_onRemuxerMediaSegmentArrival",
								value : function(e, t) {
									if (null == this._pendingSeekTime && (this._emitter.emit(c.default.MEDIA_SEGMENT, e, t), null != this._pendingResolveSeekPoint && "video" === e)) {
										var n = t.info.syncPoints,
											r = this._pendingResolveSeekPoint;
										this._pendingResolveSeekPoint = null, a.default.safari && 0 < n.length && n[0].originalDts === r && (r = n[0].pts), this._emitter.emit(c.default.RECOMMEND_SEEKPOINT, r)
									}
								}
							}, {
								key : "_enableStatisticsReporter",
								value : function() {
									null == this._statisticsReporter && (this._statisticsReporter = self.setInterval(this._reportStatisticsInfo.bind(this), this._config.statisticsInfoReportInterval))
								}
							}, {
								key : "_disableStatisticsReporter",
								value : function() {
									this._statisticsReporter && (self.clearInterval(this._statisticsReporter), this._statisticsReporter = null)
								}
							}, {
								key : "_reportSegmentMediaInfo",
								value : function(e) {
									var t = this._mediaInfo.segments[e],
										n = Object.assign({}, t);
									n.duration = this._mediaInfo.duration, n.segmentCount = this._mediaInfo.segmentCount,
									delete n.segments
									,
									delete n.keyframesIndex
									, this._emitter.emit(c.default.MEDIA_INFO, n)
								}
							}, {
								key : "_reportStatisticsInfo",
								value : function() {
									var e = {};
									e.url = this._ioctl.currentURL, e.hasRedirect = this._ioctl.hasRedirect, e.hasRedirect && (e.redirectedURL = this._ioctl.currentRedirectedURL), e.speed = this._ioctl.currentSpeed, e.loaderType = this._ioctl.loaderType, e.currentSegmentIndex = this._currentSegmentIndex, e.totalSegmentCount = this._mediaDataSource.segments.length, this._emitter.emit(c.default.STATISTICS_INFO, e)
								}
							} ]), e
					}();
					n.default = g
				}, {
					"../demux/demux-errors.js" : 16,
					"../demux/flv-demuxer.js" : 18,
					"../io/io-controller.js" : 23,
					"../io/loader.js" : 24,
					"../player/player-events.js" : 35,
					"../remux/mp4-remuxer.js" : 38,
					"../utils/browser.js" : 39,
					"../utils/logger.js" : 41,
					"./media-info.js" : 7,
					"./transmuxing-events.js" : 13,
					events : 2
				} ],
				13 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					n.default = {
						IO_ERROR : "io_error",
						DEMUX_ERROR : "demux_error",
						INIT_SEGMENT : "init_segment",
						MEDIA_SEGMENT : "media_segment",
						LOADING_COMPLETE : "loading_complete",
						RECOVERED_EARLY_EOF : "recovered_early_eof",
						MEDIA_INFO : "media_info",
						STATISTICS_INFO : "statistics_info",
						RECOMMEND_SEEKPOINT : "recommend_seekpoint"
					}
				}, {} ],
				14 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});r(e("../utils/logger.js"));
					var a = r(e("../utils/logging-control.js")),
						o = r(e("../utils/polyfill.js")),
						s = r(e("./transmuxing-controller.js")),
						u = r(e("./transmuxing-events.js")),
						l = e("../player/player-events.js");
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					n.default = function(i) {
						var n = null,
							r = function(e, t) {
								i.postMessage({
									msg : "logcat_callback",
									data : {
										type : e,
										logcat : t
									}
								})
							}.bind(this);
						o.default.install(), i.addEventListener("message", function(e) {
							switch (e.data.cmd) {
							case "init":
								(n = new s.default(e.data.param[0], e.data.param[1])).on(u.default.IO_ERROR, function(e, t) {
									i.postMessage({
										msg : u.default.IO_ERROR,
										data : {
											type : e,
											info : t
										}
									})
								}.bind(this)), n.on(u.default.DEMUX_ERROR, function(e, t) {
									i.postMessage({
										msg : u.default.DEMUX_ERROR,
										data : {
											type : e,
											info : t
										}
									})
								}.bind(this)), n.on(u.default.INIT_SEGMENT, function(e, t) {
									var n = {
										msg : u.default.INIT_SEGMENT,
										data : {
											type : e,
											data : t
										}
									};
									i.postMessage(n, [ t.data ])
								}.bind(this)), n.on(u.default.MEDIA_SEGMENT, function(e, t) {
									var n = {
										msg : u.default.MEDIA_SEGMENT,
										data : {
											type : e,
											data : t
										}
									};
									i.postMessage(n, [ t.data ])
								}.bind(this)), n.on(u.default.LOADING_COMPLETE, function(e, t, n) {
									var r = {
										msg : u.default.LOADING_COMPLETE,
										data : {
											requestUrl : n,
											from : e,
											to : t
										}
									};
									i.postMessage(r)
								}.bind(this)), n.on(u.default.RECOVERED_EARLY_EOF, function() {
									var e = {
										msg : u.default.RECOVERED_EARLY_EOF
									};
									i.postMessage(e)
								}.bind(this)), n.on(u.default.MEDIA_INFO, function(e) {
									var t = {
										msg : u.default.MEDIA_INFO,
										data : e
									};
									i.postMessage(t)
								}.bind(this)), n.on(u.default.STATISTICS_INFO, function(e) {
									var t = {
										msg : u.default.STATISTICS_INFO,
										data : e
									};
									i.postMessage(t)
								}.bind(this)), n.on(u.default.RECOMMEND_SEEKPOINT, function(e) {
									i.postMessage({
										msg : u.default.RECOMMEND_SEEKPOINT,
										data : e
									})
								}.bind(this)), n.on(l.OTHER_EVENTS_POLYMER, function(e) {
									i.postMessage({
										msg : l.OTHER_EVENTS_POLYMER,
										data : e
									})
								}.bind(this));
								break;case "destroy":
								n && (n.destroy(), n = null), i.postMessage({
									msg : "destroyed"
								});
								break;case "start":
								n.start();
								break;case "stop":
								n.stop();
								break;case "seek":
								n.seek(e.data.param);
								break;case "pause":
								n.pause();
								break;case "resume":
								n.resume();
								break;case "logging_config":
								var t = e.data.param;
								a.default.applyConfig(t), !0 === t.enableCallback ? a.default.addLogListener(r) : a.default.removeLogListener(r)
							}
						})
					}
				}, {
					"../player/player-events.js" : 35,
					"../utils/logger.js" : 41,
					"../utils/logging-control.js" : 42,
					"../utils/polyfill.js" : 43,
					"./transmuxing-controller.js" : 12,
					"./transmuxing-events.js" : 13
				} ],
				15 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						y = a(e("../utils/logger.js")),
						i = a(e("../utils/utf8-conv.js")),
						E = e("../utils/exception.js");
					function a(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					var o,
						A = (o = new ArrayBuffer(2), new DataView(o).setInt16(0, 256, !0), 256 === new Int16Array(o)[0]),
						s = function() {
							function v() {
								!function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								}(this, v)
							}
							return r(v, null, [ {
									key : "parseScriptData",
									value : function(e, t, n) {
										var r = {};
										try {
											var i = v.parseValue(e, t, n),
												a = v.parseValue(e, t + i.size, n - i.size);
											r[i.data] = a.data
										} catch (e) {
											y.default.e("AMF", e.toString())
										} return r
									}
								}, {
									key : "parseObject",
									value : function(e, t, n) {
										if (n < 3)
											throw new E.IllegalStateException("Data not enough when parse ScriptDataObject");
										var r = v.parseString(e, t, n),
											i = v.parseValue(e, t + r.size, n - r.size),
											a = i.objectEnd;
										return {
											data : {
												name : r.data,
												value : i.data
											},
											size : r.size + i.size,
											objectEnd : a
										}
									}
								}, {
									key : "parseVariable",
									value : function(e, t, n) {
										return v.parseObject(e, t, n)
									}
								}, {
									key : "parseString",
									value : function(e, t, n) {
										if (n < 2)
											throw new E.IllegalStateException("Data not enough when parse String");
										var r = new DataView(e, t, n).getUint16(0, !A);
										return {
											data : 0 < r ? (0, i.default)(new Uint8Array(e, t + 2, r)) : "",
											size : 2 + r
										}
									}
								}, {
									key : "parseLongString",
									value : function(e, t, n) {
										if (n < 4)
											throw new E.IllegalStateException("Data not enough when parse LongString");
										var r = new DataView(e, t, n).getUint32(0, !A);
										return {
											data : 0 < r ? (0, i.default)(new Uint8Array(e, t + 4, r)) : "",
											size : 4 + r
										}
									}
								}, {
									key : "parseDate",
									value : function(e, t, n) {
										if (n < 10)
											throw new E.IllegalStateException("Data size invalid when parse Date");
										var r = new DataView(e, t, n),
											i = r.getFloat64(0, !A),
											a = r.getInt16(8, !A);
										return {
											data : new Date(i += 60 * a * 1e3),
											size : 10
										}
									}
								}, {
									key : "parseValue",
									value : function(e, t, n) {
										if (n < 1)
											throw new E.IllegalStateException("Data not enough when parse Value");
										var r = new DataView(e, t, n),
											i = 1,
											a = r.getUint8(0),
											o = void 0,
											s = !1;
										try {
											switch (a) {
											case 0:
												o = r.getFloat64(1, !A), i += 8;
												break;case 1:
												o = !!r.getUint8(1), i += 1;
												break;case 2:
												var u = v.parseString(e, t + 1, n - 1);
												o = u.data, i += u.size;
												break;case 3:
												o = {};var l = 0;
												for (9 == (16777215 & r.getUint32(n - 4, !A)) && (l = 3); i < n - 4;) {
													var d = v.parseObject(e, t + i, n - i - l);
													if (d.objectEnd) break;
													o[d.data.name] = d.data.value, i += d.size
												}
												if (i <= n - 3) 9 === (16777215 & r.getUint32(i - 1, !A)) && (i += 3);
												break;case 8:
												o = {}, i += 4;var f = 0;
												for (9 == (16777215 & r.getUint32(n - 4, !A)) && (f = 3); i < n - 8;) {
													var c = v.parseVariable(e, t + i, n - i - f);
													if (c.objectEnd) break;
													o[c.data.name] = c.data.value, i += c.size
												}
												if (i <= n - 3) 9 === (16777215 & r.getUint32(i - 1, !A)) && (i += 3);
												break;case 9:
												i = 1, s = !(o = void 0);
												break;case 10:
												o = [];var h = r.getUint32(1, !A);
												i += 4;
												for (var p = 0; p < h; p++) {
													var g = v.parseValue(e, t + i, n - i);
													o.push(g.data), i += g.size
												}
												break;case 11:
												var m = v.parseDate(e, t + 1, n - 1);
												o = m.data, i += m.size;
												break;case 12:
												var _ = v.parseString(e, t + 1, n - 1);
												o = _.data, i += _.size;
												break;default:
												i = n, y.default.w("AMF", "Unsupported AMF value type " + a)
											}
										} catch (e) {
											y.default.e("AMF", e.toString())
										} return {
											data : o,
											size : i,
											objectEnd : s
										}
									}
								} ]), v
						}();
					n.default = s
				}, {
					"../utils/exception.js" : 40,
					"../utils/logger.js" : 41,
					"../utils/utf8-conv.js" : 44
				} ],
				16 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					n.default = {
						OK : "OK",
						FORMAT_ERROR : "FormatError",
						FORMAT_UNSUPPORTED : "FormatUnsupported",
						CODEC_UNSUPPORTED : "CodecUnsupported"
					}
				}, {} ],
				17 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						o = e("../utils/exception.js");
					var i = function() {
						function t(e) {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, t), this.TAG = "ExpGolomb", this._buffer = e, this._buffer_index = 0, this._total_bytes = e.byteLength, this._total_bits = 8 * e.byteLength, this._current_word = 0, this._current_word_bits_left = 0
						}
						return r(t, [ {
								key : "destroy",
								value : function() {
									this._buffer = null
								}
							}, {
								key : "_fillCurrentWord",
								value : function() {
									var e = this._total_bytes - this._buffer_index;
									if (e <= 0)
										throw new o.IllegalStateException("ExpGolomb: _fillCurrentWord() but no bytes available");
									var t = Math.min(4, e),
										n = new Uint8Array(4);
									n.set(this._buffer.subarray(this._buffer_index, this._buffer_index + t)), this._current_word = new DataView(n.buffer).getUint32(0, !1), this._buffer_index += t, this._current_word_bits_left = 8 * t
								}
							}, {
								key : "readBits",
								value : function(e) {
									if (32 < e)
										throw new o.InvalidArgumentException("ExpGolomb: readBits() bits exceeded max 32bits!");
									if (e <= this._current_word_bits_left) {
										var t = this._current_word >>> 32 - e;
										return this._current_word <<= e, this._current_word_bits_left -= e, t
									}
									var n = this._current_word_bits_left ? this._current_word : 0;
									n >>>= 32 - this._current_word_bits_left;
									var r = e - this._current_word_bits_left;
									this._fillCurrentWord();
									var i = Math.min(r, this._current_word_bits_left),
										a = this._current_word >>> 32 - i;
									return this._current_word <<= i, this._current_word_bits_left -= i, n = n << i | a
								}
							}, {
								key : "readBool",
								value : function() {
									return 1 === this.readBits(1)
								}
							}, {
								key : "readByte",
								value : function() {
									return this.readBits(8)
								}
							}, {
								key : "_skipLeadingZero",
								value : function() {
									var e = void 0;
									for (e = 0; e < this._current_word_bits_left; e++)
										if (0 != (this._current_word & 2147483648 >>> e)) return this._current_word <<= e, this._current_word_bits_left -= e, e;
									return this._fillCurrentWord(), e + this._skipLeadingZero()
								}
							}, {
								key : "readUEG",
								value : function() {
									var e = this._skipLeadingZero();
									return this.readBits(e + 1) - 1
								}
							}, {
								key : "readSEG",
								value : function() {
									var e = this.readUEG();
									return 1 & e ? e + 1 >>> 1 : -1 * (e >>> 1)
								}
							} ]), t
					}();
					n.default = i
				}, {
					"../utils/exception.js" : 40
				} ],
				18 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var l = "function" == typeof Symbol && "symbol" === q(Symbol.iterator) ? function(e) {
							return q(e)
						} : function(e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : q(e)
						},
						r = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						S = a(e("../utils/logger.js")),
						d = a(e("./amf-parser.js")),
						b = a(e("./sps-parser.js")),
						w = a(e("./demux-errors.js")),
						i = a(e("../core/media-info.js")),
						h = e("../utils/exception.js"),
						A = a(e("../player/player-events.js"));
					function a(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					var o = function() {
						function c(e, t) {
							var n;
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, c), this.TAG = "FLVDemuxer", this._config = t, this._onError = null, this._onMediaInfo = null, this._onTrackMetadata = null, this._onDataAvailable = null, this._onFlvFrameDecoded = null, this._dataOffset = e.dataOffset, this._firstParse = !0, this._dispatch = !1, this._hasAudio = e.hasAudioTrack, this._hasVideo = e.hasVideoTrack, this._hasAudioFlagOverrided = !1, this._hasVideoFlagOverrided = !1, this._audioInitialMetadataDispatched = !1, this._videoInitialMetadataDispatched = !1, this._mediaInfo = new i.default, this._mediaInfo.hasAudio = this._hasAudio, this._mediaInfo.hasVideo = this._hasVideo, this._metadata = null, this._audioMetadata = null, this._videoMetadata = null, this._naluLengthSize = 4, this._timestampBase = 0, this._timescale = 1e3, this._duration = 0, this._durationOverrided = !1, this._referenceFrameRate = {
								fixed : !0,
								fps : 23.976,
								fps_num : 23976,
								fps_den : 1e3
							}, this._flvSoundRateTable = [ 5500, 11025, 22050, 44100, 48e3 ], this._mpegSamplingRates = [ 96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350 ], this._mpegAudioV10SampleRateTable = [ 44100, 48e3, 32e3, 0 ], this._mpegAudioV20SampleRateTable = [ 22050, 24e3, 16e3, 0 ], this._mpegAudioV25SampleRateTable = [ 11025, 12e3, 8e3, 0 ], this._mpegAudioL1BitRateTable = [ 0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, -1 ], this._mpegAudioL2BitRateTable = [ 0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, -1 ], this._mpegAudioL3BitRateTable = [ 0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1 ], this._videoTrack = {
								type : "video",
								id : 1,
								sequenceNumber : 0,
								samples : [],
								length : 0
							}, this._audioTrack = {
								type : "audio",
								id : 2,
								sequenceNumber : 0,
								samples : [],
								length : 0
							}, this._littleEndian = (n = new ArrayBuffer(2), new DataView(n).setInt16(0, 256, !0), 256 === new Int16Array(n)[0])
						}
						return r(c, [ {
								key : "destroy",
								value : function() {
									this._mediaInfo = null, this._metadata = null, this._audioMetadata = null, this._videoMetadata = null, this._videoTrack = null, this._audioTrack = null, this._onError = null, this._onMediaInfo = null, this._onTrackMetadata = null, this._onDataAvailable = null, this._onFlvFrameDecoded = null
								}
							}, {
								key : "bindDataSource",
								value : function(e) {
									return e.onDataArrival = this.parseChunks.bind(this), this
								}
							}, {
								key : "resetMediaInfo",
								value : function() {
									this._mediaInfo = new i.default
								}
							}, {
								key : "_isInitialMetadataDispatched",
								value : function() {
									return this._hasAudio && this._hasVideo ? this._audioInitialMetadataDispatched && this._videoInitialMetadataDispatched : this._hasAudio && !this._hasVideo ? this._audioInitialMetadataDispatched : !(this._hasAudio || !this._hasVideo) && this._videoInitialMetadataDispatched
								}
							}, {
								key : "parseChunks",
								value : function(e, t) {
									if (!(this._onError && this._onMediaInfo && this._onTrackMetadata && this._onDataAvailable))
										throw new h.IllegalStateException("Flv: onError & onMediaInfo & onTrackMetadata & onDataAvailable callback must be specified");
									var n = 0,
										r = this._littleEndian;
									if (0 === t) {
										if (!(13 < e.byteLength)) return 0;
										n = c.probe(e).dataOffset
									}
									this._firstParse && (this._firstParse = !1, t + n !== this._dataOffset && S.default.w(this.TAG, "First time parsing but chunk byteStart invalid!"), 0 !== new DataView(e, n).getUint32(0, !r) && S.default.w(this.TAG, "PrevTagSize0 !== 0 !!!"), n += 4);
									for (; n < e.byteLength;) {
										this._dispatch = !0;var i = new DataView(e, n);
										if (n + 11 + 4 > e.byteLength) break;
										var a = i.getUint8(0),
											o = 16777215 & i.getUint32(0, !r);
										if (n + 11 + o + 4 > e.byteLength) break;
										if (8 === a || 9 === a || 18 === a) {
											var s = i.getUint8(4),
												u = i.getUint8(5),
												l = i.getUint8(6) | u << 8 | s << 16 | i.getUint8(7) << 24;
											0 !== (16777215 & i.getUint32(7, !r)) && S.default.w(this.TAG, "Meet tag which has StreamID != 0!");
											var d = n + 11;
											switch (a) {
											case 8:
												this._parseAudioData(e, d, o, l);
												break;case 9:
												this._parseVideoData(e, d, o, l, t + n);
												break;case 18:
												this._parseScriptData(e, d, o)
											}
											var f = i.getUint32(11 + o, !r);
											f !== 11 + o && S.default.w(this.TAG, "Invalid PrevTagSize " + f), n += 11 + o + 4
										} else S.default.w(this.TAG, "Unsupported tag type " + a + ", skipped"), n += 11 + o + 4
									}
									return this._isInitialMetadataDispatched() && this._dispatch && (this._audioTrack.length || this._videoTrack.length) && this._onDataAvailable(this._audioTrack, this._videoTrack), n
								}
							}, {
								key : "_parseScriptData",
								value : function(e, t, n) {
									var r = d.default.parseScriptData(e, t, n);
									if (r.hasOwnProperty("onMetaData")) {
										if (null == r.onMetaData || "object" !== l(r.onMetaData)) return void S.default.w(this.TAG, "Invalid onMetaData structure!");
										this._metadata && S.default.w(this.TAG, "Found another onMetaData tag!"), this._metadata = r;
										var i = this._metadata.onMetaData;
										if ("boolean" == typeof i.hasAudio && !1 === this._hasAudioFlagOverrided && (this._hasAudio = i.hasAudio, this._mediaInfo.hasAudio = this._hasAudio), "boolean" == typeof i.hasVideo && !1 === this._hasVideoFlagOverrided && (this._hasVideo = i.hasVideo, this._mediaInfo.hasVideo = this._hasVideo), "number" == typeof i.audiodatarate && (this._mediaInfo.audioDataRate = i.audiodatarate), "number" == typeof i.videodatarate && (this._mediaInfo.videoDataRate = i.videodatarate), "number" == typeof i.width && (this._mediaInfo.width = i.width), "number" == typeof i.height && (this._mediaInfo.height = i.height), "number" == typeof i.duration) {
											if (!this._durationOverrided) {
												var a = Math.floor(i.duration * this._timescale);
												this._duration = a, this._mediaInfo.duration = a
											}
										} else
											this._mediaInfo.duration = 0;
										if ("number" == typeof i.framerate) {
											var o = Math.floor(1e3 * i.framerate);
											if (0 < o) {
												var s = o / 1e3;
												this._referenceFrameRate.fixed = !0, this._referenceFrameRate.fps = s, this._referenceFrameRate.fps_num = o, this._referenceFrameRate.fps_den = 1e3, this._mediaInfo.fps = s
											}
										}
										if ("object" === l(i.keyframes)) {
											this._mediaInfo.hasKeyframesIndex = !0;
											var u = i.keyframes;
											this._mediaInfo.keyframesIndex = this._parseKeyframesIndex(u), i.keyframes = null
										} else
											this._mediaInfo.hasKeyframesIndex = !1;
										this._dispatch = !1, this._mediaInfo.metadata = i, S.default.v(this.TAG, "Parsed onMetaData"), this._mediaInfo.isComplete() && this._onMediaInfo(this._mediaInfo)
									}
								}
							}, {
								key : "_parseKeyframesIndex",
								value : function(e) {
									for (var t = [], n = [], r = 1; r < e.times.length; r++) {
										var i = this._timestampBase + Math.floor(1e3 * e.times[r]);
										t.push(i), n.push(e.filepositions[r])
									}
									return {
										times : t,
										filepositions : n
									}
								}
							}, {
								key : "_parseAudioData",
								value : function(e, t, n, r) {
									if (n <= 1) S.default.w(this.TAG, "Flv: Invalid audio packet, missing SoundData payload!");
									else if (!0 !== this._hasAudioFlagOverrided || !1 !== this._hasAudio) {
										this._littleEndian;
										var i = new DataView(e, t, n).getUint8(0),
											a = i >>> 4;
										if (2 === a || 10 === a) {
											var o = 0,
												s = (12 & i) >>> 2;
											if (0 <= s && s <= 4) {
												o = this._flvSoundRateTable[s];
												var u = 1 & i,
													l = this._audioMetadata,
													d = this._audioTrack;
												if (l || (!1 === this._hasAudio && !1 === this._hasAudioFlagOverrided && (this._hasAudio = !0, this._mediaInfo.hasAudio = !0), (l = this._audioMetadata = {}).type = "audio", l.id = d.id, l.timescale = this._timescale, l.duration = this._duration, l.audioSampleRate = o, l.channelCount = 0 === u ? 1 : 2), 10 === a) {
													var f = this._parseAACAudioData(e, t + 1, n - 1);
													if (null == f) return;
													if (0 === f.packetType) {
														l.config && S.default.w(this.TAG, "Found another AudioSpecificConfig!");
														var c = f.data;
														l.audioSampleRate = c.samplingRate, l.channelCount = c.channelCount, l.codec = c.codec, l.originalCodec = c.originalCodec, l.config = c.config, l.refSampleDuration = 1024 / l.audioSampleRate * l.timescale, S.default.v(this.TAG, "Parsed AudioSpecificConfig"), this._isInitialMetadataDispatched() ? this._dispatch && (this._audioTrack.length || this._videoTrack.length) && this._onDataAvailable(this._audioTrack, this._videoTrack) : this._audioInitialMetadataDispatched = !0, this._dispatch = !1, this._onTrackMetadata("audio", l);
														var h = this._mediaInfo;
														h.audioCodec = l.originalCodec, h.audioSampleRate = l.audioSampleRate, h.audioChannelCount = l.channelCount, h.hasVideo ? null != h.videoCodec && (h.mimeType = 'video/x-flv; codecs="' + h.videoCodec + "," + h.audioCodec + '"') : h.mimeType = 'video/x-flv; codecs="' + h.audioCodec + '"', h.isComplete() && this._onMediaInfo(h)
													} else if (1 === f.packetType) {
														var p = this._timestampBase + r,
															g = {
																unit : f.data,
																dts : p,
																pts : p
															};
														d.samples.push(g), d.length += f.data.length
													} else S.default.e(this.TAG, "Flv: Unsupported AAC data type " + f.packetType)
												} else if (2 === a) {
													if (!l.codec) {
														var m = this._parseMP3AudioData(e, t + 1, n - 1, !0);
														if (null == m) return;
														l.audioSampleRate = m.samplingRate, l.channelCount = m.channelCount, l.codec = m.codec, l.originalCodec = m.originalCodec, l.refSampleDuration = 1152 / l.audioSampleRate * l.timescale, S.default.v(this.TAG, "Parsed MPEG Audio Frame Header"), this._audioInitialMetadataDispatched = !0, this._onTrackMetadata("audio", l);
														var _ = this._mediaInfo;
														_.audioCodec = l.codec, _.audioSampleRate = l.audioSampleRate, _.audioChannelCount = l.channelCount, _.audioDataRate = m.bitRate, _.hasVideo ? null != _.videoCodec && (_.mimeType = 'video/x-flv; codecs="' + _.videoCodec + "," + _.audioCodec + '"') : _.mimeType = 'video/x-flv; codecs="' + _.audioCodec + '"', _.isComplete() && this._onMediaInfo(_)
													}
													var v = this._parseMP3AudioData(e, t + 1, n - 1, !1);
													if (null == v) return;
													var y = this._timestampBase + r,
														E = {
															unit : v,
															dts : y,
															pts : y
														};
													d.samples.push(E), d.length += v.length
												}
												this._onFlvFrameDecoded && this._onFlvFrameDecoded(A.default.AUDIO_FRAME_DECODED, Date.now())
											} else this._onError(w.default.FORMAT_ERROR, "Flv: Invalid audio sample rate idx: " + s)
										} else this._onError(w.default.CODEC_UNSUPPORTED, "Flv: Unsupported audio codec idx: " + a)
									}
								}
							}, {
								key : "_parseAACAudioData",
								value : function(e, t, n) {
									if (!(n <= 1)) {
										var r = {},
											i = new Uint8Array(e, t, n);
										return r.packetType = i[0], 0 === i[0] ? r.data = this._parseAACAudioSpecificConfig(e, t + 1, n - 1) : r.data = i.subarray(1), r
									}
									S.default.w(this.TAG, "Flv: Invalid AAC packet, missing AACPacketType or/and Data!")
								}
							}, {
								key : "_parseAACAudioSpecificConfig",
								value : function(e, t, n) {
									var r,
										i,
										a = new Uint8Array(e, t, n),
										o = null,
										s = 0,
										u = null;
									if (s = r = a[0] >>> 3, (i = (7 & a[0]) << 1 | a[1] >>> 7) < 0 || i >= this._mpegSamplingRates.length) this._onError(w.default.FORMAT_ERROR, "Flv: AAC invalid sampling frequency index!");else {
										var l = this._mpegSamplingRates[i],
											d = (120 & a[1]) >>> 3;
										if (!(d < 0 || 8 <= d)) {
											5 === s && (u = (7 & a[1]) << 1 | a[2] >>> 7, (124 & a[2]) >>> 2);
											var f = self.navigator.userAgent.toLowerCase();
											return -1 !== f.indexOf("firefox") ? u = 6 <= i ? (s = 5, o = new Array(4), i - 3) : (s = 2, o = new Array(2), i) : -1 !== f.indexOf("android") ? (s = 2, o = new Array(2), u = i) : (s = 5, u = i, o = new Array(4), 6 <= i ? u = i - 3 : 1 === d && (s = 2, o = new Array(2), u = i)), o[0] = s << 3, o[0] |= (15 & i) >>> 1, o[1] = (15 & i) << 7, o[1] |= (15 & d) << 3, 5 === s && (o[1] |= (15 & u) >>> 1, o[2] = (1 & u) << 7, o[2] |= 8, o[3] = 0), {
													config : o,
													samplingRate : l,
													channelCount : d,
													codec : "mp4a.40." + s,
													originalCodec : "mp4a.40." + r
											}
										}
										this._onError(w.default.FORMAT_ERROR, "Flv: AAC invalid channel configuration")
									}
								}
							}, {
								key : "_parseMP3AudioData",
								value : function(e, t, n, r) {
									if (!(n < 4)) {
										this._littleEndian;
										var i = new Uint8Array(e, t, n),
											a = null;
										if (r) {
											if (255 !== i[0]) return;
											var o = i[1] >>> 3 & 3,
												s = (6 & i[1]) >> 1,
												u = (240 & i[2]) >>> 4,
												l = (12 & i[2]) >>> 2,
												d = 3 !== (i[3] >>> 6 & 3) ? 2 : 1,
												f = 0,
												c = 0;
											switch (o) {
											case 0:
												f = this._mpegAudioV25SampleRateTable[l];
												break;case 2:
												f = this._mpegAudioV20SampleRateTable[l];
												break;case 3:
												f = this._mpegAudioV10SampleRateTable[l]
											}
											switch (s) {
											case 1:
												34, u < this._mpegAudioL3BitRateTable.length && (c = this._mpegAudioL3BitRateTable[u]);
												break;case 2:
												33, u < this._mpegAudioL2BitRateTable.length && (c = this._mpegAudioL2BitRateTable[u]);
												break;case 3:
												32, u < this._mpegAudioL1BitRateTable.length && (c = this._mpegAudioL1BitRateTable[u])
											}
											a = {
												bitRate : c,
												samplingRate : f,
												channelCount : d,
												codec : "mp3",
												originalCodec : "mp3"
											}
										} else
											a = i;
										return a
									}
									S.default.w(this.TAG, "Flv: Invalid MP3 packet, header missing!")
								}
							}, {
								key : "_parseVideoData",
								value : function(e, t, n, r, i) {
									if (n <= 1) S.default.w(this.TAG, "Flv: Invalid video packet, missing VideoData payload!");
									else if (!0 !== this._hasVideoFlagOverrided || !1 !== this._hasVideo) {
										var a = new Uint8Array(e, t, n)[0],
											o = (240 & a) >>> 4,
											s = 15 & a;
										7 === s ? (this._parseAVCVideoPacket(e, t + 1, n - 1, r, i, o), this._onFlvFrameDecoded && this._onFlvFrameDecoded(A.default.VIDEO_FRAME_DECODED, Date.now())) : this._onError(w.default.CODEC_UNSUPPORTED, "Flv: Unsupported codec in video frame: " + s)
									}
								}
							}, {
								key : "_parseAVCVideoPacket",
								value : function(e, t, n, r, i, a) {
									if (n < 4) S.default.w(this.TAG, "Flv: Invalid AVC packet, missing AVCPacketType or/and CompositionTime");else {
										var o = this._littleEndian,
											s = new DataView(e, t, n),
											u = s.getUint8(0),
											l = 16777215 & s.getUint32(0, !o);
										if (0 === u) this._parseAVCDecoderConfigurationRecord(e, t + 4, n - 4);
										else if (1 === u) this._parseAVCVideoData(e, t + 4, n - 4, r, i, a, l);
										else if (2 !== u) return void this._onError(w.default.FORMAT_ERROR, "Flv: Invalid video packet type " + u)
									}
								}
							}, {
								key : "_parseAVCDecoderConfigurationRecord",
								value : function(e, t, n) {
									if (n < 7) S.default.w(this.TAG, "Flv: Invalid AVCDecoderConfigurationRecord, lack of data!");else {
										var r = this._videoMetadata,
											i = this._videoTrack,
											a = this._littleEndian,
											o = new DataView(e, t, n);
										r ? void 0 !== r.avcc && S.default.w(this.TAG, "Found another AVCDecoderConfigurationRecord!") : (!1 === this._hasVideo && !1 === this._hasVideoFlagOverrided && (this._hasVideo = !0, this._mediaInfo.hasVideo = !0), (r = this._videoMetadata = {}).type = "video", r.id = i.id, r.timescale = this._timescale, r.duration = this._duration);
										var s = o.getUint8(0),
											u = o.getUint8(1);
										o.getUint8(2), o.getUint8(3);
										if (1 === s && 0 !== u)
											if (this._naluLengthSize = 1 + (3 & o.getUint8(4)), 3 === this._naluLengthSize || 4 === this._naluLengthSize) {
												var l = 31 & o.getUint8(5);
												if (0 !== l) {
													1 < l && S.default.w(this.TAG, "Flv: Strange AVCDecoderConfigurationRecord: SPS Count = " + l);
													for (var d = 6, f = 0; f < l; f++) {
														var c = o.getUint16(d, !a);
														if (d += 2, 0 !== c) {
															var h = new Uint8Array(e, t + d, c);
															d += c;
															var p = b.default.parseSPS(h);
															if (0 === f) {
																r.codecWidth = p.codec_size.width, r.codecHeight = p.codec_size.height, r.presentWidth = p.present_size.width, r.presentHeight = p.present_size.height, r.profile = p.profile_string, r.level = p.level_string, r.bitDepth = p.bit_depth, r.chromaFormat = p.chroma_format, r.sarRatio = p.sar_ratio, r.frameRate = p.frame_rate, !1 !== p.frame_rate.fixed && 0 !== p.frame_rate.fps_num && 0 !== p.frame_rate.fps_den || (r.frameRate = this._referenceFrameRate);
																var g = r.frameRate.fps_den,
																	m = r.frameRate.fps_num;
																r.refSampleDuration = r.timescale * (g / m);
																for (var _ = h.subarray(1, 4), v = "avc1.", y = 0; y < 3; y++) {
																	var E = _[y].toString(16);
																	E.length < 2 && (E = "0" + E), v += E
																}
																r.codec = v;
																var A = this._mediaInfo;
																A.width = r.codecWidth, A.height = r.codecHeight, A.fps = r.frameRate.fps, A.profile = r.profile, A.level = r.level, A.chromaFormat = p.chroma_format_string, A.sarNum = r.sarRatio.width, A.sarDen = r.sarRatio.height, A.videoCodec = v, A.hasAudio ? null != A.audioCodec && (A.mimeType = 'video/x-flv; codecs="' + A.videoCodec + "," + A.audioCodec + '"') : A.mimeType = 'video/x-flv; codecs="' + A.videoCodec + '"', A.isComplete() && this._onMediaInfo(A)
															}
														}
													}
													var T = o.getUint8(d);
													if (0 !== T) {
														1 < T && S.default.w(this.TAG, "Flv: Strange AVCDecoderConfigurationRecord: PPS Count = " + T), d++;
														for (var R = 0; R < T; R++) {
															var I = o.getUint16(d, !a);
															d += 2, 0 !== I && (d += I)
														}
														r.avcc = new Uint8Array(n), r.avcc.set(new Uint8Array(e, t, n), 0), S.default.v(this.TAG, "Parsed AVCDecoderConfigurationRecord"), this._isInitialMetadataDispatched() ? this._dispatch && (this._audioTrack.length || this._videoTrack.length) && this._onDataAvailable(this._audioTrack, this._videoTrack) : this._videoInitialMetadataDispatched = !0, this._dispatch = !1, this._onTrackMetadata("video", r)
													} else this._onError(w.default.FORMAT_ERROR, "Flv: Invalid AVCDecoderConfigurationRecord: No PPS")
												} else this._onError(w.default.FORMAT_ERROR, "Flv: Invalid AVCDecoderConfigurationRecord: No SPS")
											} else this._onError(w.default.FORMAT_ERROR, "Flv: Strange NaluLengthSizeMinusOne: " + (this._naluLengthSize - 1));
										else this._onError(w.default.FORMAT_ERROR, "Flv: Invalid AVCDecoderConfigurationRecord")
									}
								}
							}, {
								key : "_parseAVCVideoData",
								value : function(e, t, n, r, i, a, o) {
									for (var s = this._littleEndian, u = new DataView(e, t, n), l = [], d = 0, f = 0, c = this._naluLengthSize, h = this._timestampBase + r, p = 1 === a; f < n;) {
										if (n <= f + 4) {
											S.default.w(this.TAG, "Malformed Nalu near timestamp " + h + ", offset = " + f + ", dataSize = " + n);break
										}
										var g = u.getUint32(f, !s);
										if (3 === c && (g >>>= 8), n - c < g) return void S.default.w(this.TAG, "Malformed Nalus near timestamp " + h + ", NaluSize > DataSize!");
										var m = 31 & u.getUint8(f + c);
										5 === m && (p = !0);var _ = new Uint8Array(e, t + f, c + g),
											v = {
												type : m,
												data : _
											};
										l.push(v), d += _.byteLength, f += c + g
									}
									if (l.length) {
										var y = this._videoTrack,
											E = {
												units : l,
												length : d,
												isKeyframe : p,
												dts : h,
												cts : o,
												pts : h + o
											};
										p && (E.fileposition = i), y.samples.push(E), y.length += d
									}
								}
							}, {
								key : "onTrackMetadata",
								get : function() {
									return this._onTrackMetadata
								},
								set : function(e) {
									this._onTrackMetadata = e
								}
							}, {
								key : "onMediaInfo",
								get : function() {
									return this._onMediaInfo
								},
								set : function(e) {
									this._onMediaInfo = e
								}
							}, {
								key : "onError",
								get : function() {
									return this._onError
								},
								set : function(e) {
									this._onError = e
								}
							}, {
								key : "onDataAvailable",
								get : function() {
									return this._onDataAvailable
								},
								set : function(e) {
									this._onDataAvailable = e
								}
							}, {
								key : "onFlvFrameDecoded",
								get : function() {
									return this._onFlvFrameDecoded
								},
								set : function(e) {
									this._onFlvFrameDecoded = e
								}
							}, {
								key : "timestampBase",
								get : function() {
									return this._timestampBase
								},
								set : function(e) {
									this._timestampBase = e
								}
							}, {
								key : "overridedDuration",
								get : function() {
									return this._duration
								},
								set : function(e) {
									this._durationOverrided = !0, this._duration = e, this._mediaInfo.duration = e
								}
							}, {
								key : "overridedHasAudio",
								set : function(e) {
									this._hasAudioFlagOverrided = !0, this._hasAudio = e, this._mediaInfo.hasAudio = e
								}
							}, {
								key : "overridedHasVideo",
								set : function(e) {
									this._hasVideoFlagOverrided = !0, this._hasVideo = e, this._mediaInfo.hasVideo = e
								}
							} ], [ {
								key : "probe",
								value : function(e) {
									var t = new Uint8Array(e),
										n = {
											match : !1
										};
									if (70 !== t[0] || 76 !== t[1] || 86 !== t[2] || 1 !== t[3]) return n;
									var r,
										i,
										a = (4 & t[4]) >>> 2 != 0,
										o = 0 != (1 & t[4]),
										s = (r = t)[i = 5] << 24 | r[i + 1] << 16 | r[i + 2] << 8 | r[i + 3];
									return s < 9 ? n : {
										match : !0,
										consumed : s,
										dataOffset : s,
										hasAudioTrack : a,
										hasVideoTrack : o
									}
								}
							} ]), c
					}();
					n.default = o
				}, {
					"../core/media-info.js" : 7,
					"../player/player-events.js" : 35,
					"../utils/exception.js" : 40,
					"../utils/logger.js" : 41,
					"./amf-parser.js" : 15,
					"./demux-errors.js" : 16,
					"./sps-parser.js" : 19
				} ],
				19 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r,
						i = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						a = e("./exp-golomb.js"),
						k = (r = a) && r.__esModule ? r : {
							default : r
						};
					var o = function() {
						function x() {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, x)
						}
						return i(x, null, [ {
								key : "_ebsp2rbsp",
								value : function(e) {
									for (var t = e, n = t.byteLength, r = new Uint8Array(n), i = 0, a = 0; a < n; a++) 2 <= a && 3 === t[a] && 0 === t[a - 1] && 0 === t[a - 2] || (r[i] = t[a], i++);
									return new Uint8Array(r.buffer, 0, i)
								}
							}, {
								key : "parseSPS",
								value : function(e) {
									var t = x._ebsp2rbsp(e),
										n = new k.default(t);
									n.readByte();
									var r = n.readByte();
									n.readByte();
									var i = n.readByte();
									n.readUEG();
									var a = x.getProfileString(r),
										o = x.getLevelString(i),
										s = 1,
										u = 420,
										l = 8;
									if ((100 === r || 110 === r || 122 === r || 244 === r || 44 === r || 83 === r || 86 === r || 118 === r || 128 === r || 138 === r || 144 === r) && (3 === (s = n.readUEG()) && n.readBits(1), s <= 3 && (u = [ 0, 420, 422, 444 ][s]), l = n.readUEG() + 8, n.readUEG(), n.readBits(1), n.readBool()))
										for (var d = 3 !== s ? 8 : 12, f = 0; f < d; f++) n.readBool() && x._skipScalingList(n, f < 6 ? 16 : 64);
									n.readUEG();
									var c = n.readUEG();
									if (0 === c) n.readUEG();
									else if (1 === c) {
										n.readBits(1), n.readSEG(), n.readSEG();
										for (var h = n.readUEG(), p = 0; p < h; p++) n.readSEG()
									}
									n.readUEG(), n.readBits(1);
									var g = n.readUEG(),
										m = n.readUEG(),
										_ = n.readBits(1);
									0 === _ && n.readBits(1), n.readBits(1);
									var v = 0,
										y = 0,
										E = 0,
										A = 0;
									n.readBool() && (v = n.readUEG(), y = n.readUEG(), E = n.readUEG(), A = n.readUEG());
									var T = 1,
										R = 1,
										I = 0,
										S = !0,
										b = 0,
										w = 0;
									if (n.readBool()) {
										if (n.readBool()) {
											var C = n.readByte();
											0 < C && C < 16 ? (T = [ 1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2 ][C - 1], R = [ 1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1 ][C - 1]) : 255 === C && (T = n.readByte() << 8 | n.readByte(), R = n.readByte() << 8 | n.readByte())
										}
										if (n.readBool() && n.readBool(), n.readBool() && (n.readBits(4), n.readBool() && n.readBits(24)), n.readBool() && (n.readUEG(), n.readUEG()), n.readBool()) {
											var D = n.readBits(32),
												O = n.readBits(32);
											S = n.readBool(), I = (b = O) / (w = 2 * D)
										}
									}
									var M = 1;
									1 === T && 1 === R || (M = T / R);
									var N = 0,
										L = 0;
									0 === s ? (N = 1, L = 2 - _) : (N = 3 === s ? 1 : 2, L = (1 === s ? 2 : 1) * (2 - _));
									var P = 16 * (g + 1),
										F = 16 * (m + 1) * (2 - _);
									P -= (v + y) * N, F -= (E + A) * L;
									var B = Math.ceil(P * M);
									return n.destroy(), n = null, {
											profile_string : a,
											level_string : o,
											bit_depth : l,
											chroma_format : u,
											chroma_format_string : x.getChromaFormatString(u),
											frame_rate : {
												fixed : S,
												fps : I,
												fps_den : w,
												fps_num : b
											},
											sar_ratio : {
												width : T,
												height : R
											},
											codec_size : {
												width : P,
												height : F
											},
											present_size : {
												width : B,
												height : F
											}
									}
								}
							}, {
								key : "_skipScalingList",
								value : function(e, t) {
									for (var n = 8, r = 8, i = 0; i < t; i++) 0 !== r && (r = (n + e.readSEG() + 256) % 256), n = 0 === r ? n : r
								}
							}, {
								key : "getProfileString",
								value : function(e) {
									switch (e) {
									case 66:
										return "Baseline";case 77:
										return "Main";case 88:
										return "Extended";case 100:
										return "High";case 110:
										return "High10";case 122:
										return "High422";case 244:
										return "High444";default:
										return "Unknown"
									}
								}
							}, {
								key : "getLevelString",
								value : function(e) {
									return (e / 10).toFixed(1)
								}
							}, {
								key : "getChromaFormatString",
								value : function(e) {
									switch (e) {
									case 420:
										return "4:2:0";case 422:
										return "4:2:2";case 444:
										return "4:4:4";default:
										return "Unknown"
									}
								}
							} ]), x
					}();
					n.default = o
				}, {
					"./exp-golomb.js" : 17
				} ],
				20 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = "function" == typeof Symbol && "symbol" === q(Symbol.iterator) ? function(e) {
							return q(e)
						} : function(e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : q(e)
						},
						i = c(e("./utils/polyfill.js")),
						a = c(e("./core/features.js")),
						o = c(e("./player/flv-player.js")),
						s = c(e("./player/native-player.js")),
						u = c(e("./player/player-events.js")),
						l = e("./player/player-errors.js"),
						d = c(e("./utils/logging-control.js")),
						f = e("./utils/exception.js");
					function c(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					i.default.install();
					var h = {
						createPlayer : function(e, t) {
							var n = e;
							if (null == n || "object" !== (void 0 === n ? "undefined" : r(n)))
								throw new f.InvalidArgumentException("MediaDataSource must be an javascript object!");
							if (!n.hasOwnProperty("type"))
								throw new f.InvalidArgumentException("MediaDataSource must has type field to indicate video file type!");
							switch (n.type) {
							case "flv":
								return new o.default(n, t);default:
								return new s.default(n, t)
							}
						},
						isSupported : function() {
							return a.default.supportMSEH264Playback()
						},
						getFeatureList : function() {
							return a.default.getFeatureList()
						}
					};
					h.Events = u.default, h.ErrorTypes = l.ErrorTypes, h.ErrorDetails = l.ErrorDetails, h.FlvPlayer = o.default, h.NativePlayer = s.default, h.LoggingControl = d.default, Object.defineProperty(h, "version", {
						enumerable : !0,
						get : function() {
							return "1.3.3"
						}
					}), n.default = h
				}, {
					"./core/features.js" : 6,
					"./player/flv-player.js" : 32,
					"./player/native-player.js" : 33,
					"./player/player-errors.js" : 34,
					"./player/player-events.js" : 35,
					"./utils/exception.js" : 40,
					"./utils/logging-control.js" : 42,
					"./utils/polyfill.js" : 43
				} ],
				21 : [ function(e, t, n) {
					"use strict";
					t.exports = e("./flv.js").default
				}, {
					"./flv.js" : 20
				} ],
				22 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var l = "function" == typeof Symbol && "symbol" === q(Symbol.iterator) ? function(e) {
							return q(e)
						} : function(e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : q(e)
						},
						i = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						s = (r(e("../utils/logger.js")), r(e("../utils/browser.js"))),
						d = e("./loader.js"),
						f = e("../utils/exception.js");
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					var a = function(e) {
						function r(e, t) {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, r);var n = function(e, t) {
								if (!e)
									throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
								return !t || "object" !== q(t) && "function" != typeof t ? e : t
							}(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, "fetch-stream-loader"));
							return n.TAG = "FetchStreamLoader", n._seekHandler = e, n._config = t, n._needStash = !0, n._requestAbort = !1, n._contentLength = null, n._receivedLength = 0, n
						}
						return function(e, t) {
								if ("function" != typeof t && null !== t)
									throw new TypeError("Super expression must either be null or a function, not " + q(t));
								e.prototype = Object.create(t && t.prototype, {
									constructor : {
										value : e,
										enumerable : !1,
										writable : !0,
										configurable : !0
									}
								}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
							}(r, d.BaseLoader), i(r, null, [ {
								key : "isSupported",
								value : function() {
									try {
										var e = s.default.msedge && 15048 <= s.default.version.minor,
											t = !s.default.msedge || e;
										return self.fetch && self.ReadableStream && t
									} catch (e) {
										return !1
									}
								}
							} ]), i(r, [ {
								key : "destroy",
								value : function() {
									this.isWorking() && this.abort(), function e(t, n, r) {
										null === t && (t = Function.prototype);
										var i = Object.getOwnPropertyDescriptor(t, n);
										if (void 0 === i) {
											var a = Object.getPrototypeOf(t);
											return null === a ? void 0 : e(a, n, r)
										}
										if ("value" in i) return i.value;
										var o = i.get;
										return void 0 !== o ? o.call(r) : void 0
									}(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "destroy", this).call(this)
								}
							}, {
								key : "open",
								value : function(e, t) {
									var r = this;
									this._dataSource = e, this._range = t;
									var n = e.url;
									this._config.reuseRedirectedURL && null != e.redirectedURL && (n = e.redirectedURL);
									var i = this._seekHandler.getConfig(n, t),
										a = new self.Headers;
									if ("object" === l(i.headers)) {
										var o = i.headers;
										for (var s in o) o.hasOwnProperty(s) && a.append(s, o[s])
									}
									var u = {
										method : "GET",
										headers : a,
										mode : "cors",
										cache : "default",
										referrerPolicy : "no-referrer-when-downgrade"
									};
									!1 === e.cors && (u.mode = "same-origin"), e.withCredentials && (u.credentials = "include"), e.referrerPolicy && (u.referrerPolicy = e.referrerPolicy), this.status = d.LoaderStatus.kConnecting, self.fetch(i.url, u).then(function(e) {
										if (r._requestAbort)
											r._requestAbort = !1;else {
											if (e.ok && 200 <= e.status && e.status <= 299) {
												if (e.url !== i.url && r._onURLRedirect) {
													var t = r._seekHandler.removeURLParameters(e.url);
													r._onURLRedirect(t)
												}
												var n = e.headers.get("Content-Length");
												return null != n && (r._contentLength = parseInt(n), 0 !== r._contentLength && r._onContentLengthKnown && r._onContentLengthKnown(r._contentLength)), r._pump.call(r, e.body.getReader())
											}
											if (r.status = d.LoaderStatus.kError, !r._onError)
												throw new f.RuntimeException("FetchStreamLoader: Http code invalid, " + e.status + " " + e.statusText);
											r._onError(d.LoaderErrors.HTTP_STATUS_CODE_INVALID, {
												code : e.status,
												msg : e.statusText
											})
										}
									}).catch(function(e) {
										if (r.status = d.LoaderStatus.kError, !r._onError)
											throw e;
										r._onError(d.LoaderErrors.EXCEPTION, {
											code : -1,
											msg : e.message
										})
									})
								}
							}, {
								key : "abort",
								value : function() {
									this._requestAbort = !0, this.status = d.LoaderStatus.kComplete
								}
							}, {
								key : "_pump",
								value : function(a) {
									var o = this;
									return a.read().then(function(e) {
										if (e.done)
											if (null !== o._contentLength && o._receivedLength < o._contentLength) {
												o.status = d.LoaderStatus.kError;
												var t = d.LoaderErrors.EARLY_EOF,
													n = {
														code : -1,
														msg : "Fetch stream meet Early-EOF"
													};
												if (!o._onError)
													throw new f.RuntimeException(n.msg);
												o._onError(t, n)
											} else o.status = d.LoaderStatus.kComplete, o._onComplete && o._onComplete(o._range.from, o._range.from + o._receivedLength - 1);else {
											if (!0 === o._requestAbort) return o._requestAbort = !1, a.cancel();
											o.status = d.LoaderStatus.kBuffering;
											var r = e.value.buffer,
												i = o._range.from + o._receivedLength;
											o._receivedLength += r.byteLength, o._onDataArrival && o._onDataArrival(r, i, o._receivedLength), o._pump(a)
										}
									}).catch(function(e) {
										if (11 !== e.code || !s.default.msedge) {
											o.status = d.LoaderStatus.kError;
											var t = 0,
												n = null;
											if (n = 19 !== e.code && "network error" !== e.message || !(null === o._contentLength || null !== o._contentLength && o._receivedLength < o._contentLength) ? (t = d.LoaderErrors.EXCEPTION, {
													code : e.code,
													msg : e.message
												}) : (t = d.LoaderErrors.EARLY_EOF, {
													code : e.code,
													msg : "Fetch stream meet Early-EOF"
												}), !o._onError)
												throw new f.RuntimeException(n.msg);
											o._onError(t, n)
										}
									})
								}
							} ]), r
					}();
					n.default = a
				}, {
					"../utils/browser.js" : 39,
					"../utils/exception.js" : 40,
					"../utils/logger.js" : 41,
					"./loader.js" : 24
				} ],
				23 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						a = r(e("events")),
						o = r(e("../utils/logger.js")),
						s = r(e("./speed-sampler.js")),
						u = e("./loader.js"),
						l = r(e("./fetch-stream-loader.js")),
						d = r(e("./xhr-moz-chunked-loader.js")),
						f = (r(e("./xhr-msstream-loader.js")), r(e("./xhr-range-loader.js"))),
						c = r(e("./websocket-loader.js")),
						h = r(e("./range-seek-handler.js")),
						p = r(e("./param-seek-handler.js")),
						m = e("../utils/exception.js"),
						g = e("../player/player-events.js"),
						_ = r(g);
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					var v = function() {
						function r(e, t, n) {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, r), this.TAG = "IOController", this._config = t, this._extraData = n, this._emitter = new a.default, this._stashInitialSize = 393216, null != t.stashInitialSize && 0 < t.stashInitialSize && (this._stashInitialSize = t.stashInitialSize), this._stashUsed = 0, this._stashSize = this._stashInitialSize, this._bufferSize = 3145728, this._stashBuffer = new ArrayBuffer(this._bufferSize), this._stashByteStart = 0, !(this._enableStash = !0) === t.enableStashBuffer && (this._enableStash = !1), this._loader = null, this._loaderClass = null, this._seekHandler = null, this._dataSource = e, this._isWebSocketURL = /wss?:\/\/(.+?)/.test(e.url), this._refTotalLength = e.filesize ? e.filesize : null, this._totalLength = this._refTotalLength, this._fullRequestFlag = !1, this._currentRange = null, this._redirectedURL = null, this._speedNormalized = 0, this._speedSampler = new s.default, this._speedNormalizeList = [ 64, 128, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096 ], this._isEarlyEofReconnecting = !1, this._paused = !1, this._resumeFrom = 0, this._requestStartTime = null, this._onDataArrival = null, this._onSeeked = null, this._onError = null, this._onComplete = null, this._onRedirect = null, this._onRecoveredEarlyEof = null, this._selectSeekHandler(), this._selectLoader(), this._createLoader(), this._onPerRequestReceivedBytesEvent()
						}
						return i(r, [ {
								key : "destroy",
								value : function() {
									this._loader.isWorking() && this._loader.abort(), this._loader.destroy(), this._loader = null, this._loaderClass = null, this._dataSource = null, this._stashBuffer = null, this._stashUsed = this._stashSize = this._bufferSize = this._stashByteStart = 0, this._currentRange = null, this._isEarlyEofReconnecting = !1, this._onDataArrival = null, this._onSeeked = null, this._onError = null, this._onComplete = null, this._onRedirect = null, this._onRecoveredEarlyEof = null, this._requestStartTime = null, this._emitter.removeAllListeners(), this._emitter = null, this._extraData = null, this._speedSampler.destroy(), this._speedSampler = null
								}
							}, {
								key : "isWorking",
								value : function() {
									return this._loader && this._loader.isWorking() && !this._paused
								}
							}, {
								key : "isPaused",
								value : function() {
									return this._paused
								}
							}, {
								key : "_selectSeekHandler",
								value : function() {
									var e = this._config;
									if ("range" === e.seekType)
										this._seekHandler = new h.default(this._config.rangeLoadZeroStart);
									else if ("param" === e.seekType) {
										var t = e.seekParamStart || "bstart",
											n = e.seekParamEnd || "bend";
										this._seekHandler = new p.default(t, n)
									} else {
										if ("custom" !== e.seekType)
											throw new m.InvalidArgumentException("Invalid seekType in config: " + e.seekType);
										if ("function" != typeof e.customSeekHandler)
											throw new m.InvalidArgumentException("Custom seekType specified in config but invalid customSeekHandler!");
										this._seekHandler = new e.customSeekHandler
									}
								}
							}, {
								key : "_selectLoader",
								value : function() {
									if (this._isWebSocketURL)
										this._loaderClass = c.default;
									else if (l.default.isSupported())
										this._loaderClass = l.default;
									else if (d.default.isSupported())
										this._loaderClass = d.default;else {
										if (!f.default.isSupported())
											throw new m.RuntimeException("Your browser doesn't support xhr with arraybuffer responseType!");
										this._loaderClass = f.default
									}
								}
							}, {
								key : "_createLoader",
								value : function() {
									this._loader = new this._loaderClass(this._seekHandler, this._config), !1 === this._loader.needStashBuffer && (this._enableStash = !1), this._loader.onContentLengthKnown = this._onContentLengthKnown.bind(this), this._loader.onURLRedirect = this._onURLRedirect.bind(this), this._loader.onDataArrival = this._onLoaderChunkArrival.bind(this), this._loader.onComplete = this._onLoaderComplete.bind(this), this._loader.onError = this._onLoaderError.bind(this), this._loader.on(u.LoaderEvents.STATUS_CHANGE, this._onLoaderStatusChange.bind(this))
								}
							}, {
								key : "_onPerRequestReceivedBytesEvent",
								value : function() {
									var t = this;
									this._speedSampler.on(_.default.HTTP_REQUEST_ENDED, function(e) {
										t._emitter.emit(g.OTHER_EVENTS_POLYMER, {
											eventName : _.default.HTTP_REQUEST_ENDED,
											eventParams : [ e, t._dataSource.url ]
										})
									})
								}
							}, {
								key : "open",
								value : function(e) {
									this._currentRange = {
										from : 0,
										to : -1
									}, e && (this._currentRange.from = e), e || (this._fullRequestFlag = !0), this._loader.open(this._dataSource, Object.assign({}, this._currentRange))
								}
							}, {
								key : "abort",
								value : function() {
									this._loader.abort(), this._paused && (this._paused = !1, this._resumeFrom = 0)
								}
							}, {
								key : "pause",
								value : function() {
									this.isWorking() && (this._loader.abort(), 0 !== this._stashUsed ? (this._resumeFrom = this._stashByteStart, this._currentRange.to = this._stashByteStart - 1) : this._resumeFrom = this._currentRange.to + 1, this._stashUsed = 0, this._stashByteStart = 0, this._paused = !0)
								}
							}, {
								key : "resume",
								value : function() {
									if (this._paused) {
										this._paused = !1;
										var e = this._resumeFrom;
										this._resumeFrom = 0, this._internalSeek(e, !0)
									}
								}
							}, {
								key : "seek",
								value : function(e) {
									this._paused = !1, this._stashUsed = 0, this._stashByteStart = 0, this._internalSeek(e, !0)
								}
							}, {
								key : "_internalSeek",
								value : function(e, t) {
									this._loader.isWorking() && this._loader.abort(), this._flushStashBuffer(t), this._loader.destroy(), this._loader = null;
									var n = {
										from : e,
										to : -1
									};
									this._currentRange = {
										from : n.from,
										to : -1
									}, this._stashSize = this._stashInitialSize, this._createLoader(), this._loader.open(this._dataSource, n), this._onSeeked && this._onSeeked()
								}
							}, {
								key : "updateUrl",
								value : function(e) {
									if (!e || "string" != typeof e || 0 === e.length)
										throw new m.InvalidArgumentException("Url must be a non-empty string!");
									this._dataSource.url = e
								}
							}, {
								key : "_expandBuffer",
								value : function(e) {
									for (var t = this._stashSize; t + 1048576 < e;) t *= 2;
									if ((t += 1048576) !== this._bufferSize) {
										var n = new ArrayBuffer(t);
										if (0 < this._stashUsed) {
											var r = new Uint8Array(this._stashBuffer, 0, this._stashUsed);
											new Uint8Array(n, 0, t).set(r, 0)
										}
										this._stashBuffer = n, this._bufferSize = t
									}
								}
							}, {
								key : "_normalizeSpeed",
								value : function(e) {
									var t = this._speedNormalizeList,
										n = t.length - 1,
										r = 0,
										i = 0,
										a = n;
									if (e < t[0]) return t[0];
									for (; i <= a;) {
										if ((r = i + Math.floor((a - i) / 2)) === n || e >= t[r] && e < t[r + 1]) return t[r];
										t[r] < e ? i = r + 1 : a = r - 1
									}
								}
							}, {
								key : "_adjustStashSize",
								value : function(e) {
									var t = 0;
									8192 < (t = this._config.isLive ? e : e < 512 ? e : 512 <= e && e <= 1024 ? Math.floor(1.5 * e) : 2 * e) && (t = 8192);
									var n = 1024 * t + 1048576;
									this._bufferSize < n && this._expandBuffer(n), this._stashSize = 1024 * t
								}
							}, {
								key : "_dispatchChunks",
								value : function(e, t) {
									return this._currentRange.to = t + e.byteLength - 1, this._onDataArrival(e, t)
								}
							}, {
								key : "_onURLRedirect",
								value : function(e) {
									this._redirectedURL = e, this._onRedirect && this._onRedirect(e)
								}
							}, {
								key : "_onContentLengthKnown",
								value : function(e) {
									e && this._fullRequestFlag && (this._totalLength = e, this._fullRequestFlag = !1), e && this._emitter.emit(g.OTHER_EVENTS_POLYMER, {
										eventName : _.default.HTTP_HEADER_RECEIVED,
										eventParams : [ Date.now() - this._requestStartTime, this._dataSource.url ]
									})
								}
							}, {
								key : "_onLoaderChunkArrival",
								value : function(e, t, n) {
									if (!this._onDataArrival)
										throw new m.IllegalStateException("IOController: No existing consumer (onDataArrival) callback!");
									if (!this._paused) {
										this._isEarlyEofReconnecting && (this._isEarlyEofReconnecting = !1, this._onRecoveredEarlyEof && this._onRecoveredEarlyEof()), this._speedSampler.addBytes(e.byteLength);
										var r = this._speedSampler.lastSecondKBps;
										if (0 !== r) {
											var i = this._normalizeSpeed(r);
											this._speedNormalized !== i && (this._speedNormalized = i, this._adjustStashSize(i))
										}
										if (this._enableStash)
											if (0 === this._stashUsed && 0 === this._stashByteStart && (this._stashByteStart = t), this._stashUsed + e.byteLength <= this._stashSize) {
												new Uint8Array(this._stashBuffer, 0, this._stashSize).set(new Uint8Array(e), this._stashUsed), this._stashUsed += e.byteLength
											} else {
												var a = new Uint8Array(this._stashBuffer, 0, this._bufferSize);
												if (0 < this._stashUsed) {
													var o = this._stashBuffer.slice(0, this._stashUsed),
														s = this._dispatchChunks(o, this._stashByteStart);
													if (s < o.byteLength) {
														if (0 < s) {
															var u = new Uint8Array(o, s);
															a.set(u, 0), this._stashUsed = u.byteLength, this._stashByteStart += s
														}
													} else this._stashUsed = 0, this._stashByteStart += s;
													this._stashUsed + e.byteLength > this._bufferSize && (this._expandBuffer(this._stashUsed + e.byteLength), a = new Uint8Array(this._stashBuffer, 0, this._bufferSize)), a.set(new Uint8Array(e), this._stashUsed), this._stashUsed += e.byteLength
												} else {
													var l = this._dispatchChunks(e, t);
													if (l < e.byteLength) {
														var d = e.byteLength - l;
														d > this._bufferSize && (this._expandBuffer(d), a = new Uint8Array(this._stashBuffer, 0, this._bufferSize)), a.set(new Uint8Array(e, l), 0), this._stashUsed += d, this._stashByteStart = t + l
													}
												}
										}
										else if (0 === this._stashUsed) {
											var f = this._dispatchChunks(e, t);
											if (f < e.byteLength) {
												var c = e.byteLength - f;
												c > this._bufferSize && this._expandBuffer(c), new Uint8Array(this._stashBuffer, 0, this._bufferSize).set(new Uint8Array(e, f), 0), this._stashUsed += c, this._stashByteStart = t + f
											}
										} else {
											this._stashUsed + e.byteLength > this._bufferSize && this._expandBuffer(this._stashUsed + e.byteLength);
											var h = new Uint8Array(this._stashBuffer, 0, this._bufferSize);
											h.set(new Uint8Array(e), this._stashUsed), this._stashUsed += e.byteLength;
											var p = this._dispatchChunks(this._stashBuffer.slice(0, this._stashUsed), this._stashByteStart);
											if (p < this._stashUsed && 0 < p) {
												var g = new Uint8Array(this._stashBuffer, p);
												h.set(g, 0)
											}
											this._stashUsed -= p, this._stashByteStart += p
										}
									}
								}
							}, {
								key : "_flushStashBuffer",
								value : function(e) {
									if (0 < this._stashUsed) {
										var t = this._stashBuffer.slice(0, this._stashUsed),
											n = this._dispatchChunks(t, this._stashByteStart),
											r = t.byteLength - n;
										if (n < t.byteLength) {
											if (!e) {
												if (0 < n) {
													var i = new Uint8Array(this._stashBuffer, 0, this._bufferSize),
														a = new Uint8Array(t, n);
													i.set(a, 0), this._stashUsed = a.byteLength, this._stashByteStart += n
												}
												return 0
											}
											o.default.w(this.TAG, r + " bytes unconsumed data remain when flush buffer, dropped")
										}
										return this._stashUsed = 0, this._stashByteStart = 0, r
									}
									return 0
								}
							}, {
								key : "_onLoaderComplete",
								value : function(e, t) {
									this._flushStashBuffer(!0), this._onComplete && this._onComplete(this._extraData, e, t, this._dataSource && this._dataSource.url)
								}
							}, {
								key : "_onLoaderError",
								value : function(e, t) {
									switch (o.default.e(this.TAG, "Loader error, code = " + t.code + ", msg = " + t.msg), this._flushStashBuffer(!1), this._isEarlyEofReconnecting && (this._isEarlyEofReconnecting = !1, e = u.LoaderErrors.UNRECOVERABLE_EARLY_EOF), e) {
									case u.LoaderErrors.EARLY_EOF:
										if (!this._config.isLive && this._totalLength) {
											var n = this._currentRange.to + 1;
											return void (n < this._totalLength && (o.default.w(this.TAG, "Connection lost, trying reconnect..."), this._isEarlyEofReconnecting = !0, this._internalSeek(n, !1)))
										}
										e = u.LoaderErrors.UNRECOVERABLE_EARLY_EOF;
										break;case u.LoaderErrors.UNRECOVERABLE_EARLY_EOF:
									case u.LoaderErrors.CONNECTING_TIMEOUT:
									case u.LoaderErrors.HTTP_STATUS_CODE_INVALID:
									case u.LoaderErrors.EXCEPTION:
									}
									if (!this._onError)
										throw new m.RuntimeException("IOException: " + t.msg);
									this._onError(e, t)
								}
							}, {
								key : "_onLoaderStatusChange",
								value : function(e, t) {
									t !== u.LoaderStatus.kError && t !== u.LoaderStatus.kComplete || this._speedSampler.reset(), t === u.LoaderStatus.kConnecting && (this._requestStartTime = Date.now())
								}
							}, {
								key : "on",
								value : function(e, t) {
									this._emitter.addListener(e, t)
								}
							}, {
								key : "off",
								value : function(e, t) {
									this._emitter.removeListener(e, t)
								}
							}, {
								key : "status",
								get : function() {
									return this._loader.status
								}
							}, {
								key : "extraData",
								get : function() {
									return this._extraData
								},
								set : function(e) {
									this._extraData = e
								}
							}, {
								key : "onDataArrival",
								get : function() {
									return this._onDataArrival
								},
								set : function(e) {
									this._onDataArrival = e
								}
							}, {
								key : "onSeeked",
								get : function() {
									return this._onSeeked
								},
								set : function(e) {
									this._onSeeked = e
								}
							}, {
								key : "onError",
								get : function() {
									return this._onError
								},
								set : function(e) {
									this._onError = e
								}
							}, {
								key : "onComplete",
								get : function() {
									return this._onComplete
								},
								set : function(e) {
									this._onComplete = e
								}
							}, {
								key : "onRedirect",
								get : function() {
									return this._onRedirect
								},
								set : function(e) {
									this._onRedirect = e
								}
							}, {
								key : "onRecoveredEarlyEof",
								get : function() {
									return this._onRecoveredEarlyEof
								},
								set : function(e) {
									this._onRecoveredEarlyEof = e
								}
							}, {
								key : "currentURL",
								get : function() {
									return this._dataSource.url
								}
							}, {
								key : "hasRedirect",
								get : function() {
									return null != this._redirectedURL || null != this._dataSource.redirectedURL
								}
							}, {
								key : "currentRedirectedURL",
								get : function() {
									return this._redirectedURL || this._dataSource.redirectedURL
								}
							}, {
								key : "currentSpeed",
								get : function() {
									return this._loaderClass === f.default ? this._loader.currentSpeed : this._speedSampler.lastSecondKBps
								}
							}, {
								key : "loaderType",
								get : function() {
									return this._loader.type
								}
							} ]), r
					}();
					n.default = v
				}, {
					"../player/player-events.js" : 35,
					"../utils/exception.js" : 40,
					"../utils/logger.js" : 41,
					"./fetch-stream-loader.js" : 22,
					"./loader.js" : 24,
					"./param-seek-handler.js" : 25,
					"./range-seek-handler.js" : 26,
					"./speed-sampler.js" : 27,
					"./websocket-loader.js" : 28,
					"./xhr-moz-chunked-loader.js" : 29,
					"./xhr-msstream-loader.js" : 30,
					"./xhr-range-loader.js" : 31,
					events : 2
				} ],
				24 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					}), n.BaseLoader = n.LoaderEvents = n.LoaderErrors = n.LoaderStatus = void 0;
					var r = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						i = s(e("events")),
						a = s(e("../utils/logger.js")),
						o = e("../utils/exception.js");
					function s(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					var u = n.LoaderStatus = {
							kIdle : 0,
							kConnecting : 1,
							kBuffering : 2,
							kError : 3,
							kComplete : 4
						},
						l = (n.LoaderErrors = {
							OK : "OK",
							EXCEPTION : "Exception",
							HTTP_STATUS_CODE_INVALID : "HttpStatusCodeInvalid",
							CONNECTING_TIMEOUT : "ConnectingTimeout",
							EARLY_EOF : "EarlyEof",
							UNRECOVERABLE_EARLY_EOF : "UnrecoverableEarlyEof"
						}, n.LoaderEvents = {
							STATUS_CHANGE : "StatusChange"
						});
					n.BaseLoader = function() {
						function t(e) {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, t), this._type = e || "undefined", this._status = u.kIdle, this._needStash = !1, this._onContentLengthKnown = null, this._onURLRedirect = null, this._onDataArrival = null, this._onError = null, this._onComplete = null, this._emitter = new i.default
						}
						return r(t, [ {
								key : "destroy",
								value : function() {
									this.status = u.kIdle, this._onContentLengthKnown = null, this._onURLRedirect = null, this._onDataArrival = null, this._onError = null, this._onComplete = null, this._emitter.removeAllListeners(), this._emitter = null
								}
							}, {
								key : "isWorking",
								value : function() {
									return this.status === u.kConnecting || this.status === u.kBuffering
								}
							}, {
								key : "open",
								value : function(e, t) {
									throw new o.NotImplementedException("Unimplemented abstract function!")
								}
							}, {
								key : "abort",
								value : function() {
									throw new o.NotImplementedException("Unimplemented abstract function!")
								}
							}, {
								key : "on",
								value : function(e, t) {
									this._emitter.addListener(e, t)
								}
							}, {
								key : "off",
								value : function(e, t) {
									this._emitter.removeListener(e, t)
								}
							}, {
								key : "type",
								get : function() {
									return this._type
								}
							}, {
								key : "status",
								get : function() {
									return this._status
								},
								set : function(e) {
									this._status !== e && (this._emitter ? this._emitter.emit(l.STATUS_CHANGE, this._status, this._status = e) : (this._status = e, a.default.w("StatusChange", "Status has been set, but instance had been destroyed")))
								}
							}, {
								key : "needStashBuffer",
								get : function() {
									return this._needStash
								}
							}, {
								key : "onContentLengthKnown",
								get : function() {
									return this._onContentLengthKnown
								},
								set : function(e) {
									this._onContentLengthKnown = e
								}
							}, {
								key : "onURLRedirect",
								get : function() {
									return this._onURLRedirect
								},
								set : function(e) {
									this._onURLRedirect = e
								}
							}, {
								key : "onDataArrival",
								get : function() {
									return this._onDataArrival
								},
								set : function(e) {
									this._onDataArrival = e
								}
							}, {
								key : "onError",
								get : function() {
									return this._onError
								},
								set : function(e) {
									this._onError = e
								}
							}, {
								key : "onComplete",
								get : function() {
									return this._onComplete
								},
								set : function(e) {
									this._onComplete = e
								}
							} ]), t
					}()
				}, {
					"../utils/exception.js" : 40,
					"../utils/logger.js" : 41,
					events : 2
				} ],
				25 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
						function r(e, t) {
							for (var n = 0; n < t.length; n++) {
								var r = t[n];
								r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
							}
						}
						return function(e, t, n) {
							return t && r(e.prototype, t), n && r(e, n), e
						}
					}();
					var i = function() {
						function n(e, t) {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, n), this._startName = e, this._endName = t
						}
						return r(n, [ {
								key : "getConfig",
								value : function(e, t) {
									var n = e;
									if (0 !== t.from || -1 !== t.to) {
										var r = !0;
										-1 === n.indexOf("?") && (n += "?", r = !1), r && (n += "&"), n += this._startName + "=" + t.from.toString(), -1 !== t.to && (n += "&" + this._endName + "=" + t.to.toString())
									}
									return {
										url : n,
										headers : {}
									}
								}
							}, {
								key : "removeURLParameters",
								value : function(e) {
									var t = e.split("?")[0],
										n = void 0,
										r = e.indexOf("?");
									-1 !== r && (n = e.substring(r + 1));
									var i = "";
									if (null != n && 0 < n.length)
										for (var a = n.split("&"), o = 0; o < a.length; o++) {
											var s = a[o].split("="),
												u = 0 < o;
											s[0] !== this._startName && s[0] !== this._endName && (u && (i += "&"), i += a[o])
									}
									return 0 === i.length ? t : t + "?" + i
								}
							} ]), n
					}();
					n.default = i
				}, {} ],
				26 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
						function r(e, t) {
							for (var n = 0; n < t.length; n++) {
								var r = t[n];
								r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
							}
						}
						return function(e, t, n) {
							return t && r(e.prototype, t), n && r(e, n), e
						}
					}();
					var i = function() {
						function t(e) {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, t), this._zeroStart = e || !1
						}
						return r(t, [ {
								key : "getConfig",
								value : function(e, t) {
									var n = {};
									if (0 !== t.from || -1 !== t.to) {
										var r = void 0;
										r = -1 !== t.to ? "bytes=" + t.from.toString() + "-" + t.to.toString() : "bytes=" + t.from.toString() + "-", n.Range = r
									} else this._zeroStart && (n.Range = "bytes=0-");
									return {
										url : e,
										headers : n
									}
								}
							}, {
								key : "removeURLParameters",
								value : function(e) {
									return e
								}
							} ]), t
					}();
					n.default = i
				}, {} ],
				27 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						i = o(e("events")),
						a = o(e("../player/player-events.js"));
					function o(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					var s = function() {
						function e() {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, e), this._firstCheckpoint = 0, this._lastCheckpoint = 0, this._intervalBytes = 0, this._totalBytes = 0, this._lastSecondBytes = 0, this._emitter = new i.default, self.performance && self.performance.now ? this._now = self.performance.now.bind(self.performance) : this._now = Date.now
						}
						return r(e, [ {
								key : "destroy",
								value : function() {
									this._emitter.removeAllListeners(), this._emitter = null
								}
							}, {
								key : "reset",
								value : function() {
									this._emitter.emit(a.default.HTTP_REQUEST_ENDED, this._totalBytes), this._firstCheckpoint = this._lastCheckpoint = 0, this._totalBytes = this._intervalBytes = 0, this._lastSecondBytes = 0
								}
							}, {
								key : "addBytes",
								value : function(e) {
									0 === this._firstCheckpoint ? (this._firstCheckpoint = this._now(), this._lastCheckpoint = this._firstCheckpoint, this._intervalBytes += e, this._totalBytes += e) : this._now() - this._lastCheckpoint < 1e3 ? (this._intervalBytes += e, this._totalBytes += e) : (this._lastSecondBytes = this._intervalBytes, this._intervalBytes = e, this._totalBytes += e, this._lastCheckpoint = this._now())
								}
							}, {
								key : "on",
								value : function(e, t) {
									this._emitter.addListener(e, t)
								}
							}, {
								key : "off",
								value : function(e, t) {
									this._emitter.removeListener(e, t)
								}
							}, {
								key : "currentKBps",
								get : function() {
									this.addBytes(0);
									var e = (this._now() - this._lastCheckpoint) / 1e3;
									return 0 == e && (e = 1), this._intervalBytes / e / 1024
								}
							}, {
								key : "lastSecondKBps",
								get : function() {
									return this.addBytes(0), 0 !== this._lastSecondBytes ? this._lastSecondBytes / 1024 : 500 <= this._now() - this._lastCheckpoint ? this.currentKBps : 0
								}
							}, {
								key : "averageKBps",
								get : function() {
									var e = (this._now() - this._firstCheckpoint) / 1e3;
									return this._totalBytes / e / 1024
								}
							} ]), e
					}();
					n.default = s
				}, {
					"../player/player-events.js" : 35,
					events : 2
				} ],
				28 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r,
						i = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						a = e("../utils/logger.js"),
						o = ((r = a) && r.__esModule, e("./loader.js")),
						s = e("../utils/exception.js");
					var u = function(e) {
						function t() {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, t);var e = function(e, t) {
								if (!e)
									throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
								return !t || "object" !== q(t) && "function" != typeof t ? e : t
							}(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "websocket-loader"));
							return e.TAG = "WebSocketLoader", e._needStash = !0, e._ws = null, e._requestAbort = !1, e._receivedLength = 0, e
						}
						return function(e, t) {
								if ("function" != typeof t && null !== t)
									throw new TypeError("Super expression must either be null or a function, not " + q(t));
								e.prototype = Object.create(t && t.prototype, {
									constructor : {
										value : e,
										enumerable : !1,
										writable : !0,
										configurable : !0
									}
								}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
							}(t, o.BaseLoader), i(t, null, [ {
								key : "isSupported",
								value : function() {
									try {
										return void 0 !== self.WebSocket
									} catch (e) {
										return !1
									}
								}
							} ]), i(t, [ {
								key : "destroy",
								value : function() {
									this._ws && this.abort(), function e(t, n, r) {
										null === t && (t = Function.prototype);
										var i = Object.getOwnPropertyDescriptor(t, n);
										if (void 0 === i) {
											var a = Object.getPrototypeOf(t);
											return null === a ? void 0 : e(a, n, r)
										}
										if ("value" in i) return i.value;
										var o = i.get;
										return void 0 !== o ? o.call(r) : void 0
									}(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
								}
							}, {
								key : "open",
								value : function(e) {
									try {
										var t = this._ws = new self.WebSocket(e.url);
										t.binaryType = "arraybuffer", t.onopen = this._onWebSocketOpen.bind(this), t.onclose = this._onWebSocketClose.bind(this), t.onmessage = this._onWebSocketMessage.bind(this), t.onerror = this._onWebSocketError.bind(this), this.status = o.LoaderStatus.kConnecting
									} catch (e) {
										this.status = o.LoaderStatus.kError;var n = {
											code : e.code,
											msg : e.message
										};
										if (!this._onError)
											throw new s.RuntimeException(n.msg);
										this._onError(o.LoaderErrors.EXCEPTION, n)
									}
								}
							}, {
								key : "abort",
								value : function() {
									var e = this._ws;
									!e || 0 !== e.readyState && 1 !== e.readyState || (this._requestAbort = !0, e.close()), this._ws = null, this.status = o.LoaderStatus.kComplete
								}
							}, {
								key : "_onWebSocketOpen",
								value : function(e) {
									this.status = o.LoaderStatus.kBuffering
								}
							}, {
								key : "_onWebSocketClose",
								value : function(e) {
									!0 !== this._requestAbort ? (this.status = o.LoaderStatus.kComplete, this._onComplete && this._onComplete(0, this._receivedLength - 1)) : this._requestAbort = !1
								}
							}, {
								key : "_onWebSocketMessage",
								value : function(e) {
									var t = this;
									if (e.data instanceof ArrayBuffer) this._dispatchArrayBuffer(e.data);
									else if (e.data instanceof Blob) {
										var n = new FileReader;
										n.onload = function() {
											t._dispatchArrayBuffer(n.result)
										}, n.readAsArrayBuffer(e.data)
									} else {
										this.status = o.LoaderStatus.kError;
										var r = {
											code : -1,
											msg : "Unsupported WebSocket message type: " + e.data.constructor.name
										};
										if (!this._onError)
											throw new s.RuntimeException(r.msg);
										this._onError(o.LoaderErrors.EXCEPTION, r)
									}
								}
							}, {
								key : "_dispatchArrayBuffer",
								value : function(e) {
									var t = e,
										n = this._receivedLength;
									this._receivedLength += t.byteLength, this._onDataArrival && this._onDataArrival(t, n, this._receivedLength)
								}
							}, {
								key : "_onWebSocketError",
								value : function(e) {
									this.status = o.LoaderStatus.kError;
									var t = {
										code : e.code,
										msg : e.message
									};
									if (!this._onError)
										throw new s.RuntimeException(t.msg);
									this._onError(o.LoaderErrors.EXCEPTION, t)
								}
							} ]), t
					}();
					n.default = u
				}, {
					"../utils/exception.js" : 40,
					"../utils/logger.js" : 41,
					"./loader.js" : 24
				} ],
				29 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r,
						s = "function" == typeof Symbol && "symbol" === q(Symbol.iterator) ? function(e) {
							return q(e)
						} : function(e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : q(e)
						},
						i = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						a = e("../utils/logger.js"),
						o = (r = a) && r.__esModule ? r : {
							default : r
						},
						u = e("./loader.js"),
						l = e("../utils/exception.js");
					var d = function(e) {
						function r(e, t) {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, r);var n = function(e, t) {
								if (!e)
									throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
								return !t || "object" !== q(t) && "function" != typeof t ? e : t
							}(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, "xhr-moz-chunked-loader"));
							return n.TAG = "MozChunkedLoader", n._seekHandler = e, n._config = t, n._needStash = !0, n._xhr = null, n._requestAbort = !1, n._contentLength = null, n._receivedLength = 0, n
						}
						return function(e, t) {
								if ("function" != typeof t && null !== t)
									throw new TypeError("Super expression must either be null or a function, not " + q(t));
								e.prototype = Object.create(t && t.prototype, {
									constructor : {
										value : e,
										enumerable : !1,
										writable : !0,
										configurable : !0
									}
								}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
							}(r, u.BaseLoader), i(r, null, [ {
								key : "isSupported",
								value : function() {
									try {
										var e = new XMLHttpRequest;
										return e.open("GET", "https://example.com", !0), (e.responseType = "moz-chunked-arraybuffer") === e.responseType
									} catch (e) {
										return o.default.w("MozChunkedLoader", e.message), !1
									}
								}
							} ]), i(r, [ {
								key : "destroy",
								value : function() {
									this.isWorking() && this.abort(), this._xhr && (this._xhr.onreadystatechange = null, this._xhr.onprogress = null, this._xhr.onloadend = null, this._xhr.onerror = null, this._xhr = null), function e(t, n, r) {
										null === t && (t = Function.prototype);
										var i = Object.getOwnPropertyDescriptor(t, n);
										if (void 0 === i) {
											var a = Object.getPrototypeOf(t);
											return null === a ? void 0 : e(a, n, r)
										}
										if ("value" in i) return i.value;
										var o = i.get;
										return void 0 !== o ? o.call(r) : void 0
									}(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "destroy", this).call(this)
								}
							}, {
								key : "open",
								value : function(e, t) {
									this._dataSource = e, this._range = t;
									var n = e.url;
									this._config.reuseRedirectedURL && null != e.redirectedURL && (n = e.redirectedURL);
									var r = this._seekHandler.getConfig(n, t);
									this._requestURL = r.url;
									var i = this._xhr = new XMLHttpRequest;
									if (i.open("GET", r.url, !0), i.responseType = "moz-chunked-arraybuffer", i.onreadystatechange = this._onReadyStateChange.bind(this), i.onprogress = this._onProgress.bind(this), i.onloadend = this._onLoadEnd.bind(this), i.onerror = this._onXhrError.bind(this), e.withCredentials && i.withCredentials && (i.withCredentials = !0), "object" === s(r.headers)) {
										var a = r.headers;
										for (var o in a) a.hasOwnProperty(o) && i.setRequestHeader(o, a[o])
									}
									this.status = u.LoaderStatus.kConnecting, i.send()
								}
							}, {
								key : "abort",
								value : function() {
									this._requestAbort = !0, this._xhr && this._xhr.abort(), this.status = u.LoaderStatus.kComplete
								}
							}, {
								key : "_onReadyStateChange",
								value : function(e) {
									var t = e.target;
									if (2 === t.readyState) {
										if (null != t.responseURL && t.responseURL !== this._requestURL && this._onURLRedirect) {
											var n = this._seekHandler.removeURLParameters(t.responseURL);
											this._onURLRedirect(n)
										}
										if (0 !== t.status && (t.status < 200 || 299 < t.status)) {
											if (this.status = u.LoaderStatus.kError, !this._onError)
												throw new l.RuntimeException("MozChunkedLoader: Http code invalid, " + t.status + " " + t.statusText);
											this._onError(u.LoaderErrors.HTTP_STATUS_CODE_INVALID, {
												code : t.status,
												msg : t.statusText
											})
										} else
											this.status = u.LoaderStatus.kBuffering
									}
								}
							}, {
								key : "_onProgress",
								value : function(e) {
									if (this.status !== u.LoaderStatus.kError) {
										null === this._contentLength && null !== e.total && 0 !== e.total && (this._contentLength = e.total, this._onContentLengthKnown && this._onContentLengthKnown(this._contentLength));
										var t = e.target.response,
											n = this._range.from + this._receivedLength;
										this._receivedLength += t.byteLength, this._onDataArrival && this._onDataArrival(t, n, this._receivedLength)
									}
								}
							}, {
								key : "_onLoadEnd",
								value : function(e) {
									!0 !== this._requestAbort ? this.status !== u.LoaderStatus.kError && (this.status = u.LoaderStatus.kComplete, this._onComplete && this._onComplete(this._range.from, this._range.from + this._receivedLength - 1)) : this._requestAbort = !1
								}
							}, {
								key : "_onXhrError",
								value : function(e) {
									this.status = u.LoaderStatus.kError;
									var t = 0,
										n = null;
									if (n = this._contentLength && e.loaded < this._contentLength ? (t = u.LoaderErrors.EARLY_EOF, {
											code : -1,
											msg : "Moz-Chunked stream meet Early-Eof"
										}) : (t = u.LoaderErrors.EXCEPTION, {
											code : -1,
											msg : e.constructor.name + " " + e.type
										}), !this._onError)
										throw new l.RuntimeException(n.msg);
									this._onError(t, n)
								}
							} ]), r
					}();
					n.default = d
				}, {
					"../utils/exception.js" : 40,
					"../utils/logger.js" : 41,
					"./loader.js" : 24
				} ],
				30 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r,
						l = "function" == typeof Symbol && "symbol" === q(Symbol.iterator) ? function(e) {
							return q(e)
						} : function(e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : q(e)
						},
						i = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						a = e("../utils/logger.js"),
						o = (r = a) && r.__esModule ? r : {
							default : r
						},
						d = e("./loader.js"),
						s = e("../utils/exception.js");
					var u = function(e) {
						function r(e, t) {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, r);var n = function(e, t) {
								if (!e)
									throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
								return !t || "object" !== q(t) && "function" != typeof t ? e : t
							}(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, "xhr-msstream-loader"));
							return n.TAG = "MSStreamLoader", n._seekHandler = e, n._config = t, n._needStash = !0, n._xhr = null, n._reader = null, n._totalRange = null, n._currentRange = null, n._currentRequestURL = null, n._currentRedirectedURL = null, n._contentLength = null, n._receivedLength = 0, n._bufferLimit = 16777216, n._lastTimeBufferSize = 0, n._isReconnecting = !1, n
						}
						return function(e, t) {
								if ("function" != typeof t && null !== t)
									throw new TypeError("Super expression must either be null or a function, not " + q(t));
								e.prototype = Object.create(t && t.prototype, {
									constructor : {
										value : e,
										enumerable : !1,
										writable : !0,
										configurable : !0
									}
								}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
							}(r, d.BaseLoader), i(r, null, [ {
								key : "isSupported",
								value : function() {
									try {
										if (void 0 === self.MSStream || void 0 === self.MSStreamReader) return !1;
										var e = new XMLHttpRequest;
										return e.open("GET", "https://example.com", !0), (e.responseType = "ms-stream") === e.responseType
									} catch (e) {
										return o.default.w("MSStreamLoader", e.message), !1
									}
								}
							} ]), i(r, [ {
								key : "destroy",
								value : function() {
									this.isWorking() && this.abort(), this._reader && (this._reader.onprogress = null, this._reader.onload = null, this._reader.onerror = null, this._reader = null), this._xhr && (this._xhr.onreadystatechange = null, this._xhr = null), function e(t, n, r) {
										null === t && (t = Function.prototype);
										var i = Object.getOwnPropertyDescriptor(t, n);
										if (void 0 === i) {
											var a = Object.getPrototypeOf(t);
											return null === a ? void 0 : e(a, n, r)
										}
										if ("value" in i) return i.value;
										var o = i.get;
										return void 0 !== o ? o.call(r) : void 0
									}(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "destroy", this).call(this)
								}
							}, {
								key : "open",
								value : function(e, t) {
									this._internalOpen(e, t, !1)
								}
							}, {
								key : "_internalOpen",
								value : function(e, t, n) {
									this._dataSource = e, n ? this._currentRange = t : this._totalRange = t;
									var r = e.url;
									this._config.reuseRedirectedURL && (null != this._currentRedirectedURL ? r = this._currentRedirectedURL : null != e.redirectedURL && (r = e.redirectedURL));
									var i = this._seekHandler.getConfig(r, t);
									this._currentRequestURL = i.url;
									var a = this._reader = new self.MSStreamReader;
									a.onprogress = this._msrOnProgress.bind(this), a.onload = this._msrOnLoad.bind(this), a.onerror = this._msrOnError.bind(this);
									var o = this._xhr = new XMLHttpRequest;
									if (o.open("GET", i.url, !0), o.responseType = "ms-stream", o.onreadystatechange = this._xhrOnReadyStateChange.bind(this), o.onerror = this._xhrOnError.bind(this), e.withCredentials && (o.withCredentials = !0), "object" === l(i.headers)) {
										var s = i.headers;
										for (var u in s) s.hasOwnProperty(u) && o.setRequestHeader(u, s[u])
									}
									this._isReconnecting ? this._isReconnecting = !1 : this.status = d.LoaderStatus.kConnecting, o.send()
								}
							}, {
								key : "abort",
								value : function() {
									this._internalAbort(), this.status = d.LoaderStatus.kComplete
								}
							}, {
								key : "_internalAbort",
								value : function() {
									this._reader && (1 === this._reader.readyState && this._reader.abort(), this._reader.onprogress = null, this._reader.onload = null, this._reader.onerror = null, this._reader = null), this._xhr && (this._xhr.abort(), this._xhr.onreadystatechange = null, this._xhr = null)
								}
							}, {
								key : "_xhrOnReadyStateChange",
								value : function(e) {
									var t = e.target;
									if (2 === t.readyState)
										if (200 <= t.status && t.status <= 299) {
											if (this.status = d.LoaderStatus.kBuffering, null != t.responseURL) {
												var n = this._seekHandler.removeURLParameters(t.responseURL);
												t.responseURL !== this._currentRequestURL && n !== this._currentRedirectedURL && (this._currentRedirectedURL = n, this._onURLRedirect && this._onURLRedirect(n))
											}
											var r = t.getResponseHeader("Content-Length");
											if (null != r && null == this._contentLength) {
												var i = parseInt(r);
												0 < i && (this._contentLength = i, this._onContentLengthKnown && this._onContentLengthKnown(this._contentLength))
											}
										} else {
											if (this.status = d.LoaderStatus.kError, !this._onError)
												throw new s.RuntimeException("MSStreamLoader: Http code invalid, " + t.status + " " + t.statusText);
											this._onError(d.LoaderErrors.HTTP_STATUS_CODE_INVALID, {
												code : t.status,
												msg : t.statusText
											})
									}
									else if (3 === t.readyState && 200 <= t.status && t.status <= 299) {
										this.status = d.LoaderStatus.kBuffering;
										var a = t.response;
										this._reader.readAsArrayBuffer(a)
									}
								}
							}, {
								key : "_xhrOnError",
								value : function(e) {
									this.status = d.LoaderStatus.kError;
									var t = d.LoaderErrors.EXCEPTION,
										n = {
											code : -1,
											msg : e.constructor.name + " " + e.type
										};
									if (!this._onError)
										throw new s.RuntimeException(n.msg);
									this._onError(t, n)
								}
							}, {
								key : "_msrOnProgress",
								value : function(e) {
									var t = e.target.result;
									if (null != t) {
										var n = t.slice(this._lastTimeBufferSize);
										this._lastTimeBufferSize = t.byteLength;
										var r = this._totalRange.from + this._receivedLength;
										this._receivedLength += n.byteLength, this._onDataArrival && this._onDataArrival(n, r, this._receivedLength), t.byteLength >= this._bufferLimit && (o.default.v(this.TAG, "MSStream buffer exceeded max size near " + (r + n.byteLength) + ", reconnecting..."), this._doReconnectIfNeeded())
									} else this._doReconnectIfNeeded()
								}
							}, {
								key : "_doReconnectIfNeeded",
								value : function() {
									if (null == this._contentLength || this._receivedLength < this._contentLength) {
										this._isReconnecting = !0, this._lastTimeBufferSize = 0, this._internalAbort();
										var e = {
											from : this._totalRange.from + this._receivedLength,
											to : -1
										};
										this._internalOpen(this._dataSource, e, !0)
									}
								}
							}, {
								key : "_msrOnLoad",
								value : function(e) {
									this.status = d.LoaderStatus.kComplete, this._onComplete && this._onComplete(this._totalRange.from, this._totalRange.from + this._receivedLength - 1)
								}
							}, {
								key : "_msrOnError",
								value : function(e) {
									this.status = d.LoaderStatus.kError;
									var t = 0,
										n = null;
									if (n = this._contentLength && this._receivedLength < this._contentLength ? (t = d.LoaderErrors.EARLY_EOF, {
											code : -1,
											msg : "MSStream meet Early-Eof"
										}) : (t = d.LoaderErrors.EARLY_EOF, {
											code : -1,
											msg : e.constructor.name + " " + e.type
										}), !this._onError)
										throw new s.RuntimeException(n.msg);
									this._onError(t, n)
								}
							} ]), r
					}();
					n.default = u
				}, {
					"../utils/exception.js" : 40,
					"../utils/logger.js" : 41,
					"./loader.js" : 24
				} ],
				31 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var s = "function" == typeof Symbol && "symbol" === q(Symbol.iterator) ? function(e) {
							return q(e)
						} : function(e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : q(e)
						},
						i = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						a = r(e("../utils/logger.js")),
						o = r(e("./speed-sampler.js")),
						u = e("./loader.js"),
						l = e("../utils/exception.js");
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					var d = function(e) {
						function r(e, t) {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, r);var n = function(e, t) {
								if (!e)
									throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
								return !t || "object" !== q(t) && "function" != typeof t ? e : t
							}(this, (r.__proto__ || Object.getPrototypeOf(r)).call(this, "xhr-range-loader"));
							return n.TAG = "RangeLoader", n._seekHandler = e, n._config = t, n._needStash = !1, n._chunkSizeKBList = [ 128, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 5120, 6144, 7168, 8192 ], n._currentChunkSizeKB = 384, n._currentSpeedNormalized = 0, n._zeroSpeedChunkCount = 0, n._xhr = null, n._speedSampler = new o.default, n._requestAbort = !1, n._waitForTotalLength = !1, n._totalLengthReceived = !1, n._currentRequestURL = null, n._currentRedirectedURL = null, n._currentRequestRange = null, n._totalLength = null, n._contentLength = null, n._receivedLength = 0, n._lastTimeLoaded = 0, n
						}
						return function(e, t) {
								if ("function" != typeof t && null !== t)
									throw new TypeError("Super expression must either be null or a function, not " + q(t));
								e.prototype = Object.create(t && t.prototype, {
									constructor : {
										value : e,
										enumerable : !1,
										writable : !0,
										configurable : !0
									}
								}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
							}(r, u.BaseLoader), i(r, null, [ {
								key : "isSupported",
								value : function() {
									try {
										var e = new XMLHttpRequest;
										return e.open("GET", "https://example.com", !0), (e.responseType = "arraybuffer") === e.responseType
									} catch (e) {
										return a.default.w("RangeLoader", e.message), !1
									}
								}
							} ]), i(r, [ {
								key : "destroy",
								value : function() {
									this.isWorking() && this.abort(), this._xhr && (this._xhr.onreadystatechange = null, this._xhr.onprogress = null, this._xhr.onload = null, this._xhr.onerror = null, this._xhr = null), function e(t, n, r) {
										null === t && (t = Function.prototype);
										var i = Object.getOwnPropertyDescriptor(t, n);
										if (void 0 === i) {
											var a = Object.getPrototypeOf(t);
											return null === a ? void 0 : e(a, n, r)
										}
										if ("value" in i) return i.value;
										var o = i.get;
										return void 0 !== o ? o.call(r) : void 0
									}(r.prototype.__proto__ || Object.getPrototypeOf(r.prototype), "destroy", this).call(this), this._speedSampler.destroy()
								}
							}, {
								key : "open",
								value : function(e, t) {
									this._dataSource = e, this._range = t, this.status = u.LoaderStatus.kConnecting;
									var n = !1;
									null != this._dataSource.filesize && 0 !== this._dataSource.filesize && (n = !0, this._totalLength = this._dataSource.filesize), this._totalLengthReceived || n ? this._openSubRange() : (this._waitForTotalLength = !0, this._internalOpen(this._dataSource, {
										from : 0,
										to : -1
									}))
								}
							}, {
								key : "_openSubRange",
								value : function() {
									var e = 1024 * this._currentChunkSizeKB,
										t = this._range.from + this._receivedLength,
										n = t + e;
									null != this._contentLength && n - this._range.from >= this._contentLength && (n = this._range.from + this._contentLength - 1), this._currentRequestRange = {
										from : t,
										to : n
									}, this._internalOpen(this._dataSource, this._currentRequestRange)
								}
							}, {
								key : "_internalOpen",
								value : function(e, t) {
									this._lastTimeLoaded = 0;
									var n = e.url;
									this._config.reuseRedirectedURL && (null != this._currentRedirectedURL ? n = this._currentRedirectedURL : null != e.redirectedURL && (n = e.redirectedURL));
									var r = this._seekHandler.getConfig(n, t);
									this._currentRequestURL = r.url;
									var i = this._xhr = new XMLHttpRequest;
									if (i.open("GET", r.url, !0), i.responseType = "arraybuffer", i.onreadystatechange = this._onReadyStateChange.bind(this), i.onprogress = this._onProgress.bind(this), i.onload = this._onLoad.bind(this), i.onerror = this._onXhrError.bind(this), e.withCredentials && i.withCredentials && (i.withCredentials = !0), "object" === s(r.headers)) {
										var a = r.headers;
										for (var o in a) a.hasOwnProperty(o) && i.setRequestHeader(o, a[o])
									}
									i.send()
								}
							}, {
								key : "abort",
								value : function() {
									this._requestAbort = !0, this._internalAbort(), this.status = u.LoaderStatus.kComplete
								}
							}, {
								key : "_internalAbort",
								value : function() {
									this._xhr && (this._xhr.onreadystatechange = null, this._xhr.onprogress = null, this._xhr.onload = null, this._xhr.onerror = null, this._xhr.abort(), this._xhr = null)
								}
							}, {
								key : "_onReadyStateChange",
								value : function(e) {
									var t = e.target;
									if (2 === t.readyState) {
										if (null != t.responseURL) {
											var n = this._seekHandler.removeURLParameters(t.responseURL);
											t.responseURL !== this._currentRequestURL && n !== this._currentRedirectedURL && (this._currentRedirectedURL = n, this._onURLRedirect && this._onURLRedirect(n))
										}
										if (200 <= t.status && t.status <= 299) {
											if (this._waitForTotalLength) return;
											this.status = u.LoaderStatus.kBuffering
										} else {
											if (this.status = u.LoaderStatus.kError, !this._onError)
												throw new l.RuntimeException("RangeLoader: Http code invalid, " + t.status + " " + t.statusText);
											this._onError(u.LoaderErrors.HTTP_STATUS_CODE_INVALID, {
												code : t.status,
												msg : t.statusText
											})
										}
									}
								}
							}, {
								key : "_onProgress",
								value : function(e) {
									if (this.status !== u.LoaderStatus.kError) {
										if (null === this._contentLength) {
											var t = !1;
											if (this._waitForTotalLength) {
												this._waitForTotalLength = !1, t = this._totalLengthReceived = !0;
												var n = e.total;
												this._internalAbort(), null != n & 0 !== n && (this._totalLength = n)
											}
											if (-1 === this._range.to ? this._contentLength = this._totalLength - this._range.from : this._contentLength = this._range.to - this._range.from + 1, t) return void this._openSubRange();
											this._onContentLengthKnown && this._onContentLengthKnown(this._contentLength)
										}
										var r = e.loaded - this._lastTimeLoaded;
										this._lastTimeLoaded = e.loaded, this._speedSampler.addBytes(r)
									}
								}
							}, {
								key : "_normalizeSpeed",
								value : function(e) {
									var t = this._chunkSizeKBList,
										n = t.length - 1,
										r = 0,
										i = 0,
										a = n;
									if (e < t[0]) return t[0];
									for (; i <= a;) {
										if ((r = i + Math.floor((a - i) / 2)) === n || e >= t[r] && e < t[r + 1]) return t[r];
										t[r] < e ? i = r + 1 : a = r - 1
									}
								}
							}, {
								key : "_onLoad",
								value : function(e) {
									if (this.status !== u.LoaderStatus.kError)
										if (this._waitForTotalLength)
											this._waitForTotalLength = !1;else {
											this._lastTimeLoaded = 0;
											var t = this._speedSampler.lastSecondKBps;
											if (0 === t && (this._zeroSpeedChunkCount++, 3 <= this._zeroSpeedChunkCount && (t = this._speedSampler.currentKBps)), 0 !== t) {
												var n = this._normalizeSpeed(t);
												this._currentSpeedNormalized !== n && (this._currentSpeedNormalized = n, this._currentChunkSizeKB = n)
											}
											var r = e.target.response,
												i = this._range.from + this._receivedLength;
											this._receivedLength += r.byteLength;
											var a = !1;
											null != this._contentLength && this._receivedLength < this._contentLength ? this._openSubRange() : a = !0, this._onDataArrival && this._onDataArrival(r, i, this._receivedLength), a && (this.status = u.LoaderStatus.kComplete, this._onComplete && this._onComplete(this._range.from, this._range.from + this._receivedLength - 1))
									}
								}
							}, {
								key : "_onXhrError",
								value : function(e) {
									this.status = u.LoaderStatus.kError;
									var t = 0,
										n = null;
									if (n = this._contentLength && 0 < this._receivedLength && this._receivedLength < this._contentLength ? (t = u.LoaderErrors.EARLY_EOF, {
											code : -1,
											msg : "RangeLoader meet Early-Eof"
										}) : (t = u.LoaderErrors.EXCEPTION, {
											code : -1,
											msg : e.constructor.name + " " + e.type
										}), !this._onError)
										throw new l.RuntimeException(n.msg);
									this._onError(t, n)
								}
							}, {
								key : "currentSpeed",
								get : function() {
									return this._speedSampler.lastSecondKBps
								}
							} ]), r
					}();
					n.default = d
				}, {
					"../utils/exception.js" : 40,
					"../utils/logger.js" : 41,
					"./loader.js" : 24,
					"./speed-sampler.js" : 27
				} ],
				32 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var i = "function" == typeof Symbol && "symbol" === q(Symbol.iterator) ? function(e) {
							return q(e)
						} : function(e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : q(e)
						},
						a = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						o = r(e("events")),
						s = r(e("../utils/logger.js")),
						u = r(e("../utils/browser.js")),
						l = e("./player-events.js"),
						d = r(l),
						f = r(e("../core/transmuxer.js")),
						c = r(e("../core/transmuxing-events.js")),
						h = r(e("../core/mse-controller.js")),
						p = r(e("../core/mse-events.js")),
						g = e("./player-errors.js"),
						m = e("../config.js"),
						_ = e("../utils/exception.js");
					function r(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					var v = function() {
						function r(e, t) {
							if (function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								}(this, r), this.TAG = "FlvPlayer", this._type = "FlvPlayer", this._emitter = new o.default, this._createdTime = Date.now(), this._config = (0, m.createDefaultConfig)(), "object" === (void 0 === t ? "undefined" : i(t)) && Object.assign(this._config, t), "flv" !== e.type.toLowerCase())
								throw new _.InvalidArgumentException("FlvPlayer requires an flv MediaDataSource input!");
							!0 === e.isLive && (this._config.isLive = !0), this.e = {
								onvLoadedMetadata : this._onvLoadedMetadata.bind(this),
								onvSeeking : this._onvSeeking.bind(this),
								onvCanPlay : this._onvCanPlay.bind(this),
								onvStalled : this._onvStalled.bind(this),
								onvProgress : this._onvProgress.bind(this)
							}, self.performance && self.performance.now ? this._now = self.performance.now.bind(self.performance) : this._now = Date.now, this._pendingSeekTime = null, this._requestSetTime = !1, this._seekpointRecord = null, this._progressChecker = null, this._mediaDataSource = e, this._mediaElement = null, this._msectl = null, this._transmuxer = null, this._mseSourceOpened = !1, this._hasPendingLoad = !1, this._receivedCanPlay = !1, this._mediaInfo = null, this._statisticsInfo = null;var n = u.default.chrome && (u.default.version.major < 50 || 50 === u.default.version.major && u.default.version.build < 2661);
							this._alwaysSeekKeyframe = !!(n || u.default.msedge || u.default.msie), this._alwaysSeekKeyframe && (this._config.accurateSeek = !1)
						}
						return a(r, [ {
								key : "destroy",
								value : function() {
									null != this._progressChecker && (window.clearInterval(this._progressChecker), this._progressChecker = null), this._transmuxer && this.unload(), this._mediaElement && this.detachMediaElement(), this.e = null, this._mediaDataSource = null, this._emitter.removeAllListeners(), this._emitter = null
								}
							}, {
								key : "on",
								value : function(e, t) {
									var n = this;
									e === d.default.MEDIA_INFO ? null != this._mediaInfo && Promise.resolve().then(function() {
										n._emitter.emit(d.default.MEDIA_INFO, n.mediaInfo)
									}) : e === d.default.STATISTICS_INFO && null != this._statisticsInfo && Promise.resolve().then(function() {
										n._emitter.emit(d.default.STATISTICS_INFO, n.statisticsInfo)
									}), this._emitter.addListener(e, t)
								}
							}, {
								key : "one",
								value : function(e, t) {
									this._emitter.once(e, t)
								}
							}, {
								key : "off",
								value : function(e, t) {
									this._emitter.removeListener(e, t)
								}
							}, {
								key : "attachMediaElement",
								value : function(e) {
									var t = this;
									if ((this._mediaElement = e).addEventListener("loadedmetadata", this.e.onvLoadedMetadata), e.addEventListener("seeking", this.e.onvSeeking), e.addEventListener("canplay", this.e.onvCanPlay), e.addEventListener("stalled", this.e.onvStalled), e.addEventListener("progress", this.e.onvProgress), this._msectl = new h.default(this._config), this._msectl.on(p.default.UPDATE_END, this._onmseUpdateEnd.bind(this)), this._msectl.on(p.default.BUFFER_FULL, this._onmseBufferFull.bind(this)), this._msectl.on(p.default.SOURCE_OPEN, function() {
											t._mseSourceOpened = !0, t._hasPendingLoad && (t._hasPendingLoad = !1, t.load())
										}), this._msectl.on(p.default.ERROR, function(e) {
											t._emitter.emit(d.default.ERROR, g.ErrorTypes.MEDIA_ERROR, g.ErrorDetails.MEDIA_MSE_ERROR, e)
										}), this._msectl.attachMediaElement(e), null != this._pendingSeekTime) try {
											e.currentTime = this._pendingSeekTime, this._pendingSeekTime = null
										} catch (e) {}
								}
							}, {
								key : "detachMediaElement",
								value : function() {
									this._mediaElement && (this._msectl.detachMediaElement(), this._mediaElement.removeEventListener("loadedmetadata", this.e.onvLoadedMetadata), this._mediaElement.removeEventListener("seeking", this.e.onvSeeking), this._mediaElement.removeEventListener("canplay", this.e.onvCanPlay), this._mediaElement.removeEventListener("stalled", this.e.onvStalled), this._mediaElement.removeEventListener("progress", this.e.onvProgress), this._mediaElement = null), this._msectl && (this._msectl.destroy(), this._msectl = null)
								}
							}, {
								key : "load",
								value : function() {
									var r = this;
									if (!this._mediaElement)
										throw new _.IllegalStateException("HTMLMediaElement must be attached before load()!");
									if (this._transmuxer)
										throw new _.IllegalStateException("FlvPlayer.load() has been called, please call unload() first!");
									this._hasPendingLoad || (this._config.deferLoadAfterSourceOpen && !1 === this._mseSourceOpened ? this._hasPendingLoad = !0 : (0 < this._mediaElement.readyState && (this._requestSetTime = !0, this._mediaElement.currentTime = 0), this._transmuxer = new f.default(this._mediaDataSource, this._config), this._transmuxer.on(c.default.INIT_SEGMENT, function(e, t) {
										r._msectl.appendInitSegment(t)
									}), this._transmuxer.on(c.default.MEDIA_SEGMENT, function(e, t) {
										if (r._msectl.appendMediaSegment(t), r._config.lazyLoad && !r._config.isLive) {
											var n = r._mediaElement.currentTime;
											t.info.endDts >= 1e3 * (n + r._config.lazyLoadMaxDuration) && null == r._progressChecker && (s.default.v(r.TAG, "Maximum buffering duration exceeded, suspend transmuxing task"), r._suspendTransmuxer())
										}
									}), this._transmuxer.on(c.default.LOADING_COMPLETE, function(e, t, n) {
										r._msectl.endOfStream(), r._emitter.emit(d.default.LOADING_COMPLETE, {
											requestUrl : n,
											metadata : r._mediaInfo ? r._mediaInfo.metadata : null,
											from : e,
											to : t
										})
									}), this._transmuxer.on(c.default.RECOVERED_EARLY_EOF, function() {
										r._emitter.emit(d.default.RECOVERED_EARLY_EOF)
									}), this._transmuxer.on(c.default.IO_ERROR, function(e, t) {
										r._emitter.emit(d.default.ERROR, g.ErrorTypes.NETWORK_ERROR, e, t)
									}), this._transmuxer.on(c.default.DEMUX_ERROR, function(e, t) {
										r._emitter.emit(d.default.ERROR, g.ErrorTypes.MEDIA_ERROR, e, {
											code : -1,
											msg : t
										})
									}), this._transmuxer.on(c.default.MEDIA_INFO, function(e) {
										r._mediaInfo = e, r._emitter.emit(d.default.MEDIA_INFO, Object.assign({}, e))
									}), this._transmuxer.on(c.default.STATISTICS_INFO, function(e) {
										r._statisticsInfo = r._fillStatisticsInfo(e), r._emitter.emit(d.default.STATISTICS_INFO, Object.assign({}, r._statisticsInfo))
									}), this._transmuxer.on(c.default.RECOMMEND_SEEKPOINT, function(e) {
										r._mediaElement && !r._config.accurateSeek && (r._requestSetTime = !0, r._mediaElement.currentTime = e / 1e3)
									}), this._transmuxer.on(l.OTHER_EVENTS_POLYMER, function(e) {
										var t;
										(t = r._emitter).emit.apply(t, [ e.eventName ].concat(function(e) {
											if (Array.isArray(e)) {
												for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
												return n
											}
											return Array.from(e)
										}(e.eventParams)))
									}), this._transmuxer.open()))
								}
							}, {
								key : "unload",
								value : function() {
									this._mediaElement && this._mediaElement.pause(), this._msectl && this._msectl.seek(0), this._transmuxer && (this._transmuxer.close(), this._transmuxer.destroy(), this._transmuxer = null)
								}
							}, {
								key : "play",
								value : function() {
									return this._mediaElement.play()
								}
							}, {
								key : "pause",
								value : function() {
									this._mediaElement.pause()
								}
							}, {
								key : "_fillStatisticsInfo",
								value : function(e) {
									if (e.playerType = this._type, !(this._mediaElement instanceof HTMLVideoElement)) return e;
									var t = !0,
										n = 0,
										r = 0;
									if (this._mediaElement.getVideoPlaybackQuality) {
										var i = this._mediaElement.getVideoPlaybackQuality();
										n = i.totalVideoFrames, r = i.droppedVideoFrames
									} else
										null != this._mediaElement.webkitDecodedFrameCount ? (n = this._mediaElement.webkitDecodedFrameCount, r = this._mediaElement.webkitDroppedFrameCount) : t = !1;
									return t && (e.decodedFrames = n, e.droppedFrames = r), e
								}
							}, {
								key : "_onmseUpdateEnd",
								value : function() {
									if (this._config.lazyLoad && !this._config.isLive) {
										for (var e = this._mediaElement.buffered, t = this._mediaElement.currentTime, n = 0, r = 0; r < e.length; r++) {
											var i = e.start(r),
												a = e.end(r);
											if (i <= t && t < a) {
												i, n = a;break
											}
										}
										n >= t + this._config.lazyLoadMaxDuration && null == this._progressChecker && (s.default.v(this.TAG, "Maximum buffering duration exceeded, suspend transmuxing task"), this._suspendTransmuxer())
									}
								}
							}, {
								key : "_onmseBufferFull",
								value : function() {
									s.default.v(this.TAG, "MSE SourceBuffer is full, suspend transmuxing task"), null == this._progressChecker && this._suspendTransmuxer()
								}
							}, {
								key : "_suspendTransmuxer",
								value : function() {
									this._transmuxer && (this._transmuxer.pause(), null == this._progressChecker && (this._progressChecker = window.setInterval(this._checkProgressAndResume.bind(this), 1e3)))
								}
							}, {
								key : "_checkProgressAndResume",
								value : function() {
									for (var e = this._mediaElement.currentTime, t = this._mediaElement.buffered, n = !1, r = 0; r < t.length; r++) {
										var i = t.start(r),
											a = t.end(r);
										if (i <= e && e < a) {
											e >= a - this._config.lazyLoadRecoverDuration && (n = !0);break
										}
									}
									n && (window.clearInterval(this._progressChecker), this._progressChecker = null, n && (s.default.v(this.TAG, "Continue loading from paused position"), this._transmuxer.resume()))
								}
							}, {
								key : "_isTimepointBuffered",
								value : function(e) {
									for (var t = this._mediaElement.buffered, n = 0; n < t.length; n++) {
										var r = t.start(n),
											i = t.end(n);
										if (r <= e && e < i) return !0
									}
									return !1
								}
							}, {
								key : "_internalSeek",
								value : function(e) {
									var t = this._isTimepointBuffered(e),
										n = !1,
										r = 0;
									if (e < 1 && 0 < this._mediaElement.buffered.length) {
										var i = this._mediaElement.buffered.start(0);
										(i < 1 && e < i || u.default.safari) && (n = !0, r = u.default.safari ? .1 : i)
									}
									if (n) this._requestSetTime = !0, this._mediaElement.currentTime = r;
									else if (t) {
										if (this._alwaysSeekKeyframe) {
											var a = this._msectl.getNearestKeyframe(Math.floor(1e3 * e));
											this._requestSetTime = !0, this._mediaElement.currentTime = null != a ? a.dts / 1e3 : e
										} else this._requestSetTime = !0, this._mediaElement.currentTime = e;
										null != this._progressChecker && this._checkProgressAndResume()
									} else null != this._progressChecker && (window.clearInterval(this._progressChecker), this._progressChecker = null), this._msectl.seek(e), this._transmuxer.seek(Math.floor(1e3 * e)), this._config.accurateSeek && (this._requestSetTime = !0, this._mediaElement.currentTime = e)
								}
							}, {
								key : "_checkAndApplyUnbufferedSeekpoint",
								value : function() {
									if (this._seekpointRecord)
										if (this._seekpointRecord.recordTime <= this._now() - 100) {
											var e = this._mediaElement.currentTime;
											this._seekpointRecord = null, this._isTimepointBuffered(e) || (null != this._progressChecker && (window.clearTimeout(this._progressChecker), this._progressChecker = null), this._msectl.seek(e), this._transmuxer.seek(Math.floor(1e3 * e)), this._config.accurateSeek && (this._requestSetTime = !0, this._mediaElement.currentTime = e))
										} else window.setTimeout(this._checkAndApplyUnbufferedSeekpoint.bind(this), 50)
								}
							}, {
								key : "_checkAndResumeStuckPlayback",
								value : function(e) {
									var t = this._mediaElement;
									if (e || !this._receivedCanPlay || t.readyState < 2) {
										var n = t.buffered;
										0 < n.length && t.currentTime < n.start(0) && (s.default.w(this.TAG, "Playback seems stuck at " + t.currentTime + ", seek to " + n.start(0)), this._requestSetTime = !0, this._mediaElement.currentTime = n.start(0), this._mediaElement.removeEventListener("progress", this.e.onvProgress))
									} else this._mediaElement.removeEventListener("progress", this.e.onvProgress)
								}
							}, {
								key : "_onvLoadedMetadata",
								value : function(e) {
									null != this._pendingSeekTime && (this._mediaElement.currentTime = this._pendingSeekTime, this._pendingSeekTime = null)
								}
							}, {
								key : "_onvSeeking",
								value : function(e) {
									var t = this._mediaElement.currentTime,
										n = this._mediaElement.buffered;
									if (this._requestSetTime)
										this._requestSetTime = !1;else {
										if (t < 1 && 0 < n.length) {
											var r = n.start(0);
											if (r < 1 && t < r || u.default.safari) return this._requestSetTime = !0, void (this._mediaElement.currentTime = u.default.safari ? .1 : r)
										}
										if (this._isTimepointBuffered(t)) {
											if (this._alwaysSeekKeyframe) {
												var i = this._msectl.getNearestKeyframe(Math.floor(1e3 * t));
												null != i && (this._requestSetTime = !0, this._mediaElement.currentTime = i.dts / 1e3)
											}
											null != this._progressChecker && this._checkProgressAndResume()
										} else this._seekpointRecord = {
												seekPoint : t,
												recordTime : this._now()
											}, window.setTimeout(this._checkAndApplyUnbufferedSeekpoint.bind(this), 50)
									}
								}
							}, {
								key : "_onvCanPlay",
								value : function(e) {
									this._receivedCanPlay = !0, this._mediaElement.removeEventListener("canplay", this.e.onvCanPlay)
								}
							}, {
								key : "_onvStalled",
								value : function(e) {
									this._checkAndResumeStuckPlayback(!0)
								}
							}, {
								key : "_onvProgress",
								value : function(e) {
									this._checkAndResumeStuckPlayback()
								}
							}, {
								key : "type",
								get : function() {
									return this._type
								}
							}, {
								key : "buffered",
								get : function() {
									return this._mediaElement.buffered
								}
							}, {
								key : "duration",
								get : function() {
									return this._mediaElement.duration
								}
							}, {
								key : "volume",
								get : function() {
									return this._mediaElement.volume
								},
								set : function(e) {
									this._mediaElement.volume = e
								}
							}, {
								key : "muted",
								get : function() {
									return this._mediaElement.muted
								},
								set : function(e) {
									this._mediaElement.muted = e
								}
							}, {
								key : "currentTime",
								get : function() {
									return this._mediaElement ? this._mediaElement.currentTime : 0
								},
								set : function(e) {
									this._mediaElement ? this._internalSeek(e) : this._pendingSeekTime = e
								}
							}, {
								key : "mediaInfo",
								get : function() {
									return Object.assign({}, this._mediaInfo)
								}
							}, {
								key : "statisticsInfo",
								get : function() {
									return null == this._statisticsInfo && (this._statisticsInfo = {}), this._statisticsInfo = this._fillStatisticsInfo(this._statisticsInfo), Object.assign({}, this._statisticsInfo)
								}
							}, {
								key : "createdTime",
								get : function() {
									return this._createdTime
								}
							} ]), r
					}();
					n.default = v
				}, {
					"../config.js" : 5,
					"../core/mse-controller.js" : 9,
					"../core/mse-events.js" : 10,
					"../core/transmuxer.js" : 11,
					"../core/transmuxing-events.js" : 13,
					"../utils/browser.js" : 39,
					"../utils/exception.js" : 40,
					"../utils/logger.js" : 41,
					"./player-errors.js" : 34,
					"./player-events.js" : 35,
					events : 2
				} ],
				33 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = "function" == typeof Symbol && "symbol" === q(Symbol.iterator) ? function(e) {
							return q(e)
						} : function(e) {
							return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : q(e)
						},
						i = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						a = l(e("events")),
						o = l(e("./player-events.js")),
						s = e("../config.js"),
						u = e("../utils/exception.js");
					function l(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					var d = function() {
						function n(e, t) {
							if (function(e, t) {
									if (!(e instanceof t))
										throw new TypeError("Cannot call a class as a function")
								}(this, n), this.TAG = "NativePlayer", this._type = "NativePlayer", this._emitter = new a.default, this._createdTime = Date.now(), this._config = (0, s.createDefaultConfig)(), "object" === (void 0 === t ? "undefined" : r(t)) && Object.assign(this._config, t), "flv" === e.type.toLowerCase())
								throw new u.InvalidArgumentException("NativePlayer does't support flv MediaDataSource input!");
							if (e.hasOwnProperty("segments"))
								throw new u.InvalidArgumentException("NativePlayer(" + e.type + ") doesn't support multipart playback!");
							this.e = {
								onvLoadedMetadata : this._onvLoadedMetadata.bind(this)
							}, this._pendingSeekTime = null, this._statisticsReporter = null, this._mediaDataSource = e, this._mediaElement = null
						}
						return i(n, [ {
								key : "destroy",
								value : function() {
									this._mediaElement && (this.unload(), this.detachMediaElement()), this.e = null, this._mediaDataSource = null, this._emitter.removeAllListeners(), this._emitter = null
								}
							}, {
								key : "on",
								value : function(e, t) {
									var n = this;
									e === o.default.MEDIA_INFO ? null != this._mediaElement && 0 !== this._mediaElement.readyState && Promise.resolve().then(function() {
										n._emitter.emit(o.default.MEDIA_INFO, n.mediaInfo)
									}) : e === o.default.STATISTICS_INFO && null != this._mediaElement && 0 !== this._mediaElement.readyState && Promise.resolve().then(function() {
										n._emitter.emit(o.default.STATISTICS_INFO, n.statisticsInfo)
									}), this._emitter.addListener(e, t)
								}
							}, {
								key : "one",
								value : function(e, t) {
									this._emitter.once(e, t)
								}
							}, {
								key : "off",
								value : function(e, t) {
									this._emitter.removeListener(e, t)
								}
							}, {
								key : "attachMediaElement",
								value : function(e) {
									if ((this._mediaElement = e).addEventListener("loadedmetadata", this.e.onvLoadedMetadata), null != this._pendingSeekTime) try {
											e.currentTime = this._pendingSeekTime, this._pendingSeekTime = null
										} catch (e) {}
								}
							}, {
								key : "detachMediaElement",
								value : function() {
									this._mediaElement && (this._mediaElement.src = "", this._mediaElement.removeAttribute("src"), this._mediaElement.removeEventListener("loadedmetadata", this.e.onvLoadedMetadata), this._mediaElement = null), null != this._statisticsReporter && (window.clearInterval(this._statisticsReporter), this._statisticsReporter = null)
								}
							}, {
								key : "load",
								value : function() {
									if (!this._mediaElement)
										throw new u.IllegalStateException("HTMLMediaElement must be attached before load()!");
									this._mediaElement.src = this._mediaDataSource.url, 0 < this._mediaElement.readyState && (this._mediaElement.currentTime = 0), this._mediaElement.preload = "auto", this._mediaElement.load(), this._statisticsReporter = window.setInterval(this._reportStatisticsInfo.bind(this), this._config.statisticsInfoReportInterval)
								}
							}, {
								key : "unload",
								value : function() {
									this._mediaElement && (this._mediaElement.src = "", this._mediaElement.removeAttribute("src")), null != this._statisticsReporter && (window.clearInterval(this._statisticsReporter), this._statisticsReporter = null)
								}
							}, {
								key : "play",
								value : function() {
									return this._mediaElement.play()
								}
							}, {
								key : "pause",
								value : function() {
									this._mediaElement.pause()
								}
							}, {
								key : "_onvLoadedMetadata",
								value : function(e) {
									null != this._pendingSeekTime && (this._mediaElement.currentTime = this._pendingSeekTime, this._pendingSeekTime = null), this._emitter.emit(o.default.MEDIA_INFO, this.mediaInfo)
								}
							}, {
								key : "_reportStatisticsInfo",
								value : function() {
									this._emitter.emit(o.default.STATISTICS_INFO, this.statisticsInfo)
								}
							}, {
								key : "type",
								get : function() {
									return this._type
								}
							}, {
								key : "buffered",
								get : function() {
									return this._mediaElement.buffered
								}
							}, {
								key : "duration",
								get : function() {
									return this._mediaElement.duration
								}
							}, {
								key : "volume",
								get : function() {
									return this._mediaElement.volume
								},
								set : function(e) {
									this._mediaElement.volume = e
								}
							}, {
								key : "muted",
								get : function() {
									return this._mediaElement.muted
								},
								set : function(e) {
									this._mediaElement.muted = e
								}
							}, {
								key : "currentTime",
								get : function() {
									return this._mediaElement ? this._mediaElement.currentTime : 0
								},
								set : function(e) {
									this._mediaElement ? this._mediaElement.currentTime = e : this._pendingSeekTime = e
								}
							}, {
								key : "mediaInfo",
								get : function() {
									var e = {
										mimeType : (this._mediaElement instanceof HTMLAudioElement ? "audio/" : "video/") + this._mediaDataSource.type
									};
									return this._mediaElement && (e.duration = Math.floor(1e3 * this._mediaElement.duration), this._mediaElement instanceof HTMLVideoElement && (e.width = this._mediaElement.videoWidth, e.height = this._mediaElement.videoHeight)), e
								}
							}, {
								key : "statisticsInfo",
								get : function() {
									var e = {
										playerType : this._type,
										url : this._mediaDataSource.url
									};
									if (!(this._mediaElement instanceof HTMLVideoElement)) return e;
									var t = !0,
										n = 0,
										r = 0;
									if (this._mediaElement.getVideoPlaybackQuality) {
										var i = this._mediaElement.getVideoPlaybackQuality();
										n = i.totalVideoFrames, r = i.droppedVideoFrames
									} else
										null != this._mediaElement.webkitDecodedFrameCount ? (n = this._mediaElement.webkitDecodedFrameCount, r = this._mediaElement.webkitDroppedFrameCount) : t = !1;
									return t && (e.decodedFrames = n, e.droppedFrames = r), e
								}
							}, {
								key : "createdTime",
								get : function() {
									return this._createdTime
								}
							} ]), n
					}();
					n.default = d
				}, {
					"../config.js" : 5,
					"../utils/exception.js" : 40,
					"./player-events.js" : 35,
					events : 2
				} ],
				34 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					}), n.ErrorDetails = n.ErrorTypes = void 0;
					var r,
						i = e("../io/loader.js"),
						a = e("../demux/demux-errors.js"),
						o = (r = a) && r.__esModule ? r : {
							default : r
						};
					n.ErrorTypes = {
						NETWORK_ERROR : "NetworkError",
						MEDIA_ERROR : "MediaError",
						OTHER_ERROR : "OtherError"
					}, n.ErrorDetails = {
						NETWORK_EXCEPTION : i.LoaderErrors.EXCEPTION,
						NETWORK_STATUS_CODE_INVALID : i.LoaderErrors.HTTP_STATUS_CODE_INVALID,
						NETWORK_TIMEOUT : i.LoaderErrors.CONNECTING_TIMEOUT,
						NETWORK_UNRECOVERABLE_EARLY_EOF : i.LoaderErrors.UNRECOVERABLE_EARLY_EOF,
						MEDIA_MSE_ERROR : "MediaMSEError",
						MEDIA_FORMAT_ERROR : o.default.FORMAT_ERROR,
						MEDIA_FORMAT_UNSUPPORTED : o.default.FORMAT_UNSUPPORTED,
						MEDIA_CODEC_UNSUPPORTED : o.default.CODEC_UNSUPPORTED
					}
				}, {
					"../demux/demux-errors.js" : 16,
					"../io/loader.js" : 24
				} ],
				35 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					n.OTHER_EVENTS_POLYMER = "other_events_polymer";
					n.default = {
						ERROR : "error",
						LOADING_COMPLETE : "loading_complete",
						RECOVERED_EARLY_EOF : "recovered_early_eof",
						MEDIA_INFO : "media_info",
						STATISTICS_INFO : "statistics_info",
						HTTP_REQUEST_ENDED : "http_request_ended",
						HTTP_HEADER_RECEIVED : "http_header_received",
						AUDIO_FRAME_DECODED : "audio_frame_decoded",
						VIDEO_FRAME_DECODED : "video_frame_decoded"
					}
				}, {} ],
				36 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
						function r(e, t) {
							for (var n = 0; n < t.length; n++) {
								var r = t[n];
								r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
							}
						}
						return function(e, t, n) {
							return t && r(e.prototype, t), n && r(e, n), e
						}
					}();
					var i = function() {
						function e() {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, e)
						}
						return r(e, null, [ {
								key : "getSilentFrame",
								value : function(e, t) {
									if ("mp4a.40.2" === e) {
										if (1 === t) return new Uint8Array([ 0, 200, 0, 128, 35, 128 ]);
										if (2 === t) return new Uint8Array([ 33, 0, 73, 144, 2, 25, 0, 35, 128 ]);
										if (3 === t) return new Uint8Array([ 0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142 ]);
										if (4 === t) return new Uint8Array([ 0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56 ]);
										if (5 === t) return new Uint8Array([ 0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56 ]);
										if (6 === t) return new Uint8Array([ 0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224 ])
									} else {
										if (1 === t) return new Uint8Array([ 1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94 ]);
										if (2 === t) return new Uint8Array([ 1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94 ]);
										if (3 === t) return new Uint8Array([ 1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94 ])
									}
									return null
								}
							} ]), e
					}();
					n.default = i
				}, {} ],
				37 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
						function r(e, t) {
							for (var n = 0; n < t.length; n++) {
								var r = t[n];
								r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
							}
						}
						return function(e, t, n) {
							return t && r(e.prototype, t), n && r(e, n), e
						}
					}();
					var i = function() {
						function f() {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, f)
						}
						return r(f, null, [ {
								key : "init",
								value : function() {
									for (var e in f.types = {
											avc1 : [],
											avcC : [],
											btrt : [],
											dinf : [],
											dref : [],
											esds : [],
											ftyp : [],
											hdlr : [],
											mdat : [],
											mdhd : [],
											mdia : [],
											mfhd : [],
											minf : [],
											moof : [],
											moov : [],
											mp4a : [],
											mvex : [],
											mvhd : [],
											sdtp : [],
											stbl : [],
											stco : [],
											stsc : [],
											stsd : [],
											stsz : [],
											stts : [],
											tfdt : [],
											tfhd : [],
											traf : [],
											trak : [],
											trun : [],
											trex : [],
											tkhd : [],
											vmhd : [],
											smhd : [],
											".mp3" : []
									}) f.types.hasOwnProperty(e) && (f.types[e] = [ e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3) ]);
									var t = f.constants = {};
									t.FTYP = new Uint8Array([ 105, 115, 111, 109, 0, 0, 0, 1, 105, 115, 111, 109, 97, 118, 99, 49 ]), t.STSD_PREFIX = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 1 ]), t.STTS = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]), t.STSC = t.STCO = t.STTS, t.STSZ = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]), t.HDLR_VIDEO = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0 ]), t.HDLR_AUDIO = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0 ]), t.DREF = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1 ]), t.SMHD = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0 ]), t.VMHD = new Uint8Array([ 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 ])
								}
							}, {
								key : "box",
								value : function(e) {
									for (var t = 8, n = null, r = Array.prototype.slice.call(arguments, 1), i = r.length, a = 0; a < i; a++) t += r[a].byteLength;
									(n = new Uint8Array(t))[0] = t >>> 24 & 255, n[1] = t >>> 16 & 255, n[2] = t >>> 8 & 255, n[3] = 255 & t, n.set(e, 4);
									for (var o = 8, s = 0; s < i; s++) n.set(r[s], o), o += r[s].byteLength;
									return n
								}
							}, {
								key : "generateInitSegment",
								value : function(e) {
									var t = f.box(f.types.ftyp, f.constants.FTYP),
										n = f.moov(e),
										r = new Uint8Array(t.byteLength + n.byteLength);
									return r.set(t, 0), r.set(n, t.byteLength), r
								}
							}, {
								key : "moov",
								value : function(e) {
									var t = f.mvhd(e.timescale, e.duration),
										n = f.trak(e),
										r = f.mvex(e);
									return f.box(f.types.moov, t, n, r)
								}
							}, {
								key : "mvhd",
								value : function(e, t) {
									return f.box(f.types.mvhd, new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, e >>> 24 & 255, e >>> 16 & 255, e >>> 8 & 255, 255 & e, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255 ]))
								}
							}, {
								key : "trak",
								value : function(e) {
									return f.box(f.types.trak, f.tkhd(e), f.mdia(e))
								}
							}, {
								key : "tkhd",
								value : function(e) {
									var t = e.id,
										n = e.duration,
										r = e.presentWidth,
										i = e.presentHeight;
									return f.box(f.types.tkhd, new Uint8Array([ 0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, 0, 0, 0, 0, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, r >>> 8 & 255, 255 & r, 0, 0, i >>> 8 & 255, 255 & i, 0, 0 ]))
								}
							}, {
								key : "mdia",
								value : function(e) {
									return f.box(f.types.mdia, f.mdhd(e), f.hdlr(e), f.minf(e))
								}
							}, {
								key : "mdhd",
								value : function(e) {
									var t = e.timescale,
										n = e.duration;
									return f.box(f.types.mdhd, new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, 85, 196, 0, 0 ]))
								}
							}, {
								key : "hdlr",
								value : function(e) {
									var t = null;
									return t = "audio" === e.type ? f.constants.HDLR_AUDIO : f.constants.HDLR_VIDEO, f.box(f.types.hdlr, t)
								}
							}, {
								key : "minf",
								value : function(e) {
									var t = null;
									return t = "audio" === e.type ? f.box(f.types.smhd, f.constants.SMHD) : f.box(f.types.vmhd, f.constants.VMHD), f.box(f.types.minf, t, f.dinf(), f.stbl(e))
								}
							}, {
								key : "dinf",
								value : function() {
									return f.box(f.types.dinf, f.box(f.types.dref, f.constants.DREF))
								}
							}, {
								key : "stbl",
								value : function(e) {
									return f.box(f.types.stbl, f.stsd(e), f.box(f.types.stts, f.constants.STTS), f.box(f.types.stsc, f.constants.STSC), f.box(f.types.stsz, f.constants.STSZ), f.box(f.types.stco, f.constants.STCO))
								}
							}, {
								key : "stsd",
								value : function(e) {
									return "audio" === e.type ? "mp3" === e.codec ? f.box(f.types.stsd, f.constants.STSD_PREFIX, f.mp3(e)) : f.box(f.types.stsd, f.constants.STSD_PREFIX, f.mp4a(e)) : f.box(f.types.stsd, f.constants.STSD_PREFIX, f.avc1(e))
								}
							}, {
								key : "mp3",
								value : function(e) {
									var t = e.channelCount,
										n = e.audioSampleRate,
										r = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, t, 0, 16, 0, 0, 0, 0, n >>> 8 & 255, 255 & n, 0, 0 ]);
									return f.box(f.types[".mp3"], r)
								}
							}, {
								key : "mp4a",
								value : function(e) {
									var t = e.channelCount,
										n = e.audioSampleRate,
										r = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, t, 0, 16, 0, 0, 0, 0, n >>> 8 & 255, 255 & n, 0, 0 ]);
									return f.box(f.types.mp4a, r, f.esds(e))
								}
							}, {
								key : "esds",
								value : function(e) {
									var t = e.config || [],
										n = t.length,
										r = new Uint8Array([ 0, 0, 0, 0, 3, 23 + n, 0, 1, 0, 4, 15 + n, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5 ].concat([ n ]).concat(t).concat([ 6, 1, 2 ]));
									return f.box(f.types.esds, r)
								}
							}, {
								key : "avc1",
								value : function(e) {
									var t = e.avcc,
										n = e.codecWidth,
										r = e.codecHeight,
										i = new Uint8Array([ 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, n >>> 8 & 255, 255 & n, r >>> 8 & 255, 255 & r, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 10, 120, 113, 113, 47, 102, 108, 118, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 255, 255 ]);
									return f.box(f.types.avc1, i, f.box(f.types.avcC, t))
								}
							}, {
								key : "mvex",
								value : function(e) {
									return f.box(f.types.mvex, f.trex(e))
								}
							}, {
								key : "trex",
								value : function(e) {
									var t = e.id,
										n = new Uint8Array([ 0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1 ]);
									return f.box(f.types.trex, n)
								}
							}, {
								key : "moof",
								value : function(e, t) {
									return f.box(f.types.moof, f.mfhd(e.sequenceNumber), f.traf(e, t))
								}
							}, {
								key : "mfhd",
								value : function(e) {
									var t = new Uint8Array([ 0, 0, 0, 0, e >>> 24 & 255, e >>> 16 & 255, e >>> 8 & 255, 255 & e ]);
									return f.box(f.types.mfhd, t)
								}
							}, {
								key : "traf",
								value : function(e, t) {
									var n = e.id,
										r = f.box(f.types.tfhd, new Uint8Array([ 0, 0, 0, 0, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n ])),
										i = f.box(f.types.tfdt, new Uint8Array([ 0, 0, 0, 0, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t ])),
										a = f.sdtp(e),
										o = f.trun(e, a.byteLength + 16 + 16 + 8 + 16 + 8 + 8);
									return f.box(f.types.traf, r, i, o, a)
								}
							}, {
								key : "sdtp",
								value : function(e) {
									for (var t = e.samples || [], n = t.length, r = new Uint8Array(4 + n), i = 0; i < n; i++) {
										var a = t[i].flags;
										r[i + 4] = a.isLeading << 6 | a.dependsOn << 4 | a.isDependedOn << 2 | a.hasRedundancy
									}
									return f.box(f.types.sdtp, r)
								}
							}, {
								key : "trun",
								value : function(e, t) {
									var n = e.samples || [],
										r = n.length,
										i = 12 + 16 * r,
										a = new Uint8Array(i);
									t += 8 + i, a.set([ 0, 0, 15, 1, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r, t >>> 24 & 255, t >>> 16 & 255, t >>> 8 & 255, 255 & t ], 0);
									for (var o = 0; o < r; o++) {
										var s = n[o].duration,
											u = n[o].size,
											l = n[o].flags,
											d = n[o].cts;
										a.set([ s >>> 24 & 255, s >>> 16 & 255, s >>> 8 & 255, 255 & s, u >>> 24 & 255, u >>> 16 & 255, u >>> 8 & 255, 255 & u, l.isLeading << 2 | l.dependsOn, l.isDependedOn << 6 | l.hasRedundancy << 4 | l.isNonSync, 0, 0, d >>> 24 & 255, d >>> 16 & 255, d >>> 8 & 255, 255 & d ], 12 + 16 * o)
									}
									return f.box(f.types.trun, a)
								}
							}, {
								key : "mdat",
								value : function(e) {
									return f.box(f.types.mdat, e)
								}
							} ]), f
					}();
					i.init(), n.default = i
				}, {} ],
				38 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						K = i(e("../utils/logger.js")),
						H = i(e("./mp4-generator.js")),
						Y = i(e("./aac-silent.js")),
						W = i(e("../utils/browser.js")),
						z = e("../core/media-segment-info.js"),
						a = e("../utils/exception.js");
					function i(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					var o = function() {
						function t(e) {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, t), this.TAG = "MP4Remuxer", this._config = e, this._isLive = !0 === e.isLive, this._dtsBase = -1, this._dtsBaseInited = !1, this._audioDtsBase = 1 / 0, this._videoDtsBase = 1 / 0, this._audioNextDts = void 0, this._videoNextDts = void 0, this._audioMeta = null, this._videoMeta = null, this._audioSegmentInfoList = new z.MediaSegmentInfoList("audio"), this._videoSegmentInfoList = new z.MediaSegmentInfoList("video"), this._onInitSegment = null, this._onMediaSegment = null, this._forceFirstIDR = !(!W.default.chrome || !(W.default.version.major < 50 || 50 === W.default.version.major && W.default.version.build < 2661)), this._fillSilentAfterSeek = W.default.msedge || W.default.msie, this._mp3UseMpegAudio = !W.default.firefox, this._fillAudioTimestampGap = this._config.fixAudioTimestampGap
						}
						return r(t, [ {
								key : "destroy",
								value : function() {
									this._dtsBase = -1, this._dtsBaseInited = !1, this._audioMeta = null, this._videoMeta = null, this._audioSegmentInfoList.clear(), this._audioSegmentInfoList = null, this._videoSegmentInfoList.clear(), this._videoSegmentInfoList = null, this._onInitSegment = null, this._onMediaSegment = null
								}
							}, {
								key : "bindDataSource",
								value : function(e) {
									return e.onDataAvailable = this.remux.bind(this), e.onTrackMetadata = this._onTrackMetadataReceived.bind(this), this
								}
							}, {
								key : "insertDiscontinuity",
								value : function() {
									this._audioNextDts = this._videoNextDts = void 0
								}
							}, {
								key : "seek",
								value : function(e) {
									this._videoSegmentInfoList.clear(), this._audioSegmentInfoList.clear()
								}
							}, {
								key : "remux",
								value : function(e, t) {
									if (!this._onMediaSegment)
										throw new a.IllegalStateException("MP4Remuxer: onMediaSegment callback must be specificed!");
									this._dtsBaseInited || this._calculateDtsBase(e, t), this._remuxVideo(t), this._remuxAudio(e)
								}
							}, {
								key : "_onTrackMetadataReceived",
								value : function(e, t) {
									var n = null,
										r = "mp4",
										i = t.codec;
									if ("audio" === e)
										n = "mp3" === (this._audioMeta = t).codec && this._mp3UseMpegAudio ? (r = "mpeg", i = "", new Uint8Array) : H.default.generateInitSegment(t);else {
										if ("video" !== e) return;
										this._videoMeta = t, n = H.default.generateInitSegment(t)
									}
									if (!this._onInitSegment)
										throw new a.IllegalStateException("MP4Remuxer: onInitSegment callback must be specified!");
									this._onInitSegment(e, {
										type : e,
										data : n.buffer,
										codec : i,
										container : e + "/" + r,
										mediaDuration : t.duration
									})
								}
							}, {
								key : "_calculateDtsBase",
								value : function(e, t) {
									this._dtsBaseInited || (e.samples && e.samples.length && (this._audioDtsBase = e.samples[0].dts), t.samples && t.samples.length && (this._videoDtsBase = t.samples[0].dts), this._dtsBase = Math.min(this._audioDtsBase, this._videoDtsBase), this._dtsBaseInited = !0)
								}
							}, {
								key : "_remuxAudio",
								value : function(e) {
									if (null != this._audioMeta) {
										var t,
											n = e,
											r = n.samples,
											i = void 0,
											a = -1,
											o = this._audioMeta.refSampleDuration,
											s = "mp3" === this._audioMeta.codec && this._mp3UseMpegAudio,
											u = this._dtsBaseInited && void 0 === this._audioNextDts,
											l = !1;
										if (r && 0 !== r.length) {
											var d = 0,
												f = null,
												c = 0;
											c = s ? (d = 0, n.length) : (d = 8) + n.length;
											var h = r[0].dts - this._dtsBase;
											if (this._audioNextDts)
												i = h - this._audioNextDts;
											else if (this._audioSegmentInfoList.isEmpty()) i = 0, this._fillSilentAfterSeek && !this._videoSegmentInfoList.isEmpty() && "mp3" !== this._audioMeta.originalCodec && (l = !0);else {
												var p = this._audioSegmentInfoList.getLastSampleBefore(h);
												if (null != p) {
													var g = h - (p.originalDts + p.duration);
													g <= 3 && (g = 0), i = h - (p.dts + p.duration + g)
												} else
													i = 0
											}
											if (l) {
												var m = h - i,
													_ = this._videoSegmentInfoList.getLastSegmentBefore(h);
												if (null != _ && _.beginDts < m) {
													var v = Y.default.getSilentFrame(this._audioMeta.originalCodec, this._audioMeta.channelCount);
													if (v) {
														var y = _.beginDts,
															E = m - _.beginDts;
														K.default.v(this.TAG, "InsertPrefixSilentAudio: dts: " + y + ", duration: " + E), r.unshift({
															unit : v,
															dts : y,
															pts : y
														}), c += v.byteLength
													}
												} else
													l = !1
											}
											for (var A = [], T = 0; T < r.length; T++) {
												var R = r[T],
													I = R.unit,
													S = R.dts - this._dtsBase,
													b = S - i;
												-1 === a && (a = b);var w = 0;
												if (T !== r.length - 1)
													w = r[T + 1].dts - this._dtsBase - i - b;else
													w = 1 <= A.length ? A[A.length - 1].duration : Math.floor(o);
												var C = !1,
													D = null;
												if (1.5 * o < w && "mp3" !== this._audioMeta.codec && this._fillAudioTimestampGap && !W.default.safari) {
													C = !0;
													var O = Math.abs(w - o),
														M = Math.ceil(O / o),
														N = b + o;
													K.default.w(this.TAG, "Large audio timestamp gap detected, may cause AV sync to drift. Silent frames will be generated to avoid unsync.\ndts: " + (b + w) + " ms, expected: " + (b + Math.round(o)) + " ms, delta: " + Math.round(O) + " ms, generate: " + M + " frames");
													var L = Y.default.getSilentFrame(this._audioMeta.originalCodec, this._audioMeta.channelCount);
													null == L && (K.default.w(this.TAG, "Unable to generate silent frame for " + this._audioMeta.originalCodec + " with " + this._audioMeta.channelCount + " channels, repeat last frame"), L = I), D = [];
													for (var P = 0; P < M; P++) {
														var F = Math.round(N);
														if (0 < D.length) {
															var B = D[D.length - 1];
															B.duration = F - B.dts
														}
														var x = {
															dts : F,
															pts : F,
															cts : 0,
															unit : L,
															size : L.byteLength,
															duration : 0,
															originalDts : S,
															flags : {
																isLeading : 0,
																dependsOn : 1,
																isDependedOn : 0,
																hasRedundancy : 0
															}
														};
														D.push(x), c += I.byteLength, N += o
													}
													var k = D[D.length - 1];
													k.duration = b + w - k.dts, w = Math.round(o)
												}
												A.push({
													dts : b,
													pts : b,
													cts : 0,
													unit : R.unit,
													size : R.unit.byteLength,
													duration : w,
													originalDts : S,
													flags : {
														isLeading : 0,
														dependsOn : 1,
														isDependedOn : 0,
														hasRedundancy : 0
													}
												}), C && A.push.apply(A, D)
											}
											s ? f = new Uint8Array(c) : ((f = new Uint8Array(c))[0] = c >>> 24 & 255, f[1] = c >>> 16 & 255, f[2] = c >>> 8 & 255, f[3] = 255 & c, f.set(H.default.types.mdat, 4));
											for (var U = 0; U < A.length; U++) {
												var Q = A[U].unit;
												f.set(Q, d), d += Q.byteLength
											}
											var G = A[A.length - 1];
											t = G.dts + G.duration, this._audioNextDts = t;
											var j = new z.MediaSegmentInfo;
											j.beginDts = a, j.endDts = t, j.beginPts = a, j.endPts = t, j.originalBeginDts = A[0].originalDts, j.originalEndDts = G.originalDts + G.duration, j.firstSample = new z.SampleInfo(A[0].dts, A[0].pts, A[0].duration, A[0].originalDts, !1), j.lastSample = new z.SampleInfo(G.dts, G.pts, G.duration, G.originalDts, !1), this._isLive || this._audioSegmentInfoList.append(j), n.samples = A, n.sequenceNumber++;
											var q = null;
											q = s ? new Uint8Array : H.default.moof(n, a), n.samples = [], n.length = 0;
											var V = {
												type : "audio",
												data : this._mergeBoxes(q, f).buffer,
												sampleCount : A.length,
												info : j
											};
											s && u && (V.timestampOffset = a), this._onMediaSegment("audio", V)
										}
									}
								}
							}, {
								key : "_remuxVideo",
								value : function(e) {
									if (null != this._videoMeta) {
										var t,
											n,
											r = e,
											i = r.samples,
											a = void 0,
											o = -1,
											s = -1;
										if (i && 0 !== i.length) {
											var u = 8,
												l = 8 + e.length,
												d = new Uint8Array(l);
											d[0] = l >>> 24 & 255, d[1] = l >>> 16 & 255, d[2] = l >>> 8 & 255, d[3] = 255 & l, d.set(H.default.types.mdat, 4);
											var f = i[0].dts - this._dtsBase;
											if (this._videoNextDts)
												a = f - this._videoNextDts;
											else if (this._videoSegmentInfoList.isEmpty())
												a = 0;else {
												var c = this._videoSegmentInfoList.getLastSampleBefore(f);
												if (null != c) {
													var h = f - (c.originalDts + c.duration);
													h <= 3 && (h = 0), a = f - (c.dts + c.duration + h)
												} else
													a = 0
											}
											for (var p = new z.MediaSegmentInfo, g = [], m = 0; m < i.length; m++) {
												var _ = i[m],
													v = _.dts - this._dtsBase,
													y = _.isKeyframe,
													E = v - a,
													A = _.cts,
													T = E + A;
												-1 === o && (o = E, s = T);var R = 0;
												if (m !== i.length - 1)
													R = i[m + 1].dts - this._dtsBase - a - E;else
													R = 1 <= g.length ? g[g.length - 1].duration : Math.floor(this._videoMeta.refSampleDuration);
												if (y) {
													var I = new z.SampleInfo(E, T, R, _.dts, !0);
													I.fileposition = _.fileposition, p.appendSyncPoint(I)
												}
												g.push({
													dts : E,
													pts : T,
													cts : A,
													units : _.units,
													size : _.length,
													isKeyframe : y,
													duration : R,
													originalDts : v,
													flags : {
														isLeading : 0,
														dependsOn : y ? 2 : 1,
														isDependedOn : y ? 1 : 0,
														hasRedundancy : 0,
														isNonSync : y ? 0 : 1
													}
												})
											}
											for (var S = 0; S < g.length; S++)
												for (var b = g[S].units; b.length;) {
													var w = b.shift().data;
													d.set(w, u), u += w.byteLength
											}
											var C = g[g.length - 1];
											if (t = C.dts + C.duration, n = C.pts + C.duration, this._videoNextDts = t, p.beginDts = o, p.endDts = t, p.beginPts = s, p.endPts = n, p.originalBeginDts = g[0].originalDts, p.originalEndDts = C.originalDts + C.duration, p.firstSample = new z.SampleInfo(g[0].dts, g[0].pts, g[0].duration, g[0].originalDts, g[0].isKeyframe), p.lastSample = new z.SampleInfo(C.dts, C.pts, C.duration, C.originalDts, C.isKeyframe), this._isLive || this._videoSegmentInfoList.append(p), r.samples = g, r.sequenceNumber++, this._forceFirstIDR) {
												var D = g[0].flags;
												D.dependsOn = 2, D.isNonSync = 0
											}
											var O = H.default.moof(r, o);
											r.samples = [], r.length = 0, this._onMediaSegment("video", {
												type : "video",
												data : this._mergeBoxes(O, d).buffer,
												sampleCount : g.length,
												info : p
											})
										}
									}
								}
							}, {
								key : "_mergeBoxes",
								value : function(e, t) {
									var n = new Uint8Array(e.byteLength + t.byteLength);
									return n.set(e, 0), n.set(t, e.byteLength), n
								}
							}, {
								key : "onInitSegment",
								get : function() {
									return this._onInitSegment
								},
								set : function(e) {
									this._onInitSegment = e
								}
							}, {
								key : "onMediaSegment",
								get : function() {
									return this._onMediaSegment
								},
								set : function(e) {
									this._onMediaSegment = e
								}
							} ]), t
					}();
					n.default = o
				}, {
					"../core/media-segment-info.js" : 8,
					"../utils/browser.js" : 39,
					"../utils/exception.js" : 40,
					"../utils/logger.js" : 41,
					"./aac-silent.js" : 36,
					"./mp4-generator.js" : 37
				} ],
				39 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var s = {};
					!function() {
						var e = self.navigator.userAgent.toLowerCase(),
							t = /(edge)\/([\w.]+)/.exec(e) || /(opr)[\/]([\w.]+)/.exec(e) || /(chrome)[ \/]([\w.]+)/.exec(e) || /(iemobile)[\/]([\w.]+)/.exec(e) || /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || 0 <= e.indexOf("trident") && /(rv)(?::| )([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(firefox)[ \/]([\w.]+)/.exec(e) || [],
							n = /(ipad)/.exec(e) || /(ipod)/.exec(e) || /(windows phone)/.exec(e) || /(iphone)/.exec(e) || /(kindle)/.exec(e) || /(android)/.exec(e) || /(windows)/.exec(e) || /(mac)/.exec(e) || /(linux)/.exec(e) || /(cros)/.exec(e) || [],
							r = {
								browser : t[5] || t[3] || t[1] || "",
								version : t[2] || t[4] || "0",
								majorVersion : t[4] || t[2] || "0",
								platform : n[0] || ""
							},
							i = {};
						if (r.browser) {
							i[r.browser] = !0;
							var a = r.majorVersion.split(".");
							i.version = {
								major : parseInt(r.majorVersion, 10),
								string : r.version
							}, 1 < a.length && (i.version.minor = parseInt(a[1], 10)), 2 < a.length && (i.version.build = parseInt(a[2], 10))
						}
						r.platform && (i[r.platform] = !0), (i.chrome || i.opr || i.safari) && (i.webkit = !0), (i.rv || i.iemobile) && (i.rv &&
						delete i.rv
						, r.browser = "msie", i.msie = !0);i.edge && (
						delete i.edge
						, r.browser = "msedge", i.msedge = !0);i.opr && (r.browser = "opera", i.opera = !0);i.safari && i.android && (r.browser = "android", i.android = !0);
						for (var o in i.name = r.browser, i.platform = r.platform, s) s.hasOwnProperty(o) &&
							delete s[o];
						Object.assign(s, i)
					}(), n.default = s
				}, {} ],
				40 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
						function r(e, t) {
							for (var n = 0; n < t.length; n++) {
								var r = t[n];
								r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
							}
						}
						return function(e, t, n) {
							return t && r(e.prototype, t), n && r(e, n), e
						}
					}();
					function i(e, t) {
						if (!e)
							throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
						return !t || "object" !== q(t) && "function" != typeof t ? e : t
					}
					function a(e, t) {
						if ("function" != typeof t && null !== t)
							throw new TypeError("Super expression must either be null or a function, not " + q(t));
						e.prototype = Object.create(t && t.prototype, {
							constructor : {
								value : e,
								enumerable : !1,
								writable : !0,
								configurable : !0
							}
						}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
					}
					function o(e, t) {
						if (!(e instanceof t))
							throw new TypeError("Cannot call a class as a function")
					}
					var s = n.RuntimeException = function() {
						function t(e) {
							o(this, t), this._message = e
						}
						return r(t, [ {
								key : "toString",
								value : function() {
									return this.name + ": " + this.message
								}
							}, {
								key : "name",
								get : function() {
									return "RuntimeException"
								}
							}, {
								key : "message",
								get : function() {
									return this._message
								}
							} ]), t
					}();
					n.IllegalStateException = function(e) {
						function t(e) {
							return o(this, t), i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
						}
						return a(t, s), r(t, [ {
								key : "name",
								get : function() {
									return "IllegalStateException"
								}
							} ]), t
					}(), n.InvalidArgumentException = function(e) {
						function t(e) {
							return o(this, t), i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
						}
						return a(t, s), r(t, [ {
								key : "name",
								get : function() {
									return "InvalidArgumentException"
								}
							} ]), t
					}(), n.NotImplementedException = function(e) {
						function t(e) {
							return o(this, t), i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
						}
						return a(t, s), r(t, [ {
								key : "name",
								get : function() {
									return "NotImplementedException"
								}
							} ]), t
					}()
				}, {} ],
				41 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r,
						i = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						a = e("events"),
						o = (r = a) && r.__esModule ? r : {
							default : r
						};
					var s = function() {
						function r() {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, r)
						}
						return i(r, null, [ {
								key : "e",
								value : function(e, t) {
									e && !r.FORCE_GLOBAL_TAG || (e = r.GLOBAL_TAG);
									var n = "[" + e + "] > " + t;
									r.ENABLE_CALLBACK && r.emitter.emit("log", "error", n), r.ENABLE_ERROR && (console.error ? console.error(n) : console.warn ? console.warn(n) : console.log(n))
								}
							}, {
								key : "i",
								value : function(e, t) {
									e && !r.FORCE_GLOBAL_TAG || (e = r.GLOBAL_TAG);
									var n = "[" + e + "] > " + t;
									r.ENABLE_CALLBACK && r.emitter.emit("log", "info", n), r.ENABLE_INFO && (console.info ? console.info(n) : console.log(n))
								}
							}, {
								key : "w",
								value : function(e, t) {
									e && !r.FORCE_GLOBAL_TAG || (e = r.GLOBAL_TAG);
									var n = "[" + e + "] > " + t;
									r.ENABLE_CALLBACK && r.emitter.emit("log", "warn", n), r.ENABLE_WARN && (console.warn ? console.warn(n) : console.log(n))
								}
							}, {
								key : "d",
								value : function(e, t) {
									e && !r.FORCE_GLOBAL_TAG || (e = r.GLOBAL_TAG);
									var n = "[" + e + "] > " + t;
									r.ENABLE_CALLBACK && r.emitter.emit("log", "debug", n), r.ENABLE_DEBUG && (console.debug ? console.debug(n) : console.log(n))
								}
							}, {
								key : "v",
								value : function(e, t) {
									e && !r.FORCE_GLOBAL_TAG || (e = r.GLOBAL_TAG);
									var n = "[" + e + "] > " + t;
									r.ENABLE_CALLBACK && r.emitter.emit("log", "verbose", n), r.ENABLE_VERBOSE && console.log(n)
								}
							} ]), r
					}();
					s.GLOBAL_TAG = "flv.js", s.FORCE_GLOBAL_TAG = !1, s.ENABLE_ERROR = !0, s.ENABLE_INFO = !0, s.ENABLE_WARN = !0, s.ENABLE_DEBUG = !0, s.ENABLE_VERBOSE = !0, s.ENABLE_CALLBACK = !1, s.emitter = new o.default, n.default = s
				}, {
					events : 2
				} ],
				42 : [ function(e, t, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
							function r(e, t) {
								for (var n = 0; n < t.length; n++) {
									var r = t[n];
									r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
								}
							}
							return function(e, t, n) {
								return t && r(e.prototype, t), n && r(e, n), e
							}
						}(),
						i = o(e("events")),
						a = o(e("./logger.js"));
					function o(e) {
						return e && e.__esModule ? e : {
							default : e
						}
					}
					var s = function() {
						function n() {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, n)
						}
						return r(n, null, [ {
								key : "getConfig",
								value : function() {
									return {
										globalTag : a.default.GLOBAL_TAG,
										forceGlobalTag : a.default.FORCE_GLOBAL_TAG,
										enableVerbose : a.default.ENABLE_VERBOSE,
										enableDebug : a.default.ENABLE_DEBUG,
										enableInfo : a.default.ENABLE_INFO,
										enableWarn : a.default.ENABLE_WARN,
										enableError : a.default.ENABLE_ERROR,
										enableCallback : a.default.ENABLE_CALLBACK
									}
								}
							}, {
								key : "applyConfig",
								value : function(e) {
									a.default.GLOBAL_TAG = e.globalTag, a.default.FORCE_GLOBAL_TAG = e.forceGlobalTag, a.default.ENABLE_VERBOSE = e.enableVerbose, a.default.ENABLE_DEBUG = e.enableDebug, a.default.ENABLE_INFO = e.enableInfo, a.default.ENABLE_WARN = e.enableWarn, a.default.ENABLE_ERROR = e.enableError, a.default.ENABLE_CALLBACK = e.enableCallback
								}
							}, {
								key : "_notifyChange",
								value : function() {
									var e = n.emitter;
									if (0 < e.listenerCount("change")) {
										var t = n.getConfig();
										e.emit("change", t)
									}
								}
							}, {
								key : "registerListener",
								value : function(e) {
									n.emitter.addListener("change", e)
								}
							}, {
								key : "removeListener",
								value : function(e) {
									n.emitter.removeListener("change", e)
								}
							}, {
								key : "addLogListener",
								value : function(e) {
									a.default.emitter.addListener("log", e), 0 < a.default.emitter.listenerCount("log") && (a.default.ENABLE_CALLBACK = !0, n._notifyChange())
								}
							}, {
								key : "removeLogListener",
								value : function(e) {
									a.default.emitter.removeListener("log", e), 0 === a.default.emitter.listenerCount("log") && (a.default.ENABLE_CALLBACK = !1, n._notifyChange())
								}
							}, {
								key : "forceGlobalTag",
								get : function() {
									return a.default.FORCE_GLOBAL_TAG
								},
								set : function(e) {
									a.default.FORCE_GLOBAL_TAG = e, n._notifyChange()
								}
							}, {
								key : "globalTag",
								get : function() {
									return a.default.GLOBAL_TAG
								},
								set : function(e) {
									a.default.GLOBAL_TAG = e, n._notifyChange()
								}
							}, {
								key : "enableAll",
								get : function() {
									return a.default.ENABLE_VERBOSE && a.default.ENABLE_DEBUG && a.default.ENABLE_INFO && a.default.ENABLE_WARN && a.default.ENABLE_ERROR
								},
								set : function(e) {
									a.default.ENABLE_VERBOSE = e, a.default.ENABLE_DEBUG = e, a.default.ENABLE_INFO = e, a.default.ENABLE_WARN = e, a.default.ENABLE_ERROR = e, n._notifyChange()
								}
							}, {
								key : "enableDebug",
								get : function() {
									return a.default.ENABLE_DEBUG
								},
								set : function(e) {
									a.default.ENABLE_DEBUG = e, n._notifyChange()
								}
							}, {
								key : "enableVerbose",
								get : function() {
									return a.default.ENABLE_VERBOSE
								},
								set : function(e) {
									a.default.ENABLE_VERBOSE = e, n._notifyChange()
								}
							}, {
								key : "enableInfo",
								get : function() {
									return a.default.ENABLE_INFO
								},
								set : function(e) {
									a.default.ENABLE_INFO = e, n._notifyChange()
								}
							}, {
								key : "enableWarn",
								get : function() {
									return a.default.ENABLE_WARN
								},
								set : function(e) {
									a.default.ENABLE_WARN = e, n._notifyChange()
								}
							}, {
								key : "enableError",
								get : function() {
									return a.default.ENABLE_ERROR
								},
								set : function(e) {
									a.default.ENABLE_ERROR = e, n._notifyChange()
								}
							} ]), n
					}();
					s.emitter = new i.default, n.default = s
				}, {
					"./logger.js" : 41,
					events : 2
				} ],
				43 : [ function(t, e, n) {
					"use strict";Object.defineProperty(n, "__esModule", {
						value : !0
					});
					var r = function() {
						function r(e, t) {
							for (var n = 0; n < t.length; n++) {
								var r = t[n];
								r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
							}
						}
						return function(e, t, n) {
							return t && r(e.prototype, t), n && r(e, n), e
						}
					}();
					var i = function() {
						function e() {
							!function(e, t) {
								if (!(e instanceof t))
									throw new TypeError("Cannot call a class as a function")
							}(this, e)
						}
						return r(e, null, [ {
								key : "install",
								value : function() {
									Object.setPrototypeOf = Object.setPrototypeOf || function(e, t) {
										return e.__proto__ = t, e
									}, Object.assign = Object.assign || function(e) {
										if (null == e)
											throw new TypeError("Cannot convert undefined or null to object");
										for (var t = Object(e), n = 1; n < arguments.length; n++) {
											var r = arguments[n];
											if (null != r)
												for (var i in r) r.hasOwnProperty(i) && (t[i] = r[i])
										}
										return t
									}, "function" != typeof self.Promise && t("es6-promise").polyfill()
								}
							} ]), e
					}();
					i.install(), n.default = i
				}, {
					"es6-promise" : 1
				} ],
				44 : [ function(e, t, n) {
					"use strict";
					function u(e, t, n) {
						var r = e;
						if (t + n < r.length) {
							for (; n--;)
								if (128 != (192 & r[++t])) return !1;
							return !0
						}
						return !1
					}
					Object.defineProperty(n, "__esModule", {
						value : !0
					}), n.default = function(e) {
						for (var t = [], n = e, r = 0, i = e.length; r < i;)
							if (n[r] < 128) t.push(String.fromCharCode(n[r])), ++r;else {
								if (n[r] < 192)
									;
								else if (n[r] < 224) {
									if (u(n, r, 1)) {
										var a = (31 & n[r]) << 6 | 63 & n[r + 1];
										if (128 <= a) {
											t.push(String.fromCharCode(65535 & a)), r += 2;continue
										}
									}
								} else if (n[r] < 240) {
									if (u(n, r, 2)) {
										var o = (15 & n[r]) << 12 | (63 & n[r + 1]) << 6 | 63 & n[r + 2];
										if (2048 <= o && 55296 != (63488 & o)) {
											t.push(String.fromCharCode(65535 & o)), r += 3;continue
										}
									}
								} else if (n[r] < 248 && u(n, r, 3)) {
									var s = (7 & n[r]) << 18 | (63 & n[r + 1]) << 12 | (63 & n[r + 2]) << 6 | 63 & n[r + 3];
									if (65536 < s && s < 1114112) {
										s -= 65536, t.push(String.fromCharCode(s >>> 10 | 55296)), t.push(String.fromCharCode(1023 & s | 56320)), r += 4;continue
									}
								}
								t.push(String.fromCharCode(65533)), ++r
						}
						return t.join("")
					}
				}, {} ]
			}, {}, [ 21 ])(21)
		}, "object" === q(t) && void 0 !== e ? e.exports = o() : (i = [], void 0 === (a = "function" == typeof (r = o) ? r.apply(t, i) : r) || (e.exports = a))
	}, function(e, t, n) {
		var r = n(58)("wks"),
			i = n(16),
			a = n(4).Symbol,
			o = "function" == typeof a;
		(e.exports = function(e) {
			return r[e] || (r[e] = o && a[e] || (o ? a : i)("Symbol." + e))
		}).store = r
	}, function(e, t, n) {
		"use strict";
		function a(e) {
			return (a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			})(e)
		}
		var i = n(41),
			r = n(42),
			o = Object.prototype.toString;
		function s(e) {
			return "[object Array]" === o.call(e)
		}
		function u(e) {
			return null !== e && "object" === a(e)
		}
		function l(e) {
			return "[object Function]" === o.call(e)
		}
		function d(e, t) {
			if (null != e)
				if ("object" !== a(e) && (e = [ e ]), s(e))
					for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
				else
					for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.call(null, e[i], i, e)
		}
		e.exports = {
			isArray : s,
			isArrayBuffer : function(e) {
				return "[object ArrayBuffer]" === o.call(e)
			},
			isBuffer : r,
			isFormData : function(e) {
				return "undefined" != typeof FormData && e instanceof FormData
			},
			isArrayBufferView : function(e) {
				return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer
			},
			isString : function(e) {
				return "string" == typeof e
			},
			isNumber : function(e) {
				return "number" == typeof e
			},
			isObject : u,
			isUndefined : function(e) {
				return void 0 === e
			},
			isDate : function(e) {
				return "[object Date]" === o.call(e)
			},
			isFile : function(e) {
				return "[object File]" === o.call(e)
			},
			isBlob : function(e) {
				return "[object Blob]" === o.call(e)
			},
			isFunction : l,
			isStream : function(e) {
				return u(e) && l(e.pipe)
			},
			isURLSearchParams : function(e) {
				return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
			},
			isStandardBrowserEnv : function() {
				return ("undefined" == typeof navigator || "ReactNative" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document
			},
			forEach : d,
			merge : function n() {
				var r = {};
				function e(e, t) {
					"object" === a(r[t]) && "object" === a(e) ? r[t] = n(r[t], e) : r[t] = e
				}
				for (var t = 0, i = arguments.length; t < i; t++) d(arguments[t], e);
				return r
			},
			extend : function(n, e, r) {
				return d(e, function(e, t) {
						n[t] = r && "function" == typeof e ? i(e, r) : e
					}), n
			},
			trim : function(e) {
				return e.replace(/^\s*/, "").replace(/\s*$/, "")
			}
		}
	}, function(e, t) {
		var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
		"number" == typeof __g && (__g = n)
	}, function(e, t, n) {
		"use strict";
		function r(e) {
			return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			})(e)
		}
		if (n(7)) {
			var _ = n(26),
				v = n(4),
				y = n(15),
				E = n(22),
				A = n(25),
				i = n(31),
				c = n(30),
				T = n(51),
				a = n(23),
				R = n(6),
				o = n(50),
				s = n(17),
				I = n(8),
				S = n(52),
				u = n(18),
				l = n(29),
				d = n(11),
				b = n(36),
				w = n(10),
				h = n(19),
				p = n(94),
				C = n(62),
				D = n(63),
				O = n(53).f,
				g = n(98),
				f = n(16),
				m = n(2),
				M = n(99),
				N = n(57),
				L = n(60),
				P = n(103),
				F = n(20),
				B = n(108),
				x = n(61),
				k = n(59),
				U = n(109),
				Q = n(9),
				G = n(110),
				j = Q.f,
				q = G.f,
				V = v.RangeError,
				K = v.TypeError,
				H = v.Uint8Array,
				Y = "ArrayBuffer",
				W = "Shared" + Y,
				z = "BYTES_PER_ELEMENT",
				X = "prototype",
				J = Array[X],
				Z = i.ArrayBuffer,
				$ = i.DataView,
				ee = M(0),
				te = M(2),
				ne = M(3),
				re = M(4),
				ie = M(5),
				ae = M(6),
				oe = N(!0),
				se = N(!1),
				ue = P.values,
				le = P.keys,
				de = P.entries,
				fe = J.lastIndexOf,
				ce = J.reduce,
				he = J.reduceRight,
				pe = J.join,
				ge = J.sort,
				me = J.slice,
				_e = J.toString,
				ve = J.toLocaleString,
				ye = m("iterator"),
				Ee = m("toStringTag"),
				Ae = f("typed_constructor"),
				Te = f("def_constructor"),
				Re = A.CONSTR,
				Ie = A.TYPED,
				Se = A.VIEW,
				be = "Wrong length!",
				we = M(1, function(e, t) {
					return Ne(L(e, e[Te]), t)
				}),
				Ce = y(function() {
					return 1 === new H(new Uint16Array([ 1 ]).buffer)[0]
				}),
				De = !!H && !!H[X].set && y(function() {
					new H(1).set({})
				}),
				Oe = function(e, t) {
					var n = s(e);
					if (n < 0 || n % t)
						throw V("Wrong offset!");
					return n
				},
				Me = function(e) {
					if (w(e) && Ie in e) return e;
					throw K(e + " is not a typed array!")
				},
				Ne = function(e, t) {
					if (!(w(e) && Ae in e))
						throw K("It is not a typed array constructor!");
					return new e(t)
				},
				Le = function(e, t) {
					return Pe(L(e, e[Te]), t)
				},
				Pe = function(e, t) {
					for (var n = 0, r = t.length, i = Ne(e, r); n < r;) i[n] = t[n++];
					return i
				},
				Fe = function(e, t, n) {
					j(e, t, {
						get : function() {
							return this._d[n]
						}
					})
				},
				Be = function(e) {
					var t,
						n,
						r,
						i,
						a,
						o,
						s = h(e),
						u = arguments.length,
						l = 1 < u ? arguments[1] : void 0,
						d = void 0 !== l,
						f = g(s);
					if (null != f && !p(f)) {
						for (o = f.call(s), r = [], t = 0; !(a = o.next()).done; t++) r.push(a.value);
						s = r
					}
					for (d && 2 < u && (l = c(l, arguments[2], 2)), t = 0, n = I(s.length), i = Ne(this, n); t < n; t++) i[t] = d ? l(s[t], t) : s[t];
					return i
				},
				xe = function() {
					for (var e = 0, t = arguments.length, n = Ne(this, t); e < t;) n[e] = arguments[e++];
					return n
				},
				ke = !!H && y(function() {
					ve.call(new H(1))
				}),
				Ue = function() {
					return ve.apply(ke ? me.call(Me(this)) : Me(this), arguments)
				},
				Qe = {
					copyWithin : function(e, t) {
						return U.call(Me(this), e, t, 2 < arguments.length ? arguments[2] : void 0)
					},
					every : function(e) {
						return re(Me(this), e, 1 < arguments.length ? arguments[1] : void 0)
					},
					fill : function(e) {
						return k.apply(Me(this), arguments)
					},
					filter : function(e) {
						return Le(this, te(Me(this), e, 1 < arguments.length ? arguments[1] : void 0))
					},
					find : function(e) {
						return ie(Me(this), e, 1 < arguments.length ? arguments[1] : void 0)
					},
					findIndex : function(e) {
						return ae(Me(this), e, 1 < arguments.length ? arguments[1] : void 0)
					},
					forEach : function(e) {
						ee(Me(this), e, 1 < arguments.length ? arguments[1] : void 0)
					},
					indexOf : function(e) {
						return se(Me(this), e, 1 < arguments.length ? arguments[1] : void 0)
					},
					includes : function(e) {
						return oe(Me(this), e, 1 < arguments.length ? arguments[1] : void 0)
					},
					join : function(e) {
						return pe.apply(Me(this), arguments)
					},
					lastIndexOf : function(e) {
						return fe.apply(Me(this), arguments)
					},
					map : function(e) {
						return we(Me(this), e, 1 < arguments.length ? arguments[1] : void 0)
					},
					reduce : function(e) {
						return ce.apply(Me(this), arguments)
					},
					reduceRight : function(e) {
						return he.apply(Me(this), arguments)
					},
					reverse : function() {
						for (var e, t = Me(this).length, n = Math.floor(t / 2), r = 0; r < n;) e = this[r], this[r++] = this[--t], this[t] = e;
						return this
					},
					some : function(e) {
						return ne(Me(this), e, 1 < arguments.length ? arguments[1] : void 0)
					},
					sort : function(e) {
						return ge.call(Me(this), e)
					},
					subarray : function(e, t) {
						var n = Me(this),
							r = n.length,
							i = u(e, r);
						return new (L(n, n[Te]))(n.buffer, n.byteOffset + i * n.BYTES_PER_ELEMENT, I((void 0 === t ? r : u(t, r)) - i))
					}
				},
				Ge = function(e, t) {
					return Le(this, me.call(Me(this), e, t))
				},
				je = function(e) {
					Me(this);
					var t = Oe(arguments[1], 1),
						n = this.length,
						r = h(e),
						i = I(r.length),
						a = 0;
					if (n < i + t)
						throw V(be);
					for (; a < i;) this[t + a] = r[a++]
				},
				qe = {
					entries : function() {
						return de.call(Me(this))
					},
					keys : function() {
						return le.call(Me(this))
					},
					values : function() {
						return ue.call(Me(this))
					}
				},
				Ve = function(e, t) {
					return w(e) && e[Ie] && "symbol" != r(t) && t in e && String(+t) == String(t)
				},
				Ke = function(e, t) {
					return Ve(e, t = l(t, !0)) ? a(2, e[t]) : q(e, t)
				},
				He = function(e, t, n) {
					return !(Ve(e, t = l(t, !0)) && w(n) && d(n, "value")) || d(n, "get") || d(n, "set") || n.configurable || d(n, "writable") && !n.writable || d(n, "enumerable") && !n.enumerable ? j(e, t, n) : (e[t] = n.value, e)
				};
			Re || (G.f = Ke, Q.f = He), E(E.S + E.F * !Re, "Object", {
				getOwnPropertyDescriptor : Ke,
				defineProperty : He
			}), y(function() {
				_e.call({})
			}) && (_e = ve = function() {
				return pe.call(this)
			});
			var Ye = o({}, Qe);
			o(Ye, qe), R(Ye, ye, qe.values), o(Ye, {
				slice : Ge,
				set : je,
				constructor : function() {},
				toString : _e,
				toLocaleString : Ue
			}), Fe(Ye, "buffer", "b"), Fe(Ye, "byteOffset", "o"), Fe(Ye, "byteLength", "l"), Fe(Ye, "length", "e"), j(Ye, Ee, {
				get : function() {
					return this[Ie]
				}
			}), e.exports = function(e, f, t, a) {
				var c = e + ((a = !!a) ? "Clamped" : "") + "Array",
					n = "get" + e,
					o = "set" + e,
					h = v[c],
					s = h || {},
					r = h && D(h),
					i = !h || !A.ABV,
					u = {},
					l = h && h[X],
					p = function(e, i) {
						j(e, i, {
							get : function() {
								return e = i, (t = this._d).v[n](e * f + t.o, Ce);
								var e,
									t
							},
							set : function(e) {
								return t = i, n = e, r = this._d, a && (n = (n = Math.round(n)) < 0 ? 0 : 255 < n ? 255 : 255 & n), void r.v[o](t * f + r.o, n, Ce);
								var t,
									n,
									r
							},
							enumerable : !0
						})
					};
				i ? (h = t(function(e, t, n, r) {
					T(e, h, c, "_d");
					var i,
						a,
						o,
						s,
						u = 0,
						l = 0;
					if (w(t)) {
						if (!(t instanceof Z || (s = b(t)) == Y || s == W)) return Ie in t ? Pe(h, t) : Be.call(h, t);
						i = t, l = Oe(n, f);
						var d = t.byteLength;
						if (void 0 === r) {
							if (d % f)
								throw V(be);
							if ((a = d - l) < 0)
								throw V(be)
						} else if (d < (a = I(r) * f) + l)
							throw V(be);
						o = a / f
					} else o = S(t), i = new Z(a = o * f);
					for (R(e, "_d", {
							b : i,
							o : l,
							l : a,
							e : o,
							v : new $(i)
						}); u < o;) p(e, u++)
				}), l = h[X] = C(Ye), R(l, "constructor", h)) : y(function() {
					h(1)
				}) && y(function() {
					new h(-1)
				}) && B(function(e) {
					new h, new h(null), new h(1.5), new h(e)
				}, !0) || (h = t(function(e, t, n, r) {
					var i;
					return T(e, h, c), w(t) ? t instanceof Z || (i = b(t)) == Y || i == W ? void 0 !== r ? new s(t, Oe(n, f), r) : void 0 !== n ? new s(t, Oe(n, f)) : new s(t) : Ie in t ? Pe(h, t) : Be.call(h, t) : new s(S(t))
				}), ee(r !== Function.prototype ? O(s).concat(O(r)) : O(s), function(e) {
					e in h || R(h, e, s[e])
				}), h[X] = l, _ || (l.constructor = h));
				var d = l[ye],
					g = !!d && ("values" == d.name || null == d.name),
					m = qe.values;
				R(h, Ae, !0), R(l, Ie, c), R(l, Se, !0), R(l, Te, h), (a ? new h(1)[Ee] == c : Ee in l) || j(l, Ee, {
					get : function() {
						return c
					}
				}), u[c] = h, E(E.G + E.W + E.F * (h != s), u), E(E.S, c, {
					BYTES_PER_ELEMENT : f
				}), E(E.S + E.F * y(function() {
						s.of.call(h, 1)
					}), c, {
						from : Be,
						of : xe
					}), z in l || R(l, z, f), E(E.P, c, Qe), x(c), E(E.P + E.F * De, c, {
					set : je
				}), E(E.P + E.F * !g, c, qe), _ || l.toString == _e || (l.toString = _e), E(E.P + E.F * y(function() {
						new h(1).slice()
					}), c, {
						slice : Ge
					}), E(E.P + E.F * (y(function() {
						return [ 1, 2 ].toLocaleString() != new h([ 1, 2 ]).toLocaleString()
					}) || !y(function() {
						l.toLocaleString.call([ 1, 2 ])
					})), c, {
						toLocaleString : Ue
					}), F[c] = g ? d : m, _ || g || R(l, ye, m)
			}
		} else
			e.exports = function() {}
	}, function(e, t, n) {
		var r = n(9),
			i = n(23);
		e.exports = n(7) ? function(e, t, n) {
			return r.f(e, t, i(1, n))
		} : function(e, t, n) {
			return e[t] = n, e
		}
	}, function(e, t, n) {
		e.exports = !n(15)(function() {
				return 7 != Object.defineProperty({}, "a", {
						get : function() {
							return 7
						}
					}).a
			})
	}, function(e, t, n) {
		var r = n(17),
			i = Math.min;
		e.exports = function(e) {
			return 0 < e ? i(r(e), 9007199254740991) : 0
		}
	}, function(e, t, n) {
		var r = n(14),
			i = n(47),
			a = n(29),
			o = Object.defineProperty;
		t.f = n(7) ? Object.defineProperty : function(e, t, n) {
			if (r(e), t = a(t, !0), r(n), i) try {
					return o(e, t, n)
				} catch (e) {}
			if ("get" in n || "set" in n)
				throw TypeError("Accessors not supported!");
			return "value" in n && (e[t] = n.value), e
		}
	}, function(e, t) {
		function n(e) {
			return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			})(e)
		}
		e.exports = function(e) {
			return "object" === n(e) ? null !== e : "function" == typeof e
		}
	}, function(e, t) {
		var n = {}.hasOwnProperty;
		e.exports = function(e, t) {
			return n.call(e, t)
		}
	}, function(e, t, n) {
		e.exports = n(72)
	}, function(e, t) {
		var n = e.exports = {
			version : "2.5.7"
		};
		"number" == typeof __e && (__e = n)
	}, function(e, t, n) {
		var r = n(10);
		e.exports = function(e) {
			if (!r(e))
				throw TypeError(e + " is not an object!");
			return e
		}
	}, function(e, t) {
		e.exports = function(e) {
			try {
				return !!e()
			} catch (e) {
				return !0
			}
		}
	}, function(e, t) {
		var n = 0,
			r = Math.random();
		e.exports = function(e) {
			return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36))
		}
	}, function(e, t) {
		var n = Math.ceil,
			r = Math.floor;
		e.exports = function(e) {
			return isNaN(e = +e) ? 0 : (0 < e ? r : n)(e)
		}
	}, function(e, t, n) {
		var r = n(17),
			i = Math.max,
			a = Math.min;
		e.exports = function(e, t) {
			return (e = r(e)) < 0 ? i(e + t, 0) : a(e, t)
		}
	}, function(e, t, n) {
		var r = n(56);
		e.exports = function(e) {
			return Object(r(e))
		}
	}, function(e, t) {
		e.exports = {}
	}, function(e, t) {
		function p(e) {
			return (p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			})(e)
		}
		var n = {
			hashManage : {
				prependHash : "!",
				_change : function(e, t) {
					var n,
						r = location.hash,
						i = [],
						a = "",
						o = 0,
						s = {};
					r && (r = r.substring(1), this.prependHash && (r = r.replace(new RegExp("^".concat(this.prependHash.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"))), ""))), i = r.split("&");
					for (var u = 0; u < i.length; u++) {
						var l = i[u].split("=")[0],
							d = i[u].split("=")[1];
						l && (s[l] = decodeURIComponent(d))
					}
					if ("object" === p(e)) {
						n = Object.keys(e).length;
						for (var f = 0; f < n; f++) {
							var c = e[n[f]];
							c ? s[n[f]] = encodeURIComponent(c) : !1 === c &&
							delete s[n[f]]
						}
					} else if (t)
						s[e] = encodeURIComponent(t);else {
						if (!1 !== t) return void 0 === e ? s : s[e] || null;
						delete s[e]
					}
					n = Object.keys(s);
					for (var h = 0; h < n.length; h++) a += 0 !== o ? "&" : this.prependHash, a += "".concat(n[h], "=").concat(s[n[h]]), o += 1;
					return location.hash = a, s
				},
				get : function(e) {
					return this._change(e, null)
				},
				set : function(e, t) {
					return this._change(e, t)
				},
				clear : function() {
					location.hash = ""
				}
			},
			isUndefined : function(e) {
				return void 0 === e
			},
			cookie : {
				get : function(e) {
					for (var t = {}, n = document.cookie ? document.cookie.split("; ") : [], r = 0; r < n.length; r++) {
						var i = n[r].split("="),
							a = i.slice(1).join("=");
						'"' === a.charAt(0) && (a = a.slice(1, -1));try {
							var o = this.decode(i[0]);
							if (a = this.decode(a), t[o] = a, e === o) break
						} catch (e) {
							console.warn(e)
						}
					}
					return t[e]
				},
				decode : function(e) {
					return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
				},
				set : function(e, t) {
					var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 365,
						r = new Date;
					r.setTime(r.getTime() + 24 * n * 60 * 60 * 1e3), document.cookie = "".concat(e, "=").concat(escape(t), ";expires=").concat(r.toGMTString(), "; path=/; domain=.bilibili.com")
				},
				delete : function(e) {
					this.set(e, "", -1)
				}
			},
			ChatGetSettings : function(e) {
				return this.localStorage._support ? this.localStorage.getItem(e) : this.cookie.get(e)
			},
			ChatSaveSettings : function(e, t, n) {
				return this.localStorage._support ? this.localStorage.setItem(e, t) : this.cookie.set(e, t, n)
			},
			ChatRemoveSettings : function(e) {
				return this.localStorage._support ? this.localStorage.removeItem(e) : this.cookie.delete(e)
			},
			localStorage : {
				_support : !(!window.localStorage || "object" !== p(window.localStorage)),
				getItem : function(e) {
					return this._support ? window.localStorage.getItem(e) : null
				},
				setItem : function(e, t) {
					this._support && window.localStorage.setItem(e, t)
				},
				removeItem : function(e) {
					window.localStorage.removeItem(e)
				}
			},
			loadLocalStorage : function(t) {
				var n = this,
					r = [ "bilibililover", "defaulth5", "firstentergraytest", "bilibili_player_settings" ];
				this._iframe = document.createElement("iframe"), this._iframe.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;", this._iframe.src = "//www.bilibili.com/blackboard/iframemessage.html", document.body.appendChild(this._iframe), this._iframe.addEventListener && this._iframe.addEventListener("load", function() {
					try {
						for (var e = 0; e < r.length; e++) window.localStorage.setItem(r[e], n._iframe.contentWindow.localStorage.getItem(r[e]))
					} catch (e) {} clearTimeout(n.storageTimer), t()
				}), this.storageTimer = setTimeout(function() {
					t()
				}, 500)
			},
			getLocalStorage : function(e) {
				if (this._iframe) try {
						return this._iframe.contentWindow.localStorage.getItem(e)
					} catch (e) {} else try {
						return this.ChatGetSettings(e)
					} catch (e) {} return null
			},
			setLocalStorage : function(e, t) {
				try {
					this.ChatSaveSettings(e, t)
				} catch (e) {}
				if (this._iframe) try {
						this._iframe.contentWindow.localStorage.setItem(e, t)
					} catch (e) {}
			},
			removeLocalStorage : function(e) {
				try {
					this.ChatRemoveSettings(e)
				} catch (e) {}
				if (this._iframe) try {
						this._iframe.contentWindow.localStorage.removeItem(e)
					} catch (e) {}
			},
			GetUrlValue : function(e) {
				var t = new RegExp("(^|&)".concat(e, "=([^&]*)(&|$)"), "i"),
					n = window.location.search.substr(1).match(t);
				if (null != n) try {
						return decodeURIComponent(n[2])
					} catch (e) {
						return null
				} return null
			},
			getIPCrc : function(e) {
				var s = function() {
					for (var e = [], t = 0; t < 256; t++) {
						for (var n = t, r = 0; r < 8; r++) 1 == (1 & n) ? n = n >>> 1 ^ 3988292384 : n >>>= 1;
						e[t] = n >>> 0
					}
					return e
				}();
				function t(e, t) {
					for (var n = ~e, r = t.length, i = 0; i < r; i++) n = s[255 & n ^ t[i]] ^ n >>> 8;
					return ~n >>> 0
				}
				var n = new (function() {
					function e() {
						this.value = 0
					}
					return e.prototype.reset = function() {
							this.value = 0
						}, e.prototype.update = function(e) {
							"string" == typeof e ? this.value = function(e, t) {
								for (var n, r, i = -1 ^ e, a = 0, o = t.length; a < o;) i = (n = t.charCodeAt(a += 1)) < 128 ? i >>> 8 ^ s[255 & (i ^ n)] : n < 2048 ? (i = i >>> 8 ^ s[255 & (i ^ (192 | n >> 6 & 31))]) >>> 8 ^ s[255 & (i ^ (128 | 63 & n))] : 55296 <= n && n < 57344 ? (n = 64 + (1023 & n), r = 1023 & t.charCodeAt(a += 1), (i = (i = (i = i >>> 8 ^ s[255 & (i ^ (240 | n >> 8 & 7))]) >>> 8 ^ s[255 & (i ^ (128 | n >> 2 & 63))]) >>> 8 ^ s[255 & (i ^ (128 | r >> 6 & 15 | (3 & n) << 4))]) >>> 8 ^ s[255 & (i ^ (128 | 63 & r))]) : (i = (i = i >>> 8 ^ s[255 & (i ^ (224 | n >> 12 & 15))]) >>> 8 ^ s[255 & (i ^ (128 | n >> 6 & 63))]) >>> 8 ^ s[255 & (i ^ (128 | 63 & n))];
								return (-1 ^ i) >>> 0
							}(this.value, e) : e instanceof Uint8Array || -1 !== e.constructor.toString().indexOf("Uint8Array") ? this.value = t(this.value, e) : (e instanceof ArrayBuffer || -1 !== e.constructor.toString().indexOf("ArrayBuffer")) && (this.value = t(this.value, new Uint8Array(e, 0, e.byteLength)))
						}, e.prototype.finish = function() {
							return this.value
						}, e
				}());
				n.reset(), n.update(e), this.cookie.set("HTML5PlayerCRC32", n.finish())
			},
			getHiddenProp : function() {
				var e = [ "webkit", "moz", "ms", "o" ];
				if ("hidden" in document) return "hidden";
				for (var t = 0; t < e.length; t++)
					if ("".concat(e[t], "Hidden") in document) return "".concat(e[t], "Hidden");
				return null
			},
			isDocumentHidden : function() {
				var e = this._getHiddenProp();
				return !!e && document[e]
			},
			cloneDeep : function(e, t) {
				if (null === e || "object" !== p(e)) return e;
				var n = Array.isArray(e) ? [] : {};
				for (var r in e)
					if (Object.prototype.hasOwnProperty.call(e, r)) {
						var i = e[r];
						t && "object" === p(i) ? n[r] = this.cloneDeep(i, t) : n[r] = i
				}
				return n
			},
			loadScript : function(e) {
				var t = document.createElement("script");
				t.onload = function() {
					e.success && e.success()
				}, t.onerror = function() {
					e.error && e.error()
				}, t.src = e.url, document.head.appendChild(t)
			}
		};
		window.__GetCookie || (window.__GetCookie = n.cookie.get.bind(n.cookie)), e.exports = n
	}, function(e, t, n) {
		var g = n(4),
			m = n(13),
			_ = n(6),
			v = n(24),
			y = n(30),
			E = "prototype",
			r = function e(t, n, r) {
				var i,
					a,
					o,
					s,
					u = t & e.F,
					l = t & e.G,
					d = t & e.P,
					f = t & e.B,
					c = l ? g : t & e.S ? g[n] || (g[n] = {}) : (g[n] || {})[E],
					h = l ? m : m[n] || (m[n] = {}),
					p = h[E] || (h[E] = {});
				for (i in l && (r = n), r) o = ((a = !u && c && void 0 !== c[i]) ? c : r)[i], s = f && a ? y(o, g) : d && "function" == typeof o ? y(Function.call, o) : o, c && v(c, i, o, t & e.U), h[i] != o && _(h, i, s), d && p[i] != o && (p[i] = o)
			};
		g.core = m, r.F = 1, r.G = 2, r.S = 4, r.P = 8, r.B = 16, r.W = 32, r.U = 64, r.R = 128, e.exports = r
	}, function(e, t) {
		e.exports = function(e, t) {
			return {
				enumerable : !(1 & e),
				configurable : !(2 & e),
				writable : !(4 & e),
				value : t
			}
		}
	}, function(e, t, n) {
		var a = n(4),
			o = n(6),
			s = n(11),
			u = n(16)("src"),
			r = "toString",
			i = Function[r],
			l = ("" + i).split(r);
		n(13).inspectSource = function(e) {
			return i.call(e)
		}, (e.exports = function(e, t, n, r) {
			var i = "function" == typeof n;
			i && (s(n, "name") || o(n, "name", t)), e[t] !== n && (i && (s(n, u) || o(n, u, e[t] ? "" + e[t] : l.join(String(t)))), e === a ? e[t] = n : r ? e[t] ? e[t] = n : o(e, t, n) : (
				delete e[t]
				, o(e, t, n)))
		})(Function.prototype, r, function() {
			return "function" == typeof this && this[u] || i.call(this)
		})
	}, function(e, t, n) {
		for (var r, i = n(4), a = n(6), o = n(16), s = o("typed_array"), u = o("view"), l = !(!i.ArrayBuffer || !i.DataView), d = l, f = 0, c = "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(","); f < 9;) (r = i[c[f++]]) ? (a(r.prototype, s, !0), a(r.prototype, u, !0)) : d = !1;
		e.exports = {
			ABV : l,
			CONSTR : d,
			TYPED : s,
			VIEW : u
		}
	}, function(e, t) {
		e.exports = !1
	}, function(e, t, n) {
		var r = n(55),
			i = n(56);
		e.exports = function(e) {
			return r(i(e))
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(3),
			i = n(74),
			a = {
				"Content-Type" : "application/x-www-form-urlencoded"
			};
		function o(e, t) {
			!r.isUndefined(e) && r.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
		}
		var s,
			u = {
				adapter : ("undefined" != typeof XMLHttpRequest ? s = n(43) : "undefined" != typeof process && (s = n(43)), s),
				transformRequest : [ function(e, t) {
					return i(t, "Content-Type"), r.isFormData(e) || r.isArrayBuffer(e) || r.isBuffer(e) || r.isStream(e) || r.isFile(e) || r.isBlob(e) ? e : r.isArrayBufferView(e) ? e.buffer : r.isURLSearchParams(e) ? (o(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : r.isObject(e) ? (o(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e
				} ],
				transformResponse : [ function(e) {
					if ("string" == typeof e) try {
							e = JSON.parse(e)
						} catch (e) {} return e
				} ],
				timeout : 0,
				xsrfCookieName : "XSRF-TOKEN",
				xsrfHeaderName : "X-XSRF-TOKEN",
				maxContentLength : -1,
				validateStatus : function(e) {
					return 200 <= e && e < 300
				}
			};
		u.headers = {
			common : {
				Accept : "application/json, text/plain, */*"
			}
		}, r.forEach([ "delete", "get", "head" ], function(e) {
			u.headers[e] = {}
		}), r.forEach([ "post", "put", "patch" ], function(e) {
			u.headers[e] = r.merge(a)
		}), e.exports = u
	}, function(e, t, n) {
		var i = n(10);
		e.exports = function(e, t) {
			if (!i(e)) return e;
			var n,
				r;
			if (t && "function" == typeof (n = e.toString) && !i(r = n.call(e))) return r;
			if ("function" == typeof (n = e.valueOf) && !i(r = n.call(e))) return r;
			if (!t && "function" == typeof (n = e.toString) && !i(r = n.call(e))) return r;
			throw TypeError("Can't convert object to primitive value")
		}
	}, function(e, t, n) {
		var a = n(49);
		e.exports = function(r, i, e) {
			if (a(r), void 0 === i) return r;
			switch (e) {
			case 1:
				return function(e) {
					return r.call(i, e)
				};case 2:
				return function(e, t) {
					return r.call(i, e, t)
				};case 3:
				return function(e, t, n) {
					return r.call(i, e, t, n)
				}
			}
			return function() {
				return r.apply(i, arguments)
			}
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(4),
			i = n(7),
			a = n(26),
			o = n(25),
			s = n(6),
			u = n(50),
			l = n(15),
			d = n(51),
			f = n(17),
			c = n(8),
			h = n(52),
			p = n(53).f,
			g = n(9).f,
			m = n(59),
			_ = n(35),
			v = "ArrayBuffer",
			y = "DataView",
			E = "prototype",
			A = "Wrong index!",
			T = r[v],
			R = r[y],
			I = r.Math,
			S = r.RangeError,
			b = r.Infinity,
			w = T,
			C = I.abs,
			D = I.pow,
			O = I.floor,
			M = I.log,
			N = I.LN2,
			L = "byteLength",
			P = "byteOffset",
			F = i ? "_b" : "buffer",
			B = i ? "_l" : L,
			x = i ? "_o" : P;
		function k(e, t, n) {
			var r,
				i,
				a,
				o = new Array(n),
				s = 8 * n - t - 1,
				u = (1 << s) - 1,
				l = u >> 1,
				d = 23 === t ? D(2, -24) - D(2, -77) : 0,
				f = 0,
				c = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
			for ((e = C(e)) != e || e === b ? (i = e != e ? 1 : 0, r = u) : (r = O(M(e) / N), e * (a = D(2, -r)) < 1 && (r--, a *= 2), 2 <= (e += 1 <= r + l ? d / a : d * D(2, 1 - l)) * a && (r++, a /= 2), u <= r + l ? (i = 0, r = u) : 1 <= r + l ? (i = (e * a - 1) * D(2, t), r += l) : (i = e * D(2, l - 1) * D(2, t), r = 0)); 8 <= t; o[f++] = 255 & i, i /= 256, t -= 8)
				;
			for (r = r << t | i, s += t; 0 < s; o[f++] = 255 & r, r /= 256, s -= 8)
				;
			return o[--f] |= 128 * c, o
		}
		function U(e, t, n) {
			var r,
				i = 8 * n - t - 1,
				a = (1 << i) - 1,
				o = a >> 1,
				s = i - 7,
				u = n - 1,
				l = e[u--],
				d = 127 & l;
			for (l >>= 7; 0 < s; d = 256 * d + e[u], u--, s -= 8)
				;
			for (r = d & (1 << -s) - 1, d >>= -s, s += t; 0 < s; r = 256 * r + e[u], u--, s -= 8)
				;
			if (0 === d)
				d = 1 - o;else {
				if (d === a) return r ? NaN : l ? -b : b;
				r += D(2, t), d -= o
			}
			return (l ? -1 : 1) * r * D(2, d - t)
		}
		function Q(e) {
			return e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0]
		}
		function G(e) {
			return [ 255 & e ]
		}
		function j(e) {
			return [ 255 & e, e >> 8 & 255 ]
		}
		function q(e) {
			return [ 255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255 ]
		}
		function V(e) {
			return k(e, 52, 8)
		}
		function K(e) {
			return k(e, 23, 4)
		}
		function H(e, t, n) {
			g(e[E], t, {
				get : function() {
					return this[n]
				}
			})
		}
		function Y(e, t, n, r) {
			var i = h(+n);
			if (i + t > e[B])
				throw S(A);
			var a = e[F]._b,
				o = i + e[x],
				s = a.slice(o, o + t);
			return r ? s : s.reverse()
		}
		function W(e, t, n, r, i, a) {
			var o = h(+n);
			if (o + t > e[B])
				throw S(A);
			for (var s = e[F]._b, u = o + e[x], l = r(+i), d = 0; d < t; d++) s[u + d] = l[a ? d : t - d - 1]
		}
		if (o.ABV) {
			if (!l(function() {
					T(1)
				}) || !l(function() {
					new T(-1)
				}) || l(function() {
					return new T, new T(1.5), new T(NaN), T.name != v
				})) {
				for (var z, X = (T = function(e) {
							return d(this, T), new w(h(e))
						})[E] = w[E], J = p(w), Z = 0; J.length > Z;) (z = J[Z++]) in T || s(T, z, w[z]);
				a || (X.constructor = T)
			}
			var $ = new R(new T(2)),
				ee = R[E].setInt8;
			$.setInt8(0, 2147483648), $.setInt8(1, 2147483649), !$.getInt8(0) && $.getInt8(1) || u(R[E], {
				setInt8 : function(e, t) {
					ee.call(this, e, t << 24 >> 24)
				},
				setUint8 : function(e, t) {
					ee.call(this, e, t << 24 >> 24)
				}
			}, !0)
		} else T = function(e) {
				d(this, T, v);
				var t = h(e);
				this._b = m.call(new Array(t), 0), this[B] = t
			}, R = function(e, t, n) {
				d(this, R, y), d(e, T, y);
				var r = e[B],
					i = f(t);
				if (i < 0 || r < i)
					throw S("Wrong offset!");
				if (r < i + (n = void 0 === n ? r - i : c(n)))
					throw S("Wrong length!");
				this[F] = e, this[x] = i, this[B] = n
			}, i && (H(T, L, "_l"), H(R, "buffer", "_b"), H(R, L, "_l"), H(R, P, "_o")), u(R[E], {
				getInt8 : function(e) {
					return Y(this, 1, e)[0] << 24 >> 24
				},
				getUint8 : function(e) {
					return Y(this, 1, e)[0]
				},
				getInt16 : function(e) {
					var t = Y(this, 2, e, arguments[1]);
					return (t[1] << 8 | t[0]) << 16 >> 16
				},
				getUint16 : function(e) {
					var t = Y(this, 2, e, arguments[1]);
					return t[1] << 8 | t[0]
				},
				getInt32 : function(e) {
					return Q(Y(this, 4, e, arguments[1]))
				},
				getUint32 : function(e) {
					return Q(Y(this, 4, e, arguments[1])) >>> 0
				},
				getFloat32 : function(e) {
					return U(Y(this, 4, e, arguments[1]), 23, 4)
				},
				getFloat64 : function(e) {
					return U(Y(this, 8, e, arguments[1]), 52, 8)
				},
				setInt8 : function(e, t) {
					W(this, 1, e, G, t)
				},
				setUint8 : function(e, t) {
					W(this, 1, e, G, t)
				},
				setInt16 : function(e, t) {
					W(this, 2, e, j, t, arguments[2])
				},
				setUint16 : function(e, t) {
					W(this, 2, e, j, t, arguments[2])
				},
				setInt32 : function(e, t) {
					W(this, 4, e, q, t, arguments[2])
				},
				setUint32 : function(e, t) {
					W(this, 4, e, q, t, arguments[2])
				},
				setFloat32 : function(e, t) {
					W(this, 4, e, K, t, arguments[2])
				},
				setFloat64 : function(e, t) {
					W(this, 8, e, V, t, arguments[2])
				}
			});
		_(T, v), _(R, y), s(R[E], o.VIEW, !0), t[v] = T, t[y] = R
	}, function(e, t) {
		var n = {}.toString;
		e.exports = function(e) {
			return n.call(e).slice(8, -1)
		}
	}, function(e, t, n) {
		var r = n(58)("keys"),
			i = n(16);
		e.exports = function(e) {
			return r[e] || (r[e] = i(e))
		}
	}, function(e, t) {
		e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
	}, function(e, t, n) {
		var r = n(9).f,
			i = n(11),
			a = n(2)("toStringTag");
		e.exports = function(e, t, n) {
			e && !i(e = n ? e : e.prototype, a) && r(e, a, {
				configurable : !0,
				value : t
			})
		}
	}, function(e, t, n) {
		var i = n(32),
			a = n(2)("toStringTag"),
			o = "Arguments" == i(function() {
				return arguments
			}());
		e.exports = function(e) {
			var t,
				n,
				r;
			return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = function(e, t) {
				try {
					return e[t]
				} catch (e) {}
			}(t = Object(e), a)) ? n : o ? i(t) : "Object" == (r = i(t)) && "function" == typeof t.callee ? "Arguments" : r
		}
	}, function(e, t, n) {
		var r,
			i = 0,
			a = n(122);
		"string" == typeof a && (a = [ [ e.i, a, "" ] ]), a.locals && (t.locals = a.locals), t.use = t.ref = function() {
			return i++ || (r = n(124)(a, {
					attrs : {
						"data-injector" : "core-player"
					},
					hmr : !0
				})), t
		}, t.unuse = t.unref = function() {
			0 < i && !--i && (r(), r = null)
		}
	}, function(e, t, n) {
		"use strict";
		function h(e) {
			return (h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			})(e)
		}
		var p = n(128),
			g = n(129),
			r = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,
			a = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//,
			m = [ [ "#", "hash" ], [ "?", "query" ], function(e) {
				return e.replace("\\", "/")
			}, [ "/", "pathname" ], [ "@", "auth", 1 ], [ NaN, "host", void 0, 1, 1 ], [ /:(\d+)$/, "port", void 0, 1 ], [ NaN, "hostname", void 0, 1, 1 ] ],
			o = {
				hash : 1,
				query : 1
			};
		function _(e) {
			var t,
				n = global && global.location || {},
				r = {},
				i = h(e = e || n);
			if ("blob:" === e.protocol)
				r = new y(unescape(e.pathname), {});
			else if ("string" === i)
				for (t in r = new y(e, {}), o)
					delete r[t];
			else if ("object" === i) {
				for (t in e) t in o || (r[t] = e[t]);
				void 0 === r.slashes && (r.slashes = a.test(e.href))
			}
			return r
		}
		function v(e) {
			var t = r.exec(e);
			return {
				protocol : t[1] ? t[1].toLowerCase() : "",
				slashes : !!t[2],
				rest : t[3]
			}
		}
		function y(e, t, n) {
			if (!(this instanceof y)) return new y(e, t, n);
			var r,
				i,
				a,
				o,
				s,
				u,
				l = m.slice(),
				d = h(t),
				f = this,
				c = 0;
			for ("object" !== d && "string" !== d && (n = t, t = null), n && "function" != typeof n && (n = g.parse), t = _(t), r = !(i = v(e || "")).protocol && !i.slashes, f.slashes = i.slashes || r && t.slashes, f.protocol = i.protocol || t.protocol || "", e = i.rest, i.slashes || (l[3] = [ /(.*)/, "pathname" ]); c < l.length; c++) "function" != typeof (o = l[c]) ? (a = o[0], u = o[1], a != a ? f[u] = e : "string" == typeof a ? ~(s = e.indexOf(a)) && (e = "number" == typeof o[2] ? (f[u] = e.slice(0, s), e.slice(s + o[2])) : (f[u] = e.slice(s), e.slice(0, s))) : (s = a.exec(e)) && (f[u] = s[1], e = e.slice(0, s.index)), f[u] = f[u] || r && o[3] && t[u] || "", o[4] && (f[u] = f[u].toLowerCase())) : e = o(e);
			n && (f.query = n(f.query)), r && t.slashes && "/" !== f.pathname.charAt(0) && ("" !== f.pathname || "" !== t.pathname) && (f.pathname = function(e, t) {
				for (var n = (t || "/").split("/").slice(0, -1).concat(e.split("/")), r = n.length, i = n[r - 1], a = !1, o = 0; r--;) "." === n[r] ? n.splice(r, 1) : ".." === n[r] ? (n.splice(r, 1), o++) : o && (0 === r && (a = !0), n.splice(r, 1), o--);
				return a && n.unshift(""), "." !== i && ".." !== i || n.push(""), n.join("/")
			}(f.pathname, t.pathname)), p(f.port, f.protocol) || (f.host = f.hostname, f.port = ""), f.username = f.password = "", f.auth && (o = f.auth.split(":"), f.username = o[0] || "", f.password = o[1] || ""), f.origin = f.protocol && f.host && "file:" !== f.protocol ? f.protocol + "//" + f.host : "null", f.href = f.toString()
		}
		y.prototype = {
			set : function(e, t, n) {
				var r = this;
				switch (e) {
				case "query":
					"string" == typeof t && t.length && (t = (n || g.parse)(t)), r[e] = t;
					break;case "port":
					r[e] = t, p(t, r.protocol) ? t && (r.host = r.hostname + ":" + t) : (r.host = r.hostname, r[e] = "");
					break;case "hostname":
					r[e] = t, r.port && (t += ":" + r.port), r.host = t;
					break;case "host":
					r[e] = t, /:\d+$/.test(t) ? (t = t.split(":"), r.port = t.pop(), r.hostname = t.join(":")) : (r.hostname = t, r.port = "");
					break;case "protocol":
					r.protocol = t.toLowerCase(), r.slashes = !n;
					break;case "pathname":
				case "hash":
					if (t) {
						var i = "pathname" === e ? "/" : "#";
						r[e] = t.charAt(0) !== i ? i + t : t
					} else
						r[e] = t;
					break;default:
					r[e] = t
				}
				for (var a = 0; a < m.length; a++) {
					var o = m[a];
					o[4] && (r[o[1]] = r[o[1]].toLowerCase())
				}
				return r.origin = r.protocol && r.host && "file:" !== r.protocol ? r.protocol + "//" + r.host : "null", r.href = r.toString(), r
			},
			toString : function(e) {
				e && "function" == typeof e || (e = g.stringify);
				var t,
					n = this,
					r = n.protocol;
				r && ":" !== r.charAt(r.length - 1) && (r += ":");
				var i = r + (n.slashes ? "//" : "");
				return n.username && (i += n.username, n.password && (i += ":" + n.password), i += "@"), i += n.host + n.pathname, (t = "object" === h(n.query) ? e(n.query) : n.query) && (i += "?" !== t.charAt(0) ? "?" + t : t), n.hash && (i += n.hash), i
			}
		}, y.extractProtocol = v, y.location = _, y.qs = g, e.exports = y
	}, function(e, t, n) {
		function l(e) {
			return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			})(e)
		}
		var p = n(21),
			r = n(69),
			i = n(70),
			a = n(40),
			g = n(71),
			o = n(12),
			s = {
				gray_flash_enable : !1,
				gray_html5_enable : !1,
				initialTime : +new Date,
				fixTime : 0,
				overtime : 15e3,
				gray_config_flash : {
					cookie_name : "flash_player_gray",
					new_player : "//static.hdslb.com/play_recommend.swf",
					suffixes : [ "0", "1", "2" ],
					track : {
						old : {
							click_event_name : "oldver_click",
							show_event_name : "oldver_show"
						},
						new : {
							click_event_name : "newver_click",
							show_event_name : "newver_show"
						}
					}
				},
				gray_config_html5 : {
					cookie_name : "html5_player_gray",
					new_player : "//static.hdslb.com/player/js/bilibiliPlayer.beta.min.js",
					suffixes : [ "0", "1", "2", "3", "4" ],
					track : {
						new : {
							click_event_name : "newver_h5_click",
							show_event_name : "newver_h5_show"
						},
						old : {
							click_event_name : "oldver_h5_click",
							show_event_name : "oldver_h5_show"
						}
					}
				},
				gray_config_html5_flash : {
					track : {
						new : {
							click_event_name : "HTML5_click",
							show_event_name : "HTML5_show"
						},
						old : {
							click_event_name : "Flash_click",
							show_event_name : "Flash_show"
						}
					}
				},
				PlayerAgentList : {},
				HashManage : p.hashManage,
				isUndefined : p.isUndefined,
				cookie : p.cookie,
				ChatGetSettings : p.ChatGetSettings,
				ChatSaveSettings : p.ChatSaveSettings,
				ChatRemoveSettings : p.ChatRemoveSettings,
				localStorage : p.localStorage,
				initialized : !1,
				storageLoaded : !1,
				initialLoadedSend : !1,
				loadedTimeSend : !1,
				pageno : 1,
				enable : !1,
				playerParams : null,
				callbackFn : null,
				upgrade : void 0,
				cooperation : !1,
				iframe : !1,
				gray_flash : !1,
				gray_html5 : !0,
				gray_support_html5 : !1,
				isSafari : /(webkit)[ /]([\w.]+).*(version)[ /]([\w.]+).*(safari)[ /]([\w.]+)/.test(navigator.userAgent.toLowerCase()) || /(version)(applewebkit)[ /]([\w.]+).*(safari)[ /]([\w.]+)/.test(navigator.userAgent.toLowerCase()),
				playerEventLists : [],
				cancelTokenSources : [],
				playurlMaps : null,
				init : function(e, t, n, r, i, a) {
					var o = this;
					if (!this.initialized) {
						this.initialized = !0, this.is_unsupport_html5 = !this._checkHTML5(), this.playerType = r, this.pageno = window.pageno || this.HashManage.get("page") || this.GetUrlValue("p") || 1, this.playerParams = n, this.upgrade = i, this.callbackFn = a, n && !n.match(/cid=(\d+)&/) && (this.cooperation = !0), window.directiveDispatcher = function(e) {
							try {
								var t = e;
								switch ("string" == typeof e && (t = JSON.parse(e)), "object" !== l(t) && (t = {}), (t = p.cloneDeep(t, !0))._origin) {
								case "flash":
								case "html5":
									126001 !== t._directive || window.auxiliary ? o.loadAuxiliaryEvent(t) : o.gray_loader_auxiliary(t);
									break;case "webpage":
									if (o.gray_support_html5 && (!o.playerType && "1" === o.ChatGetSettings("defaulth5") || "html5" === o.playerType)) window.player && window.player.directiveDispatcher(t);else {
										var n = document.querySelector("#bofqi>object");
										n && n.directiveDispatcher && n.directiveDispatcher(JSON.stringify(t))
									}
								}
							} catch (e) {
								console.warn(e)
							}
						}, window.location.host && -1 === window.location.host.indexOf("www.bilibili.com") && !/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()) ? (document.domain = "bilibili.com", this.isSafari ? this._init() : this.loadLocalStorage(function() {
							o._init()
						})) : this._init();try {
							var s = this._getHiddenProp();
							if (s) {
								var u = "".concat(s.replace(/[H|h]idden/, ""), "visibilitychange");
								this.hidden_start_time = +new Date, document.addEventListener(u, function() {
									o._isDocumentHidden() || (o.fixTime = +new Date - o.hidden_start_time)
								})
							}
						} catch (e) {
							console.warn(e)
						}
					}
				},
				_init : function() {
					this.storageLoaded || (this.storageLoaded = !0, this.gray_issupport_html5(), this.gray_judge_flash(), this.gray_judge_html5(), 1 === this.ChatGetSettings("defaulth5") ? this.gray_html5 ? (this.enable = !0, this.gray_initial_html5()) : this.gray_flash ? (this.enable = !0, this.gray_initial_flash()) : this.no_gray_initial() : this.gray_flash ? (this.enable = !0, this.gray_initial_flash()) : this.gray_html5 ? (this.enable = !0, this.gray_initial_html5()) : this.no_gray_initial(), this.playerParams && this._initCallBack())
				},
				_initCallBack : function() {
					if (!this.startTimeSend) {
						this.startTimeSend = !0;try {
							if (window.performance && window.performance.timing && window.performance.timing.navigationStart) {
								var e = +new Date - performance.timing.navigationStart;
								this._sendInitialTime("1" === this.ChatGetSettings("defaulth5") ? "html5" : "flash", e, "start_time"), window.performance.timing.playerStage0 = +new Date
							}
						} catch (e) {}
					}
					this.enable ? this.gray_loader(this.playerType, this.upgrade) : this.gray_support_html5 && (!this.playerType && "1" === this.ChatGetSettings("defaulth5") || "html5" === this.playerType) ? (this.gray_loader_html5(), window.rec_rp("event", this.gray_config_html5_flash.track.new.show_event_name)) : (this.gray_loader_flash(), window.rec_rp("event", this.gray_config_html5_flash.track.old.show_event_name))
				},
				loadAuxiliaryEvent : function(e) {
					if (window.auxiliary) {
						if (window.auxiliary.directiveDispatcher(e), 0 < this.playerEventLists.length)
							for (; 0 < this.playerEventLists.length;) window.auxiliary.directiveDispatcher(this.playerEventLists.shift())
					} else this.playerEventLists.push(e)
				},
				loadNewPlayer : function() {
					if (!this.startTimeSend) {
						this.startTimeSend = !0;try {
							if (window.performance && window.performance.timing && window.performance.timing.navigationStart) {
								var e = +new Date - performance.timing.navigationStart;
								this._sendInitialTime("1" === this.ChatGetSettings("defaulth5") ? "html5" : "flash", e, "start_time"), window.performance.timing.playerStage0 = +new Date
							}
						} catch (e) {}
					}
					this.playerParams && this.gray_loader_html5()
				},
				_checkHTML5 : function() {
					var e = !(/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()) || /Trident/i.test(navigator.userAgent) && /Windows NT 6/.test(navigator.userAgent) || !window.URL);
					if (e) {
						var t = document.createElement("video");
						return t && t.canPlayType && t.canPlayType('video/mp4; codecs="avc1.42001E, mp4a.40.2"')
					}
					return e
				},
				reload : function(e) {
					if (this.playerParams) {
						try {
							window.swfobject && window.swfobject.removeSWF("player_placeholder"), window.player && window.player.pause(), window.player && window.player.destroy && window.player.destroy(), (this.HashManage.get("page") || this.GetUrlValue("p")) && (window.pageno = this.HashManage.get("page") || this.GetUrlValue("p") || 1, this.pageno = window.pageno)
						} catch (e) {
							console.log(e)
						}
						if (this.initialReset(), this.playerParams = e || this.playerParams, this.playerParams)
							if (window.aid = e.match(/aid=(\d+)/)[1], window.cid = e.match(/cid=(\d+)&/), window.cid && (window.cid = window.cid[1]), this.playurlMaps && this.playurlMaps[window.cid])
								window.__playinfo__ = this.playurlMaps[window.cid];else
								for (; this.cancelTokenSources.length;) this.cancelTokenSources.shift().cancel();
						this.reloadTime = +new Date, this.gray_support_html5 && ("html5" === this.playerType || !this.playerType && "1" === this.ChatGetSettings("defaulth5")) ? this.gray_loader_html5() : this.gray_loader_flash(), this.resetPlayerStage1(this.reloadTime), this.playurlMaps = null
					} else window.location.reload()
				},
				resetPlayerStage1 : function(e) {
					this.loadingTime = e, this.initialLoadedSend = !1, a.resetInitialTime.call(this)
				},
				fetchPlayurl : function(t) {
					var n = this,
						r = Date.now(),
						e = o.CancelToken.source();
					o({
						method : "get",
						url : "//api.bilibili.com/x/player/playurl",
						responseType : "json",
						params : t,
						withCredentials : !0,
						cancelToken : e.token
					}).then(function(e) {
						a.send("html5", Date.now() - r, "api_playurl_done_time"), e && e.data && (n.playurlMaps || (n.playurlMaps = {}), n.playurlMaps[t.cid] = e.data)
					}).catch(function(e) {
						a.send("html5", Date.now() - r, "api_playurl_fail_time")
					}), this.cancelTokenSources.push(e)
				},
				loadLocalStorage : p.loadLocalStorage,
				setLocalStorage : p.setLocalStorage,
				getLocalStorage : p.getLocalStorage,
				removeLocalStorage : p.removeLocalStorage,
				GetUrlValue : p.GetUrlValue,
				gray_loader : function(e, t) {
					this.gray_support_html5 && ("html5" === e || !e && "1" === this.ChatGetSettings("defaulth5")) ? this.gray_loader_html5(t) : this.gray_loader_flash(t)
				},
				update_params : function(e) {
					e && this.searchNewCid();
					for (var t = {}, n = this.playerParams.split("&"), r = 0; r < n.length; r++)
						if ("" !== n[r]) {
							var i = n[r].split("=");
							t[i[0]] = i[1]
					}
					window.aid && (t.aid = window.aid), window.cid && (t.cid = window.cid);try {
						t.dashSymbol = !0, this.cookie.set("CURRENT_FNVAL", "16")
					} catch (e) {
						console.debug(e)
					} return t
				},
				searchNewCid : function() {
					var r = this;
					void 0 === window.pageno ? window.pageno = this.pageno : window.pageno !== this.pageno && o({
						url : "//www.bilibili.com/widget/getPageList?aid=".concat(window.aid),
						method : "get",
						withCredentials : !0,
						responseType : "json"
					}).then(function(e) {
						var t = e.data;
						if (t)
							for (var n = 0; n < t.length; n++) t[n].page === window.pageno && (window.cid = t[n].cid, r.pageno = window.pageno)
					})
				},
				loadFeedback : i.load,
				_loadNoFlashTips : function() {
					var e = this;
					p.loadScript({
						url : "//static.hdslb.com/player/noflashtips/no-flash-tips.min.js",
						success : function() {
							e._createNoFlashTipsInstance()
						}
					})
				},
				_getNoFlashTips : function() {
					window.NoFlashTips ? this._createNoFlashTipsInstance() : this._loadNoFlashTips()
				},
				_createNoFlashTipsInstance : function() {
					var t = this,
						e = {
							backgroundColor : "white",
							msg : "??????????????????Flash????????????????????????????????????????????????",
							msgColor : "#000",
							msgSize : 14,
							btnList : [ {
								title : "??????Flash??????",
								width : 166,
								height : 40,
								type : "flash",
								theme : "white"
							} ],
							hasOrText : !1
						};
					this.is_unsupport_html5 || (e.btnList[0].theme = "white", e.btnList.push({
						title : "??????HTML5?????????",
						width : 166,
						height : 40,
						type : "html5",
						theme : "blue",
						onClick : function(e) {
							t.html5_btn.trigger("click", !0), "function" == typeof e && e()
						}
					})), new window.NoFlashTips(document.querySelector("#bofqi"), e)
				},
				getFeedback : i.get,
				init_bgray_btn : function() {
					var e = document.querySelector("#bofqi").parentNode,
						t = -1 < " ".concat(e, " ").indexOf(" movie_play ");
					document.querySelector("head").insertAdjacentHTML("beforeend", "".concat("<style>.player-wrapper {position: relative;} .player-fullscreen-fix {position: fixed;top: 0;left: 0;margin: 0;padding: 0;width: 100%;height: 100%;}.player-fullscreen-fix #bofqi .player {position: fixed!important;border-radius: 0;z-index: 100000!important;left: 0;top: 0;width: 100%!important;height: 100%!important;}.bgray-btn-wrap {position: absolute; top: 10px; left: 50%; margin-left: 490px; width: 70px; height: 200px;} .widescreen .bgray-btn-wrap {margin-left: 580px;} .bgray-btn {transition: all 0.3s; cursor: pointer; margin: 10px 0; background-color: #fff; text-align: center; padding: 7px 5px; display: block; left: 100%; font-size: 12px; line-height: 12px; margin-left: 10px; width: 20px; border-radius: 4px; border: 1px solid #e5e9ef; color: #99a2aa;} .bgray-btn-feedback { height: 72px; margin-bottom: 5px;} .bgray-btn-help { height: 24px; margin-top: 5px;} .bgray-btn:hover {color: #6d757a; border-color: #6d757a;}.bgray-btn.player-feedback-disable{color:#ccd0d7}.bgray-btn.player-feedback-disable:hover{color:#ccd0d7;border-color:#ccd0d7;} .bgray-btn.player-feedback-disable{color:#ccd0d7}.bgray-btn.player-feedback-disable:hover{color:#ccd0d7;border-color:#ccd0d7;} .bgray-btn.active {cursor: default; color: #00a1d6; border-color: #00a1d6;}").concat(t ? ".movie_play {overflow: visible;} .bgray-btn-wrap {top: -10px;} #bofqi {box-shadow: 0 0 0;}" : "", ".bgray-line {display: none; width: 42px; margin: 0 auto; border-bottom: 1px solid #e5e9ef;}") + ".bgray-btn {display: none;} .bgray-btn.show {display: none;}@media screen and (min-width: 1400px) {.bgray-btn-wrap {margin-left: 580px;}}.bgray-btn.happyfoolsday {line-height: 13px; background-color: #00a1d6; border-color: #00a1d6; color: #fff;} .bgray-btn.happyfoolsday:hover {background-color: #00b5e5; border-color: #00b5e5; color: #fff;}.webfullscreen .player{position: fixed;top: 0;left: 0;}object#player_placeholder{display: block;box-shadow: 0 0 8px #e5e9ef;}</style>"), this.removeLocalStorage("verticalDanmaku"), this.removeLocalStorage("verticalDM")
				},
				html5_player : function(e) {
					this.initialReset(), this.gray_loader_html5(e), this.cookie.set(this.gray_config_html5.cookie_name, e, 7)
				},
				flash_player : function(e) {
					window.player && window.player.destroy && window.player.destroy(), this.initialReset(), this.gray_loader_flash(e), this.cookie.set(this.gray_config_flash.cookie_name, e, 7)
				},
				no_gray_initial : function() {
					var e = document.querySelector("#bofqi .b-player-gray");
					e && e.parentNode.removeChild(e);window.flashChecker().hasFlash && !this.isNoFlash() || this.setLocalStorage("defaulth5", 1), this.init_bgray_btn()
				},
				gray_judge_flash : function() {
					if (!this.gray_flash_enable || !this.playerParams || this.isNoFlash()) return this.gray_flash = !1, this.gray_flash;
					var e;
					try {
						e = this.cookie.get("DedeUserID").slice(-1), this.gray_flash = this.gray_config_flash.suffixes && -1 < this.gray_config_flash.suffixes.indexOf(e)
					} catch (e) {
						this.gray_flash = !1
					} return this.gray_flash
				},
				get_ip_crc : p.getIPCrc,
				gray_initial_flash : function() {
					var e = document.querySelector("#bofqi .b-player-gray");
					e && e.parentNode.removeChild(e);
					var t = this.gray_config_flash.track;
					this.init_bgray_btn(), window.rec_rp("event", this.upgrade ? t.new.show_event_name : t.old.show_event_name)
				},
				initialReset : function() {
					this.initialTime = +new Date, this.fixTime = 0, this.reloadTime = 0
				},
				gray_loader_flash : function(e) {
					var t = this;
					if (void 0 === e || "" === e)
						if (this.gray_flash) {
							var n = this.gray_config_flash.cookie_name;
							this.upgrade = "false" !== this.cookie.get(n)
						} else
							this.upgrade = !1;
					else
						this.upgrade = e;
					"1" === this.ChatGetSettings("defaulth5") && this.setLocalStorage("defaulth5", 0), window.flashChecker().hasFlash ? window.swfobject && window.swfobject.embedSWF ? this.loadFlashPlayer() : p.loadScript({
						url : "//static.hdslb.com/js/swfobject.js",
						success : function() {
							t.loadFlashPlayer()
						}
					}) : this._getNoFlashTips()
				},
				loadFlashPlayer : function() {
					var e = this,
						t = document.querySelector("#bofqi");
					if (this.iframe) t.innerHTML = '<iframe height="482" width="950" class="player" src="https://secure.bilibili.com/secure,cid='.concat(window.cid, "&aid=").concat(window.aid, '" scrolling="no" border="0" frameborder="no" framespacing="0" onload="window.securePlayerFrameLoaded=true"></iframe><img src="https://secure.bilibili.com/images/grey.gif" id="img_ErrCheck" style="display:none" /><script type="text/javascript" src="//static.hdslb.com/js/page.player_error.js"><\/script>'), this.setFlashADReport();else {
						var n = this.update_params();
						t.innerHTML = '<div id="player_placeholder" class="player"></div>', window.swfobject.embedSWF(this.upgrade ? this.gray_config_flash.new_player : "//static.hdslb.com/play_v3.swf", "player_placeholder", "100%", "100%", "0", "", n, {
							bgcolor : "#ffffff",
							allowfullscreeninteractive : "true",
							allowfullscreen : "true",
							quality : "high",
							allowscriptaccess : "always",
							wmode : /Firefox/.test(navigator.userAgent) ? "opaque" : "direct"
						}, {
							class : "player"
						}, function() {
							"function" == typeof e.callbackFn && e.callbackFn(), "function" == typeof window.PlayerMediaLoaded && window.PlayerMediaLoaded(), e.gray_flash_compatible()
						}), this.flash_loader_timeout()
					}
				},
				flash_loader_timeout : function() {
					var e = this;
					this.flash_loader_timer = setTimeout(function() {
						try {
							!e.html5_btn || e._isDocumentHidden() || e.iframe || "0" === e.ChatGetSettings("defaulth5") || (e._sendInitialTime("html5", +new Date - performance.timing.navigationStart, "overtime_change"), e.initialReset(), e.html5_btn.click())
						} catch (e) {
							console.warn(e)
						}
					}, this.overtime)
				},
				gray_flash_compatible : r.flash,
				gray_issupport_html5 : function() {
					if (this.is_unsupport_html5) return this.gray_support_html5 = !1, this.gray_support_html5;
					(/linux/i.test(navigator.userAgent.toLowerCase()) || /Mac OS X[\s_\-/](\d+[.\-_]\d+[.\-_]?\d*)/i.test(navigator.userAgent) || !window.flashChecker().hasFlash || this.default_html5_policy()) && (null == this.ChatGetSettings("defaulth5") || "0" === this.ChatGetSettings("defaulth5") && !this.ChatGetSettings("hasRevertDefaulth5")) && this.setLocalStorage("defaulth5", 1), this.setLocalStorage("hasRevertDefaulth5", 1);
					var e = document.querySelector("#bofqi");
					if (e) {
						var t = e.querySelector("iframe.player");
						if (t && !t.classList.contains("bilibiliHtml5Player")) {
							var n = t.getAttribute("src").match(/aid=(\d+)/),
								r = t.getAttribute("src").match(/cid=(\d+)&/),
								i = t.getAttribute("src").match(/pre_ad=(\d+)/);
							n && n[1] && r && r[1] && (window.aid = n[1], window.cid = r[1], this.gray_support_html5 = !0, this.iframe = !0, this.playerParams = "cid=".concat(r[1], "&aid=").concat(n[1], "&pre_ad=").concat(i ? i[1] : "0"))
						} else this.cooperation || e.querySelector("embed") || (this.gray_support_html5 = !0)
					}
					return !1
				},
				default_html5_policy : function() {
					try {
						var e;
						if (/Edge/.test(navigator.userAgent)) return !1;
						if (/Chrome\/\d+/i.test(navigator.userAgent)) {
							if ((e = navigator.userAgent.match(/Chrome\/(\d+)/)) && 45 <= parseInt(e[1], 10)) return !0
						} else if (/Firefox\/\d+/i.test(navigator.userAgent) && (e = navigator.userAgent.match(/Firefox\/(\d+)/)) && 47 <= parseInt(e[1], 10)) return !0;
						return !1
					} catch (e) {
						return !1
					}
				},
				gray_judge_html5 : function() {
					if (!this.gray_html5_enable || !this.playerParams) return this.gray_html5 = !1, this.gray_html5;
					var e;
					try {
						e = this.cookie.get("DedeUserID").slice(-1), this.gray_html5 = this.gray_config_html5.suffixes && -1 < this.gray_config_html5.suffixes.indexOf(e)
					} catch (e) {
						this.gray_html5 = !1
					} return this.gray_html5
				},
				gray_initial_html5 : function() {
					var e = this.gray_config_html5.track,
						t = this.gray_config_flash.track;
					if (window.flashChecker().hasFlash || null != this.ChatGetSettings("defaulth5") || this.setLocalStorage("defaulth5", 1), this.init_bgray_btn(), "1" === this.ChatGetSettings("defaulth5") && this.iframe) {
						var n = document.querySelector("#bofqi iframe.player");
						n && n.parentNode.removeChild(n), this.upgrade ? (this.html5_player(!0), window.rec_rp("event", e.new.show_event_name)) : (this.html5_player(!1), window.rec_rp("event", e.old.show_event_name))
					} else
						"1" === this.ChatGetSettings("defaulth5") ? this.upgrade ? window.rec_rp("event", e.new.show_event_name) : window.rec_rp("event", e.old.show_event_name) : this.upgrade ? window.rec_rp("event", t.new.show_event_name) : window.rec_rp("event", t.old.show_event_name)
				},
				gray_loader_html5 : function(e) {
					var t = this,
						i = this;
					if (window.player && window.player.destroy && window.player.destroy(), void 0 === e || "" === e)
						if (this.gray_html5 && this.gray_support_html5) {
							var n = this.gray_config_html5.cookie_name;
							this.upgrade = "false" !== this.cookie.get(n)
						} else
							this.upgrade = !1;
					else
						this.upgrade = e;
					if ("html5" !== this.playerType && i.setLocalStorage("defaulth5", 1), window.location.host && -1 === window.location.host.indexOf("www.bilibili.com")) {
						var r = this.update_params(!0);
						r.p = this.HashManage.get("page") || 1, r.crossDomain = !0;
						for (var a = [], o = Object.keys(r), s = 0; s < o.length; s++) "record" === o[s] ? window.RECORD_STRING = r[o[s]] : a.push("".concat(o[s], "=").concat(encodeURIComponent(r[o[s]])));
						a = a.join("&"), window.Html5IframeInitialized = function() {
							t.gray_html5_compatible()
						}, document.querySelector("#bofqi").innerHTML = '<iframe class="player bilibiliHtml5Player" style="position: relative;" src="'.concat(this.upgrade ? "//www.bilibili.com/blackboard/html5playerbeta.html" : "//www.bilibili.com/blackboard/html5player.html", "?").concat(a, '" scrolling="no" border="0" frameborder="no" framespacing="0"></iframe>')
					} else {
						var u = this.update_params(!0);
						u.p = window.pageno || this.HashManage.get("page") || this.GetUrlValue("p") || 1, u.urlparam && (u.extra_params = window.decodeURIComponent(u.urlparam)), document.querySelector("#bofqi").innerHTML = '<div id="player_placeholder" class="player"></div>';
						var l = {},
							d = new Promise(function(e, t) {
								l.resolve = e, l.reject = t
							});
						d.catch(function() {});
						var f = function(t, n) {
							var r = "lastModified=".concat(g.lastModified);
							d.then(function() {
								window.player = n ? new window.BilibiliPlayer(u, t) : (t && t.destroy(), new window.BilibiliPlayer(u)), i.gray_html5_compatible(n)
							}).catch(function() {
								var e = document.querySelector('style[data-injector="bilibili-player"]');
								e && e.parentNode.removeChild(e), p.loadScript({
									url : "//s1.hdslb.com/bfs/static/player/main/html5/player.js?".concat(r),
									success : function() {
										window.player = n ? new window.BilibiliPlayer(u, t) : (t && t.destroy(), new window.BilibiliPlayer(u)), i.gray_html5_compatible(n)
									}
								})
							})
						};
						if (document.querySelector("#bofqi").innerHTML = '<div class="player"><div id="bilibiliPlayer"></div></div><div id="player_placeholder"></div>', window.BilibiliPlayer) window.player = new window.BilibiliPlayer(u), this.gray_html5_compatible();else {
							var c = document.getElementById("playerSource");
							if (c ? (c.onload = function() {
									l.resolve()
								}, c.onerror = function() {
									l.reject()
								}) : l.reject(), +u.season_type) {
								var h = document.querySelector('style[data-injector="core-player"]');
								h && h.parentNode.removeChild(h), f(null, !1)
							} else new window.CorePlayer(u).loadedmetadata.then(function(e) {
									return f(e, !0)
								}).catch(function(e) {
									return f(e, !1)
								})
						}
					}
				},
				gray_html5_compatible : function(e) {
					var i = this,
						t = function e() {
							if (window.player && window.player.getCurrentTime() > window.player.getDuration() - 5 && (window.player.removeEventListener("video_media_time", e), window.__INITIAL_STATE__)) try {
									for (var t = window.__INITIAL_STATE__.related, n = 0; n < 4; n++) {
										var r = t[n];
										i.fetchPlayurl({
											avid : r.aid,
											cid : r.cid,
											qn : i.cookie.get("CURRENT_QUALITY"),
											type : "",
											otype : "json"
										})
									}
								} catch (e) {
									console.warn(e)
							}
						};
					window.player && (window.player.addEventListener("video_media_time", t), window.player.addEventListener("video_destroy", function e() {
						window.player && (window.player.removeEventListener("video_media_time", t), window.player.removeEventListener("video_destroy", e))
					})), r.html5.call(this, e)
				},
				gray_loader_auxiliary : function(e) {
					var t = this;
					if (window.auxiliary && window.auxiliary.destroy && window.auxiliary.destroy(), window.location.host && -1 === window.location.host.indexOf("www.bilibili.com"))
						;else {
						var n = this.update_params(!0);
						document.querySelector("#danmukuBox").innerHTML = '<div id="playerAuxiliary" class="danmaku-wrap"></div>';
						window.PlayerAuxiliary ? (window.auxiliary = new window.PlayerAuxiliary(n), t.loadAuxiliaryEvent(e)) : p.loadScript({
							url : "//static.hdslb.com/player/js/auxiliary.js?lastModified=".concat(g.lastModified),
							success : function() {
								window.auxiliary = new window.PlayerAuxiliary(n), t.loadAuxiliaryEvent(e)
							}
						})
					}
				},
				loadedCallback : function(e) {
					clearTimeout(this.flash_loader_timer);
					var t = +new Date - this.loadingTime - this.fixTime,
						n = t;
					return window.performance && window.performance.timing && window.performance.timing.navigationStart && (n = +new Date - window.performance.timing.navigationStart - this.fixTime, window.performance.timing.playerStage3 || (window.performance.timing.playerStage3 = +new Date)), this.loadedTimeSend ? this.reloadTime && (this._sendInitialTime(e, +new Date - this.reloadTime, "reload_time"), this.reloadTime = 0) : (this.loadedTimeSend = !0, this._sendInitialTime(e, n, "loaded_time"), this._sendInitialTime(e, t, "frame_time")), n
				},
				initialCallback : function(e) {
					clearTimeout(this.flash_loader_timer);
					var t = +new Date - this.loadingTime;
					return this.initialLoadedSend || (this.initialLoadedSend = !0, window.performance && window.performance.timing && !window.performance.timing.playerStage1 && (window.performance.timing.playerStage1 = +new Date), this._sendInitialTime(e, t)), t
				},
				initCallback : function(e) {
					clearTimeout(this.flash_loader_timer);
					var t = +new Date - this.loadingTime;
					return this.initialLoadedSend || (this.initialLoadedSend = !0, window.performance && window.performance.timing && !window.performance.timing.playerStage1 && (window.performance.timing.playerStage1 = +new Date), this._sendInitialTime(e, t)), t
				},
				loadExtraMenuConfig : function(e) {
					var t = [];
					return "flash" === e || "flash_gray" === e ? (this.gray_html5 && this.gray_support_html5 && "flash" !== this.playerType ? (t.push({
							label : "??????HTML5?????????",
							id : "change_h5"
						}), t.push({
							label : "??????HTML5?????????",
							id : "change_new_h5"
						})) : this.gray_support_html5 && "flash" !== this.playerType && t.push({
							label : "HTML5?????????",
							id : "change_h5"
						}), this.gray_flash ? this.upgrade ? (t.push({
							label : "???????????????",
							id : "change_new_flash",
							active : !0
						}), t.push({
							label : "???????????????",
							id : "change_flash"
						})) : (t.push({
							label : "???????????????",
							id : "change_new_flash"
						}), t.push({
							label : "???????????????",
							id : "change_flash",
							active : !0
						})) : t.push({
							label : "Flash?????????",
							id : "change_flash",
							active : !0
						})) : window.flashChecker().hasFlash && "html5" !== this.playerType ? (this.gray_html5 && this.gray_support_html5 ? this.upgrade ? (t.push({
							label : "??????HTML5?????????",
							id : "change_h5"
						}), t.push({
							label : "??????HTML5?????????",
							id : "change_new_h5",
							active : !0
						})) : (t.push({
							label : "??????HTML5?????????",
							id : "change_h5",
							active : !0
						}), t.push({
							label : "??????HTML5?????????",
							id : "change_new_h5"
						})) : this.gray_support_html5 && t.push({
							label : "HTML5?????????",
							id : "change_h5",
							active : !0
						}), this.gray_flash ? (t.push({
							label : "??????Flash?????????",
							id : "change_new_flash"
						}), t.push({
							label : "??????Flash?????????",
							id : "change_flash"
						})) : t.push({
							label : "Flash?????????",
							id : "change_flash"
						})) : this.gray_support_html5 && (this.gray_html5 ? this.upgrade ? (t.push({
							label : "??????HTML5?????????",
							id : "change_h5"
						}), t.push({
							label : "??????HTML5?????????",
							id : "change_new_h5",
							active : !0
						})) : (t.push({
							label : "??????HTML5?????????",
							id : "change_h5",
							active : !0
						}), t.push({
							label : "??????HTML5?????????",
							id : "change_new_h5"
						})) : t.push({
							label : "HTML5?????????",
							id : "change_h5",
							active : !0
						}), this.isNoFlash() || t.push({
							label : "Flash?????????",
							id : "change_flash"
						})), {
							ver : "20161115",
							menuItems : t
					}
				},
				isNoFlash : function() {
					return /www\.bilibili\.com\/watchlater/.test(window.location.href) || /www\.bilibili\.com\/playlist/.test(window.location.href)
				},
				clickMenu : function(e) {
					var t = this;
					return setTimeout(function() {
							window.heimu(9, 0), "change_h5" === e ? (t.initialReset(), t.html5_player(!1)) : "change_new_h5" === e ? (t.initialReset(), t.html5_player(!0)) : "change_flash" === e ? (t.initialReset(), t.flash_player(!1)) : "change_new_flash" === e && (t.initialReset(), t.flash_player(!0))
						}, 0), !0
				},
				resize : function() {
					window.auxiliary && window.auxiliary.resize && window.auxiliary.resize()
				},
				getPlayerAgentProp : function(e) {
					var t = window.PlayerAgent;
					return t && t[e] || window[e]
				},
				html5AndFlash : function(e, t, n) {
					var r = this;
					return t ? function() {
						r.getPlayerAgentProp(e)(function(e) {
							t[n] && t[n](e)
						})
					} : this.getPlayerAgentProp(e)
				},
				VideoPlayerAgent : function() {
					for (var e = {}, t = document.querySelector("#bofqi>object"), n = [ "attentionTrigger", "getAuthorInfo", "elecPlugin", "objBPPlugin", "playerCallSendCoin", "playerCallSendLike", "playerCallSendCollect", "callBangumiFollow", "getActionState" ], r = 0, i = n.length; r < i; r++) {
						var a = n[r],
							o = this.getPlayerAgentProp(a);
						if (o) switch (
							e[[ a ]] = a) {
							case "attentionTrigger":
								this.PlayerAgentList[a] = this.html5AndFlash(a, t, "onAttentionCallBack");
								break;case "playerCallSendLike":
								this.PlayerAgentList[a] = this.html5AndFlash(a, t, "onLikeCallBack");
								break;case "elecPlugin":
								"function" == typeof o.isCharged && (e[[ a ]] = o.isCharged() ? a : null), this.PlayerAgentList[a] = o;
								break;default:
								this.PlayerAgentList[a] = o
						}
					}
					return e
				},
				_sendInitialTime : a.send,
				_getHiddenProp : p.getHiddenProp,
				_isDocumentHidden : p.isDocumentHidden
			};
		e.exports = s
	}, function(e, t) {
		var o = [];
		e.exports = {
			send : function(e, t) {
				var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : "initial_time";
				if (!(this._track_load && "loaded_time" === n || this._track_init && "initial_time" === n || this._track_frame && "frame_time" === n)) {
					if ("initial_time" === n)
						this._track_init = !0;
					else if ("loaded_time" === n) {
						if (this._track_load = !0, window.performance && window.performance.timing && window.performance.timing.reportStart) {
							for (var r = [], i = [ "navigationStart", "responseEnd", "reportStart", "reportLoaded", "reportEnd", "initialStateStart", "initialStateEnd", "stardustCssStart", "stardustCssEnd", "jqueryStart", "jqueryLoaded", "jqueryEnd", "stardustOtherStart", "stardustOtherEnd", "videoJsStart", "videoJsLoaded", "videoJsEnd", "embedPlayerStart", "embedPlayerEnd" ], a = 0; a < i.length; a++) r.push(window.performance.timing[i[a]] || 0);
							o.push([ "start_time_detail", r.join(",") ])
						}
					} else "frame_time" === n && (this._frame_load = !0);
					window.player && "function" == typeof window.player.track ? (o.forEach(function(e) {
						window.player.track(e[0], e[1])
					}), o = [], window.player.track(n, t)) : o.push([ n, t ])
				}
			},
			sendTrack : function() {
				window.player && "function" == typeof window.player.track && (o.forEach(function(e) {
					window.player.track(e[0], e[1])
				}), o = [])
			},
			resetInitialTime : function() {
				this._track_init = !1
			},
			reset : function() {
				this._track_init = !1, this._track_load = !1, this._frame_load = !1
			}
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = function(n, r) {
			return function() {
				for (var e = new Array(arguments.length), t = 0; t < e.length; t++) e[t] = arguments[t];
				return n.apply(r, e)
			}
		}
	}, function(e, t) {
		function n(e) {
			return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
		}
		e.exports = function(e) {
			return null != e && (n(e) || "function" == typeof (t = e).readFloatLE && "function" == typeof t.slice && n(t.slice(0, 0)) || !!e._isBuffer);
			var t
		}
	}, function(e, t, c) {
		"use strict";
		var h = c(3),
			p = c(75),
			g = c(77),
			m = c(78),
			_ = c(79),
			v = c(44),
			y = "undefined" != typeof window && window.btoa && window.btoa.bind(window) || c(80);
		e.exports = function(f) {
			return new Promise(function(n, r) {
				var i = f.data,
					a = f.headers;
				h.isFormData(i) &&
				delete a["Content-Type"];
				var o = new XMLHttpRequest,
					e = "onreadystatechange",
					s = !1;
				if ("undefined" == typeof window || !window.XDomainRequest || "withCredentials" in o || _(f.url) || (o = new window.XDomainRequest, e = "onload", s = !0, o.onprogress = function() {}, o.ontimeout = function() {}), f.auth) {
					var t = f.auth.username || "",
						u = f.auth.password || "";
					a.Authorization = "Basic " + y(t + ":" + u)
				}
				if (o.open(f.method.toUpperCase(), g(f.url, f.params, f.paramsSerializer), !0), o.timeout = f.timeout, o[e] = function() {
						if (o && (4 === o.readyState || s) && (0 !== o.status || o.responseURL && 0 === o.responseURL.indexOf("file:"))) {
							var e = "getAllResponseHeaders" in o ? m(o.getAllResponseHeaders()) : null,
								t = {
									data : f.responseType && "text" !== f.responseType ? o.response : o.responseText,
									status : 1223 === o.status ? 204 : o.status,
									statusText : 1223 === o.status ? "No Content" : o.statusText,
									headers : e,
									config : f,
									request : o
								};
							p(n, r, t), o = null
						}
					}, o.onerror = function() {
						r(v("Network Error", f, null, o)), o = null
					}, o.ontimeout = function() {
						r(v("timeout of " + f.timeout + "ms exceeded", f, "ECONNABORTED", o)), o = null
					}, h.isStandardBrowserEnv()) {
					var l = c(81),
						d = (f.withCredentials || _(f.url)) && f.xsrfCookieName ? l.read(f.xsrfCookieName) : void 0;
					d && (a[f.xsrfHeaderName] = d)
				}
				if ("setRequestHeader" in o && h.forEach(a, function(e, t) {
						void 0 === i && "content-type" === t.toLowerCase() ?
							delete a[t]
							: o.setRequestHeader(t, e)
					}), f.withCredentials && (o.withCredentials = !0), f.responseType) try {
						o.responseType = f.responseType
					} catch (e) {
						if ("json" !== f.responseType)
							throw e
				} "function" == typeof f.onDownloadProgress && o.addEventListener("progress", f.onDownloadProgress), "function" == typeof f.onUploadProgress && o.upload && o.upload.addEventListener("progress", f.onUploadProgress), f.cancelToken && f.cancelToken.promise.then(function(e) {
					o && (o.abort(), r(e), o = null)
				}), void 0 === i && (i = null), o.send(i)
			})
		}
	}, function(e, t, n) {
		"use strict";
		var o = n(76);
		e.exports = function(e, t, n, r, i) {
			var a = new Error(e);
			return o(a, t, n, r, i)
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = function(e) {
			return !(!e || !e.__CANCEL__)
		}
	}, function(e, t, n) {
		"use strict";
		function r(e) {
			this.message = e
		}
		r.prototype.toString = function() {
			return "Cancel" + (this.message ? ": " + this.message : "")
		}, r.prototype.__CANCEL__ = !0, e.exports = r
	}, function(e, t, n) {
		e.exports = !n(7) && !n(15)(function() {
				return 7 != Object.defineProperty(n(48)("div"), "a", {
						get : function() {
							return 7
						}
					}).a
			})
	}, function(e, t, n) {
		var r = n(10),
			i = n(4).document,
			a = r(i) && r(i.createElement);
		e.exports = function(e) {
			return a ? i.createElement(e) : {}
		}
	}, function(e, t) {
		e.exports = function(e) {
			if ("function" != typeof e)
				throw TypeError(e + " is not a function!");
			return e
		}
	}, function(e, t, n) {
		var i = n(24);
		e.exports = function(e, t, n) {
			for (var r in t) i(e, r, t[r], n);
			return e
		}
	}, function(e, t) {
		e.exports = function(e, t, n, r) {
			if (!(e instanceof t) || void 0 !== r && r in e)
				throw TypeError(n + ": incorrect invocation!");
			return e
		}
	}, function(e, t, n) {
		var r = n(17),
			i = n(8);
		e.exports = function(e) {
			if (void 0 === e) return 0;
			var t = r(e),
				n = i(t);
			if (t !== n)
				throw RangeError("Wrong length!");
			return n
		}
	}, function(e, t, n) {
		var r = n(54),
			i = n(34).concat("length", "prototype");
		t.f = Object.getOwnPropertyNames || function(e) {
			return r(e, i)
		}
	}, function(e, t, n) {
		var o = n(11),
			s = n(27),
			u = n(57)(!1),
			l = n(33)("IE_PROTO");
		e.exports = function(e, t) {
			var n,
				r = s(e),
				i = 0,
				a = [];
			for (n in r) n != l && o(r, n) && a.push(n);
			for (; t.length > i;) o(r, n = t[i++]) && (~u(a, n) || a.push(n));
			return a
		}
	}, function(e, t, n) {
		var r = n(32);
		e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
			return "String" == r(e) ? e.split("") : Object(e)
		}
	}, function(e, t) {
		e.exports = function(e) {
			if (null == e)
				throw TypeError("Can't call method on  " + e);
			return e
		}
	}, function(e, t, n) {
		var u = n(27),
			l = n(8),
			d = n(18);
		e.exports = function(s) {
			return function(e, t, n) {
				var r,
					i = u(e),
					a = l(i.length),
					o = d(n, a);
				if (s && t != t) {
					for (; o < a;)
						if ((r = i[o++]) != r) return !0
				} else
					for (; o < a; o++)
						if ((s || o in i) && i[o] === t) return s || o || 0;
				return !s && -1
			}
		}
	}, function(e, t, n) {
		var r = n(13),
			i = n(4),
			a = "__core-js_shared__",
			o = i[a] || (i[a] = {});
		(e.exports = function(e, t) {
			return o[e] || (o[e] = void 0 !== t ? t : {})
		})("versions", []).push({
			version : r.version,
			mode : n(26) ? "pure" : "global",
			copyright : "?? 2018 Denis Pushkarev (zloirock.ru)"
		})
	}, function(e, t, n) {
		"use strict";
		var s = n(19),
			u = n(18),
			l = n(8);
		e.exports = function(e) {
			for (var t = s(this), n = l(t.length), r = arguments.length, i = u(1 < r ? arguments[1] : void 0, n), a = 2 < r ? arguments[2] : void 0, o = void 0 === a ? n : u(a, n); i < o;) t[i++] = e;
			return t
		}
	}, function(e, t, n) {
		var i = n(14),
			a = n(49),
			o = n(2)("species");
		e.exports = function(e, t) {
			var n,
				r = i(e).constructor;
			return void 0 === r || null == (n = i(r)[o]) ? t : a(n)
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(4),
			i = n(9),
			a = n(7),
			o = n(2)("species");
		e.exports = function(e) {
			var t = r[e];
			a && t && !t[o] && i.f(t, o, {
				configurable : !0,
				get : function() {
					return this
				}
			})
		}
	}, function(e, t, r) {
		var i = r(14),
			a = r(95),
			o = r(34),
			s = r(33)("IE_PROTO"),
			u = function() {},
			l = "prototype",
			d = function() {
				var e,
					t = r(48)("iframe"),
					n = o.length;
				for (t.style.display = "none", r(97).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), d = e.F; n--;)
					delete d[l][o[n]];
				return d()
			};
		e.exports = Object.create || function(e, t) {
			var n;
			return null !== e ? (u[l] = i(e), n = new u, u[l] = null, n[s] = e) : n = d(), void 0 === t ? n : a(n, t)
		}
	}, function(e, t, n) {
		var r = n(11),
			i = n(19),
			a = n(33)("IE_PROTO"),
			o = Object.prototype;
		e.exports = Object.getPrototypeOf || function(e) {
			return e = i(e), r(e, a) ? e[a] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? o : null
		}
	}, function(e, t) {
		var n = {
			utf8 : {
				stringToBytes : function(e) {
					return n.bin.stringToBytes(unescape(encodeURIComponent(e)))
				},
				bytesToString : function(e) {
					return decodeURIComponent(escape(n.bin.bytesToString(e)))
				}
			},
			bin : {
				stringToBytes : function(e) {
					for (var t = [], n = 0; n < e.length; n++) t.push(255 & e.charCodeAt(n));
					return t
				},
				bytesToString : function(e) {
					for (var t = [], n = 0; n < e.length; n++) t.push(String.fromCharCode(e[n]));
					return t.join("")
				}
			}
		};
		e.exports = n
	}, function(e, t, n) {
		var v,
			y,
			E,
			A,
			r;
		v = n(126), y = n(64).utf8, E = n(42), A = n(64).bin, (r = function e(t, n) {
			t.constructor == String ? t = n && "binary" === n.encoding ? A.stringToBytes(t) : y.stringToBytes(t) : E(t) ? t = Array.prototype.slice.call(t, 0) : Array.isArray(t) || (t = t.toString());
			for (var r = v.bytesToWords(t), i = 8 * t.length, a = 1732584193, o = -271733879, s = -1732584194, u = 271733878, l = 0; l < r.length; l++) r[l] = 16711935 & (r[l] << 8 | r[l] >>> 24) | 4278255360 & (r[l] << 24 | r[l] >>> 8);
			r[i >>> 5] |= 128 << i % 32, r[14 + (i + 64 >>> 9 << 4)] = i;
			var d = e._ff,
				f = e._gg,
				c = e._hh,
				h = e._ii;
			for (l = 0; l < r.length; l += 16) {
				var p = a,
					g = o,
					m = s,
					_ = u;
				o = h(o = h(o = h(o = h(o = c(o = c(o = c(o = c(o = f(o = f(o = f(o = f(o = d(o = d(o = d(o = d(o, s = d(s, u = d(u, a = d(a, o, s, u, r[l + 0], 7, -680876936), o, s, r[l + 1], 12, -389564586), a, o, r[l + 2], 17, 606105819), u, a, r[l + 3], 22, -1044525330), s = d(s, u = d(u, a = d(a, o, s, u, r[l + 4], 7, -176418897), o, s, r[l + 5], 12, 1200080426), a, o, r[l + 6], 17, -1473231341), u, a, r[l + 7], 22, -45705983), s = d(s, u = d(u, a = d(a, o, s, u, r[l + 8], 7, 1770035416), o, s, r[l + 9], 12, -1958414417), a, o, r[l + 10], 17, -42063), u, a, r[l + 11], 22, -1990404162), s = d(s, u = d(u, a = d(a, o, s, u, r[l + 12], 7, 1804603682), o, s, r[l + 13], 12, -40341101), a, o, r[l + 14], 17, -1502002290), u, a, r[l + 15], 22, 1236535329), s = f(s, u = f(u, a = f(a, o, s, u, r[l + 1], 5, -165796510), o, s, r[l + 6], 9, -1069501632), a, o, r[l + 11], 14, 643717713), u, a, r[l + 0], 20, -373897302), s = f(s, u = f(u, a = f(a, o, s, u, r[l + 5], 5, -701558691), o, s, r[l + 10], 9, 38016083), a, o, r[l + 15], 14, -660478335), u, a, r[l + 4], 20, -405537848), s = f(s, u = f(u, a = f(a, o, s, u, r[l + 9], 5, 568446438), o, s, r[l + 14], 9, -1019803690), a, o, r[l + 3], 14, -187363961), u, a, r[l + 8], 20, 1163531501), s = f(s, u = f(u, a = f(a, o, s, u, r[l + 13], 5, -1444681467), o, s, r[l + 2], 9, -51403784), a, o, r[l + 7], 14, 1735328473), u, a, r[l + 12], 20, -1926607734), s = c(s, u = c(u, a = c(a, o, s, u, r[l + 5], 4, -378558), o, s, r[l + 8], 11, -2022574463), a, o, r[l + 11], 16, 1839030562), u, a, r[l + 14], 23, -35309556), s = c(s, u = c(u, a = c(a, o, s, u, r[l + 1], 4, -1530992060), o, s, r[l + 4], 11, 1272893353), a, o, r[l + 7], 16, -155497632), u, a, r[l + 10], 23, -1094730640), s = c(s, u = c(u, a = c(a, o, s, u, r[l + 13], 4, 681279174), o, s, r[l + 0], 11, -358537222), a, o, r[l + 3], 16, -722521979), u, a, r[l + 6], 23, 76029189), s = c(s, u = c(u, a = c(a, o, s, u, r[l + 9], 4, -640364487), o, s, r[l + 12], 11, -421815835), a, o, r[l + 15], 16, 530742520), u, a, r[l + 2], 23, -995338651), s = h(s, u = h(u, a = h(a, o, s, u, r[l + 0], 6, -198630844), o, s, r[l + 7], 10, 1126891415), a, o, r[l + 14], 15, -1416354905), u, a, r[l + 5], 21, -57434055), s = h(s, u = h(u, a = h(a, o, s, u, r[l + 12], 6, 1700485571), o, s, r[l + 3], 10, -1894986606), a, o, r[l + 10], 15, -1051523), u, a, r[l + 1], 21, -2054922799), s = h(s, u = h(u, a = h(a, o, s, u, r[l + 8], 6, 1873313359), o, s, r[l + 15], 10, -30611744), a, o, r[l + 6], 15, -1560198380), u, a, r[l + 13], 21, 1309151649), s = h(s, u = h(u, a = h(a, o, s, u, r[l + 4], 6, -145523070), o, s, r[l + 11], 10, -1120210379), a, o, r[l + 2], 15, 718787259), u, a, r[l + 9], 21, -343485551), a = a + p >>> 0, o = o + g >>> 0, s = s + m >>> 0, u = u + _ >>> 0
			}
			return v.endian([ a, o, s, u ])
		})._ff = function(e, t, n, r, i, a, o) {
			var s = e + (t & n | ~t & r) + (i >>> 0) + o;
			return (s << a | s >>> 32 - a) + t
		}, r._gg = function(e, t, n, r, i, a, o) {
			var s = e + (t & r | n & ~r) + (i >>> 0) + o;
			return (s << a | s >>> 32 - a) + t
		}, r._hh = function(e, t, n, r, i, a, o) {
			var s = e + (t ^ n ^ r) + (i >>> 0) + o;
			return (s << a | s >>> 32 - a) + t
		}, r._ii = function(e, t, n, r, i, a, o) {
			var s = e + (n ^ (t | ~r)) + (i >>> 0) + o;
			return (s << a | s >>> 32 - a) + t
		}, r._blocksize = 16, r._digestsize = 16, e.exports = function(e, t) {
			if (null == e)
				throw new Error("Illegal argument " + e);
			var n = v.wordsToBytes(r(e, t));
			return t && t.asBytes ? n : t && t.asString ? A.bytesToString(n) : v.bytesToHex(n)
		}
	}, function(e, t, n) {
		n(67), e.exports = n(130)
	}, function(e, t, n) {
		n(21);window.rec_rp = window.rec_rp || function() {
			for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
			(window.rec_rp.q = window.rec_rp.q || []).push(t)
		}, window.player_fullwin = function(e) {
			var t = document.querySelector("#bofqi");
			if (window.PlayerAgent && "function" == typeof window.PlayerAgent.player_fullwin && window.PlayerAgent.player_fullwin(e), !1 === e && (t.classList.remove("wide"), document.body.classList.remove("player-mode-widescreen")), !1 !== e || null !== window.ff_embed_stack) {
				if (null === window.ff_embed_stack) {
					window.ff_embed_stack = [], window.ff_embed_stack_style = [];
					for (var n = t; n.setAttribute("embed_stack", !0), window.ff_embed_stack.push(n), n = n.parentNode;)
						;
				}
				e ? (t.classList.add("webfullscreen"), document.body.classList.add("player-mode-webfullscreen"), document.body.classList.add("player-fullscreen-fix")) : (t.classList.remove("webfullscreen"), document.body.classList.remove("player-mode-webfullscreen"), document.body.classList.remove("player-fullscreen-fix"))
			}
		}, window.PlayerSetOnline = function(e) {
			window.PlayerAgent && "function" == typeof window.PlayerAgent.PlayerSetOnline && window.PlayerAgent.PlayerSetOnline(e)
		}, window.player_widewin = function() {
			var e = document.querySelector("#bofqi");
			e.classList.remove("webfullscreen"), e.classList.add("wide"), document.body.classList.remove("player-mode-webfullscreen"), document.body.classList.remove("player-fullscreen-fix"), document.body.classList.add("player-mode-widescreen"), window.PlayerAgent && "function" == typeof window.PlayerAgent.player_widewin && window.PlayerAgent.player_widewin()
		}, window.heimu = function(e, t) {
			var n = document.querySelector("#heimu");
			n || (document.querySelector("head").insertAdjacentHTML("beforeend", '<style id="black-mask">#heimu {background: #000; position: fixed; top: 0; left: 0; display: none; height: 100%; width: 100%; opacity: 0.9; z-index: 10015;} .player-mode-blackmask #bofqi {z-index: 10016; position: relative !important}</style>'), document.body.insertAdjacentHTML("beforeend", '<div id="heimu"></div>'), n = document.querySelector("#heimu")), 0 === t ? (n.style.display = "none", document.body.classList.remove("player-mode-blackmask")) : (document.body.classList.add("player-mode-blackmask"), n.style.opacity = ".".concat(e / 10), n.style.filter = "alpha(opacity=".concat(e, ")"), n.style.display = "block")
		}, window.getAuthorInfo = function() {
			var e,
				t,
				n,
				r = !1,
				i = parseInt(window.mid, 10);
			return window.AttentionList && 0 <= window.AttentionList.indexOf(i) && (r = !0), n = (e = document.querySelector(".upinfo")) ? (t = e.querySelector(".name").textContent(), e.querySelector(".u-face img").getAttribute("src")) : (t = (e = document.querySelector(".zu_play_info")) && e.querySelector(".upload_user a").getAttribute("card"), e && e.querySelector(".upload_user img").getAttribute("src")), {
					mid : i,
					uname : t,
					face : n,
					attention : r
			}
		}, window.flashChecker = function() {
			var e = !1,
				t = 0;
			if (!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()) && !/Edge/i.test(navigator.userAgent) || /Trident/i.test(navigator.userAgent)) try {
					var n = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash");
					if (n) {
						e = !0;
						var r = n.GetVariable("$version");
						t = parseInt(r.split(" ")[1].split(",")[0], 10)
					}
				} catch (e) {
					console.error(e)
			}
			else if (navigator.plugins && 0 < navigator.plugins.length) {
				var i = navigator.plugins["Shockwave Flash"];
				if (i) {
					e = !0;
					for (var a = i.description.split(" "), o = 0; o < a.length; ++o) isNaN(parseInt(a[o], 10)) || (t = parseInt(a[o], 10))
				}
			}
			return {
				hasFlash : e,
				flashVersion : t
			}
		}, window.deltaFilter = function(e) {
			var t = 0;
			return e.wheelDelta || e.deltaY ? (t = (e.wheelDelta || 40 * -e.deltaY) / 40, window.opera && (t = -t)) : e.detail && (t = -e.detail), t
		}, window.loadProgress = n(68), window.GrayManager = n(39), window.EmbedPlayer = n(89)
	}, function(e, t) {
		var n = {
			init : function(e) {
				window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
					window.setTimeout(e, 1e3 / 60)
				}, window.cancelNextRequestAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout, this.timer && window.cancelNextRequestAnimationFrame(this.timer), this._timer && window.cancelNextRequestAnimationFrame(this._timer), this.config = e, this.prefix = "bilibili-player-video", this.content = this._content(), this.publicStyle = this._publicStyle(), this.wrapBG = this._setWrapBG(), this.times = 1, this.per = 0, this.timer = 0, this._timer = 0, this.prefix = "bilibili-player-video";
				var t = document.querySelector(".playerLoadProgress");
				t && t.parentNode.removeChild(t), this.bofqi = document.querySelector("#bofqi"), this.setProgressPos({
					w : this.bofqi.clientWidth,
					h : this.bofqi.clientHeight
				}), document.querySelector("head").insertAdjacentHTML("beforeend", '<style class="playerLoadProgress">'.concat(this.publicStyle, "</style>")), this._isPGC() || document.querySelector("head").insertAdjacentHTML("beforeend", '<style class="playerLoadProgress">'.concat(this.wrapBG, "</style>")), this.bofqi.insertAdjacentHTML("beforeend", this.content), this._bind(), this.start()
			},
			setProgressPos : function(e) {
				var t = e.w,
					n = e.h;
				try {
					"1" === this.config.as_wide || JSON.parse(localStorage.bilibili_player_settings).video_status.widescreensave && JSON.parse(localStorage.bilibili_player_settings).video_status.iswidescreen ? this._setContainerWH({
						width : t,
						height : n - 68
					}) : this._setContainerWH({
						width : t - 300,
						height : n - 116,
						top : 50
					})
				} catch (e) {
					this._setContainerWH({
						width : t - 300,
						height : n - 116,
						top : 50
					})
				}
			},
			_bind : function() {
				var n = this;
				window.addEventListener("scroll", function() {
					var e = document.querySelector(".".concat(n.prefix, "-load-wrap")),
						t = document.querySelector(".".concat(n.prefix, "-mask-bg"));
					!n._isMiniScreen() || e && e.classList.contains("".concat(n.prefix, "-mini-mode")) ? (e && e.classList.remove("".concat(n.prefix, "-mini-mode")), t && (t.style.display = "block")) : (e && e.classList.add("".concat(n.prefix, "-mini-mode")), t && (t.style.display = "none"))
				}), window.addEventListener("resize", function() {
					document.querySelector(".".concat(n.prefix, "-load-wrap")) && n.setProgressPos({
						w : n.bofqi.clientWidth,
						h : n.bofqi.clientHeight
					})
				})
			},
			_content : function() {
				return '\n            <div class="'.concat(this.prefix, '-mask-bg"></div>\n            <div class="').concat(this.prefix, '-load-wrap">\n                <div class="').concat(this.prefix, '-load-content">\n                    <div class="').concat(this.prefix, '-load-tv">\n                        <div class="').concat(this.prefix, '-load-mask"></div>\n                        <img class="small-tv-ico" src="data:image/gif;base64,R0lGODlhWgBaALMOAHR0dAICAnd3dwEBAXh4eAMDAwkJCQ0NDQsLCxwcHA4ODggICHl5eQAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiYWE1ODg5ZS1jN2RmLTRmZmUtYjkzOS0wMmVkMTZhNmNjZDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0I2ODI2NjA1NzhGMTFFNkEyMEVDNzhEOUY1RkQxRjgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0I2ODI2NUY1NzhGMTFFNkEyMEVDNzhEOUY1RkQxRjgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjljYjgzNjY2LWYxYWUtNGMyZi1hMGEwLThhODJmYjIxM2U0MyIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmU1NDE3YzFmLTllODAtMTE3OS04NjdiLWUyN2Y3M2VkMTZkOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAkKAA4ALAAAAABaAFoAAAT/0MlJq7046827/2AojmRpnmiqrmzrvnAsz3Ta3HW+3bjuV7wbg/H7BYXEYu7YGCaVjuDr6Hwqjy2qEzphNlTaIZfi/ZqY2zHZW0KL1RVGeRS2wiXD+ad+x8jZHXx9GX9MO2GDG3mGGG52iX5ojUFVRWWXmJmam1IknJ+goXoioqWmnHSnqquUpDxVsLGys7S1tk6Uj4dIt72+v7K5IcKQF8R7r1asPC7HHs7L0Z3Ogclr0tES1BzH2NiLSMPWUcnAsd7gTboaxLnm77e527vq2uMm8FXy98/j8z77woFoxw9Fp2pI/mUgKBDMQXrp3iATqNBeD3rMIBaqN9BfwWsZ/7kBmpTwo0aLHIF4kchupIWAKftRLHgpDYeND7skq2jMY0NyjlgqwnlRZ8mfCDlCqyO0A1E7MJueBBrTnc0RG1lGXbfQZ0w8sFLEAhmRK0khKJtWConv6lZXaKlKNWpmyk6TJxVqoWvw7iu49fQyLOrJWitx4QTzQhnX4sTAeLsmjuyO8cWcLScjFan5K9kkl9KapSuG50vDlFtlkjtaNGvEkDeDXIlprsrOts+WjkzVUZmrkmN7zsu7dzkiK3OTRl78NO7WQenK7vkc9u7pt9UJrZz0+vDMwpVPGGuBPOfwrbO/8SbNu3j1oNkvc5/+s3T5oraYhn8f/6e1zfFHQZY+BPbiWkdIFajgLMs9ZgoX+1nmn0upYOfchPK95iCG+L034HHpAAAAh6V4OOAsQYh4hAAC3EJAMO3VV55WmLBYiwAv+pKiirzoE+CGDbAoZFu4eCGiiOdYCBgPQrK4wiVHXlDJk0w4mUUZAGgAXApNDtmMkVn+0KWVLhxppojFsHBmlGm26eabcMYp55x01mnnnXjSEAEAIfkECQoADgAsAAAAAFoAWgAABP/QyUmrvTjrzbv/YCiOZGmeaKqubOu+cCxbTT3fX23jfKbXDEZvSPk1gkSiMShM8pZMZ1HngjalEiPLip1qUdZr12Hcmbhj73eETlMY5QbpxxS7JfCyqH2v5NccfH1+cR6CgxVxchqHiIR6GGGOG38/kXRIkxyVR2SKn6CFbKGkpaangDmoq6ytdh2tsbKhmaqzpHW5uru8lbWGOr3Cw8TFvJghmMbLUVvBrxvImmq/sM+Jt9mWE9K2R2La4VRZ1yDdnuLaTefWQFfp4kjsgeXo38z4xMjz0fXK+QB37asHzB03gkqu8WPkD+GQgQbNNYxIY1zBRf0MLvQx8duFVBn/zXDU6DBkrXllqo3cdokkxYsnEaZUudJiRZceJVI8N5NmTZsHcfpcGXOnpBCcRJITCo2h0afuhlISFdTjxpY57RW91/QDJ3AKSzrNyi5XCl/vwr5sB6RqtToZPZhdalXs2LRrvXwEqgEuXXl2ia4Ty7Jq1qX0mO4pt7DbTDWJ6+aNnKkx48duu2oVchVrZcKXqW6+yzmw58GTR4eie/im5NZsP6emhUsqRNiUUeO2F4cJqGanRycLvfs3kqSmb0sNLnxvzyvIlyvXzPyqMD9oqU9fHLEzLwy7TJZOTfovdRF+y3d2ThZeNsDkBRt272r87vLz6Z+Kst71L/2x8GcapHsqBWTgMOZxB9uBDIbXnDcAAricaxFKeB42FUY4IYbpHJCAAgYYsEABoQRgYgA6nIiicaNw9VUQ/zCoIhMz6tKfBcco84MAAjTIQI0/npjjfZtspQiPKdTogJI4AgcGKDwKoIKQKprok5MpCFBGlEgmWSWTPPBoBJctBCkklmFyKaULZgYwVxJqwnDmhtN4hWadJtyJ55589unnn4AGKuigG0QAACH5BAkKAA4ALAAAAABaAFoAAAT/0MlJq7046827/2AojmRpnmiqrmzrvnAsW009319t43ym1wxGb0j5NYJEojEoTPKWTOfzF5VOfi1o0yoxNlTaLdf7PXmr3CvZpE1bGORyKOx+x+Udev0CX3vaexhBcRyAgRmDXhp6U3ghfVQ+VEhDd5aXmJmajjmbnp+gOiShpKWWlCCmqqtHYn86TLGys7S1tre3kyKTuL2+v7mwrnnChxi6c8VqrFnKqc4OrNJ4yM9AYtPSy627xaLZzNHQr9fiNsC22ULVneWR6PC/k+zk3PQk8bHz48Tu/ErC7hXy9q9SwIKLCJZbgaVeooXW7CHsImpgww37ILaTqLGIIotG/zAe7NiPI7cKd1BJ8nMh48mISNidUomIUMuRLzfGdJYyloeHsG5eEyjSH8Qzsx5Byklx6MRjCl/y8olPFg2cNEvu7Jg0BVWPTkmC3MrUZ8VlYLAOG7sO4cWmnEa4zMrWHFOwJ5egmLu2qEm6dvMS1bkUcEKjd+FWOYNyh9bCfQ//7csr8Fm7hAevnAx14Z1thvECDd2Zs1DBmkgrhtwNMWBFS2ZGFs06mevIsnvOBl0bZluxcJEKWfqUt+bSZEP3nDBa9erjp5PvBtrKFS2HvQnbVW2LDxq20K+6BqeqeWuT5Mtnxx48/SdZ4RtDJO4+tb7i4nPm2/+L9/ms/AVYi3Z/tiVmTHx41Vefc/IpuOBupzmYHoMJZoPAAQ5SWEEtwkCGDgHBXOMhEwhuSEuHU+FCAIi48JIiJN/ttVxaQBjCXIxmKPKVjHHgiGOOYUAYERQGlbhRZUNc98KLSXT1woDGtLBjlFRWaeWVWGap5ZZcdumlChEAACH5BAkKAA4ALAAAAABaAFoAAAT/0MlJq7046827/2AojmRpnmiqrmzrvnAsW009319t43ym1wxGbzj5AYXEoTGITOKWTOfzx2xKHb8W1Ho1NlTba8X7PW25YnJ55I2KLQw1mxp8Y+LyHL1uv6vXGmd9GkF5gXuDHIVkPoiJHYtGF4JEf5aXmJmZJZqdnp+GIaCjpJloHKWpqlCiOlWvsLGys7S1THStR7a7vL2xuCDAj5Oup4dHwxjCHsvJRcW5DXxYqzouzajQ1NXc1hLYG8Dd4zvgx9JI5ONC5o3I2+i+sOSR6NF8e/L6tXTtytr+POyr0k+bnncBbxR8d9AevGkpsjArlnAMQIPEdmTzthFdRQri/zA+k9SBUTiKIjviE/kHojuS/458HOlwCc02Ll9KzOgx5UmGVL6pefUBjxee9XL+dPiQ3Rk3RY3upJnU2MtpuPJBFSEViEWZPs9hNQhLhVSIC5lOBErWDccSZal2tRqTqbmpQgFB2prV1b0mdzHCBKlRrFOGJQ0GRjw4r966dWY2lQvZCivKhic3HIuYMGObjtUiPSx6KWevoz3vdHSVtNLWqo0JGwovnmnXdGkI9smo09bKmteqBafqd2rJyxYP7Vost+PIYYFjvsBcF5kqiZEh3925wq3mSGQJh949881UEmJtxh2Mu7pU5EubD/1+VPzX0unX10R0e2fw+nDTX5l0qXk30IG0xOacgtThtxeCaBGoW3nO+LffhRTWheF+Dk64IYcLqjZOACQGUEABJA6g4orVdNjgPDoAIKNWENYDwA8y/pIhITA2cCNONRIUI44A2MLCj17IyIIRSCp5h4sgIBmjjAAsqYaTPTBJZZUrXInlEFt+CQYZVDoRZgwzTunMCmGWuWYLW74p55x01mnnnXjmqecNEQAAIfkEBQoADgAsAAAAAFoAWgAABP/QyUmrvTjrzbv/YCiOZGmeaKqubOu+cCzP9Nrcdb7duO5XvBuD8fsFhcSi7jhMKh3BF7P5lBxb02HVelUdG9Qtt3vKiinfRjnYdJ6h31LW/XYw0qJvuE65x0FmfBdpah1zghh+ZBmHiIl4jIGOGYo8kTx7NYSbnJ2en5t5oKOkpaEhpqmqo1ofq6+wenQ7mG22t7i5uru8TWyzGr+9w8TFub+AtZODyq7NY7AwyM5IaLHXURPTHttw2NjW1dRgSd/m5NCt3M3Cxm3nrd0c0+3u9rr0z4bs+iP37/zErRMnz0hAdOPi9TNIcGGwg+qY9dg38WFDgRQRFtSWLWNFiRr/HV4KiTGcSCCEMOQrSesiQpO1gIH8Y1IhS4skX0KLKfNCpUXeckacB9FNmjYhhhytWe4kSJsvZWUC4evZSp1EXaqb09MDLo5au1pgks5JOxZIy6pNJmTtBFuXUCCbgkqZPKSWUH4UVU1Y3b4nO4IFY2JuzL/oNroNOpRtYqcq7QbWRzZcRi2KcWJ2ygZmIWiXiWQeufnm4M8pFz8VDXk1466lVI+VbFoz69o7SzXW+xh3ZMC+g07ZNHU2cKyhX3f4aYtQcd6lkWftLd1nrtzVmSpHHH03pbRv/bak7t228HOvuot1jR6ber7U2696z72p/Pm3s5N28q9/se2OReTffYC7AJjQemeMZpx8MSjI230Q6rdghPeV9xuF8lmYyC48kcMLhhJuiIsw9RDo3IitOQbJBsawwQMAANxymA2cwEjjFzZapyFiL8Lo4404iojFET4WCSSRPgRRJABSEJKjDksyGUOUP/pg5AxUPrnMllx26eWXYIYp5phkjhkBADs=">\n                    </div>\n                    <span class="').concat(this.prefix, '-load-progress-title">Loading(\n                        <span class="').concat(this.prefix, '-load-percent">0%</span>)...\n                    </span>\n                </div>\n            </div>\n        ')
			},
			_publicStyle : function() {
				return "\n            .".concat(this.prefix, "-mask-bg {\n                width: 100%;\n                height: 100%;\n                position: absolute;\n                top: 0;\n                left: 0;\n                background-color: #fff;\n            }\n\n            .").concat(this.prefix, "-load-wrap {\n                height: 100%;\n                position: absolute;\n                top: 0;\n                left: 0;\n                z-index: 9999\n            }\n\n            .").concat(this.prefix, "-load-content {\n                position: absolute;\n                top: 50%;\n                left: 50%;\n                transform: translate(-50%, -50%);\n                margin: auto;\n                width: 178px;\n                height: 90px;\n            }\n\n            .").concat(this.prefix, "-load-tv {\n                margin-top: 55px;\n                width: 90px;\n                height: 90px;\n                overflow: hidden;\n                position: relative;\n                margin: 0 auto;\n            }\n\n            .").concat(this.prefix, "-load-mask {\n                width: 90px;\n                height: 90px;\n                background: rgba(255, 255, 255, .4);\n                position: absolute;\n                top: 0;\n                left: 0;\n            }\n\n            .").concat(this.prefix, '-load-progress-title {\n                white-space: nowrap;\n                font-family: "Times New Roman";\n                // display: inline-block;\n                height: 34px;\n                line-height: 34px;\n                font-size: 28px;\n            }\n            .').concat(this.prefix, "-mini-mode {\n                width: 100% !important;\n                height: 100% !important;\n                top: 0 !important;\n            }\n        ")
			},
			_setWrapBG : function() {
				return "\n            .".concat(this.prefix, "-mask-bg {\n                width: 100%;\n                height: 100%;\n                position: absolute;\n                top: 0;\n                left: 0;\n                background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB6gAAARYCAMAAACLc30PAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjU5NDdGRTAyOENEMTFFOEE0RDU5RjM2NTBCN0M1MjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjU5NDdGRTEyOENEMTFFOEE0RDU5RjM2NTBCN0M1MjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyNTk0N0ZERTI4Q0QxMUU4QTRENTlGMzY1MEI3QzUyMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyNTk0N0ZERjI4Q0QxMUU4QTRENTlGMzY1MEI3QzUyMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pm9/ITkAAAFEUExUReXp7/7+/vT09Pf39/v7+/39/fn5+fX19fb29vj4+Pr6+vz8/PPz8/X2+Pn6+/b3+ff4+ufn5/7+//z8/ejo6Pn5+/r7/O7u7vv7/Pj5+vr6++vr6/P09unp6ff4+ezs7PLz9fDx8vHy9J2mrfHx8e3t7fj4+u/w8Z6nrpqjq+vt78PJzeXn6KiwtvP09cXKz6mxt/v8/PLz9MHGy8rP07/Fyfb398/T15ylraOrsrK5v8DGy9nc3621u+3t7rG4vd3g4+fp6+fq66+2vKautfz9/bvBx+7v8Ozu7/Ly9P7//7O6v/Hy8/Dw8vDx8+rq6/j5+a61vOvt7r/FyvLy8vr7+9jc39TY29jb3vT19rvBxqmwt8nO0tXZ3O3v8N7h4+7w8cDGysfM0dPX26evtrW8wZylrJukq8LHzJmiqvT19////7QgRrUAACfqSURBVHja7N35exvHfcBhrUlC4rEzCx2WbEU+YjmnHTtJ0zZt0rRJm6ZN7/u+L2L//98LUKIIQQAIQtzd2Zn3ffg8lil+IYDg8IMZ8LhzDsCtuHOnhVt3x9ICEGqEGkCoQagBhBqhBkCoEWoAoQahBhBqhBpAqEGoAYQaoQZAqBFqAKEGoQYQaoQaQKhBqAGEGqEGQKgRagChBqEGEGqEGkCoQagBhBqhBkCoEWoAoQahBhBqhBpAqEGoAYQaoQZAqBFqAKEGoQYQaoQaQKhBqAGEGqEGQKgRagChBqEGEGqEGkCoQagBhBqhBkCoEWoAoQahBhBqhBpAqEGoAYQaoQZAqBFqgOxDXYVYz7hWHUPVWxEfhK/Fei5+LTwY+lKEGmDQUAeV3r3VoY9I33/SvHaf1M2T+0NdilADDB3qRn5vouk+04/WPHKqH90f4lKEGmDwUAftvZmu99TvbzjgqN/v/1KEGmDwUFfOvW96+t3p89QPttwf9YN+L0WoARIItQ11Ulvqd7c+bqrf7fNShBoghVBH4b2p2F2n37vu336vv0sRaoAkQu3k++Zn3511+oPr//EP+roUoQZII9S6e3OD7ad32g3fzqUINYBQC/XKM8u7/evv9nEpQg0g1EK9+1dq7/5V27dzKUININRCve9XC9TdX4pQAwi1UK/8hJLd//33u74UoQYQaqFe+YmfN/jy+/p+t5ci1ABCLdQrHt3kCjzq9lKEGkCohXr/rfDmzfDtXIpQAwi1UK94crNr8KTLSxFqAKEW6rf7XaNNl5ci1ABCLdRv95Nc6y4vRagBhFqoV35MyU2vwoPuLkWoAYRaqN/2l42G7i5FqAGEWqjf7snlDU8v386lCDWAUAv12/5W8NjdpQg1gFAL9dv+VvC6u0sRagChFmqhBhBqoRZqoQYQaqEWagCE2heT+WIyAKFmLN+e9bXuLkWoAYRaqP3AEwChFurxhNqPEAUQaqFOONR+KQeAUAt1yqH2ay4BhFqoEw71k5tdgyddXopQAwi1UK+4f6NT6/p+l5ci1ABCLdSrHt3kCjzq9lKEGkCohfotNsObt8K3cylCDSDUQr3q/d3//fe7vhShBhBqod77e6vq7i9FqAGEWqhXf1zJjo2tH3R/KUININRCverd3f71d/u4FKEGEGqhXvXeLv/4e/1cilADJBLqWndvqu4q1O0H1//jH/R1KUINkEaoo/DeVOws1Nfvht/r71KEGiCJUAfhvanQXajbd7eecNTv9nkpQg2QQqgrZ983PfmuOgz11q/a3v0rtW/nUoQaIIFQ21KntKG++JklGyJbv9//pQg1wPChvunvRixd03bt/qM1ka0f3R/iUoQaYPhQt8Hp9+7n3qHtwf0nzWv3Sd08uT/UpQg1wOChbqsQtXqXSsdQtX15EJpYz8UmPBj6UoQaYNhQg1ADCDVCDYBQI9QAQo1QAyDUCDWAUMPuofYuALilT6g+oyLUAEKNUAMg1Ag1gFCDUAMINUINgFAj1ABCjVADINQINYBQg1ADCDVCDYBQI9QAQo1QAyDUCDWAUINQAwg1Qg2AUCPUAEKNUAMg1Ag1gFCDUAMINUINgFAj1ABCjVADINQINYBQg1ADCDVCDYBQI9QAyYcaOmBpAQg1Qg1QQKi9D+jg48q7AECoEWoAoQahBhBqhBoAoUaoAYQafFgBCDVCDSDUINQAQo1QAyDUCDWAUINQAwg1Qg0g1CDUAEKNUANwq6GuQqxnt6yOoer79rsd3dwOoQYYNtTh1qvwsg2h35vvdnR0O4QaYNBQN7PONH3eerejq9sh1ABDhjrMOtTjXtTt6Ox2CDXAgKGu6i7DUPf2/K7b0d3tEGqAAUPd6Qaux62o29Hd7RBqgAFDHbsNQ+zrtrsd3d0OoQYYMNR1t2Go+7rtbkd3t0OoAQYM9axjfd12t6O72yHUAEIt1EININQC53YINYBQC5xQAyDUbodQAwi1wLkdQg0g1EIt1ABCLXBuh1ADCLXACTUAQu12CDWAUAuc2yHUAEIt1EININQC53YINYBQC5xQA3B7ofbrId0OoQZIONSx2zDEvm6729Hd7RBqgAFDHboNQ+jrtrsd3d0OoQYYMNRVp2etddXXbXc7ursdQg0wYKi73cKF/m6829HZ7RBqgCFD3TbddaHp89a7HV3dDqEGGDTUbejotLUO/d58t6Oj2yHUAMOGuq1CvPU21DFUfd9+t6Ob2yHUAAOHGoQaQKgRagChBqEGEGqEGgChRqgBhBqEGkCoEWoAoQahBhBqhBoAoUaoAYQahBpAqBFqAKGGDlhaAEKNUAMUEGrvAzr4uPIuABBqhBpAqEGoAYQaoQZAqBFqAKEGH1YAQo1QAwg1CDWAUCPUAAg1Qg0g1CDUAEKNUAMINQg1gFAj1AAINUININQg1ABCjVADCDUINYBQI9QACDVCDSDUINQAQo1QAwg1CDWAUCPUAAg1Qg0g1CDUAEKNUAMINQg1gFAj1AAINUININQg1ABCjVADCDUINYBQI9QACDVCDSDUINQAQo1QAwg1CDWAUCPUAAg1Qg2QfairEOsZBaljqIQaYCyhDipdYquDUAOMI9SNaJWpEWqAMYQ6KFap9tlTCzVAz6GunHuXe/q9x/PUQg3Qc6htqG2phRog4VBHuSpXFGqA5EPt5Lvks2+hBkg+1GpVMqEGEGqEGgChRqgBhBqhtrQAhBqhBhBqoUaoAYQaoQZAqBFqAKFGqIUaQKgRagChFmqEGkCoEWoAhBqhBhBqhFqoAYQaoQYQaqFGqAGEGqEGQKgRagChRqiFGkCoEWoAoRZqhBpAqBFqAIQaoQYQaoRaqAGEGqEGEGqhRqgBhBqhBkCoEWoAoUaohRpAqBFqAKEWaoQaQKgRagCEGqEGEGqEWqgBhgh1rVblqoUaIPlQR7kqVxRqgORDHeSqXEGoAZIPdeXsu9yT70qoAZIPtS21DbVQA6Qc6rZRrDI1e31cWVoAfYe6DU6/Szz3Dvt9XFlaAL2Huq1C1OqyKh1DtefHlaUF0H+oQagBhBqhBkCoEWoAoUaoARBqhBpAqEGoAYQaoQZAqBFqAKFGqAEQaoQaQKhBqAGEGqEGQKgRagChRqgBEGqEGkCoQagBhBqhBkCoEWoAoUaoARBqhBpAqBeqEOvZSNUxVO5toQbIOdRhtJV+2erg7hZqgHxD3cxGr3F/CzVArqEOswzYUws1QKahruocQl17nlqoAfIMdRYbaltqoQbINdQxj1BH97hQA2QZ6jqPUNfucaEGyDLUs0y4x4UaQKiF2seVdwGAUAu1UAMItVAj1ABCLdRCDYBQC7VQAwi1UCPUAEIt1EININRCjVADCLVQCzUAQi3UQg0g1EKNUAMItVALNYBQCzVCDTCGUPs1lwg1QMKhjnmEOrrHhRogy1CHPEId3ONCDZBlqKsszr7ryj0u1ABZhjqPLbUNtVAD5Brqthl/pxv3t1ADZBvqNoz89Lu2nxZqgJxD3VYhjrbVdQyenxZqgLxDDUININQINQBCjVADCDVCDYBQI9QAQg1CDSDUCDUAQo1QAwg1Qg2AUCPUAEINQg0g1Ag1AEKNUAMINUINgFAj1ABCDUININQINQBCjVADCDVCDYBQI9QAQg1CDSDUCDUAQo1QAwg1Qg2AUCPUAEINQg0g1Ag1AEKNUAMINUINgFAj1ABCDUININQINQBCjVADCDVCDYBQI9QAQg1CDSDUCDUAQo1QAwg1Qg2AUCPUAEJ9qQqxnlGQOoZKqAHGEuqg0iW2Ogg1wDhC3YhWmRqhBhhDqINilWqfPbVQA/Qc6sq5d7mn33s8Ty3UAD2H2oballqoARIOdZSrckWhBkg+1E6+Sz77FmqA5EOtViUTagChRqgBEGqEGkCoEWpLC0CoEWoAoRZqhBpAqBFqAIQaoQYQaoRaqAGEGqEGEGqhRqgBhBqhBkCoEWoAoUaohRpAqBFqAKEWaoQaQKgRagCEGqEGEGqEWqgBhBqhBhBqoUaoAYQaoQZAqBFqAKFGqIUaQKgRagChFmqEGkCoEWoAhBqhBhBqhFqoAYQaoQYQaqFGqAGEGqEGQKgRagChRqiFGmCIUNdqVa5aqAGSD3WUq3JFoQZIPtRBrsoVhBog+VBXzr7LPfmuhBog+VDbUttQCzVAyqFuG8UqU7PXx5WlBdB3qNvg9LvEc++w38eVpQXQe6jbKkStLqvSMVR7flxZWgD9hxqEGkCoEWoAhBqhBhBqhBoAoUaoAYQahBpAqBFqAIQaoQYQaoQaAKFGqAGEGoQaQKgRagCEGqEGEGqEGgChRqgBhBqEGkCoEWoAhBqhBhBqhBoAoUaoAYR6oQqxno1UHUPl3hZqgJxDHUZb6ZetDu5uoQbIN9TNbPQa97dQA+Qa6jDLgD21UANkGuqqziHUteephRogz1BnsaG2pRZqgFxDHfMIdXSPCzVAlqGu8wh17R4XaoAsQz3LhHtcqAGEWqh9XHkXAAi1UAs1gFALNUININRCLdQACLVQCzWAUAs1Qg0g1EIt1ABCLdQINYBQC7VQAyDUQi3UAEIt1Ag1gFALtVADCLVQI9QAYwi1X3OJUAMkHOqYR6ije1yoAbIMdcgj1ME9LtQAWYa6yuLsu67c40INkGWo89hS21ALNUCuoW6b8Xe6cX8LNUC2oW7DyE+/a/tpoQbIOdRtFeJoW13H4PlpoQbIO9Qg1ABCjVADINQINYBQI9QACDVCDSDUINQAQo1QAyDUCDWAUCPUAAg1Qg0g1CDUAEKNUAMg1Ag1gFAj1AAINUININQg1ABCjVADINQINYBQI9QACDVCDSDUINQAQo1QAyDUCDWAUCPUAAg1Qg0g1CDUAEKNUAMg1Ag1gFAj1AAINUININQg1ABCjVADINQINYBQI9QACDVCDSDUINQAQo1QAyDUCDWAUCPUAAg1Qg0g1JeqEOsZBaljqIQaYCyhDipdYquDUAOMI9SNaJWpEWqAMYQ6KFap9tlTCzVAz6GunHuXe/q9x/PUQg3Qc6htqG2phRog4VBHuSpXFGqA5EPt5Lvks2+hBkg+1GpVMqEGEGqEGgChRqgBhBqhtrQAhBqhBhBqoUaoAYQaoQZAqBFqAKFGqIUaQKgRagChFmqEGkCoEWoAhBqhBhBqhFqoAYQaoQYQaqFGqAGEGqEGQKgRagChRqiFGkCoEWoAoRZqhBpAqBFqAIQaoQYQaoRaqAGEGqEGEGqhRqgBhBqhBkCoEWoAoUaohRpAqBFqAKEWaoQaQKgRagCEGqEGEGqEWqgBhgh1rVblqoUaIPlQR7kqVxRqgORDHeSqXEGoAZIPdeXsu9yT70qoAZIPtS21DbVQA6Qc6rZRrDI1e31cWVoAfYe6DU6/Szz3Dvt9XFlaAL2Huq1C1OqyKh1DtefHlaUF0H+oQagBhBqhBkCoEWoAoUaoARBqhBpAqEGoAYQaoQZAqBFqAKFGqAEQaoQaQKhBqAGEGqEGQKgRagChRqgBEGqEGkCoQagBhBqhBkCoEWoAoUaoARBqhBpAqBeqEOvZSNUxVO5toQbIOdRhtJV+2erg7hZqgHxD3cxGr3F/CzVArqEOswzYUws1QKahruocQl17nlqoAfIMdRYbaltqoQbINdQxj1BH97hQA2QZ6jqPUNfucaEGyDLUs0y4x4UaQKiF2seVdwGAUAu1UAMItVAj1ABCLdRCDYBQC7VQAwi1UCPUAEIt1EININRCjVADCLVQCzUAQi3UQg0g1EKNUAMItVALNYBQCzVCDTCGUPs1lwg1QMKhjnmEOrrHhRogy1CHPEId3ONCDZBlqKsszr7ryj0u1ABZhjqPLbUNtVAD5Brqthl/pxv3t1ADZBvqNoz89Lu2nxZqgJxD3VYhjrbVdQyenxZqgLxDDUININQINQBCjVADCDVCDYBQI9QAQg1CDSDUCDUAQo1QAwg1Qg2AUCPUAEINQg0g1Ag1AEKNUAMINUINgFAj1ABCDUININQINQBCjVADCDVCDYBQI9QAQg1CDSDUCDUAQo1QAwg1Qg2AUCPUAEINQg0g1Ag1AEKNUAMINUINgFAj1ABCDUININQINQBCjVADCDVCDYBQI9QAQg1CDSDUCDUAQo1QAwg1Qg2AUCPUAEJ9qQqxnlGQOoZKqAHGEuqg0iW2Ogg1wDhC3YhWmRqhBhhDqINilWqfPbVQA/Qc6sq5d7mn33s8Ty3UAD2H2oballqoARIOdZSrckWhBkg+1E6+Sz77FmqA5EOtViUTagChRqgBEGqEGkCoEWpLC0CoEWoAoRZqhBpAqBFqAIQaoQYQaoRaqAGEGqEGEGqhRqgBhBqhBkCoEWoAoUaohRpAqBFqAKEWaoQaQKgRagCEGqEGEGqEWqgBhBqhBhBqoUaoAYQaoQZAqBFqAKFGqIUaQKgRagChFmqEGkCoEWoAhBqhBhBqhFqoAYQaoQYQaqFGqAGEGqEGQKgRagChRqiFGmCIUNdqVa5aqAGSD3WUq3JFoQZIPtRBrsoVhBog+VBXzr7LPfmuhBog+VDbUttQCzVAyqFuG8UqU7PXx5WlBdB3qNvg9LvEc++w38eVpQXQe6jbKkStLqvSMVR7flxZWgD9hxqEGkCoEWoAhBqhBhBqhBoAoUaoAYQahBpAqBFqAIQaoQYQaoQaAKFGqAGEGoQaQKgRagCEGqEGEGqEGgChRqgBhBqEGkCoEWoAhBqhBhBqhBoAoUaoAYR6oQqxno1UHUPl3hZqgJxDHUZb6ZetDu5uoQbIN9TNbPQa97dQA+Qa6jDLgD21UANkGuqqziHUteephRogz1BnsaG2pRZqgFxDHfMIdXSPCzVAlqGu8wh17R4XaoAsQz3LhHtcqAGEWqh9XHkXAAi1UAs1gFALNUININRCLdQACLVQCzWAUAs1Qg0g1EIt1ABCLdQINYBQC7VQAyDUQi3UAEIt1Ag1gFALtVADCLVQI9QAYwi1X3OJUAMkHOqYR6ije1yoAbIMdcgj1ME9LtQAWYa6yuLsu67c40INkGWo89hS21ALNUCuoW6b8Xe6cX8LNUC2oW7DyE+/a/tpoQbIOdRtFeJoW13H4PlpoQbIO9Qg1ABCjVADINQINYBQI9QACDVCDSDUINQAQo1QAyDUCDWAUCPUAAg1Qg0g1CDUAEKNUAMg1Ag1gFAj1AAINUININQg1ABCjVADINQINYBQI9QACDVCDSDUINQAQo1QAyDUCDWAUCPUAAg1Qg0g1CDUAEKNUAMg1Ag1gFAj1AAINUININQg1ABCjVADINQINYBQI9QACDVCDSDUINQAQo1QAyDUCDWAUCPUAAg1Qg0g1JeqEOsZBaljqIQaYCyhDipdYquDUAOMI9SNaJWpEWqAMYQ6KFap9tlTCzVAz6GunHuXe/q9x/PUQg3Qc6htqG2phRog4VBHuSpXFGqA5EPt5Lvks2+hBkg+1GpVMqEGEGqEGgChRqgBhBqhtrQAhBqhBhBqoUaoAYQaoQZAqBFqAKFGqIUaQKgRagChFmqEGkCoEWoAhBqhBhBqhFqoAYQaoQYQaqFGqAGEGqEGQKgRagChRqiFGkCoEWoAoRZqhBpAqBFqAIQaoQYQaoRaqAGEGqEGEGqhRqgBhBqhBkCoEWoAoUaohRpAqBFqAKEWaoQaQKgRagCEGqEGEGqEWqgBhgh1rVblqoUaIPlQR7kqVxRqgORDHeSqXEGoAZIPdeXsu9yT70qoAZIPtS21DbVQA6Qc6rZRrDI1e31cWVoAfYe6DU6/Szz3Dvt9XFlaAL2Huq1C1OqyKh1DtefHlaUF0H+oQagBhBqhBkCoEWoAoUaoARBqhBpAqEGoAYQaoQZAqBFqAKFGqAEQaoQaQKhBqAGEGqEGQKgRagChRqgBEGqEGkCoQagBhBqhBkCoEWoAoUaoARBqhBpAqBeqEOvZSNUxVO5toQbIOdRhtJV+2erg7hZqgHxD3cxGr3F/CzVArqEOswzYUws1QKahruocQl17nlqoAfIMdRYbaltqoQbINdQxj1BH97hQA2QZ6jqPUNfucaEGyDLUs0y4x4UaQKiF2seVdwGAUAu1UAMItVAj1ABCLdRCDYBQC7VQAwi1UCPUAEIt1EININRCjVADCLVQCzUAQi3UQg0g1EKNUAMItVALNYBQCzVCDTCGUPs1lwg1QMKhjnmEOrrHhRogy1CHPEId3ONCDZBlqKsszr7ryj0u1ABZhjqPLbUNtVAD5Brqthl/pxv3t1ADZBvqNoz89Lu2nxZqgJxD3VYhjrbVdQyenxZqgLxDDUININQINQBCjVADCDVCDYBQI9QAQg1CDSDUCDUAQo1QAwg1Qg2AUCPUAEINQg0g1Ag1AEKNUAMINUINgFAj1ABCDUININQINQBCjVADCDVCDYBQI9QAQg1CDSDUCDUAQo1QAwg1Qg2AUCPUAEINQg0g1Ag1AEKNUAMINUINgFAj1ABCDUININQINQBCjVADCDVCDYBQI9QAQg1CDSDUCDUAQo1QAwg1Qg2AUCPUAEJ9qQqxnlGQOoZKqAHGEuqg0iW2Ogg1wDhC3YhWmRqhBhhDqINilWqfPbVQA/Qc6sq5d7mn33s8Ty3UAD2H2oballqoARIOdZSrckWhBkg+1E6+Sz77FmqA5EOtViUTagChRqgBEGqEGkCoEWpLC0CoEWoAoRZqhBpAqBFqAIQaoQYQaoRaqAGEGqEGEGqhRqgBhBqhBkCoEWoAoUaohRpAqBFqAKEWaoQaQKgRagCEGqEGEGqEWqgBhBqhBhBqoUaoAYQaoQZAqBFqAKFGqIUaQKgRagChFmqEGkCoEWoAhBqhBhBqhFqoAYQaoQYQaqFGqAGEGqEGQKgRagChRqiFGmCIUNdqVa5aqAGSD3WUq3JFoQZIPtRBrsoVhBog+VBXzr7LPfmuhBog+VDbUttQCzVAyqFuG8UqU7PfxxUAt2Tnz73B6XeJ596hFWqAcYS6rULU6rIqHUO150mNwyqAvo++QagBhBqhBkCoEWoAoUaoARBqhBpAqEGoAYQaoQZAqBlrqKtq/rKw+BOAUENCob4o9NHRy5eLXAMINaQR6sUm+ujo6PT0cO709GjR6laqAaGGJEJ9sZteRHpyMpm/LGJ9ZFMNCDWkEurFXnre6OPjg7nj43mtF/tqoYYe9POrHq779QIl/MKJde8DoWaQUH/8d3/79Zttp48WmT6+d/bp02cPHz57+unZveNFqo9sqqFz/f3yxG2/sK+UX+H4xvtAqBki1P/0zfPz859/7wahXnT6+ODxs+krzx4fHL8otfc3dKrpM1NNEtdiWI1QM3iof3R+4dd/5XDXUB+dnkwOnj+cTp+eTU6r6nRy9nQ6ffj8YHLi9Bu63k/3W6mQxLUYVhBqhg71n5+/9MMf7bqfnnf68XT64eTqtZMPp9PHL0ot1dCdqucT57pK4VoMfPpdCTUDh/p/zl/58e/s1OnDycG8y3df/4u783IfTJx+Q04b6g1b6qI21CvvA6FmgFCfL/v5d64t9enhyXw//XCy+heTh/M99cnhqU5Dd2LfkYpJXIthRaEmpVBf91R1VVWnJ8fPp9PJm383mU6fH5+c+spv6E7vZ851Etdi4LNvoSapUF/zVHVVHR1ODh6unnu/cHf68GBy6OwbutN/pdK4FsPaN9Rj/l7z676PnkFDvfWp6sVXkh0/nn64/m8/nD4+9pXfINRCvTD27zXf9n30DB3q8/N/+M6WDfW9Z+sOvhcm04e///FXP/rKV2bA23yG/OC7Qj36UGfwveaNgCYc6k1PVV+E+mz6dNNlPZ3+1p989TtCDW//KfIPhXrcoc7iS+PtqVMO9fn5D/9m3RsfnR4efzo923RZZ9M//eM/+N5HPslCR5sZoR5LqPP4XvPaM5lJh/r8/Mc/XfcU9eT46aaT78XZ97OPP/7oIztqeHvfFeoxhzqT7zW3pU481Of/+89vhvrw5ODZ9HTTZZ1OH379j74q1HALPhDqMYc6k+81jxKaeKjPv/lvb4Z68c1ZGw9DqnmoPxZquJVTR6Eec6jrjD8KSSnU5/8h1CDUQr1HqHO87SQZ6r909A1DcfQt1EIt1NeH+j99MRkMxReTCbVQC/W1of6vD3x7FgzEt2cJtVAL9bWh/se/f+M5aD/wBHrqtB94ItRCLdTXhPobv/Z77dpQ+xGi0DE/QlSohVqorw31N3/zV9d+WbdfygFDEmqhFmqhfuE3vrX+jf2aSxBqoRZqBg/17/72pjeuqmq+pX4+XXf4PZlOn8831JVQQ2d6/zEadRLXYuBnIoSa1EK97snppVSfHp4cPJ4+fKPUk4fTxwcnh6cyDd3p/QdTxiSuxbCiUJNWqDc8Ob109n16ODn4cLp6+n13Ov3wYHJ46uQbOtT7r3oISVyLYQWhJqlQb3py+rVSn0zme+rph0ub6sm83I8PJic6DZ3q+5cnrv81h1VRZ9+vvw+EmoFDvfnJ6eU1elHq5w+n06dnk9OqOp2cPZ1OHz5/0Wnvb8hoSx0S2dgns6EWaoYI9TeWnpw+2ukh/eL0++T44PGz6SvPHh8cnzj3hu41fX6WbpK4FsNaeR8INQOE+r93e3J6OdQXpZ4c3zv79Omzhw+fPf307N7x5EWnhRq63lP3du5chxSuxcDn3qvvA7/mkgFC/a1v7Pbk9Mrp9yLVk+Pjg7nj48ki0869oRdViD1UoI6hGv5aDFypNe+DXUOdyVfGR+stiVC3P/3Z+fnP/vVmnyhe7KoPDyfzWp9M5n+42E0LNZD7J9QdQ53J0/jBPZ5GqNv2r//sxg/pF89UHy321YtIn87/OK+0TgNC/fKTZBbnDbVP68mEeq/Tt4td9dHLF9tpQKiz21LbUI871BetfpHrxX+8mwGhXpbBV8Y37u/RhxpAqDfvqUd++l3bTws1QM6hHvVXxl/3Vf8INcDoQw1CDSDUCDUAQo1QAwg1Qg2AUCPUAEINQg0g1Ag1AEJNxx9XANwSUUGoAYQaR9+pPZZ452ytd87emb+cbbXtbcybN2/+VueFmmJDvbQwFtYtnF0XnXnz5s13Ni/UlBvq1xfH5aJYXTjXvd68efPmO50XakoO9bJ1C2vbYnvHvHnz5vuYF2pKfo5628JZZ9NiM2/evPnO5oWackO9+ZHtrovJvHnz5jufF2pKDjVA8oQaod7d3Xfuzl/2X2/mzZs3L9QI9Q1CvVg4C8uLZ3kxrfvz6uvMmzdvvtN5ocaO+vUFs2lBrfuzefPmzXc+L9SUG+q7r1wujF3+vPpo2Lx581nOf/b9zz85H8Ann3//s9evi1BTbKjXPHrdZfGv/r158+YznD/7wfmAfvBXy9dfqCk31ADrnf3kfFA/OVu6MkKNUK937+69+cv+C928efPjnf/384H9YOn6CzXlhnr9Ql63wHd9nXnz5rOY/+x8cJ9dXSehpuQd9eVi3WUhb3sb8+bNZzX//eFD/X921Aj1nXuvL9LFfy+te/3q29wzb958rvOfDx/qz6+ul1BTbqjfXNyrj7JXF/R1nxzMmzefxfwnw4f6k6vrJtSU/Bz16gJd92h71erbmzdvPrv58wRcXSehpuSjb4A1Ugj11bURaoT6ysG9g/nL5v+/jnnz5rOYTyLUr66PUFNuqK8W8eWCWP3vtk8EB+bNm8913o4aoU4i1AcvbFqsm153+foD8+bN5zqf1I76QKhx9H21cNc9Kl9d+MuL27x581nOpxDqq+sj1JS+o15+ZL26YA+2vM2BefPmc51PItSvCDUlP0e9afGuW/SbPhGYN28+u/lkQu3omyFDXYVYzzpTx1DdcEcN8JIdNULdtqHDSr9sddg/1McHx/OX/Ve5efPmRz0v1Ah128x60Owc6suFvbrAF/+/sPx36z4JmDdvPqv5JEL96voLNUOEOsx6EbaHevPCXX1Uvm6RH5s3bz7X+RRCfXVdhZoBQl3V/YS6rnYI9fIj72Wrj8I3/Z158+azm09mR31xXYWaAULd04Z665b6zp3j7cdiq6/btLDNmzef3XwyO+qL6yTUDBDq2Feo4zWhXvdoe5Ntj8zNmzef1XwSoX5FqBkg1HVfoa532FEDCDVC/bpZb/YI9eR4Mn958/9XX39s3rz5XOeTCfXF9RFqyg315MKmxbtpYS8vfPPmzWc5n0Kor66bUFNsqCfbF+7y/296lG7evPks55MI9avrL9SUvKNeXaDbFv0ub2vevPks5pPaUQs1Be+oN1tewDf5O/PmzWcxn8yO+oJQU3qofeIyb978iqRC7Tlq7KhXnExO5i+TvZk3b37083bUCHVqoV4szoVNC/y6xW/evPms5pMK9YlQU26oXyzM5UV8suF1l4t4l7c1b9786OeTCfXF9Rdqig31yfrFussngdWFb968+azmkwj1q+sl1JQb6tcX7rJtj8aX3968efNZzicT6ovrI9SUfPS9uri3LeZ1j8bNmzef5XwKob66XkJNyTtqgDWSCfUFoUaoT04OTw7nL9tX7ra3MW/efFbzQk3xoU7j11wevr44LxfrugW9/LrFny+ZN28+y/mkQn0o1AwQ6thXqOPWUL++cNc92l5d4Jv+bN68+azmkwj1q+sp1AwQ6tBXqMPWo+83H1Evu3x0ve7P647LzJs3n818MqG+uM5CzQChrno6+66ra46+Vy0fna0u8uXXbWLevPks5lMI9dV1EmoGCHVfW+rQXnP0ve4R9y4LedufzZs3P/r5ZEJ9QagZItRt00enm7a94Y4aQKgR6hd76s5Pv+vQXhvq08PT+cv1q3bT25k3bz7L+aRCfSrUDBPqtgqxw1bXMVTt9aHetmjXLeJtnxjMmzefzXwKob66PkLNQKEe/CremS/MS5cL4vTwzf9f/Hn59auvM2/efHbzSeyoX11XoabkUK9b4MsLeZcFb968+ezmk9pRCzXlhvp0P6uPxs2bN5/dfBKhfkWoKT3UmxbuukfgN1n45s2bH+18MkffF9dRqLGjPj09Oj2av+z2iHzd25o3bz6reTtqhDqlUG9a5Lt+QjBv3nx28ymE+up6CTXlhvpqgV4u1sV/L13+/7r/ri5w8+bNZzX/yfCd/uTqegk1xYZ6wwJefaS9bZGbN28+y/kvhw/1l1fXTagpN9RvPgpftfz3697WvHnzWc5/MXyov7i6fkJNyaHetLA3HaNdx7x581nM/8Xwof7F1fUSaoR694W8yyN38+bNj3/+20N3+ttLV0aoKTnU1VE1f7nZol6eMW/efJ7zh78cttO/PBRqhPrVjnrbwr38/20L2rx58xnOHw66p/724fL1F2rKDfXVIl5YXtDbFvy6tzVv3nx287/44stBvkvrky+/+JfXr79QU2yoq6sFermYq+r1RbvpE8Dq25o3b958Z/NCTck76k2LanXBbHq9efPmzXc+L9SUvqO+bvHsyrx58+Y7mRdqhPqFtmrnL9XezJs3b76TeaGm3FC/uTDaa1636c/mzZs339m8UFNsqNurhbG6QK57dLw6Z968efOdzQs1JYd6eWEsW37Ue/n/y4tq+W3MmzdvvtN5oabko+91C2N5Ma1bZKuLyLx58+Y7nRdqSn+OevXR7C7WPUI2b968+U7mhZpyj753X1D7Mm/evPm3nhdquvD/AgwACP/ccLsrinUAAAAASUVORK5CYII=');\n                background-size: 100% 100%;\n            }\n            @media screen and (min-width: 1400px) {\n                .").concat(this.prefix, "-mask-bg {\n                    width: 100%;\n                    height: 100%;\n                    position: absolute;\n                    top: 0;\n                    left: 0;\n                    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACRQAAAViCAMAAABOWRLBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0Q3NjdCOEIyOENEMTFFODlEQkE5M0M5RUIyQjY0NEEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0Q3NjdCOEMyOENEMTFFODlEQkE5M0M5RUIyQjY0NEEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozRDc2N0I4OTI4Q0QxMUU4OURCQTkzQzlFQjJCNjQ0QSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozRDc2N0I4QTI4Q0QxMUU4OURCQTkzQzlFQjJCNjQ0QSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ph/iWdYAAAE1UExUReXp7/7+/vT09Pf39/v7+/39/fn5+fX19fb29vj4+Pr6+vz8/PPz8/X2+Pn6+/b3+ff4+ufn5/7+//z8/ejo6LvBxvr7/O7u7vn5+/r6+/v7/Pj5+uvr6/P09unp6ezs7PLz9ff4+fHy9J2mrfDx8vHx8Z6nrvz9/fb398/T16autbK5v5qjq/j4+u3t7cDGy6mxt+vt78HGy8XKz93g46iwtu/w8b/Fyfv8/MPJzeXn6Ozu7/Lz9Orq6/T19vDx8/P09bO6v/7///Dw8rG4vcnO0u3t7t7h4/Hy87vBx+7v8O3v8PLy9L3DyMHHy+fp65+or8fM0eDj5bG4vuTm5+Hk5vLy8qOrsqGqsa+3veXn6aevtvDy88LIzLrAxe3u8LzCx8bLz8XKzsLHzJmiqvT19////2l0OrIAADK0SURBVHja7N0JextJfthh1ZCCRFJV1ZCU0RyyZmdnJ4fXO1nvZrP2rmPHiR3bcZz7vg+iv/9HCCiREAgBJNCN7kZ3ve+j5xkNxT8EqFnCD1WQ9OQaAEblyZMaOvDE4gJAFIEoAkAUgSgCQBSBKAJAFIEoAkAUgSgCQBSBKAJAFIEoAkAUgSgCQBSBKAJAFIEoAkAUgSgCQBSBKAJAFIEoAkAUgSgCQBSBKAJAFIEoAkAUgSgCQBSBKAJAFIEoAkAUgSgCQBSBKAJAFIEoAkAUgSgCQBSBKAJAFIEoAkAUgSgCQBSBKAJAFIEoAgBRhCgCAFGEKAIAUYQoAgBRhCgCAFGEKAIAUYQoAgBRhCgCgCNEUUg5LnhUzCn0Vh+v0s9yXMo/S6+GvhVRBEAhUZQU0f5dlPoIopdfVfeuSay+ejnUrYgiAMqJokrqHKLqPom+2FKp8YuXQ9yKKAKgoChKOucwXe8Vfblj4y5+2f+tiCIACoqi4Ozs0BO0Tt9X9OqB6xFf9XsrogiAoqLIRtFJbRV9/mCjxs/7vBVRBEBZUZRFzqFyd0309WM/99f93YooAqCwKHJ6dvj5WWdN9O3jP/m3fd2KKAKgtCjSOIcbbJ9or12e49yKKAJAFDFUFH2+38/+eR+3IooAEEUMFUWv9jzJfPhPjx3nVkQRAKKIwaJo73d3xe5vRRQBIIoYKoq+3P/n/7LrWxFFAIgihoqilwf8McD4sttbEUUAiCIGi6IvDrkDX3R7K6IIAFHEUFH08qC/L2rXJs9xbkUUASCKGCyKvjrsHnzV5a2IIgBEEYNFUXXYPai6vBVRBIAoYrAoOvBfW4ld3oooAkAUMVQUvTr0Lrzq7lZEEQCiiMGiKB16F1J3tyKKABBFDBZF1aF3oeruVkQRAKKIwaIoH3oXcne3IooAEEUMFkXx0LsQu7sVUQSAKEIUiSIARBGiSBQBIIoQRaIIAFGEN1qLIgBEkSga5x/J/1l3tyKKABBF+MsbRREAoogho8g/8wEAokgU+QdhAUAUiaJmbwequrwVUQSAKGKwKPrqsHvwVZe3IooAEEUMFkUvDzr5ii+7vBVRBIAoYrAoqr845A580e2tiCIARBGDRdEhmzy7t3iOcyuiCABRxGBRVH+5/8//Zde3IooAEEUMFkX7/3n62P2tiCIARBGDRdGrPXsmvur+VkQRAKKIwaKo/ny/n/3zPm5FFAEgihgsiuqv9/nJv+7nVkQRAMVFUdQ4h4pdRVH97eM/+bd93YooAqC0KMoi51C5syh6fJfn6/5uRRQBUFgUJZFzqNRdFNWfP7hzFz/v81ZEEQBlRVFwfnbo6VnoMIoe/NNj+/+JsePciigCoKgoslV0ShtF7//+xR1BE7/s/1ZEEQAlRVFd6ZxDVHXXXn6xJWjiFy+HuBVRBEBJUVQnJ2j7n52lugcvv6ruXZNYffVyqFsRRQAUFEV1SFkX7VNEOYW6L69SleNSrtKroW9FFAFQShSBKAJAFIEoAkAUgSgCQBSBKAJAFIEoAkAUgSgCQBSBKAJAFIEoAkAUgSgCQBTBMaLILwEAI3vq8tyFKAIAUYQoAgBRhCgCAFGEKAIAUYQoAgBRhCgCAFGEKAIAUYQoAgBRhCgCAFGEKAIAUYQoAgBRhCgCAFGEKAIAUYQoAgBRhCgCAFGEKAIAUYQoAgBRhCgCAFGEKAIAUYQoAgBRhCgCAFGEKAKAI0QRdMLiAkAUgSgCYIRR5NeATr6y/BIAIIpAFAEgikAUASCKQBQBIIpAFAEgikAUASCKQBQBIIpAFAEgikAUASCKQBQBIIpAFAEgikAUASCKQBQBIIpAFAEgiu4JKcfFkcWcQt+/Ah5HN49DFAFQShSloz8D3z4Pp35/ATyOjh6HKAKgkCiqFp2p+nz8HkdXj0MUAVBGFKVFh3rcY/E4OnscogiAIqIoxC6fhGNv78fxOLp7HKIIgCKiqNONiR63WDyO7h6HKAKgiCjK3T4J574evcfR3eMQRQAUEUWx2yfh2Nej9zi6exyiCIAiomjRsb4evcfR3eMQRQCIIjHhcYgiAESRmPA4RBEAokhMeByiCABRJCY8DlEEgCgSEx6HKAJAFIkJj0MUASCKxITHIYoAEEViwuMQRQCIIjHhcYgiAESRmPA4RBEAokhMeByiCABRJCY8DlEEgCgSEx6HKAJAFH0Uu30Ojn09eo+ju8chigAoIopyt0/Cua9H73F09zhEEQBFRFHq9kk49fXoPY7uHocoAqCIKAqdntfE0Nej9zi6exyiCIAioqjbrYnU38P3ODp7HKIIgDKiqK66ew6u+nz8HkdXj0MUAVBIFNWpoxObmPr9BfA4OnocogiAUqKoDikf/Xk45hT6/hXwOLp5HKIIgGKiCEQRAKIIRBEAoghEEQCiCEQRAKIIRBEAoghEEQCiCEQRAKIIRBEAoghEEQCiCEQRAKIIRBEAoghEEQBlRRF0wuICQBSBKAJghFHk14BOvrL8EgAgikAUASCKQBQBIIpAFAEgikAUASCKQBQBIIpAFAEgikAUASCKQBQBIIpAFAEgikAUASCKQBQBIIpAFAEgikAUASCKQBQBIIpAFAEgikAUASCKQBQBIIpAFAEgikAUASCKQBQBIIpAFAEgikAUASCKQBQBIIpAFAEgikAUASCKQBQBIIpAFAEgikAUAYAoQhQBgChCFAGAKEIUAYAoQhQBgChCFAGAKEIUAYAoQhQBgChCFAGAKEIUAYAoQhQBgChCFAHAkaMopBwXFCTmFEQRAKJoU1JEJXZREkUAiKL7KoFQpkoUASCK7u0TqYNSNdkrEkUATDaKgrOzck/QGryvSBQBMNkoslFkq0gUASCKlrI0KFcWRQCIohWnZyWfn4kiAETRijIomSgCQBSJIkQRAKJIFCGKABBFoghRBIAoEkWIIgBEkShCFAEgikQRoggAUSSKEEUAiCJRhCgCQBSJIkQRAKJIFCGKABBFoghRBACiCFEEAKIIUQQAoghRBACiCFEEAKIIUQQAoghRBACiCFEEAKIIUQQAoghRBACiCFEEAKIIUQQAoghRBACiCFEEAKIIUQQAoghRBACiCFEEAKIIUQQAoghRBACiCFEEAKIIUQQAoghRBACiCFEEAH1GUVQG5YqiCABRtJKlQbmyKAJAFK0kaVCuJIoAEEUrwflZuadnQRQBIIpsFdFko0gUATDhKKordVCmqtFXlsUFwHSjqE5O0Eo8O0vNvrIsLgAmHEV1SFkXlVVEOYWGX1kWFwBTjiIQRQCIIhBFAIgiEEUAiCIQRQCIIhBFAIgiEEUAiCIQRQCIIhBFAIgiEEUAiCIQRQCIIhBFAIgiEEUAiCIQRQCIIhBFAIgiEEUAeOry3IUoAgBRhCgCAFGEKAIAUYQoAgBRhCgCgDZRFFKOi5GKOQXXWxQBwDGiKI22iG67KLngoggA2kdRtRi9yhUXRQDQNorSYgLsFYkiAGgZRSFOIYqi9xWJIgBoF0WT2CiyVSSKAKBtFOVpRFF2zUURALSKojiNKIquuSgCgFZRtJgI11wUAYAoEkWiCABEkSgSRQAgikSRKAIAUSSKRBEAiCJRJIoAQBSJIlEEAKJIFIkiABBFokgUAYAoEkWiCABEkSgSRQAgikSRKAIAUSSKRBEAiCJRJIoAoI8oitNoouiaiyIAaBVFeRpRlF1zUQQAraIoTSOKkmsuigCgVRSFSZyfxeCaiyIAaBVF09gqslEkigCgbRTV1fibqHLFRREAtI6iOo38BC3aJxJFAHCMKKpDyqPtopiT9xOJIgA4ThSBKAJAFIEoAkAUgSgCQBSBKAJAFIEoAkAUgSgCQBSBKAJAFIEoAkAUgSgCQBSBKAJAFIEoAkAUgSgCQBSBKAJAFIEoAkAUgSgCwFOX5y5EEQCIIkQRAIgiRBEAiCJEEQCIIkQRAIgiRBEAiCJEEQCIIkQRAIgiRBEAiCJEEQCIIkQRAIgiRBEAiCJEEQCIIkQRAIgiRBEAiCJEEQCIIkQRAIgiRBEAiCJEEQCIIkQRAIgiRBEAiCJEEQCIIkQRAIgiRBEAiCJEEQAMFUUh5bigIDGnIIoAEEWbkiIqsYuSKAJAFN1XCYQyVaIIAFF0b59IHZSqyV6RKAJgslEUnJ2Ve4LW4H1FogiAyUaRjSJbRaIIAFG0lKVBubIoAkAUrTg9K/n8TBQBIIpWlEHJRBEAokgUIYoAEEWiCFEEgCgSRYgiAESRKEIUASCKRBGiCABRJIoQRQCIIlGEKAJAFIkiRBEAokgUIYoAEEWiCFEEgCgSRYgiABBFiCIAEEWIIgAQRYgiABBFiCIAEEWIIgAQRYgiABBFiCIAEEWIIgAQRYgiABBFiCIAEEWIIgAQRYgiABBFiCIAEEWIIgAQRYgiABBFiCIAEEWIIgAQRYgiABBFiCIAEEWIIgAQRYgiABBFiCIA6DOKojIoVxRFAIiilSwNypVFEQCiaCVJg3IlUQSAKFoJzs/KPT0LoggAUWSriCYbRaIIgAlHUV2pgzJVjb6yLC4AphtFdXKCVuLZWWr2lWVxATDhKKpDyrqorCLKKTT8yrK4AJhyFIEoAkAUgSgCQBSBKAJAFIEoAkAUgSgCQBSBKAJAFIEoAkAUgSgCQBSBKAJAFIEoAkAUgSgCQBSBKAJAFIEoAkAUgSgCQBSBKALAU5fnLkQRAIgiRBEAiCJEEQCIIkQRAIgiRBEAtImikHJcjFTMKbjeoggAjhFFabRFdNtFyQUXRQDQPoqqxehVrrgoAoC2UZQWE2CvSBQBQMsoCnEKURS9r0gUAUC7KJrERpGtIlEEAG2jKE8jirJrLooAoFUUxWlEUXTNRREAtIqixUS45qIIAESRKBJFACCKRJEoAgBRJIpEEQCIIlEkigBAFIkiUQQAokgUiSIAEEWiSBQBgCgSRaIIAESRKBJFACCKRJEoAgBRJIpEEQCIIlEkigBAFIkiUQQAfURRnEYTRddcFAFAqyjK04ii7JqLIgBoFUVpGlGUXHNRBACtoihM4vwsBtdcFAFAqyiaxlaRjSJRBABto6iuxt9ElSsuigCgdRTVaeQnaNE+kSgCgGNEUR1SHm0XxZy8n0gUAcBxoghEEQCiCEQRAKIIRBEAoghEEQCiCEQRAKIIRBEAoghEEQCiCEQRAKIIRBEAoghEEQCiCEQRAKIIRBEAoghEEQCiCEQRAKIIRBEAnro8dyGKAEAUIYoAQBQhigBAFCGKAEAUIYoAQBQhigBAFCGKAEAUIYoAQBQhigBAFCGKAEAUIYoAQBQhigBAFCGKAEAUIYoAQBQhigBAFCGKAEAUIYoAQBQhigBAFCGKAEAUIYoAQBQhigBAFCGKAEAUIYoAQBQhigBAFCGKAGCoKAopxwUFiTkFUQSAKNqUFFGJXZREEQCi6L5KIJSpEkUAiKJ7+0TqoFRN9opEEQCTjaLg7KzcE7QG7ysSRQBMNopsFNkqEkUAiKKlLA3KlUURAKJoxelZyednoggAUbSiDEomigAQRaIIUQSAKBJFiCIARJEoQhQBIIpEEaIIAFEkihBFAIgiUYQoAkAUiSJEEQCiSBQhigAQRaIIUQSAKBJFiCIARJEoQhQBgChCFAGAKEIUAYAoQhQBgChCFAGAKEIUAYAoQhQBgChCFAGAKEIUAYAoQhQBgChCFAGAKEIUAYAoQhQBgChCFAGAKEIUAYAoQhQBgChCFAGAKEIUAYAoQhQBgChCFAGAKEIUAYAoQhQBgChCFAFAn1EUlUG5oigCQBStZGlQriyKABBFK0kalCuJIgBE0Upwflbu6VkQRQCIIltFNNkoEkUATDiK6kodlKlq9JVlcQEw3SiqkxO0Es/OUrOvLIsLgAlHUR1S1kVlFVFOoeFXlsUFwJSjCEQRAKIIRBEAoghEEQCiCEQRAKIIRBEAoghEEQCiCEQRAKIIRBEAoghEEQCiCEQRAKIIRBEAoghEEQCiCEQRAKIIRBEAoghEEQCeujx3IYoAQBQhigBAFCGKAEAUIYoAQBQhigCgTRSFlONipGJOwfUWRQBwjChKoy2i2y5KLrgoAoD2UVQtRq9yxUURALSNorSYAHtFoggAWkZRiFOIouh9RaIIANpF0SQ2imwViSIAaBtFeRpRlF1zUQQAraIoTiOKomsuigCgVRQtJsI1F0UAIIpEkSgCAFEkikQRAIgiUSSKAEAUiSJRBACiSBSJIgAQRaJIFAGAKBJFoggARJEoEkUAIIpEkSgCAFEkikQRAIgiUSSKAEAUiSJRBACiSBSJIgDoI4riNJoouuaiCABaRVGeRhRl11wUAUCrKErTiKLkmosiAGgVRWES52cxuOaiCABaRdE0topsFIkiAGgbRXU1/iaqXHFRBACto6hOIz9Bi/aJRBEAHCOK6pDyaLso5uT9RKIIAI4TRSCKABBFIIoAEEUgigAQRSCKABBFIIoAEEUgigAQRSCKABBFIIoAEEUgigAQRSCKABBFIIoAEEUgigAQRSCKABBFIIoAEEUgigDw1OW5C1EEAKIIUQQAoghRBACiCFEEAKIIUQQAoghRBACiCFEEAKIIUQQAoghRBACiCFEEAKIIUQQAoghRBACiCFEEAKIIUQQAoghRBACiCFEEAKIIUQQAoghRBACiCFEEAKIIUQQAoghRBACiCFEEAKIIUQQAoghRBACiCFEEAENFUUg5LihIzCmIIgBE0aakiErsoiSKABBF91UCoUyVKAJAFN3bJ1IHpWqyVySKAJhsFAVnZ+WeoDV4X5EoAmCyUWSjyFaRKAJAFC1laVCuLIoAEEUrTs9KPj8TRQCIohVlUDJRBIAoEkWIIgBEkShCFAEgikQRoggAUSSKEEUAiCJRhCgCQBSJIkQRAKJIFCGKABBFoghRBIAoEkWIIgBEkShCFAEgikQRoggARBGiCABEEaIIAEQRoggARBGiCABEEaIIAEQRoggARBGiCABEEaIIAEQRoggARBGiCABEEaIIAEQRoggARBGiCABEEaIIAEQRoggARBGiCABEEaIIAEQRoggARBGiCABEEaIIAEQRoggARBGiCAD6jKKoDMoVRREAomglS4NyZVEEgChaSdKgXEkUASCKVoLzs3JPz4IoAkAU2SqiyUaRKAJgwlFUV+qgTFWjryyLC4DpRlGdnKCVeHaWmn1lWVwATDiK6pCyLiqriHIKDb+yLC4AphxFIIoAEEUgigAQRSCKABBFIIoAEEUgigAQRSCKABBFIIoAEEUgigAQRSCKABBFIIoAEEUgigAQRSCKABBFIIoAEEUgigAQRSCKAPDU5bkLUQQAoghRBACiCFEEAKIIUQQAoghRBABtoiikHBcjFXMKrrcoAoBjRFEabRHddlFywUURALSPomoxepUrLooAoG0UpcUE2CsSRQDQMopCnEIURe8rEkUA0C6KJrFRZKtIFAFA2yjK04ii7JqLIgBoFUVxGlEUXXNRBACtomgxEa65KAIAUSSKRBEAiCJRJIoAQBSJIlEEAKJIFIkiABBFokgUAYAoEkWiCABEkSgSRQAgikSRKAIAUSSKRBEAiCJRJIoAQBSJIlEEAKJIFIkiABBFokgUAUAfURSn0UTRNRdFANAqivI0oii75qIIAFpFUZpGFCXXXBQBQKsoCpM4P4vBNRdFANAqiqaxVWSjSBQBQNsoqqvxN1HliosiAGgdRXUa+QlatE8kigDgGFFUh5RH20UxJ+8nEkUAcJwoAlEEgCgCUQSAKAJRBIAoAlEEgCgCUQSAKAJRBIAoAlEEgCgCUQSAKAJRBIAoAlEEgCgCUQSAKAJRBIAoAlEEgCgCUQSAKAJRBICnLs9diCIAEEWIIgAQRYgiABBFiCIAEEWIIgAQRYgiABBFiCIAEEWIIgAQRYgiABBFiCIAEEWIIgAQRYgiABBFiCIAEEWIIgAQRYgiABBFiCIAEEWIIgAQRYgiABBFiCIAEEWIIgAQRYgiABBFiCIAEEWIIgAQRYgiABBFiCIAGCqKQspxQUFiTkEUASCKNiVFVGIXJVEEgCi6rxIIZapEEQCi6N4+kTooVZO9IlEEwGSjKDg7K/cErcH7ikQRAJONIhtFtopEEQCiaClLg3JlUQSAKFpxelby+ZkoAkAUrSiDkokiAESRKEIUASCKRBGiCABRJIoQRQCIIlGEKAJAFIkiRBEAokgUIYoAEEWiCFEEgCgSRYgiAESRKEIUASCKRBGiCABRJIoQRQAgihBFACCKEEUAIIoQRQAgihBFACCKEEUAIIoQRQAgihBFACCKEEUAIIoQRQAgihBFACCKEEUAIIoQRQAgihBFACCKEEUAIIoQRQAgihBFACCKEEUAIIoQRQAgihBFACCKEEUAIIoQRQAgihBFANBnFEVlUK4oigAQRStZGpQriyIARNFKkgblSqIIAFG0EpyflXt6FkQRAKLIVhFNNopEEQATjqK6Ugdlqhp9ZVlcAEw3iurkBK3Es7PU7CvL4gJgwlFUh5R1UVlFlFNo+JVlcQEw5SgCUQSAKAJRBIAoAlEEgCgCUQSAKAJRBIAoAlEEgCgCUQSAKAJRBIAoAlEEgCgCUQSAKAJRBIAoAlEEgCgCUQSAKAJRBIAoAlEEgKcuz12IIgAQRYgiABBFiCIAEEWIIgAQRYgiAGgTRSHluBipmFNwvUURABwjitJoi+i2i5ILLooAoH0UVYvRq1xxUQQAbaMoLSbAXpEoAoCWURTiFKIoel+RKAKAdlE0iY0iW0WiCADaRlGeRhRl11wUAUCrKIrTiKLomosiAGgVRYuJcM1FEQCIIlEkigBAFIkiUQQAokgUiSIAEEWiSBQBgCgSRaIIAESRKBJFACCKRJEoAgBRJIpEEQCIIlEkigBAFIkiUQQAokgUiSIAEEWiSBQBgCgSRaIIAPqIojiNJoquuSgCgFZRlKcRRdk1F0UA0CqK0jSiKLnmoggAWkVRmMT5WQyuuSgCgFZRNI2tIhtFoggA2kZRXY2/iSpXXBQBQOsoqtPIT9CifSJRBADHiKI6pDzaLoo5eT+RKAKA40QRiCIARBGIIgBEEYgiAEQRiCIARBGIIgBEEYgiAEQRiCIARBGIIgBEEYgiAEQRiCIARBGIIgBEEYgiAEQRiCIARBGIIgBEEYgiADx1ee5CFAGAKEIUAYAoQhQBgChCFAGAKEIUAYAoQhQBgChCFAGAKEIUAYAoQhQBgChCFAGAKEIUAYAoQhQBgChCFAGAKEIUAYAoQhQBgChCFAGAKEIUAYAoQhQBgChCFAGAKEIUAYAoQhQBgChCFAGAKEIUAYAoQhQBgChCFAHAUFEUUo4LChJzCqIIAFG0KSmiErsoiSIARNF9lUAoUyWKABBF9/aJ1EGpmuwViSIAJhtFwdlZuSdoDd5XJIoAmGwU2SiyVSSKABBFS1kalCuLIgBE0YrTs5LPz0QRAKJoRRmUTBQBIIpEEaIIAFEkihBFAIgiUYQoAkAUiSJEEQCiSBQhigAQRaIIUQSAKBJFiCIARJEoQhQBIIpEEaIIAFEkihBFAIgiUYQoAgBRhCgCAFGEKAIAUYQoAgBRhCgCAFGEKAIAUYQoAgBRhCgCAFGEKAIAUYQoAgBRhCgCAFGEKAIAUYQoAgBRhCgCAFGEKAIAUYQoAgBRhCgCAFGEKAIAUYQoAgBRhCgCAFGEKAIAUYQoAgBRhCgCgD6jKCqDckVRBIAoWsnSoFxZFAEgilaSNChXEkUAiKKV4Pys3NOzIIoAEEW2imiyUSSKAJhwFNWVOihT1egry+ICYLpRVCcnaCWenaVmX1kWFwATjqI6pKyLyiqinELDryyLC4ApRxGIIgBEEYgiAEQRiCIARBGIIgBEEYgiAEQRiCIARBGIIgBEEYgiAEQRiCIARBGIIgBEEYgiAEQRiCIARBGIIgBEEYgiAEQRiCIAPHV57kIUAYAoQhQBgChCFAGAKEIUAYAoQhQBQJsoCinHxUjFnILrLYoA4BhRlEZbRLddlFxwUQQA7aOoWoxe5YqLIgBoG0VpMQH2ikQRALSMohCnEEXR+4pEEQC0i6JJbBTZKhJFANA2ivI0oii75qIIAFpFUZxGFEXXXBQBQKsoWkyEay6KAEAUiSJRBACiSBSJIgAQRaJIFAGAKBJFoggARJEoEkUAIIpEkSgCAFEkikQRAIgiUSSKAEAUiSJRBACiSBSJIgAQRaJIFAGAKBJFoggARJEoEkUA0EcUxWk0UXTNRREAtIqiPI0oyq65KAKAVlGUphFFyTUXRQDQKorCJM7PYnDNRREAtIqiaWwV2SgSRQDQNorqavxNVLnioggAWkdRnUZ+ghbtE4kiADhGFNUh5dF2UczJ+4lEEQAcJ4pAFAEgikAUASCKQBQBIIpAFAEgikAUASCKQBQBIIpAFAEgikAUASCKQBQBIIpAFAEgikAUASCKQBQBIIpAFAEgikAUASCKQBQB4KnLcxeiCABEEaIIAEQRoggARBGiCABEEaIIAEQRoggARBGiCABEEaIIAEQRoggARBGiCABEEaIIAEQRoggARBGiCABEEaIIAEQRoggARBGiCABEEaIIAEQRoggARBGiCABEEaIIAEQRoggARBGiCABEEaIIAEQRoggARBGiCACGiqKQclxQkJhTEEUAiKJNSRGV2EVJFAEgiu6rBEKZKlEEgCi6t0+kDkrVZK9IFAEw2SgKzs7KPUFr8L4iUQTAZKPIRpGtIlEEgChaytKgXFkUASCKVpyelXx+JooAEEUryqBkoggAUSSKEEUAiCJRhCgCQBSJIkQRAKJIFCGKABBFoghRBIAoEkWIIgBEkShCFAEgikQRoggAUSSKEEUAiCJRhCgCQBSJIkQRAIgiRBEAiCJEEQCIIkQRAIgiRBEAiCJEEQCIIkQRAIgiRBEAiCJEEQCIIkQRAIgiRBEAiCJEEQCIIkQRAIgiRBEAiCJEEQCIIkQRAIgiRBEAiCJEEQCIIkQRAIgiRBEAiCJEEQCIIkQRAIgiRBEA9BlFURmUK4oiAETRSpYG5cqiCABRtJKkQbmSKAJAFK0E52flnp4FUQSAKLJVRJONIlEEwISjqK7UQZmqRl9ZFhcA042iOjlBK/HsLDX7yrK4AJhwFNUhZV1UVhHlFBp+ZVlcAEw5ikAUASCKQBQBIIpAFAEgikAUASCKQBQBIIpAFAEgikAUASCKQBQBIIpAFAEgikAUASCKQBQBIIpAFAEgikAUASCKQBQBIIpAFAHgqctzF6IIAEQRoggARBGiCABEEaIIAEQRoggA2kRRSDkuRirmFFxvUQQAx4iiNNoiuu2i5IKLIgBoH0XVYvQqV1wUAUDbKEqLCbBXJIoAoGUUhTiFKIreVySKAKBdFE1io8hWkSgCgLZRlKcRRdk1F0UA0CqK4jSiKLrmoggAWkXRYiJcc1EEAKJIFIkiABBFokgUAYAoEkWiCABEkSgSRQAgikSRKAIAUSSKRBEAiCJRJIoAQBSJIlEEAKJIFIkiABBFokgUAYAoEkWiCABEkSgSRQAgikSRKAKAPqIoTqOJomsuigCgVRTlaURRds1FEQC0iqI0jShKrrkoAoBWURQmcX4Wg2suigCgVRRNY6vIRpEoAoC2UVRX42+iyhUXRQDQOorqNPITtGifSBQBwDGiqA4pj7aLYk7eTySKAOA4UQSiCABRBKIIAFEEoggAUQSiCABRBKIIAFEEoggAUQSiCABRBKIIAFEEoggAUQSiCABRBKIIAFEEoggAUQSiCABRBKIIAFEEoggAT12euxBFACCKEEUAIIoQRQAgihBFACCKEEUAIIoQRQAgihBFACCKEEUAIIoQRQAgihBFACCKEEUAIIoQRQAgihBFACCKEEUAIIoQRQAgihBFACCKEEUAIIoQRQAgihBFACCKEEUAIIoQRQAgihBFACCKEEUAIIoQRQAgihBFADBUFIWU44KCxJyCKAJAFG1KiqjELkqiCABRdF8lEMpUiSIARNG9fSJ1UKome0WiCIDJRlFwdlbuCVqD9xWJIgAmG0U2imwViSIARNFSlgblyqIIAFG04vSs5PMzUQSAKFpRBiUTRQCIIlGEKAJAFIkiRBEAokgUIYoAEEWiCFEEgCgSRYgiAESRKEIUASCKRBGiCABRJIoQRQCIIlGEKAJAFIkiRBEAokgUIYoAQBQhigBAFCGKAEAUIYoAQBQhigBAFCGKAEAUIYoAQBQhigBAFCGKAEAUIYoAQBQhigBAFCGKAEAUIYoAQBQhigBAFCGKAEAUIYoAQBQhigBAFCGKAEAUcTpRBABjI4oQRQAginB8BgCOzxBFACCKEEUA0CSKojIoVxRFAIiilSwNypVFEQCiaCVJg3IlUQSAKFoJzs/KPT0LoggAUWSriCYbRaIIgAlHUV2pgzJVjb6yuvqSDWH57cbN9wBgkCiqkxO0Es/OUrOvrI6KaOnp09tv79MIAAaIojqkrIvKKqKcGmZHF1F0szn09OnTq6vzpaurpzddVMsiAIaIIhgwit7vEt0E0exytvx2E0ZPbRYBIIoYdxT927/5L//ytwdG0c0e0bKHLi7Oli4ulmV0s18kioD2L7p6OQh5bPPdcczQhyGiiEGi6N9cL/3e3/+7h2wTPb1JoovnL354++7163dvf3jx/OImi57aLAJa6u8tsw+9TdMbdwd/26woYogo+lfXH/ztv/d39o6imya6OHvzbr7y7s3ZxYcq8usNtNDrH66uTuJesPV6iCKGiKI/v77zu3+xZxQ9vbqcnX3/ej5/+2J2FcLV7MXb+fz192ezSydoQLt9opP4q9/8ZYAn8FfxiSKGiKK/uv7op7+/3z7RsonezOffzD5+dPbNfP7mQxXJIqCpvv/Bhu3/SIB/NmKwE7Qgihg2iv7WWhRd/94vHntr0fuzs9nZsoGe3f+BZ8tKOps5QQPGs1G0Y6vIRtEpbBWJIgaPoj3eWhSuzi/P3sxfzzZ/YPZ6/ubs8vxKEwFN5b6fhPNJ3Au2XA9RxAlE0SNvLQohXF1efD+fzz79sdl8/v3F5ZU/gQY01fu5VTyJe8GW6yGKOIkoevCtRSE8PZ+dvd48O/vg2fz12ezc+RnQVP/PwqdxL/j0eogiTiSKHvhbi27eZX3xZv7N9h/9Zv7mwp9AA0QRoojJRNHOtxa93yh6/m7b4dmN2fz1P//Jj3/0O79jYQMPnJF8+weiCFHEaKLo+vp3/8GuKHoxf7vrxt7O/9mf/PgfiyLgEdU/EUWIIkYTRdfXP/2jTz/76dX5xQ/zF7tu7MX8H/3Tf/FHP7KugceqSBQhihhRFF3/p/++5S1Fs4u3u07Pbs7P3v3kJz/6kZ0i4DF/IIoQRYwoiq7/96dRdH559m5+tevGruav/+Ff/lgUAY/6VhQhihhTFP3nLVF08wfyd/7xsrCMop+IIuBxURQhihhTFP1rUQSIIkQRouj6+m8cnwEdcXyGKGJMUfTf/tgbrYGOeKM1R4yikPJo/3WWmJO/83gEUfTTP/70s/2RfOAo/JF8jhhFaeT/Xl1MWuXEo8hf3gh02ET+8kaOF0XVVF8lcCJR5J/5ALp7Weyf+eCYUZSm8MjtFZ1uFPkHYYFBiCJRdHgUhTiFRx49dZ5qFP3093d/7d3+ofxn237w2fz12ez8aXBlAVFEX1GUpvHQbRWdZhRtfTPRxygKV5cX38+3HaDN5vPvLy6vgigCGur9JX88iXvBluuxfxTlaTz2bP2fYBTteDPRWhZdnV+evZm//qSKZq/nb84uz68kEdBUPoknoixOTiAM9o+iOLkg5ESiaPebiT5uFT29Op+dfTPfPEF7Np9/czY7v3J6BjTW+0FIOol7wZbrsX8UTe/okOGi6K/2ezPRvSq6nJ29WTbQ2mbRbFlJb85ml5oIaKHvt8xuf3NrcH52Am82FkUMEUX/d783E63/fvG+ir5/PZ+/fTG7CuFq9uLtfP76+w9N5NcbGM1WUTqRDSs+vR6iiCGi6L/u+2aie3tF55cXZ2/ezVfevTm7uHR2BrTV61/DV53EvWDr9RBFDBFF9Z/v92ai9Sh6X0Wzi+cvfnj77vXrd29/ePH8YvahiUQR0G6vqLezq4f+aYXkBK3/s7P710MUMUgU1f/hf/67//O/DrvJZRXdZNHs4uJs6eJidpNEzs6AI+jnn/Z87B/hHPM/MDrKIvrkeogihomiJr9pfdgtOj+fLcvocrb8zvtdIlEEwHGeukQRY4miOty8s+jpzX7RTRBdLb+7LCJNBIAoEkWlRdGHzaJlF91+s00EgCgSRYVG0fsu+pBGN//xywyAKBJFxUYRAIgiUSSKAEAUiSJRBACiSBSJIgAQRaJIFAHAKUXRRP6WzeiaiyIAaBVFeRpRlF1zUQQAraIoTSOKkmsuigCgVRSFSZyfRX/fnygCgHZRNI2tIhtFoggA2kZRXY2/iSpXvL+vLAAYmQOe59LIT9CifSJRBADHiKI6pDzaLoo5eT+R47P73fbZi60+e/HZ8tuLBz30OebNmzdvfpTzT7z1g3KjaG2B3Ni2SPZdYObNmzdvfvTzooiSo+j+grlbQJuL7LGPmzdv3rz5ScyLIsqOonXbFtFDC+sz8+bNmzc/pXlRRNnvKXpokWyza2GZN2/evPnRz4siSo6i3a8Y9l145s2bN29+MvOiiLKjCABEEaKowYp59tmz5bfmK868efPmzZ/svCii7Ci6WSQ31hfK+sLZ9v3Nj5k3b968+UnMiyLsFG0ujl2LZ9v3zZs3b978ZOZFESVH0bOVu0W0z/c3X2WYN2/evPlW8//+F7/67noA3/3qF79Zv5+iiIKjaMurin0W+uaPmzdv3rz5FvP/8dfXA/r1i4/3XxRRchQBMLQXf3Y9qD97sboroghRtMvzZ8+X35ovdPPmzZs3/7hfXw/s16IIUbSMou2Ldtti3vdj5s2bN2/+oI/95npwvxFFiKInawtzn4X80OeYN2/evPlG878YPor+3919E0UUHEXP7y/om//e2fbxzc95bt68efPm287/avgo+tXdfRNFlBxFny7kzVc/m4v8sd8IzJs3b978QfPfDR9F39kpQhQ9efbpYt72KmjT5uebN2/evPnG89cnwE4RoujJcwAGdgpRdHdfRBGiaN3Z87Plt93//xjz5s2bN3/Q/MlE0fLOiiJKjqKPC/Zu8W7+96FFf2bevHnz5tvOn0IU3d1vUUTBUXT2wa6Fvetjdx8/M2/evHnzbedPYqfo9j6KIhyfrS/Sba92Nhf5+m8E5s2bN2++1fxJ7BTd3i9RhJ2i9Vc8m4v77IHPOTNv3rx5823nHZ8hik7lPUW7Fuq2Bb5r0Zs3b968+cbzJ7NTtCSKGCyKQspx0ZmYUzhwpwiA3okiRFFdpw6L6LaLUvMouji7WH5rvsrNmzdv3rwogv2iqFr0oNo7iu4W8eZivvn/G+s/tm3Bmzdv3rz5RvOnEEV3900UMUwUpUUv0sNRtHuRb77a2bagL8ybN2/efNt5O0UUH0Uh9hNFMewRReuvaNZtvrrZ9WPmzZs3b77x/EnsFN0SRQwSRT1tFD24VfTkycXDW7ubH9v1m4B58+bNm2887/iM4qMo9xVF+ZEo2vYqZpeHXvGYN2/evPlG83aKKD6KYl9RFPfYKQJgMKKI4qNo0ZsGUTS7mC2/ffr/mx+/MG/evHnzbedFEaLoNKJo9t6uhb5rEa8vcvPmzZs332peFCGKTiKKZg8v8vX/3/Xqx7x58+bNt5o/iSi6vb+iiLJ3ijYX80MLfJ/PNW/evHnzB82fQhTd3RdRRMk7RbutL+BDfsy8efPmzR80fxJRdEsUIYr8JmXevHnzg82LIkTRKe8UXc4ul99mjZk3b968+b2JIkTRqUXRzUK+sWsxP7bQzZs3b958o/lTiKK7+y+KKDmKPizU9QV7ueNjdwt+n881b968efN7z5/MTtHyvogiCo6iy+2LeJ8Fv7nIzZs3b958o/mT2Cm6vZ+iiJKj6P4iXffQq5z1zzdv3rx5863mT+b4bEkUUfbx2eZCfmjhb3uVY968efPmW82fzE6R4zOK3ykCYFB2ihBFpxZF55fny28Pr9yHPse8efPmzTeaP4UourtvoohBoij21UTxoSg6v79I7xbttsW7/rGb798xb968efOt5k9ip+j2PooiBomi3FcU5Qej6P4i3fYqZnMx7/q+efPmzZtvNG+niOKjKPUVRenB47NPX+msu3vVs+3727aDzZs3b978wfMns1O0JIoYJIpCT+dnMTxyfLZpfft3c0Gvf2wX8+bNmzd/0PxJ7BTd3ldRxCBR1NdWUaofOT7b9kpmn0X/0PfNmzdv3vze83aKEEV11UcTVXV94E4RAL06mZ0iUcRwUVSnzk/QYqofjaKr86vlt8dX7a7PM2/evHnzreZFEaLo5n1FKXfYRTGnUD8eRQ8t3G0L+aHfBMybN2/e/MHzJxFFt/dNFDFYFA1+F58sF8Gdu4V6df7p/998f/3jmx8zb968efON509mp2h5n0QRZUfRtsW8vmj3WdzmzZs3b77x/ClE0d39EkUUHEVXzWy+SjJv3rx5843nTyaKlkQRomjXIt/2yuaQ3yTMmzdv3vyj86IIUXRqO0VPr54uv+33Smfb55o3b968+UbzpxBFd/dJFCGKdi3ofRe/efPmzZtvPG+nCFF0GlH0cYHeLdab/965+/9t/91c4ObNmzdvvtH8d8M30Xd3908UUXAU7Vism69qHlrQ5s2bN2++1fzPh4+inzs+QxQ9efrpq5tN6z++7XPNmzdv3nyr+V8OH0W/vLtLooiyo2jXIt61FfwY8+bNmzd/0Pxvh4+i397dT1GEKDpk0e/zisi8efPmze/vfwzdRH+4uv+iiLKjKDwNy2+HLeD1GfPmzZs3327+/E+HbaI/PX/q+AxR9GSPRX73/w8tfvPmzZs332L+6g8H3Sc6/3j/RRElR9HHBXtjffE+tLi3fa558+bNm288/9e//PkgfzL/u5//8q/X75MoouAoCh8X6N3CDeH+ot212Dc/17x58+bNj35eFFH2TtGuBbS5uHZ93Lx58+bNT2ZeFGGn6LGFsi/z5s2bNz/qeVGEKLpTh3r5LTRm3rx58+ZHPS+KKDmKPl1E9SMf2/V98+bNmzc/+nlRRMFRVH9cGJsL5LFXHZtz5s2bN29+9POiiLKjaH2RrFt/NXH3/+sLaP1zzJs3b978JOZFEWUfn21bROsLZ9uC2lxw5s2bN29+EvOiCO8p2nyVsY9trzzMmzdv3vz052GaUXTA4mnKvHnz5s2Pcx6O5v8LMAD1bFcN+PyASQAAAABJRU5ErkJggg==');\n                    background-size: 100% 100%;\n                }\n            }\n        ")
			},
			_isMiniScreen : function() {
				return document.querySelector(".newfloat") || document.querySelector(".mini-player")
			},
			_isPGC : function() {
				return Boolean(window.location.href.match("www.bilibili.com/bangumi"))
			},
			_setContainerWH : function(e) {
				var t = document.querySelector(".".concat(this.prefix, "-load-wrap"));
				if (t) t.style.width = "".concat(e.width, "px"), t.style.height = "".concat(e.height, "px"), t.style.top = "".concat(e.top ? e.top : 0, "px");else {
					var n = "\n            .".concat(this.prefix, "-load-wrap {\n                width: ").concat(e.width, "px;\n                height: ").concat(e.height, "px;\n                top: ").concat(e.top ? e.top : 0, "px;\n            }\n            ");
					document.querySelector("head").insertAdjacentHTML("beforeend", "<style>".concat(n, "</style>"))
				}
			},
			start : function() {
				var t = this,
					n = this;
				window.requestAnimationFrame(function e() {
					n.per <= 80 ? n.per = Math.floor(Math.log(n.times) / Math.log(15.6) * 100) : n.per += .03, document.querySelector(".".concat(t.prefix, "-load-mask")).style.height = "".concat(100 - Math.floor(n.per), "%"), document.querySelector(".".concat(t.prefix, "-load-percent")).innerHTML = "".concat(Math.floor(n.per), "%"), n.times += 1, Math.floor(n.per) < 99 && (n.timer = window.requestAnimationFrame(e))
				})
			},
			end : function() {
				var r = this,
					e = Math.ceil(100 - r.per),
					t = document.querySelector(".".concat(this.prefix, "-mask-bg"));
				t && t.parentNode.removeChild(t);
				var i = 1;
				.3 < e / 60 && (i = Math.ceil(e / 20)), window.requestAnimationFrame(function e() {
					var t = document.querySelector(".small-tv-ico");
					t && (t.style.display = "none");
					var n = document.querySelector(".".concat(r.prefix, "-load-wrap"));
					r._isMiniScreen() && n && n.parentNode.removeChild(n), r.per += i, 100 <= r.per && (r.per = 100), document.querySelector(".".concat(r.prefix, "-load-mask")).style.height = "".concat(100 - Math.floor(r.per), "%"), document.querySelector(".".concat(r.prefix, "-load-percent")).innerHTML = "".concat(Math.floor(r.per), "%"), Math.floor(r.per) < 100 ? r._timer = window.requestAnimationFrame(e) : (document.querySelector(".".concat(r.prefix, "-load-percent")).innerHTML = "".concat(100, "%"), document.querySelector(".".concat(r.prefix, "-load-mask")).style.height = "0%", setTimeout(function() {
						n && n.parentNode.removeChild(n)
					}, 1e3 / 60))
				})
			}
		};
		e.exports = n
	}, function(module, exports, __webpack_require__) {
		var _require = __webpack_require__(40),
			sendTrack = _require.sendTrack;
		module.exports = {
			flash : function() {
				window.player = {};
				for (var a = {
							video_media_buffer : "jwplayerMediaBuffer",
							video_media_buffer_full : "jwplayerMediaBufferFull",
							video_media_ended : "jwplayerMediaComplete",
							video_media_error : "jwplayerMediaError",
							video_media_loaded : "jwplayerMediaLoaded",
							video_media_mute : "jwplayerMediaMute",
							video_media_seek : "jwplayerMediaSeek",
							video_media_time : "jwplayerMediaTime",
							video_media_volume : "jwplayerMediaVolume"
						}, e = {
							reloadAccess : "mukio_reloadAccess",
							play : "jwPlay",
							pause : "jwPause",
							stop : "jwStop",
							seek : "jwSeek",
							prev : "jwPlaylistPrev",
							next : "jwPlaylistNext",
							getBufferRate : "jwGetBuffer",
							getDuration : "jwGetDuration",
							isFullScreen : "jwGetFullscreen",
							getWidth : "jwGetWidth",
							getHeight : "jwGetHeight",
							isMute : "jwGetMute",
							setMute : "jwSetMute",
							getPlaylist : "jwGetPlaylist",
							getPlaylistIndex : "jwGetPlaylistIndex",
							getCurrentTime : "jwGetPosition",
							getState : "jwGetState",
							getVersion : "jwGetVersion",
							getPlayurl : "jwGetPlayurl",
							volume : "jwGetVolume|jwSetVolume",
							sendADShowState : "sendADShowState"
						}, t = Object.keys(e), n = 0; n < t.length; n++) !function(i, a) {
						window.player[i] = function() {
							var e = document.getElementById("player_placeholder");
							if (e) {
								for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++) n[r] = arguments[r];
								if ("function" == typeof e[a]) return e[a].apply(e, n);
								if ("volume" === i && "function" == typeof e.volume) return 0 === n.length ? e.jwGetVolume.apply(e, n) : e.jwSetVolume.apply(e, n)
							}
							return !1
						}
					}(t[n], e[t[n]]);
				window.player.addEventListener = function(e, t) {
					var n = "";
					try {
						"function" == typeof t && (n = "".concat(t))
					} catch (e) {
						n = "function(){}"
					}
					var r,
						i = document.getElementById("player_placeholder");
					a[e] && (r = n || t, i && i.jwAddEventListener && i.jwAddEventListener(a[e], r))
				}, window.player.removeEventListener = function(e) {
					var t = document.getElementById("player_placeholder");
					a[e] && t && t.jwRemoveEventListener && t.jwRemoveEventListener(a[e])
				}
			},
			html5 : function html5(isCorePlayer) {
				var eventMaps = {
						jwplayerMediaBuffer : "video_media_buffer",
						jwplayerMediaBufferFull : "video_media_buffer_full",
						jwplayerMediaComplete : "video_media_ended",
						jwplayerMediaError : "video_media_error",
						jwplayerMediaLoaded : "video_media_loaded",
						jwplayerMediaMute : "video_media_mute",
						jwplayerMediaSeek : "video_media_seek",
						jwplayerMediaTime : "video_media_time",
						jwplayerMediaVolume : "video_media_volume"
					},
					apiMaps = {
						mukio_reloadAccess : "reloadAccess",
						jwPlay : "play",
						jwPause : "pause",
						jwStop : "stop",
						jwSeek : "seek",
						jwPlaylistPrev : "prev",
						jwPlaylistNext : "next",
						jwGetBuffer : "getBufferRate",
						jwGetDuration : "getDuration",
						jwGetFullscreen : "isFullScreen",
						jwGetWidth : "getWidth",
						jwGetHeight : "getHeight",
						jwGetMute : "isMute",
						jwSetMute : "setMute",
						jwGetPlaylist : "getPlaylist",
						jwGetPlaylistIndex : "getPlaylistIndex",
						jwGetPosition : "getCurrentTime",
						jwGetState : "getState",
						jwGetVersion : "getVersion",
						jwGetPlayurl : "getPlayurl",
						jwGetVolume : "volume",
						jwSetVolume : "volume"
					},
					cElement = document.querySelector("#bofqi #player_placeholder");
				cElement || (document.querySelector("#bofqi").insertAdjacentHTML("beforeend", '<div id="player_placeholder"></div>'), cElement = document.querySelector("#bofqi #player_placeholder"));
				for (var keys = Object.keys(apiMaps), i = 0; i < keys.length; i++) !function(e, r) {
						cElement[e] = function() {
							if (window.player && "function" == typeof window.player[r]) {
								for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
								return window.player[r].apply(window.player, t)
							}
							return !1
						}
					}(keys[i], apiMaps[keys[i]]);
				if (cElement.jwAddEventListener = function(type, callback) {
						var callbackString = "",
							_callback;
						try {
							"function" != typeof callback && (callbackString = eval("(".concat(callback, ")")))
						} catch (e) {
							callbackString = function() {}
						} eventMaps[type] && (_callback = callbackString || callback, window.player && window.player.addEventListener && window.player.addEventListener(eventMaps[type], _callback))
					}, cElement.jwRemoveEventListener = function(e) {
						eventMaps[e] && window.player && window.player.removeEventListener && window.player.removeEventListener(eventMaps[e])
					}, "function" == typeof this.callbackFn && cElement.jwAddEventListener("jwplayerMediaLoaded", this.callbackFn), isCorePlayer) "function" == typeof window.PlayerMediaLoaded && window.PlayerMediaLoaded();else {
					var isFirst = !0;
					window.player && "function" == typeof window.player.addEventListener && window.player.addEventListener("video_media_loaded", function() {
						isFirst && (isFirst = !1, "function" == typeof window.PlayerMediaLoaded && window.PlayerMediaLoaded())
					})
				}
				sendTrack(), window.player && "function" == typeof window.player.addEventListener && window.player.addEventListener("video_playurl_loaded", function() {
					window.GrayManager && window.performance && window.performance.timing && !window.performance.timing.playerStage2 && (window.performance.timing.playerStage2 = +new Date)
				})
			}
		}
	}, function(e, t, n) {
		var r = n(21);
		e.exports = {
			load : function(e) {
				var t = this,
					n = document.querySelector(".player-wrapper .bgray-btn-wrap .bgray-btn.show");
				n && n.classList.add("player-feedback-disable"), r.loadScript({
					url : "//static.hdslb.com/player/feedback/feedback.min.js",
					success : function() {
						n && n.classList.remove("player-feedback-disable"), t.feedback = new window.FeedBackInstance, "function" == typeof e && e()
					},
					error : function() {
						n && n.classList.remove("player-feedback-disable")
					}
				})
			},
			get : function() {
				var e = this,
					t = document.querySelector(".player-wrapper .bgray-btn-wrap .player-feedback-disable");
				window.FeedBackInstance || e.feedback || t ? e.feedback && e.feedback.show() : e.loadFeedback(function() {
					e.feedback && e.feedback.show()
				})
			}
		}
	}, function(e, t) {
		e.exports = {
			name : "core-player",
			version : "1.2.2",
			envMode : "production",
			gitHash : "2f0122a",
			lastModified : "2018-10-25T10:58:59.972Z"
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(3),
			i = n(41),
			a = n(73),
			o = n(28);
		function s(e) {
			var t = new a(e),
				n = i(a.prototype.request, t);
			return r.extend(n, a.prototype, t), r.extend(n, t), n
		}
		var u = s(o);
		u.Axios = a, u.create = function(e) {
			return s(r.merge(o, e))
		}, u.Cancel = n(46), u.CancelToken = n(87), u.isCancel = n(45), u.all = function(e) {
			return Promise.all(e)
		}, u.spread = n(88), e.exports = u, e.exports.default = u
	}, function(e, t, n) {
		"use strict";
		var r = n(28),
			i = n(3),
			a = n(82),
			o = n(83);
		function s(e) {
			this.defaults = e, this.interceptors = {
				request : new a,
				response : new a
			}
		}
		s.prototype.request = function(e) {
			"string" == typeof e && (e = i.merge({
				url : arguments[0]
			}, arguments[1])), (e = i.merge(r, {
				method : "get"
			}, this.defaults, e)).method = e.method.toLowerCase();
			var t = [ o, void 0 ],
				n = Promise.resolve(e);
			for (this.interceptors.request.forEach(function(e) {
					t.unshift(e.fulfilled, e.rejected)
				}), this.interceptors.response.forEach(function(e) {
					t.push(e.fulfilled, e.rejected)
				}); t.length;) n = n.then(t.shift(), t.shift());
			return n
		}, i.forEach([ "delete", "get", "head", "options" ], function(n) {
			s.prototype[n] = function(e, t) {
				return this.request(i.merge(t || {}, {
					method : n,
					url : e
				}))
			}
		}), i.forEach([ "post", "put", "patch" ], function(r) {
			s.prototype[r] = function(e, t, n) {
				return this.request(i.merge(n || {}, {
					method : r,
					url : e,
					data : t
				}))
			}
		}), e.exports = s
	}, function(e, t, n) {
		"use strict";
		var i = n(3);
		e.exports = function(n, r) {
			i.forEach(n, function(e, t) {
				t !== r && t.toUpperCase() === r.toUpperCase() && (n[r] = e,
				delete n[t]
				)
			})
		}
	}, function(e, t, n) {
		"use strict";
		var i = n(44);
		e.exports = function(e, t, n) {
			var r = n.config.validateStatus;
			n.status && r && !r(n.status) ? t(i("Request failed with status code " + n.status, n.config, null, n.request, n)) : e(n)
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = function(e, t, n, r, i) {
			return e.config = t, n && (e.code = n), e.request = r, e.response = i, e
		}
	}, function(e, t, n) {
		"use strict";
		var a = n(3);
		function o(e) {
			return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
		}
		e.exports = function(e, t, n) {
			if (!t) return e;
			var r;
			if (n)
				r = n(t);
			else if (a.isURLSearchParams(t))
				r = t.toString();else {
				var i = [];
				a.forEach(t, function(e, t) {
					null != e && (a.isArray(e) ? t += "[]" : e = [ e ], a.forEach(e, function(e) {
						a.isDate(e) ? e = e.toISOString() : a.isObject(e) && (e = JSON.stringify(e)), i.push(o(t) + "=" + o(e))
					}))
				}), r = i.join("&")
			}
			return r && (e += (-1 === e.indexOf("?") ? "?" : "&") + r), e
		}
	}, function(e, t, n) {
		"use strict";
		var a = n(3),
			o = [ "age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent" ];
		e.exports = function(e) {
			var t,
				n,
				r,
				i = {};
			return e && a.forEach(e.split("\n"), function(e) {
					if (r = e.indexOf(":"), t = a.trim(e.substr(0, r)).toLowerCase(), n = a.trim(e.substr(r + 1)), t) {
						if (i[t] && 0 <= o.indexOf(t)) return;
						i[t] = "set-cookie" === t ? (i[t] ? i[t] : []).concat([ n ]) : i[t] ? i[t] + ", " + n : n
					}
				}), i
		}
	}, function(e, t, n) {
		"use strict";
		var o = n(3);
		e.exports = o.isStandardBrowserEnv() ? function() {
			var n,
				r = /(msie|trident)/i.test(navigator.userAgent),
				i = document.createElement("a");
			function a(e) {
				var t = e;
				return r && (i.setAttribute("href", t), t = i.href), i.setAttribute("href", t), {
						href : i.href,
						protocol : i.protocol ? i.protocol.replace(/:$/, "") : "",
						host : i.host,
						search : i.search ? i.search.replace(/^\?/, "") : "",
						hash : i.hash ? i.hash.replace(/^#/, "") : "",
						hostname : i.hostname,
						port : i.port,
						pathname : "/" === i.pathname.charAt(0) ? i.pathname : "/" + i.pathname
				}
			}
			return n = a(window.location.href), function(e) {
					var t = o.isString(e) ? a(e) : e;
					return t.protocol === n.protocol && t.host === n.host
			}
		}() : function() {
			return !0
		}
	}, function(e, t, n) {
		"use strict";
		function s() {
			this.message = "String contains an invalid character"
		}
		(s.prototype = new Error).code = 5, s.prototype.name = "InvalidCharacterError", e.exports = function(e) {
			for (var t, n, r = String(e), i = "", a = 0, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; r.charAt(0 | a) || (o = "=", a % 1); i += o.charAt(63 & t >> 8 - a % 1 * 8)) {
				if (255 < (n = r.charCodeAt(a += .75)))
					throw new s;
				t = t << 8 | n
			}
			return i
		}
	}, function(e, t, n) {
		"use strict";
		var s = n(3);
		e.exports = s.isStandardBrowserEnv() ? {
			write : function(e, t, n, r, i, a) {
				var o = [];
				o.push(e + "=" + encodeURIComponent(t)), s.isNumber(n) && o.push("expires=" + new Date(n).toGMTString()), s.isString(r) && o.push("path=" + r), s.isString(i) && o.push("domain=" + i), !0 === a && o.push("secure"), document.cookie = o.join("; ")
			},
			read : function(e) {
				var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
				return t ? decodeURIComponent(t[3]) : null
			},
			remove : function(e) {
				this.write(e, "", Date.now() - 864e5)
			}
		} : {
			write : function() {},
			read : function() {
				return null
			},
			remove : function() {}
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(3);
		function i() {
			this.handlers = []
		}
		i.prototype.use = function(e, t) {
			return this.handlers.push({
					fulfilled : e,
					rejected : t
				}), this.handlers.length - 1
		}, i.prototype.eject = function(e) {
			this.handlers[e] && (this.handlers[e] = null)
		}, i.prototype.forEach = function(t) {
			r.forEach(this.handlers, function(e) {
				null !== e && t(e)
			})
		}, e.exports = i
	}, function(e, t, n) {
		"use strict";
		var r = n(3),
			i = n(84),
			a = n(45),
			o = n(28),
			s = n(85),
			u = n(86);
		function l(e) {
			e.cancelToken && e.cancelToken.throwIfRequested()
		}
		e.exports = function(t) {
			return l(t), t.baseURL && !s(t.url) && (t.url = u(t.baseURL, t.url)), t.headers = t.headers || {}, t.data = i(t.data, t.headers, t.transformRequest), t.headers = r.merge(t.headers.common || {}, t.headers[t.method] || {}, t.headers || {}), r.forEach([ "delete", "get", "head", "post", "put", "patch", "common" ], function(e) {
					delete t.headers[e]
				}), (t.adapter || o.adapter)(t).then(function(e) {
					return l(t), e.data = i(e.data, e.headers, t.transformResponse), e
				}, function(e) {
					return a(e) || (l(t), e && e.response && (e.response.data = i(e.response.data, e.response.headers, t.transformResponse))), Promise.reject(e)
				})
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(3);
		e.exports = function(t, n, e) {
			return r.forEach(e, function(e) {
					t = e(t, n)
				}), t
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = function(e) {
			return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = function(e, t) {
			return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(46);
		function i(e) {
			if ("function" != typeof e)
				throw new TypeError("executor must be a function.");
			var t;
			this.promise = new Promise(function(e) {
				t = e
			});var n = this;
			e(function(e) {
				n.reason || (n.reason = new r(e), t(n.reason))
			})
		}
		i.prototype.throwIfRequested = function() {
			if (this.reason)
				throw this.reason
		}, i.source = function() {
			var t;
			return {
				token : new i(function(e) {
					t = e
				}),
				cancel : t
			}
		}, e.exports = i
	}, function(e, t, n) {
		"use strict";
		e.exports = function(t) {
			return function(e) {
				return t.apply(null, e)
			}
		}
	}, function(e, t, n) {
		var c = n(21),
			h = n(39);
		e.exports = function(e, t, n, r, i, a) {
			var o = document.querySelector("#bofqi #player_placeholder");
			o && o.parentNode.removeChild(o);
			var s = Array.prototype.filter.call(document.querySelector("#bofqi").childNodes, function(e) {
					return 3 === e.nodeType
				}),
				u = "";
			s.forEach(function(e) {
				u += e.textContent
			});
			var l = u.match(/\[flashvars\](.*)\[\/flashvars\]/),
				d = n;
			c.GetUrlValue("d") && (d = "".concat(d, "&d=").concat(c.GetUrlValue("d"))), c.GetUrlValue("t") && (d = "".concat(d, "&t=").concat(c.GetUrlValue("t"))), c.GetUrlValue("lastplaytime") && (d = "".concat(d, "&lastplaytime=").concat(c.GetUrlValue("lastplaytime"))), null != l && (d = "".concat(d, "&").concat(l[1]), s.forEach(function(e) {
				e.parentNode.removeChild(e)
			})), d && (window.aid = d.match(/aid=(\d+)/)[1], window.cid = d.match(/cid=(\d+)&/), window.cid && (window.cid = window.cid[1])), h.loadingTime = +new Date, h.init(e, t, d, r, i, a);
			var f = function(e) {
				if ("bofqi" === e.target.id) {
					var t = window.deltaFilter(e.originalEvent),
						n = document.getElementById("player_placeholder");
					t && n && n.scrollHappened && n.scrollHappened(t) && !/(webkit)[ /]([\w.]+).*(version)[ /]([\w.]+).*(safari)[ /]([\w.]+)/.test(navigator.userAgent.toLowerCase()) && !/(version)(applewebkit)[ /]([\w.]+).*(safari)[ /]([\w.]+)/.test(navigator.userAgent.toLowerCase()) && e.preventDefault()
				}
			};
			return document.body.addEventListener("mousewheel", f), document.body.addEventListener("DOMMouseScroll", f), !1
		}
	}, function(e, t, n) {
		n(91), n(92), n(93), n(112), n(113), n(114), n(115), n(116), n(117), n(118), n(119), n(120), e.exports = n(13)
	}, function(e, t, n) {
		"use strict";
		var r = n(22),
			i = n(25),
			a = n(31),
			l = n(14),
			d = n(18),
			f = n(8),
			o = n(10),
			s = n(4).ArrayBuffer,
			c = n(60),
			h = a.ArrayBuffer,
			p = a.DataView,
			u = i.ABV && s.isView,
			g = h.prototype.slice,
			m = i.VIEW,
			_ = "ArrayBuffer";
		r(r.G + r.W + r.F * (s !== h), {
			ArrayBuffer : h
		}), r(r.S + r.F * !i.CONSTR, _, {
			isView : function(e) {
				return u && u(e) || o(e) && m in e
			}
		}), r(r.P + r.U + r.F * n(15)(function() {
				return !new h(2).slice(1, void 0).byteLength
			}), _, {
				slice : function(e, t) {
					if (void 0 !== g && void 0 === t) return g.call(l(this), e);
					for (var n = l(this).byteLength, r = d(e, n), i = d(void 0 === t ? n : t, n), a = new (c(this, h))(f(i - r)), o = new p(this), s = new p(a), u = 0; r < i;) s.setUint8(u++, o.getUint8(r++));
					return a
				}
			}), n(61)(_)
	}, function(e, t, n) {
		var r = n(22);
		r(r.G + r.W + r.F * !n(25).ABV, {
			DataView : n(31).DataView
		})
	}, function(e, t, n) {
		n(5)("Int8", 1, function(r) {
			return function(e, t, n) {
				return r(this, e, t, n)
			}
		})
	}, function(e, t, n) {
		var r = n(20),
			i = n(2)("iterator"),
			a = Array.prototype;
		e.exports = function(e) {
			return void 0 !== e && (r.Array === e || a[i] === e)
		}
	}, function(e, t, n) {
		var o = n(9),
			s = n(14),
			u = n(96);
		e.exports = n(7) ? Object.defineProperties : function(e, t) {
			s(e);
			for (var n, r = u(t), i = r.length, a = 0; a < i;) o.f(e, n = r[a++], t[n]);
			return e
		}
	}, function(e, t, n) {
		var r = n(54),
			i = n(34);
		e.exports = Object.keys || function(e) {
			return r(e, i)
		}
	}, function(e, t, n) {
		var r = n(4).document;
		e.exports = r && r.documentElement
	}, function(e, t, n) {
		var r = n(36),
			i = n(2)("iterator"),
			a = n(20);
		e.exports = n(13).getIteratorMethod = function(e) {
			if (null != e) return e[i] || e["@@iterator"] || a[r(e)]
		}
	}, function(e, t, n) {
		var y = n(30),
			E = n(55),
			A = n(19),
			T = n(8),
			r = n(100);
		e.exports = function(f, e) {
			var c = 1 == f,
				h = 2 == f,
				p = 3 == f,
				g = 4 == f,
				m = 6 == f,
				_ = 5 == f || m,
				v = e || r;
			return function(e, t, n) {
				for (var r, i, a = A(e), o = E(a), s = y(t, n, 3), u = T(o.length), l = 0, d = c ? v(e, u) : h ? v(e, 0) : void 0; l < u; l++)
					if ((_ || l in o) && (i = s(r = o[l], l, a), f))
						if (c)
							d[l] = i;
						else if (i) switch (f) {
							case 3:
								return !0;case 5:
								return r;case 6:
								return l;case 2:
								d.push(r)
						}
						else if (g) return !1;
				return m ? -1 : p || g ? g : d
			}
		}
	}, function(e, t, n) {
		var r = n(101);
		e.exports = function(e, t) {
			return new (r(e))(t)
		}
	}, function(e, t, n) {
		var r = n(10),
			i = n(102),
			a = n(2)("species");
		e.exports = function(e) {
			var t;
			return i(e) && ("function" != typeof (t = e.constructor) || t !== Array && !i(t.prototype) || (t = void 0), r(t) && null === (t = t[a]) && (t = void 0)), void 0 === t ? Array : t
		}
	}, function(e, t, n) {
		var r = n(32);
		e.exports = Array.isArray || function(e) {
			return "Array" == r(e)
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(104),
			i = n(105),
			a = n(20),
			o = n(27);
		e.exports = n(106)(Array, "Array", function(e, t) {
			this._t = o(e), this._i = 0, this._k = t
		}, function() {
			var e = this._t,
				t = this._k,
				n = this._i++;
			return !e || n >= e.length ? (this._t = void 0, i(1)) : i(0, "keys" == t ? n : "values" == t ? e[n] : [ n, e[n] ])
		}, "values"), a.Arguments = a.Array, r("keys"), r("values"), r("entries")
	}, function(e, t, n) {
		var r = n(2)("unscopables"),
			i = Array.prototype;
		null == i[r] && n(6)(i, r, {}), e.exports = function(e) {
			i[r][e] = !0
		}
	}, function(e, t) {
		e.exports = function(e, t) {
			return {
				value : t,
				done : !!e
			}
		}
	}, function(e, t, n) {
		"use strict";
		var y = n(26),
			E = n(22),
			A = n(24),
			T = n(6),
			R = n(20),
			I = n(107),
			S = n(35),
			b = n(63),
			w = n(2)("iterator"),
			C = !([].keys && "next" in [].keys()),
			D = "values",
			O = function() {
				return this
			};
		e.exports = function(e, t, n, r, i, a, o) {
			I(n, t, r);
			var s,
				u,
				l,
				d = function(e) {
					if (!C && e in p) return p[e];
					switch (e) {
					case "keys":
					case D:
						return function() {
							return new n(this, e)
						}
					}
					return function() {
						return new n(this, e)
					}
				},
				f = t + " Iterator",
				c = i == D,
				h = !1,
				p = e.prototype,
				g = p[w] || p["@@iterator"] || i && p[i],
				m = g || d(i),
				_ = i ? c ? d("entries") : m : void 0,
				v = "Array" == t && p.entries || g;
			if (v && (l = b(v.call(new e))) !== Object.prototype && l.next && (S(l, f, !0), y || "function" == typeof l[w] || T(l, w, O)), c && g && g.name !== D && (h = !0, m = function() {
					return g.call(this)
				}), y && !o || !C && !h && p[w] || T(p, w, m), R[t] = m, R[f] = O, i)
				if (s = {
						values : c ? m : d(D),
						keys : a ? m : d("keys"),
						entries : _
					}, o)
					for (u in s) u in p || A(p, u, s[u]);
				else E(E.P + E.F * (C || h), t, s);
			return s
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(62),
			i = n(23),
			a = n(35),
			o = {};
		n(6)(o, n(2)("iterator"), function() {
			return this
		}), e.exports = function(e, t, n) {
			e.prototype = r(o, {
				next : i(1, n)
			}), a(e, t + " Iterator")
		}
	}, function(e, t, n) {
		var a = n(2)("iterator"),
			o = !1;
		try {
			var r = [ 7 ][a]();
			r.return = function() {
				o = !0
			}, Array.from(r, function() {
				throw 2
			})
		} catch (e) {}
		e.exports = function(e, t) {
			if (!t && !o) return !1;
			var n = !1;
			try {
				var r = [ 7 ],
					i = r[a]();
				i.next = function() {
					return {
						done : n = !0
					}
				}, r[a] = function() {
					return i
				}, e(r)
			} catch (e) {} return n
		}
	}, function(e, t, n) {
		"use strict";
		var l = n(19),
			d = n(18),
			f = n(8);
		e.exports = [].copyWithin || function(e, t) {
			var n = l(this),
				r = f(n.length),
				i = d(e, r),
				a = d(t, r),
				o = 2 < arguments.length ? arguments[2] : void 0,
				s = Math.min((void 0 === o ? r : d(o, r)) - a, r - i),
				u = 1;
			for (a < i && i < a + s && (u = -1, a += s - 1, i += s - 1); 0 < s--;) a in n ? n[i] = n[a] :
					delete n[i]
				, i += u, a += u;
			return n
		}
	}, function(e, t, n) {
		var r = n(111),
			i = n(23),
			a = n(27),
			o = n(29),
			s = n(11),
			u = n(47),
			l = Object.getOwnPropertyDescriptor;
		t.f = n(7) ? l : function(e, t) {
			if (e = a(e), t = o(t, !0), u) try {
					return l(e, t)
				} catch (e) {}
			if (s(e, t)) return i(!r.f.call(e, t), e[t])
		}
	}, function(e, t) {
		t.f = {}.propertyIsEnumerable
	}, function(e, t, n) {
		n(5)("Uint8", 1, function(r) {
			return function(e, t, n) {
				return r(this, e, t, n)
			}
		})
	}, function(e, t, n) {
		n(5)("Uint8", 1, function(r) {
			return function(e, t, n) {
				return r(this, e, t, n)
			}
		}, !0)
	}, function(e, t, n) {
		n(5)("Int16", 2, function(r) {
			return function(e, t, n) {
				return r(this, e, t, n)
			}
		})
	}, function(e, t, n) {
		n(5)("Uint16", 2, function(r) {
			return function(e, t, n) {
				return r(this, e, t, n)
			}
		})
	}, function(e, t, n) {
		n(5)("Int32", 4, function(r) {
			return function(e, t, n) {
				return r(this, e, t, n)
			}
		})
	}, function(e, t, n) {
		n(5)("Uint32", 4, function(r) {
			return function(e, t, n) {
				return r(this, e, t, n)
			}
		})
	}, function(e, t, n) {
		n(5)("Float32", 4, function(r) {
			return function(e, t, n) {
				return r(this, e, t, n)
			}
		})
	}, function(e, t, n) {
		n(5)("Float64", 8, function(r) {
			return function(e, t, n) {
				return r(this, e, t, n)
			}
		})
	}, function(e, t, n) {
		"use strict";
		var r = n(36),
			i = {};
		i[n(2)("toStringTag")] = "z", i + "" != "[object z]" && n(24)(Object.prototype, "toString", function() {
			return "[object " + r(this) + "]"
		}, !0)
	}, function(e, t) {}, function(e, t, n) {
		(e.exports = n(123)(!1)).push([ e.i, '.bilibili-player{-webkit-box-shadow:0 0 8px #e2e2e2;background-color:#fff;box-shadow:0 0 8px #e2e2e2;height:100%;margin:0 auto;text-align:left;width:100%}.bilibili-player,.bilibili-player-area{display:-webkit-box;display:-ms-flexbox;display:flex}.bilibili-player-area{-ms-flex-direction:column;-ms-flex-positive:1;-webkit-box-direction:normal;-webkit-box-flex:1;-webkit-box-orient:vertical;flex-direction:column;flex-grow:1;overflow:hidden}.bilibili-player-area.video-state-pause .bilibili-player-video-state-play{display:block}.bilibili-player-area.video-state-buff .bilibili-player-video-state{background:rgba(0,0,0,.8);border-radius:4px;bottom:auto;display:block;height:48px;left:50%;margin-left:-24px;margin-top:-24px;right:auto;text-align:center;top:50%;width:48px}.bilibili-player-area.video-state-buff .bilibili-player-video-state-buff{display:inline-block;margin-top:8px;vertical-align:top}.bilibili-player-video-wrap{-ms-flex-positive:1;-webkit-box-flex:1;cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex;flex-grow:1;min-height:0;overflow:hidden;position:relative}.bilibili-player-video-state{bottom:24px;cursor:pointer;height:84px;pointer-events:none;position:absolute;right:10px;width:100px;z-index:12}.bilibili-player-video-state>*{display:none}.bilibili-player-video-panel{background-color:#fff;cursor:pointer;height:100%;left:0;position:absolute;top:0;width:100%;z-index:14}.bilibili-player-video-panel-image{left:50%;position:absolute;text-align:center;top:50%}.bilibili-player-video-panel-image-detail{background:transparent url(//static.hdslb.com/player/images/ploading.gif) no-repeat 50%;display:inline-block;height:90px;margin-left:-100%;margin-top:-50%;position:relative;width:90px}.bilibili-player-video{-ms-flex-positive:1;-webkit-box-flex:1;background-color:#000;display:-webkit-box;display:-ms-flexbox;display:flex;flex-grow:1}.bilibili-player-video video{display:block;margin:0 auto;max-height:100%;width:100%}.bilibili-player-video-bottom-area:before{background:#f4f4f4;content:"";display:block;height:1px;margin-bottom:-1px;position:relative;width:100%;z-index:100}.bilibili-player-video-sendbar{-ms-flex-align:center;-ms-flex-negative:0;-webkit-box-align:center;align-items:center;background:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;flex-shrink:0;height:46px;padding:0 12px 0 20px;position:relative;z-index:70}.bilibili-player-bas-danmaku,.bilibili-player-video-adv-danmaku,.bilibili-player-video-bas-danmaku,.bilibili-player-video-control-mask,.bilibili-player-video-danmaku,.bilibili-player-video-subtitle{display:none}.bilibili-player-video-control-wrap{-webkit-box-sizing:border-box;-webkit-transition:all .2s ease-in-out;bottom:0;box-sizing:border-box;left:0;opacity:0;padding:0 12px;position:absolute;transition:all .2s ease-in-out;visibility:hidden;width:100%;z-index:70}', "" ])
	}, function(e, t) {
		e.exports = function(n) {
			var o = [];
			return o.toString = function() {
					return this.map(function(e) {
						var t = function(e, t) {
							var n = e[1] || "",
								r = e[3];
							if (!r) return n;
							if (t && "function" == typeof btoa) {
								var i = (o = r, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */"),
									a = r.sources.map(function(e) {
										return "/*# sourceURL=" + r.sourceRoot + e + " */"
									});
								return [ n ].concat(a).concat([ i ]).join("\n")
							}
							var o;
							return [ n ].join("\n")
						}(e, n);
						return e[2] ? "@media " + e[2] + "{" + t + "}" : t
					}).join("")
				}, o.i = function(e, t) {
					"string" == typeof e && (e = [ [ null, e, "" ] ]);
					for (var n = {}, r = 0; r < this.length; r++) {
						var i = this[r][0];
						"number" == typeof i && (n[i] = !0)
					}
					for (r = 0; r < e.length; r++) {
						var a = e[r];
						"number" == typeof a[0] && n[a[0]] || (t && !a[2] ? a[2] = t : t && (a[2] = "(" + a[2] + ") and (" + t + ")"), o.push(a))
					}
				}, o
		}
	}, function(e, t, r) {
		var n,
			i,
			a,
			u = {},
			l = (n = function() {
				return window && document && document.all && !window.atob
			}, function() {
				return void 0 === i && (i = n.apply(this, arguments)), i
			}),
			o = (a = {}, function(e, t) {
				if ("function" == typeof e) return e();
				if (void 0 === a[e]) {
					var n = function(e, t) {
						return t ? t.querySelector(e) : document.querySelector(e)
					}.call(this, e, t);
					if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) try {
							n = n.contentDocument.head
						} catch (e) {
							n = null
					}
					a[e] = n
				}
				return a[e]
			}),
			d = null,
			f = 0,
			s = [],
			c = r(125);
		function h(e, t) {
			for (var n = 0; n < e.length; n++) {
				var r = e[n],
					i = u[r.id];
				if (i) {
					i.refs++;
					for (var a = 0; a < i.parts.length; a++) i.parts[a](r.parts[a]);
					for (; a < r.parts.length; a++) i.parts.push(y(r.parts[a], t))
				} else {
					var o = [];
					for (a = 0; a < r.parts.length; a++) o.push(y(r.parts[a], t));
					u[r.id] = {
						id : r.id,
						refs : 1,
						parts : o
					}
				}
			}
		}
		function p(e, t) {
			for (var n = [], r = {}, i = 0; i < e.length; i++) {
				var a = e[i],
					o = t.base ? a[0] + t.base : a[0],
					s = {
						css : a[1],
						media : a[2],
						sourceMap : a[3]
					};
				r[o] ? r[o].parts.push(s) : n.push(r[o] = {
					id : o,
					parts : [ s ]
				})
			}
			return n
		}
		function g(e, t) {
			var n = o(e.insertInto);
			if (!n)
				throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
			var r = s[s.length - 1];
			if ("top" === e.insertAt) r ? r.nextSibling ? n.insertBefore(t, r.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild), s.push(t);
			else if ("bottom" === e.insertAt) n.appendChild(t);else {
				if ("object" != typeof e.insertAt || !e.insertAt.before)
					throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
				var i = o(e.insertAt.before, n);
				n.insertBefore(t, i)
			}
		}
		function m(e) {
			if (null === e.parentNode) return !1;
			e.parentNode.removeChild(e);var t = s.indexOf(e);
			0 <= t && s.splice(t, 1)
		}
		function _(e) {
			var t = document.createElement("style");
			if (void 0 === e.attrs.type && (e.attrs.type = "text/css"), void 0 === e.attrs.nonce) {
				var n = function() {
					0;return r.nc
				}();
				n && (e.attrs.nonce = n)
			}
			return v(t, e.attrs), g(e, t), t
		}
		function v(t, n) {
			Object.keys(n).forEach(function(e) {
				t.setAttribute(e, n[e])
			})
		}
		function y(t, e) {
			var n,
				r,
				i,
				a,
				o,
				s;
			if (e.transform && t.css) {
				if (!(a = e.transform(t.css))) return function() {};
				t.css = a
			}
			if (e.singleton) {
				var u = f++;
				n = d || (d = _(e)), r = T.bind(null, n, u, !1), i = T.bind(null, n, u, !0)
			} else
				i = t.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (o = e, s = document.createElement("link"), void 0 === o.attrs.type && (o.attrs.type = "text/css"), o.attrs.rel = "stylesheet", v(s, o.attrs), g(o, s), r = function(e, t, n) {
					var r = n.css,
						i = n.sourceMap,
						a = void 0 === t.convertToAbsoluteUrls && i;
					(t.convertToAbsoluteUrls || a) && (r = c(r));i && (r += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */");
					var o = new Blob([ r ], {
							type : "text/css"
						}),
						s = e.href;
					e.href = URL.createObjectURL(o), s && URL.revokeObjectURL(s)
				}.bind(null, n = s, e), function() {
					m(n), n.href && URL.revokeObjectURL(n.href)
				}) : (n = _(e), r = function(e, t) {
					var n = t.css,
						r = t.media;
					r && e.setAttribute("media", r);
					if (e.styleSheet)
						e.styleSheet.cssText = n;else {
						for (; e.firstChild;) e.removeChild(e.firstChild);
						e.appendChild(document.createTextNode(n))
					}
				}.bind(null, n), function() {
					m(n)
				});
			return r(t), function(e) {
					if (e) {
						if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return;
						r(t = e)
					} else i()
			}
		}
		e.exports = function(e, o) {
			if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document)
				throw new Error("The style-loader cannot be used in a non-browser environment");
			(o = o || {}).attrs = "object" == typeof o.attrs ? o.attrs : {}, o.singleton || "boolean" == typeof o.singleton || (o.singleton = l()), o.insertInto || (o.insertInto = "head"), o.insertAt || (o.insertAt = "bottom");
			var s = p(e, o);
			return h(s, o), function(e) {
					for (var t = [], n = 0; n < s.length; n++) {
						var r = s[n];
						(i = u[r.id]).refs--, t.push(i)
					}
					e && h(p(e, o), o);
					for (n = 0; n < t.length; n++) {
						var i;
						if (0 === (i = t[n]).refs) {
							for (var a = 0; a < i.parts.length; a++) i.parts[a]();
							delete u[i.id]
						}
					}
			}
		};
		var E,
			A = (E = [], function(e, t) {
				return E[e] = t, E.filter(Boolean).join("\n")
			});
		function T(e, t, n, r) {
			var i = n ? "" : r.css;
			if (e.styleSheet)
				e.styleSheet.cssText = A(t, i);else {
				var a = document.createTextNode(i),
					o = e.childNodes;
				o[t] && e.removeChild(o[t]), o.length ? e.insertBefore(a, o[t]) : e.appendChild(a)
			}
		}
	}, function(e, t) {
		e.exports = function(e) {
			var t = "undefined" != typeof window && window.location;
			if (!t)
				throw new Error("fixUrls requires window.location");
			if (!e || "string" != typeof e) return e;
			var i = t.protocol + "//" + t.host,
				a = i + t.pathname.replace(/\/[^\/]*$/, "/");
			return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(e, t) {
				var n,
					r = t.trim().replace(/^"(.*)"$/, function(e, t) {
						return t
					}).replace(/^'(.*)'$/, function(e, t) {
						return t
					});
				return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(r) ? e : (n = 0 === r.indexOf("//") ? r : 0 === r.indexOf("/") ? i + r : a + r.replace(/^\.\//, ""), "url(" + JSON.stringify(n) + ")")
			})
		}
	}, function(e, t) {
		var a,
			n;
		a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = {
			rotl : function(e, t) {
				return e << t | e >>> 32 - t
			},
			rotr : function(e, t) {
				return e << 32 - t | e >>> t
			},
			endian : function(e) {
				if (e.constructor == Number) return 16711935 & n.rotl(e, 8) | 4278255360 & n.rotl(e, 24);
				for (var t = 0; t < e.length; t++) e[t] = n.endian(e[t]);
				return e
			},
			randomBytes : function(e) {
				for (var t = []; 0 < e; e--) t.push(Math.floor(256 * Math.random()));
				return t
			},
			bytesToWords : function(e) {
				for (var t = [], n = 0, r = 0; n < e.length; n++, r += 8) t[r >>> 5] |= e[n] << 24 - r % 32;
				return t
			},
			wordsToBytes : function(e) {
				for (var t = [], n = 0; n < 32 * e.length; n += 8) t.push(e[n >>> 5] >>> 24 - n % 32 & 255);
				return t
			},
			bytesToHex : function(e) {
				for (var t = [], n = 0; n < e.length; n++) t.push((e[n] >>> 4).toString(16)), t.push((15 & e[n]).toString(16));
				return t.join("")
			},
			hexToBytes : function(e) {
				for (var t = [], n = 0; n < e.length; n += 2) t.push(parseInt(e.substr(n, 2), 16));
				return t
			},
			bytesToBase64 : function(e) {
				for (var t = [], n = 0; n < e.length; n += 3)
					for (var r = e[n] << 16 | e[n + 1] << 8 | e[n + 2], i = 0; i < 4; i++) 8 * n + 6 * i <= 8 * e.length ? t.push(a.charAt(r >>> 6 * (3 - i) & 63)) : t.push("=");
				return t.join("")
			},
			base64ToBytes : function(e) {
				e = e.replace(/[^A-Z0-9+\/]/gi, "");
				for (var t = [], n = 0, r = 0; n < e.length; r = ++n % 4) 0 != r && t.push((a.indexOf(e.charAt(n - 1)) & Math.pow(2, -2 * r + 8) - 1) << 2 * r | a.indexOf(e.charAt(n)) >>> 6 - 2 * r);
				return t
			}
		}, e.exports = n
	}, function(e, t) {
		e.exports = function(e) {
			return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children || (e.children = []), Object.defineProperty(e, "loaded", {
					enumerable : !0,
					get : function() {
						return e.l
					}
				}), Object.defineProperty(e, "id", {
					enumerable : !0,
					get : function() {
						return e.i
					}
				}), e.webpackPolyfill = 1), e
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = function(e, t) {
			if (t = t.split(":")[0], !(e = +e)) return !1;
			switch (t) {
			case "http":
			case "ws":
				return 80 !== e;case "https":
			case "wss":
				return 443 !== e;case "ftp":
				return 21 !== e;case "gopher":
				return 70 !== e;case "file":
				return !1
			}
			return 0 !== e
		}
	}, function(e, t, n) {
		"use strict";
		var i = Object.prototype.hasOwnProperty;
		function o(e) {
			return decodeURIComponent(e.replace(/\+/g, " "))
		}
		t.stringify = function(e, t) {
			t = t || "";
			var n = [];
			for (var r in "string" != typeof t && (t = "?"), e) i.call(e, r) && n.push(encodeURIComponent(r) + "=" + encodeURIComponent(e[r]));
			return n.length ? t + n.join("&") : ""
		}, t.parse = function(e) {
			for (var t, n = /([^=?&]+)=?([^&]*)/g, r = {}; t = n.exec(e);) {
				var i = o(t[1]),
					a = o(t[2]);
				i in r || (r[i] = a)
			}
			return r
		}
	}, function(e, t, n) {
		"use strict";n.r(t);
		var r = function(t) {
			var n = this.constructor;
			return this.then(function(e) {
				return n.resolve(t()).then(function() {
					return e
				})
			}, function(e) {
				return n.resolve(t()).then(function() {
					return n.reject(e)
				})
			})
		};
		function u(e) {
			return (u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			})(e)
		}
		var i = setTimeout;
		function a() {
		}
		function o(e) {
			if (!(this instanceof o))
				throw new TypeError("Promises must be constructed via new");
			if ("function" != typeof e)
				throw new TypeError("not a function");
			this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], h(e, this)
		}
		function s(n, r) {
			for (; 3 === n._state;) n = n._value;
			0 !== n._state ? (n._handled = !0, o._immediateFn(function() {
				var e = 1 === n._state ? r.onFulfilled : r.onRejected;
				if (null !== e) {
					var t;
					try {
						t = e(n._value)
					} catch (e) {
						return void d(r.promise, e)
					} l(r.promise, t)
				} else (1 === n._state ? l : d)(r.promise, n._value)
			})) : n._deferreds.push(r)
		}
		function l(t, e) {
			try {
				if (e === t)
					throw new TypeError("A promise cannot be resolved with itself.");
				if (e && ("object" === u(e) || "function" == typeof e)) {
					var n = e.then;
					if (e instanceof o) return t._state = 3, t._value = e, void f(t);
					if ("function" == typeof n) return void h((r = n, i = e, function() {
							r.apply(i, arguments)
						}), t)
				}
				t._state = 1, t._value = e, f(t)
			} catch (e) {
				d(t, e)
			} var r,
				i
		}
		function d(e, t) {
			e._state = 2, e._value = t, f(e)
		}
		function f(e) {
			2 === e._state && 0 === e._deferreds.length && o._immediateFn(function() {
				e._handled || o._unhandledRejectionFn(e._value)
			});
			for (var t = 0, n = e._deferreds.length; t < n; t++) s(e, e._deferreds[t]);
			e._deferreds = null
		}
		function c(e, t, n) {
			this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.promise = n
		}
		function h(e, t) {
			var n = !1;
			try {
				e(function(e) {
					n || (n = !0, l(t, e))
				}, function(e) {
					n || (n = !0, d(t, e))
				})
			} catch (e) {
				if (n) return;
				n = !0, d(t, e)
			}
		}
		o.prototype.catch = function(e) {
			return this.then(null, e)
		}, o.prototype.then = function(e, t) {
			var n = new this.constructor(a);
			return s(this, new c(e, t, n)), n
		}, o.prototype.finally = r, o.all = function(t) {
			return new o(function(r, i) {
				if (!t || void 0 === t.length)
					throw new TypeError("Promise.all accepts an array");
				var a = Array.prototype.slice.call(t);
				if (0 === a.length) return r([]);
				var o = a.length;
				function s(t, e) {
					try {
						if (e && ("object" === u(e) || "function" == typeof e)) {
							var n = e.then;
							if ("function" == typeof n) return void n.call(e, function(e) {
									s(t, e)
								}, i)
						}
						a[t] = e, 0 == --o && r(a)
					} catch (e) {
						i(e)
					}
				}
				for (var e = 0; e < a.length; e++) s(e, a[e])
			})
		}, o.resolve = function(t) {
			return t && "object" === u(t) && t.constructor === o ? t : new o(function(e) {
				e(t)
			})
		}, o.reject = function(n) {
			return new o(function(e, t) {
				t(n)
			})
		}, o.race = function(i) {
			return new o(function(e, t) {
				for (var n = 0, r = i.length; n < r; n++) i[n].then(e, t)
			})
		}, o._immediateFn = "function" == typeof setImmediate && function(e) {
			setImmediate(e)
		} || function(e) {
			i(e, 0)
		}, o._unhandledRejectionFn = function(e) {
			"undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
		};
		var p = o,
			g = function() {
				if ("undefined" != typeof self) return self;
				if ("undefined" != typeof window) return window;
				if ("undefined" != typeof global) return global;
				throw new Error("unable to locate global object")
			}();
		g.Promise ? g.Promise.prototype.finally || (g.Promise.prototype.finally = r) : g.Promise = p;n(90), n(121);
		function m(e) {
			return (m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
				return typeof e
			} : function(e) {
				return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
			})(e)
		}
		var _ = function(e, t) {
			return (_ = Object.setPrototypeOf || {
				__proto__ : []
			} instanceof Array && function(e, t) {
				e.__proto__ = t
			} || function(e, t) {
				for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
			})(e, t)
		};
		function v(e, t) {
			function n() {
				this.constructor = e
			}
			_(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
		}
		function y(e, t, n, r) {
			var i,
				a = arguments.length,
				o = a < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
			if ("object" === ("undefined" == typeof Reflect ? "undefined" : m(Reflect)) && "function" == typeof Reflect.decorate)
				o = Reflect.decorate(e, t, n, r);else
				for (var s = e.length - 1; 0 <= s; s--) (i = e[s]) && (o = (a < 3 ? i(o) : 3 < a ? i(t, n, o) : i(t, n)) || o);
			return 3 < a && o && Object.defineProperty(t, n, o), o
		}
		var E = n(37),
			A = n.n(E),
			T = n(65),
			R = n.n(T),
			I = n(1),
			S = n.n(I),
			b = navigator.userAgent.toLowerCase();
		function w() {
		}
		var C = function() {
			function e() {
			}
			return Object.defineProperty(e, "pid", {
					get : function() {
						return ++e.id
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(e, "safari", {
					get : function() {
						var e = /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.test(b) || /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.test(b);
						return {
							alike : e,
							mseSupported : e && /version\/1\d/i.test(b)
						}
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(e, "trident", {
					get : function() {
						return {
							alike : /Trident/i.test(b)
						}
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(e, "edge", {
					get : function() {
						return {
							alike : /edge/i.test(b),
							b16299 : /(\s|^)edge\/16.16299(\s|$)/i.test(b)
						}
					},
					enumerable : !0,
					configurable : !0
				}), e.id = 0, e
		}();
		function D() {
			return function(e, t, n) {
				if (!n || "function" != typeof n.value)
					throw new TypeError("Only methods can be decorated with @autobind. <" + t + "> is not a method!");
				return {
					configurable : !0,
					get : function() {
						var e = n.value.bind(this);
						return Object.defineProperty(this, t, {
								value : e,
								configurable : !0,
								writable : !0
							}), e
					}
				}
			}
		}
		var O,
			M,
			N = function() {
				function e(e) {
					this.player = e, this.playerReceivedBytes = 0, this.video = document.createElement("video"), this.video.volume = this.player.storage.volume
				}
				return Object.defineProperty(e.prototype, "currentReceivedBytes", {
						get : function() {
							return this.playerReceivedBytes
						},
						enumerable : !0,
						configurable : !0
					}), e
			}(),
			L = function(i) {
				function e(e, t, n) {
					var r = i.call(this, e) || this;
					return r.player = e, r.data = t, r.reload = n, r.type = "FLV", r.load(), r
				}
				return v(e, i), Object.defineProperty(e.prototype, "typedInfo", {
						get : function() {
							return {
								type : this.type,
								video : this.video,
								player : this.flvPlayer
							}
						},
						enumerable : !0,
						configurable : !0
					}), e.prototype.load = function() {
						var e = {
							enableWorker : !1,
							accurateSeek : !0,
							seekType : this.data.seekType || "param",
							rangeLoadZeroStart : !1,
							lazyLoadMaxDuration : 100,
							lazyLoadRecoverDuration : 50,
							deferLoadAfterSourceOpen : !1,
							fixAudioTimestampGap : !1,
							reuseRedirectedURL : !0
						};
						(C.safari.alike || C.edge.alike || C.trident.alike) && (e.enableWorker = !1, e.lazyLoadMaxDuration = 100), S.a.LoggingControl.forceGlobalTag = !0, S.a.LoggingControl.enableVerbose = !1, this.flvPlayer = S.a.createPlayer(this.data.mediaDataSource, e), this.flvPlayer.attachMediaElement(this.video), this.flvPlayer.load(), this.registerFlvPlayerEvents()
					}, e.prototype.registerFlvPlayerEvents = function() {
						this.flvPlayer.on(S.a.Events.ERROR, this.onFlvMediaError), this.flvPlayer.on(S.a.Events.LOADING_COMPLETE, this.onLoadingComplete), this.flvPlayer.on(S.a.Events.HTTP_REQUEST_ENDED, this.onHttpRequestEnded), this.flvPlayer.on(S.a.Events.HTTP_HEADER_RECEIVED, this.onHttpHeaderReceived), this.flvPlayer.one(S.a.Events.AUDIO_FRAME_DECODED, this.onAudioFrameDecoded), this.flvPlayer.one(S.a.Events.VIDEO_FRAME_DECODED, this.onVideoFrameDecoded)
					}, e.prototype.onFlvMediaError = function() {
						for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
						this.player.eventQueues.push({
							type : "video_preload_error",
							timestamp : Date.now(),
							params : e
						}), this.player.defer.reject(this.player)
					}, e.prototype.onLoadingComplete = function(e) {
						try {
							var t = e.metadata.filesize,
								n = e.to,
								r = e.requestUrl;
							t && n && t !== n + 1 && this.player.reportQueues.push({
								type : "abnormal_segment_bytelength",
								value : t + "," + (n + 1) + "," + r,
								timestamp : Date.now()
							})
						} catch (e) {}
					}, e.prototype.onHttpRequestEnded = function(e, t) {
						this.playerReceivedBytes += e
					}, e.prototype.onHttpHeaderReceived = function(e, t) {
						this.player.reportQueues.push({
							type : "http_connection_time",
							value : e,
							timestamp : Date.now()
						})
					}, e.prototype.onAudioFrameDecoded = function(e) {
						this.player.reportQueues.push({
							type : "first_audio_frame_decoded",
							value : e - this.flvPlayer.createdTime,
							timestamp : Date.now()
						})
					}, e.prototype.onVideoFrameDecoded = function(e) {
						this.player.reportQueues.push({
							type : "first_video_frame_decoded",
							value : e - this.flvPlayer.createdTime,
							timestamp : Date.now()
						})
					}, e.prototype.clearInteraction = function() {
						this.flvPlayer.off(S.a.Events.ERROR, this.onFlvMediaError), this.flvPlayer.off(S.a.Events.LOADING_COMPLETE, this.onLoadingComplete), this.flvPlayer.off(S.a.Events.HTTP_REQUEST_ENDED, this.onHttpRequestEnded), this.flvPlayer.off(S.a.Events.HTTP_HEADER_RECEIVED, this.onHttpHeaderReceived), this.flvPlayer.off(S.a.Events.AUDIO_FRAME_DECODED, this.onAudioFrameDecoded), this.flvPlayer.off(S.a.Events.VIDEO_FRAME_DECODED, this.onVideoFrameDecoded)
					}, e.prototype.destroy = function() {
						this.clearInteraction(), this.flvPlayer.destroy()
					}, y([ D() ], e.prototype, "onFlvMediaError", null), y([ D() ], e.prototype, "onLoadingComplete", null), y([ D() ], e.prototype, "onHttpRequestEnded", null), y([ D() ], e.prototype, "onHttpHeaderReceived", null), y([ D() ], e.prototype, "onAudioFrameDecoded", null), y([ D() ], e.prototype, "onVideoFrameDecoded", null), e
			}(N),
			P = n(0),
			F = n.n(P);
		(M = O || (O = {}))[M.all = 0] = "all", M[M.ugc = 1] = "ugc", M[M.pgc = 2] = "pgc";
		var B = function() {
			function n() {
			}
			return Object.defineProperty(n, "details", {
					get : function() {
						return [ {
							value : 0,
							name : "??????",
							svip : null,
							type : O.all
						}, {
							value : 15,
							name : "?????? 360P",
							svip : !1,
							type : O.all
						}, {
							value : 16,
							name : "?????? 360P",
							svip : !1,
							type : O.all
						}, {
							value : 32,
							name : "?????? 480P",
							svip : !1,
							type : O.all
						}, {
							value : 48,
							name : "?????? 720P",
							svip : !1,
							type : O.all
						}, {
							value : 64,
							name : "?????? 720P",
							svip : !1,
							type : O.all
						}, {
							value : 74,
							name : "?????? 720P60",
							svip : !0,
							type : O.ugc
						}, {
							value : 80,
							name : "?????? 1080P",
							svip : !1,
							type : O.all
						}, {
							value : 112,
							name : "?????? 1080P+",
							svip : !0,
							type : O.pgc
						}, {
							value : 116,
							name : "?????? 1080P60",
							svip : !0,
							type : O.ugc
						} ]
					},
					enumerable : !0,
					configurable : !0
				}), Object.defineProperty(n, "mapping", {
					get : function() {
						return n.details.reduce(function(e, t) {
							return e[t.value] = t, e
						}, {})
					},
					enumerable : !0,
					configurable : !0
				}), n.normlize = function(e) {
					return {
							1 : 16,
							2 : 64,
							3 : 80,
							4 : 112,
							48 : 64
						}[e] || e
				}, n.isSuperQuality = function(e) {
					var t = n.mapping;
					return Boolean(t[e] && t[e].svip)
				}, n.gtNeedLogin = 32, n.gtNeedBigWidth = 64, n.gtNeedFlvSupported = 64, n
		}();
		function x(e) {
			if (null == e) return null;
			for (var t = document.cookie.split(";"), n = decodeURIComponent(e), r = 0; r < t.length; r++) {
				var i = t[r].trim().split("="),
					a = i[0],
					o = i[1];
				if (decodeURIComponent(a) === n) return decodeURIComponent(o)
			}
			return null
		}
		function k(e, t, n) {
			void 0 === n && (n = 365);var r = new Date,
				i = encodeURIComponent(e),
				a = encodeURIComponent(t);
			r.setTime(r.getTime() + 24 * n * 60 * 60 * 1e3), document.cookie = i + "=" + a + "; expires=" + r.toUTCString() + "; path=/; domain=.bilibili.com"
		}
		var U,
			Q,
			G,
			j,
			q = function(i) {
				function e(e, t, n) {
					var r = i.call(this, e) || this;
					return r.player = e, r.data = t, r.reload = n, r.type = "DASH", r.load(), r
				}
				return v(e, i), Object.defineProperty(e.prototype, "typedInfo", {
						get : function() {
							return {
								type : this.type,
								video : this.video,
								player : this.dashPlayer
							}
						},
						enumerable : !0,
						configurable : !0
					}), e.prototype.load = function() {
						var t = this,
							e = this.getAbrStrategyTest();
						!B.isSuperQuality(this.data.quality) && this.data.quality > B.gtNeedBigWidth && (this.data.quality = B.gtNeedBigWidth), this.dashPlayer = new F.a(this.video, {
							defaultQuality : this.data.quality,
							isAutoPlay : !1,
							isDynamic : !1,
							stableBufferTime : 80,
							abrStrategy : e
						}), this.dashPlayer.initialize(this.data.mediaDataSource.url).then(function() {
							t.dashPlayer && (t.dashPlayer.setAutoSwitchQualityFor("audio", !0), B.isSuperQuality(t.data.quality) || t.dashPlayer.setAutoSwitchQualityFor("video", !0), Boolean(x("DedeUserID")) ? t.dashPlayer.setAutoSwitchTopQualityFor("video", B.gtNeedBigWidth) : t.dashPlayer.setAutoSwitchTopQualityFor("video", B.gtNeedLogin), t.dashPlayer.getCorePlayer().setBufferAheadToKeep(120))
						}).catch(function(e) {
							t.player.eventQueues.push({
								type : "dash_player_error",
								timestamp : Date.now(),
								params : [ 4e3, "dashPlayer initializing error." ]
							}), t.player.defer.reject(t.player)
						}), this.dashPlayer.on(F.a.EVENTS.ERROR, this.onDashPlayerError), this.registerDashPlayerEvents()
					}, e.prototype.registerDashPlayerEvents = function() {
						var e = this.dashPlayer.getCorePlayer();
						e.on(F.a.EVENTS.FRAGMENT_LOADING_ABANDONED, this.onHttpRequestEnded), e.on(F.a.EVENTS.FRAGMENT_LOADING_COMPLETED, this.onHttpRequestEnded), e.on(F.a.EVENTS.FRAGMENT_LOADING_COMPLETED, this.onAudioFrameDecoded), e.on(F.a.EVENTS.FRAGMENT_LOADING_COMPLETED, this.onVideoFrameDecoded)
					}, e.prototype.onDashPlayerError = function(e) {
						this.player.eventQueues.push({
							type : "dash_player_error",
							timestamp : Date.now(),
							params : [ e.code, e.msg ]
						}), this.player.defer.reject(this.player)
					}, e.prototype.onHttpRequestEnded = function(e) {
						var t = e.request.bytesLoaded;
						t && (this.playerReceivedBytes += t)
					}, e.prototype.onHttpHeaderReceived = function(e) {
						var t = e.request.requestStartDate,
							n = e.request.headersReceivedDate;
						t && n && this.player.reportQueues.push({
							type : "http_connection_time",
							value : n.getTime() - t.getTime(),
							timestamp : Date.now()
						})
					}, e.prototype.onAudioFrameDecoded = function(e) {
						var t = e.request.index,
							n = e.request.mediaType;
						if (1 === t && "audio" === n) {
							var r = this.dashPlayer.getCorePlayer(),
								i = r.getInitializeDate(),
								a = e.request.requestEndDate;
							i && a && this.player.reportQueues.push({
								type : "first_audio_frame_decoded",
								value : a.getTime() - i.getTime(),
								timestamp : Date.now()
							}), r.off(F.a.EVENTS.FRAGMENT_LOADING_COMPLETED, this.onAudioFrameDecoded)
						}
					}, e.prototype.onVideoFrameDecoded = function(e) {
						var t = e.request.index,
							n = e.request.mediaType;
						if (1 === t && "video" === n) {
							var r = this.dashPlayer.getCorePlayer(),
								i = r.getInitializeDate(),
								a = e.request.requestEndDate;
							i && a && this.player.reportQueues.push({
								type : "first_video_frame_decoded",
								value : a.getTime() - i.getTime(),
								timestamp : Date.now()
							}), r.off(F.a.EVENTS.FRAGMENT_LOADING_COMPLETED, this.onVideoFrameDecoded)
						}
					}, e.prototype.clearInteraction = function() {
						var e = this.dashPlayer.getCorePlayer();
						e.off(F.a.EVENTS.FRAGMENT_LOADING_ABANDONED, this.onHttpRequestEnded), e.off(F.a.EVENTS.FRAGMENT_LOADING_COMPLETED, this.onHttpRequestEnded), e.off(F.a.EVENTS.FRAGMENT_LOADING_ABANDONED, this.onHttpHeaderReceived), e.off(F.a.EVENTS.FRAGMENT_LOADING_COMPLETED, this.onHttpHeaderReceived), e.off(F.a.EVENTS.FRAGMENT_LOADING_COMPLETED, this.onAudioFrameDecoded), e.off(F.a.EVENTS.FRAGMENT_LOADING_COMPLETED, this.onVideoFrameDecoded), this.dashPlayer.off(F.a.EVENTS.ERROR, this.onDashPlayerError)
					}, e.prototype.getAbrStrategyTest = function() {
						var e = [ F.a.STRING.ABR_DYNAMIC, F.a.STRING.ABR_BOLA, F.a.STRING.ABR_THROUGHPUT ],
							t = this.player.session,
							n = 0;
						if (t) try {
								var r = parseInt(("" + t).substr(-1), 10);
								4 < r ? n = 2 : 1 < r && (n = 1)
							} catch (e) {} return e[n]
					}, e.prototype.destroy = function() {
						this.clearInteraction(), this.dashPlayer.destroy()
					}, y([ D() ], e.prototype, "onDashPlayerError", null), y([ D() ], e.prototype, "onHttpRequestEnded", null), y([ D() ], e.prototype, "onHttpHeaderReceived", null), y([ D() ], e.prototype, "onAudioFrameDecoded", null), y([ D() ], e.prototype, "onVideoFrameDecoded", null), e
			}(N),
			V = function() {
				function e(e) {
					if (this.input = e, null == this.input)
						throw new Error("Input must not be null or undefined")
				}
				return Object.defineProperty(e.prototype, "element", {
						get : function() {
							return this.input.element || document.getElementById("bilibiliPlayer")
						},
						enumerable : !0,
						configurable : !0
					}), Object.defineProperty(e.prototype, "seasonType", {
						get : function() {
							return +this.input.season_type || 0
						},
						enumerable : !0,
						configurable : !0
					}), Object.defineProperty(e.prototype, "playerType", {
						get : function() {
							return +this.input.player_type || 0
						},
						enumerable : !0,
						configurable : !0
					}), Object.defineProperty(e.prototype, "aid", {
						get : function() {
							return +this.input.aid
						},
						enumerable : !0,
						configurable : !0
					}), Object.defineProperty(e.prototype, "cid", {
						get : function() {
							return +this.input.cid
						},
						enumerable : !0,
						configurable : !0
					}), Object.defineProperty(e.prototype, "enableSSLResolve", {
						get : function() {
							return void 0 === this.input.enable_ssl_resolve || Boolean(this.input.enable_ssl_resolve)
						},
						enumerable : !0,
						configurable : !0
					}), Object.defineProperty(e.prototype, "enableSSLStream", {
						get : function() {
							return void 0 === this.input.enable_ssl_stream || Boolean(this.input.enable_ssl_stream)
						},
						enumerable : !0,
						configurable : !0
					}), Object.defineProperty(e.prototype, "extraParams", {
						get : function() {
							return this.input.extra_params || ""
						},
						enumerable : !0,
						configurable : !0
					}), Object.defineProperty(e.prototype, "dashSymbol", {
						get : function() {
							return Boolean(this.input.dashSymbol)
						},
						enumerable : !0,
						configurable : !0
					}), e
			}(),
			K = function() {
				function e() {
					try {
						var e = (t = "bilibili_player_settings", window.localStorage && localStorage.getItem ? localStorage.getItem(t) : x(t));
						this.data = null == e ? {} : Object(JSON.parse(e))
					} catch (e) {
						this.data = {}
					} var t
				}
				return Object.defineProperty(e.prototype, "volume", {
						get : function() {
							try {
								return +this.data.video_status.volume || .66
							} catch (e) {
								return .66
							}
						},
						enumerable : !0,
						configurable : !0
					}), Object.defineProperty(e.prototype, "quality", {
						get : function() {
							try {
								return B.normlize(this.data.setting_config.defquality) || 0
							} catch (e) {
								return 0
							}
						},
						enumerable : !0,
						configurable : !0
					}), e
			}(),
			H = n(12),
			Y = n.n(H);
		(Q = U || (U = {})).interface = "interface.bilibili.com/v2/playurl?", Q.bangumi = "bangumi.bilibili.com/player/web_api/v2/playurl?", Q.bangumiS = "bangumi.bilibili.com/player/web_api/playurl?", (j = G || (G = {}))[j.network = 0] = "network", j[j.resolve = 1] = "resolve";
		var W = function() {
			function e(e) {
				this.player = e;var t = Y.a.CancelToken;
				this.cancelTokenSource = t.source()
			}
			return e.prototype.r = function(i, e, t) {
					var n,
						a = this,
						o = {
							params : i,
							resolve : e,
							reject : t
						},
						s = 3,
						r = this.player.ucl.__playinfo__;
					r && "object" == typeof r && (
					delete this.player.ucl.__playinfo__
					, r.session && (this.player.session = r.session, i.session = r.session), "object" == typeof r.data && (r = r.data), !this.player.state.allowFlv && r.format && -1 === r.format.indexOf("mp4") || (n = this.parse(r, {
						params : o.params,
						resolve : o.resolve,
						reject : w
					})));
					var u = function(e) {
						var n = e ? "http://api.bilibili.com/x/player/playurl" : "//api.bilibili.com/x/player/playurl",
							t = {
								avid : i.aid,
								cid : i.cid,
								qn : i.quality,
								type : i.type,
								otype : "json"
							};
						"number" == typeof i.fnver && (t.fnver = i.fnver, t.fnval = i.fnval, t.session = i.session);
						var r = Date.now();
						Y()({
							method : "get",
							url : n,
							responseType : "json",
							params : t,
							withCredentials : !0,
							cancelToken : a.cancelTokenSource.token
						}).then(function(e) {
							a.player.reportQueues.push({
								type : "api_playurl_done_time",
								value : Date.now() - r,
								timestamp : Date.now()
							});
							var t = a.parse(e.data, o, n);
							void 0 !== t && a.urlChecker(t, function(e) {
								return o.resolve(e)
							})
						}).catch(function(e) {
							if (a.player.reportQueues.push({
									type : "api_playurl_fail_time",
									value : Date.now() - r,
									timestamp : Date.now()
								}), /^https:/.test(n) || /^\/\//.test(n)) return s ? (s--, u()) : u(!0);
							o.reject(G.network, e.response && e.response.status && e.response.status.toString() || "", n)
						})
					};
					n ? this.urlChecker(n, function(e) {
						return o.resolve(e)
					}) : u()
				}, e.prototype.urlChecker = function(a, o) {
					var e = a.mediaDataSource && a.mediaDataSource.segments && a.mediaDataSource.segments[0] && a.mediaDataSource.segments[0].url;
					"dash" === a.mediaDataSource.type ? o(a) : "mp4" === a.mediaDataSource.type && a.mediaDataSource.url && a.mediaDataSource.url.match(/:\/\/ws\.acgvideo\.com\//) ? Y()({
						method : "get",
						url : a.mediaDataSource.url + "&get_url=1",
						responseType : "text",
						cancelToken : this.cancelTokenSource.token
					}).then(function(e) {
						a.mediaDataSource.url = e.data, o(a)
					}).catch(function() {
						o(a)
					}) : (C.safari.alike || C.trident.alike || C.edge.alike) && "flv" === a.mediaDataSource.type && e && e.match(/:\/\/ws\.acgvideo\.com\//) ? Y()({
						method : "get",
						url : e + "&get_url=1",
						responseType : "text",
						cancelToken : this.cancelTokenSource.token
					}).then(function(e) {
						var t = /\/\/(.*)?\/ws\.acgvideo\.com/.exec(e.data);
						if (t) {
							var n = t[1];
							if (a.mediaDataSource.segments)
								for (var r = 0; r < a.mediaDataSource.segments.length; r++) {
									var i = a.mediaDataSource.segments[r];
									i && i.url && (a.mediaDataSource.segments[r].url = i.url.replace(/\/\/ws\.acgvideo\.com/, "//" + n + "/ws.acgvideo.com"))
							}
						}
						o(a)
					}).catch(function() {
						o(a)
					}) : o(a)
				}, e.prototype.parse = function(e, i, t) {
					var a = {},
						n = e.data || e;
					if ((this.player.ucl.__playinfo__ = e).data && 0 !== e.code) {
						var r = e.code + ": " + e.message;
						i.reject(G.resolve, r, t)
					} else {
						if (!n.result) {
							if (void 0 === n.durl && void 0 === n.dash_mpd && void 0 === n.dash) {
								r = "Error";return n.error_text && (r = n.error_code + ": " + n.error_text), void i.reject(G.resolve, r, t)
							}
							n.result = "suee"
						}
						if ("suee" === n.result)
							if ("local" === n.from && "suee" === n.result) {
								if (void 0 === n.durl || n.durl && 0 !== n.durl.length) {
									var o = n.accept_format,
										s = n.accept_quality,
										u = n.accept_description,
										l = n.format;
									o && 0 !== o.length || (o = [ n.format ]), s && 0 !== s.length || (s = [ 2 ]);
									var d = "flv";
									n.format && -1 < n.format.indexOf("mp4") && (d = "mp4"), (n.dash_mpd || n.dash) && (d = "dash");
									var f = n.timelength,
										c = n.quality;
									a.type = d, a.duration = 0;
									var h = "http";
									if ("dash" === d) {
										if (a.duration = n.timelength || 0, a.url = n.dash_mpd || n.dash, i.params.enableSSLStream && a.url)
											if (h = "https", "string" == typeof a.url)
												a.url = a.url.replace(/http:\/\//g, "https://");else {
												var p = a.url,
													g = function(e) {
														return e && e.map && e.map(function(e) {
																return e.baseUrl && (e.baseUrl = e.baseUrl.replace(/http:\/\//g, "https://")), Array.isArray(e.backupUrl) && (e.backupUrl = e.backupUrl.map(function(e) {
																		return e.replace(/http:\/\//g, "https://")
																	})), e
															})
													};
												a.url.video = g(p.video), a.url.audio = g(p.audio)
										}
										i.params.enableSSLStream && (h = "https")
									} else if ("mp4" === d) {
										var m = n.durl[0],
											_ = [],
											v = m.url;
										i.params.enableSSLStream && -1 !== v.indexOf("acgvideo.com") && (h = "https", v = v.replace("http://", "https://")), m.backup_url && m.backup_url.forEach(function(e) {
											i.params.enableSSLStream && -1 !== e.indexOf("acgvideo.com") && (h = "https", e = e.replace("http://", "https://")), _.push(e)
										}), a.url = v, a.backupURL = _, a.duration = m.length
									} else a.segments = [], a.duration = 0, n.durl.forEach(function(e) {
											var t = e.url,
												n = [];
											i.params.enableSSLStream && -1 !== t.indexOf("acgvideo.com") && (h = "https", t = t.replace("http://", "https://")), e.backup_url && e.backup_url.forEach(function(e) {
												i.params.enableSSLStream && e.indexOf("acgvideo.com") && (h = "https", e = e.replace("http://", "https://")), n.push(e)
											});
											var r = {};
											r.duration = e.length, r.filesize = e.size, r.url = t, r.backupURL = n, a.duration += e.length, a.segments && a.segments.push(r)
										});
									return this.normlize({
										streamType : h,
										mediaDataSource : a,
										acceptFormat : o,
										acceptQuality : s,
										acceptDescription : u,
										timelength : f,
										quality : c,
										format : l
									})
								}
								i.reject(G.resolve, "Invalid durl", t)
							} else i.reject(G.resolve, "Unsupported video source: " + n.from, t);
						else
							"error" === n.result ? i.reject(G.resolve, "Resolve Error: " + n.message, t) : i.reject(G.resolve, "Resolve Error: result is " + n.result, t)
					}
				}, e.prototype.normlize = function(e) {
					return e && (e.quality && (e.quality = B.normlize(e.quality)), Array.isArray(e.acceptQuality) && (e.acceptQuality = e.acceptQuality.map(function(e) {
							return B.normlize(e)
						}))), e
				}, e.prototype.destroy = function() {
					this.cancelTokenSource.cancel()
				}, e
		}();
		function z() {
			var e = [ "webkit", "moz", "ms", "o" ];
			if ("hidden" in document) return "hidden";
			for (var t = 0; t < e.length; t++) {
				var n = e[t] + "Hidden";
				if (n in document) return n
			}
			return null
		}
		var X = function() {
				function e() {
					var n = this;
					this.promise = new Promise(function(e, t) {
						n.resolve = e, n.reject = t
					})
				}
				return e.prototype.then = function(e, t) {
						return this.promise.then(e, t)
					}, e.prototype.catch = function(e) {
						return this.promise.catch(e)
					}, e
			}(),
			J = n(38),
			Z = n.n(J),
			$ = {
				name : "core-player",
				version : "1.2.2",
				envMode : "production",
				gitHash : "2f0122a",
				lastModified : "2018-10-25T10:58:59.972Z"
			},
			ee = function() {
				function e(e) {
					this.rts = {
						playurl_start : 0,
						playurl_end : 0,
						loadmetadata_start : 0,
						loadmetadata_end : 0
					}, this.ccl = window, this.defer = new X, this.prefix = "bilibili-player", this.state = {
						fixTime : 0,
						lastVideoTime : 0,
						defQuality : 0,
						allowFlv : !1,
						errorPlayurl : !1,
						isBuffering : !1
					}, this.jnode = {}, this.eventQueues = [], this.reportQueues = [], this.session = R()(String((x("buvid3") || Math.floor(1e5 * Math.random()).toString(16)) + Date.now())), A.a.ref();try {
						this.ucl = window.parent && window.parent.document ? window.parent : window
					} catch (e) {
						this.ucl = window
					} this.config = new V(e), this.storage = new K, this.resolve = new W(this), this.container = this.config.element, this.init()
				}
				return Object.defineProperty(e, "metadata", {
						get : function() {
							return $
						},
						enumerable : !0,
						configurable : !0
					}), e.prototype.init = function() {
						this.attachFrameView(), this.detectAllowFlv(), this.getVideoData()
					}, e.prototype.attachFrameView = function() {
						var e;
						this.container.classList.add(this.prefix), this.container.insertAdjacentHTML("beforeend", '\n        <div class="' + (e = this.prefix) + '-area video-state-pause">\n            <div class="' + e + '-video-wrap">\n                <div class="' + e + '-video-state">\n                    <img class="' + e + '-video-state-buff" src="//static.hdslb.com/images/loading.gif">\n                </div>\n                <div class="' + e + '-video-panel">\n                    <div class="' + e + '-video-panel-image">\n                        <div class="' + e + '-video-panel-image-detail"></div>\n                    </div>\n                    <div class="' + e + '-video-panel-text"></div>\n                </div>\n                <div class="' + e + '-video-subtitle"></div>\n                <div class="' + e + '-video-bas-danmaku"></div>\n                <div class="' + e + '-video-adv-danmaku"></div>\n                <div class="' + e + '-video-danmaku"></div>\n                <div class="' + e + '-video"></div>\n                <div class="' + e + '-video-control-mask"></div>\n                <div class="' + e + '-video-control-wrap">\n                    <div class="' + e + '-video-control">\n                        <div class="' + e + '-video-control-top"></div>\n                        <div class="' + e + '-video-control-bottom">\n                            <div class="' + e + '-video-control-bottom-left"></div>\n                            <div class="' + e + '-video-control-bottom-center"></div>\n                            <div class="' + e + '-video-control-bottom-right"></div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="' + e + '-video-bottom-area">\n                <div class="' + e + '-video-sendbar"></div>\n            </div>\n        </div>\n        <div class="' + e + "-filter-wrap " + e + '-bas-danmaku"></div>\n    '), this.jnode.area = this.container.querySelector("." + this.prefix + "-area"), this.jnode.videoWrap = this.container.querySelector("." + this.prefix + "-video-wrap"), this.jnode.loadingPanel = this.container.querySelector("." + this.prefix + "-video-panel")
					}, e.prototype.detectAllowFlv = function() {
						C.safari.alike && !C.safari.mseSupported ? this.state.allowFlv = !1 : this.state.allowFlv = S.a.isSupported()
					}, e.prototype.visibilityChangeHandler = function() {
						var n = this,
							e = z();
						if (e) {
							var t = e.replace(/[H|h]idden/, "") + "visibilitychange",
								r = Date.now();
							document.addEventListener(t, function(e) {
								var t;
								(t = z()) && document[t] || (n.state.fixTime = Date.now() - r)
							})
						}
					}, e.prototype.getVideoData = function(e, t, a) {
						var o = this;
						if (!e) {
							var n = Boolean(x("DedeUserID")),
								r = x("CURRENT_QUALITY");
							e = this.storage.quality, null != r && +r !== e && k("CURRENT_QUALITY", e.toString()), e > B.gtNeedFlvSupported && !this.state.allowFlv && (e = B.gtNeedFlvSupported), !n && e > B.gtNeedLogin && (e = 0)
						}
						t || (t = this.state.allowFlv ? "" : "mp4"), this.state.defQuality = e;
						var i = {
								aid : this.config.aid,
								cid : this.config.cid,
								url : 1 <= this.config.seasonType ? U.bangumi : 1 === this.config.playerType ? U.bangumiS : U.interface,
								type : t,
								quality : e,
								enableSSLResolve : this.config.enableSSLResolve,
								enableSSLStream : this.config.enableSSLStream,
								extraParams : this.config.extraParams,
								session : this.session
							},
							s = Z.a.qs.parse(i.extraParams);
						s.qn = i.quality, this.config.dashSymbol && this.state.allowFlv && (i.fnver = s.fnver = 0, i.fnval = s.fnval = 16), this.config.seasonType && (s.season_type = this.config.seasonType), this.ucl.typeid && (s.tid = this.ucl.typeid), this.rts.playurl_start = Date.now(), this.eventQueues.push({
							type : "video_playurl_load",
							timestamp : Date.now()
						}), this.ucl && this.ucl.GrayManager && this.ucl.GrayManager.initialCallback && this.ucl.GrayManager.initialCallback("html5"), i.extraParams = Z.a.qs.stringify(s), this.resolve.r(i, function(e) {
							if (void 0 !== e && null !== e.mediaDataSource) {
								o.state.errorPlayurl = !1, o.rts.playurl_end = Date.now(), o.eventQueues.push({
									type : "video_playurl_loaded",
									timestamp : Date.now()
								});
								var t = "range";
								if ("flv" === e.mediaDataSource.type) {
									var n = e.mediaDataSource.segments;
									if (n)
										for (var r = 0; r < n.length; r++) {
											var i = n[r].url;
											if (i && i.match(/\/ws\.acgvideo\.com\//)) {
												t = "param";break
											}
									}
								}
								o.load({
									mediaDataSource : e.mediaDataSource,
									quality : e.quality,
									seekType : t
								}, a)
							} else o.state.errorPlayurl = !0, o.reportQueues.push({
									type : "video_media_error",
									timestamp : Date.now(),
									value : 4
								}), o.defer.reject(o)
						}, function(e, t, n) {
							o.state.errorPlayurl = !0, o.reportQueues.push({
								type : "video_media_error",
								timestamp : Date.now(),
								value : 4
							}), o.defer.reject(o)
						})
					}, e.prototype.load = function(e, t) {
						this.rts.loadmetadata_start = Date.now(), this.eventQueues.push({
							type : "video_media_load",
							timestamp : Date.now()
						}), "dash" === e.mediaDataSource.type ? this.sharedPlayer = new q(this, e, t) : this.sharedPlayer = new L(this, e, t);
						var n = this.container.querySelector("." + this.prefix + "-video");
						n && n.appendChild(this.sharedPlayer.video), this.addVideoListeners(), this.visibilityChangeHandler()
					}, e.prototype.addVideoListeners = function() {
						this.sharedPlayer && (this.sharedPlayer.video.addEventListener("play", this.onMediaPlay), this.sharedPlayer.video.addEventListener("pause", this.onMediaPause), this.sharedPlayer.video.addEventListener("canplay", this.onMediaCanPlay), this.sharedPlayer.video.addEventListener("loadedmetadata", this.onMediaLoadedMetadata), this.sharedPlayer.video.addEventListener("error", this.onMediaError)), this.jnode.videoWrap && this.jnode.videoWrap.addEventListener("click", this.onVideoWrapClick)
					}, e.prototype.onMediaPlay = function() {
						this.stopBufferingChecker(), this.dirtyBufferingChecker(), this.sharedPlayer && !this.sharedPlayer.video.seeking && this.jnode.area && this.jnode.area.classList.remove("video-state-pause")
					}, e.prototype.onMediaPause = function() {
						this.stopBufferingChecker(), this.sharedPlayer && !this.sharedPlayer.video.seeking && this.jnode.area && this.jnode.area.classList.add("video-state-pause")
					}, e.prototype.onMediaCanPlay = function() {
						this.sharedPlayer && this.sharedPlayer.video.removeEventListener("canplay", this.onMediaCanPlay), this.jnode.loadingPanel && (this.jnode.loadingPanel.style.display = "none"), this.eventQueues.push({
							type : "video_media_canplay",
							timestamp : Date.now()
						}), this.defer.resolve(this)
					}, e.prototype.onMediaLoadedMetadata = function() {
						this.rts.loadmetadata_end = Date.now(), this.eventQueues.push({
							type : "video_media_loaded",
							timestamp : Date.now()
						}), this.ucl && this.ucl.GrayManager && this.ucl.GrayManager.loadedCallback && this.ucl.GrayManager.loadedCallback("html5")
					}, e.prototype.onMediaEneded = function() {
						clearInterval(this.bufferingTimer)
					}, e.prototype.onMediaError = function() {
						this.defer.reject(this)
					}, e.prototype.onVideoWrapClick = function() {
						this.sharedPlayer && (this.sharedPlayer.video.paused ? this.sharedPlayer.video.play() : this.sharedPlayer.video.pause())
					}, e.prototype.dirtyBufferingChecker = function() {
						var t = this;
						this.bufferingTimer = window.setInterval(function() {
							if (t.sharedPlayer) {
								var e = t.state.lastVideoTime === t.sharedPlayer.video.currentTime;
								t.state.isBuffering !== e && (t.state.isBuffering = e, t.jnode.area && (t.state.isBuffering ? t.jnode.area.classList.add("video-state-buff") : t.jnode.area.classList.remove("video-state-buff"))), e || (t.state.lastVideoTime = t.sharedPlayer.video.currentTime)
							}
						}, 150)
					}, e.prototype.stopBufferingChecker = function() {
						clearInterval(this.bufferingTimer), this.jnode.area && this.jnode.area.classList.remove("video-state-buff")
					}, Object.defineProperty(e.prototype, "loadedmetadata", {
						get : function() {
							return this.defer
						},
						enumerable : !0,
						configurable : !0
					}), e.prototype.delivery = function() {
						return !this.state.errorPlayurl && this.sharedPlayer ? {
							session : this.session,
							typedInfo : this.sharedPlayer.typedInfo,
							defQuality : this.state.defQuality,
							eventQueues : this.eventQueues,
							reportQueues : this.reportQueues,
							playurlStartTime : this.rts.playurl_start,
							partialReceivedBytes : this.sharedPlayer.currentReceivedBytes,
							elapsed : {
								playurl : this.rts.playurl_end - this.rts.playurl_start,
								loadmetadata : this.rts.loadmetadata_end - this.rts.loadmetadata_start - this.state.fixTime
							},
							clearInteraction : this.clearInteraction.bind(this)
						} : null
					}, e.prototype.clearInteraction = function() {
						this.stopBufferingChecker(), this.resolve.destroy(), this.sharedPlayer && (this.sharedPlayer.clearInteraction(), this.sharedPlayer.video.removeEventListener("play", this.onMediaPlay), this.sharedPlayer.video.removeEventListener("pause", this.onMediaPause), this.sharedPlayer.video.removeEventListener("canplay", this.onMediaCanPlay), this.sharedPlayer.video.removeEventListener("loadedmetadata", this.onMediaLoadedMetadata), this.sharedPlayer.video.removeEventListener("error", this.onMediaError)), this.jnode.videoWrap && this.jnode.videoWrap.removeEventListener("click", this.onVideoWrapClick), A.a.unref()
					}, e.prototype.destroy = function() {
						this.clearInteraction(), this.sharedPlayer && this.sharedPlayer.destroy(), this.jnode.area && this.jnode.area.parentNode && this.jnode.area.parentNode.removeChild(this.jnode.area)
					}, y([ D() ], e.prototype, "onMediaPlay", null), y([ D() ], e.prototype, "onMediaPause", null), y([ D() ], e.prototype, "onMediaCanPlay", null), y([ D() ], e.prototype, "onMediaLoadedMetadata", null), y([ D() ], e.prototype, "onMediaEneded", null), y([ D() ], e.prototype, "onMediaError", null), y([ D() ], e.prototype, "onVideoWrapClick", null), e
			}();
		n.d(t, "CorePlayer", function() {
			return ee
		})
	} ])
});