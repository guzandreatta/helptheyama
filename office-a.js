
document.onload = function() {
	document.getElementById('go').addEventListener('click', loadPredefinedPanorama, true);
	document.getElementById('go').click();

};


// Load the predefined panorama
function loadPredefinedPanorama(evt) {
	evt.preventDefault();

	// Loader
	var loader = document.createElement('div');
	loader.className = 'loader';

	// Panorama display
	var div = document.getElementById('container');
	div.style.height = '300px';

	var PSV = new PhotoSphereViewer({
		// Path to the panorama
		panorama: 'img/office-a-360.jpg',

		// Container
		container: div,

		// Deactivate the animation
		time_anim: false,

		// Display the navigation bar
		navbar: true,

		// Resize the panorama
		size: {
			width: '100%',
			height: '500px'
		},

		// HTML loader
		loading_html: loader,

		// Overlay
		overlay: {
			image: 'img/overlay.png',
			size: {
				width: '42px'
			},
			position: {
				x: 'right',
				y: 'top'
			}
		}
	});
}
