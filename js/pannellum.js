/**
 * Creates hot spot element for the current scene.
 * @private
 * @param {Object} hs - The configuration for the hotspot
 */
function createHotSpot(hs) {
    // Make sure hot spot pitch and yaw are numbers
    hs.pitch = Number(hs.pitch) || 0;
    hs.yaw = Number(hs.yaw) || 0;

    var div = document.createElement('div');
    div.className = 'pnlm-hotspot-base'
    if (hs.cssClass)
        div.className += ' ' + hs.cssClass;
    else
        div.className += ' pnlm-hotspot pnlm-sprite pnlm-' + escapeHTML(hs.type);

    var span = document.createElement('span');
    if (hs.text)
        span.innerHTML = escapeHTML(hs.text);

    var a;
    if (hs.video) {
        var video = document.createElement('video'),
            p = hs.video;
        if (config.basePath && !absoluteURL(p))
            p = config.basePath + p;
        video.src = encodeURI(p);
        video.controls = true;
        video.style.width = hs.width + 'px';
        renderContainer.appendChild(div);
        span.appendChild(video);
    } else if (hs.image) {
        var p = hs.image;
        if (config.basePath && !absoluteURL(p))
            p = config.basePath + p;
        a = document.createElement('a');
        a.href = encodeURI(hs.URL ? hs.URL : p);
        a.target = '_self';
        span.appendChild(a);
        var image = document.createElement('img');
        image.src = encodeURI(p);
        image.style.width = hs.width + 'px';
        image.style.paddingTop = '5px';
        renderContainer.appendChild(div);
        a.appendChild(image);
        span.style.maxWidth = 'initial';
    } else if (hs.URL) {
        a = document.createElement('a');
        a.href = encodeURI(hs.URL);
        a.target = '_self';
        renderContainer.appendChild(a);
        div.style.cursor = 'pointer';
        span.style.cursor = 'pointer';
        a.appendChild(div);
    } else {
        if (hs.sceneId) {
            div.onclick = div.ontouchend = function() {
                if (!div.clicked) {
                    div.clicked = true;
                    loadScene(hs.sceneId, hs.targetPitch, hs.targetYaw, hs.targetHfov);
                }
                return false;
            };
            div.style.cursor = 'pointer';
            span.style.cursor = 'pointer';
        }
        renderContainer.appendChild(div);
    }

    if (hs.createTooltipFunc) {
        hs.createTooltipFunc(div, hs.createTooltipArgs);
    } else if (hs.text || hs.video || hs.image) {
        div.classList.add('pnlm-tooltip');
        div.appendChild(span);
        span.style.width = span.scrollWidth - 20 + 'px';
        span.style.marginLeft = -(span.scrollWidth - div.offsetWidth) / 2 + 'px';
        span.style.marginTop = -span.scrollHeight - 12 + 'px';
    }
    if (hs.clickHandlerFunc) {
        div.addEventListener('click', function(e) {
            hs.clickHandlerFunc(e, hs.clickHandlerArgs);
        }, 'false');
        div.style.cursor = 'pointer';
        span.style.cursor = 'pointer';
    }
    hs.div = div;
};
