cc.game.once(cc.game.EVENT_ENGINE_INITED,function(){cc.js.mixin(cc.internal.eventManager,{pauseTarget(e,c){if(e instanceof cc._BaseNode){var a,n,i=this._nodeListenersMap[e._id];if(i)for(a=0,n=i.length;a<n;a++){const e=i[a];e._setPaused(!0),e._claimedTouches&&e._claimedTouches.includes(this._currentTouch)&&this._clearCurTouch()}if(!0===c){var s=e._children;for(a=0,n=s?s.length:0;a<n;a++)this.pauseTarget(s[a],!0)}}else cc.warnID(3506)}})});