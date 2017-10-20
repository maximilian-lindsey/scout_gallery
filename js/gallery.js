class Gallery {
	constructor(galleryContainerId = '', imageURLs = [], firstImage = 0, minHeight = '500px') {
		if(galleryContainerId == ''){
			throw Error('galleryContainerId is missing');
		}
		if(imageURLs.length == 0){
			throw Error('no imageURLs recieved');
		}
		if(firstImage >= imageURLs.length){
			throw Error('firstImage not found in imageURLs');
		}
		else{
			this.galleryContainerId = galleryContainerId;
			this.imageURLs = imageURLs;
			this.currentImageIndex = (firstImage >= 0) ? firstImage : 0;
			this.currentImage = null;
			this.paginationLabel = null;
			this.minHeight = minHeight;
			this.createDOMElements();
		}
	}

	createDOMElements(){
		const galleryContainer = document.getElementById(this.galleryContainerId);
		try {
			// create nodes
			let galleryRoot = document.createElement('div');
			let galleryImageWrapper = document.createElement('div');
			let galleryImage = document.createElement('img');
			let galleryControllsWrapper = document.createElement('div');
			let galleryPrevBtn = document.createElement('button');
			let galleryPaginationLabel = document.createElement('span');
			let galleryNextBtn = document.createElement('button');
			// add current image and paginationLabel reference to state
			this.currentImage = galleryImage;
			this.paginationLabel = galleryPaginationLabel;
			// add classes
			galleryRoot.className = 'gallery';
			galleryImageWrapper.className = 'gallery-images';
			galleryImage.className = 'gallery-images-image';
			galleryControllsWrapper.className = 'gallery-controlls';
			galleryPrevBtn.className = 'gallery-controlls-button';
			galleryPaginationLabel.className = 'gallery-controlls-pagination';
			galleryNextBtn.className = 'gallery-controlls-button';
			// add content
			galleryImage.src = this.imageURLs[this.currentImageIndex];
			galleryImage.style.minHeight = this.minHeight;
			galleryPrevBtn.textContent = '←';
			this.paginationLabel.textContent = 'loading'
			galleryNextBtn.textContent = '→';
			// add event listeners
			galleryImage.onload = (event)=>{
				this.imageLoadComplete(event);
			}
			galleryImage.onerror = (event)=>{
				this.imageLoadError(event);
			}
			galleryPrevBtn.addEventListener('click', (event)=>{
				this.getPreviousImage(event);
			});
			galleryNextBtn.addEventListener('click', (event)=>{
				this.getNextImage(event);
			});
			// append nodes to dom
			galleryImageWrapper.appendChild(galleryImage);
			galleryControllsWrapper.appendChild(galleryPrevBtn);
			galleryControllsWrapper.appendChild(galleryPaginationLabel);
			galleryControllsWrapper.appendChild(galleryNextBtn);
			galleryRoot.appendChild(galleryImageWrapper);
			galleryRoot.appendChild(galleryControllsWrapper);
			galleryContainer.appendChild(galleryRoot);
		} catch(e) {
			if(!galleryContainer){
				throw Error(`galleryContainer with id ${this.galleryContainerId} was not found`);
			}
		}
	}

	imageLoadComplete(event){
		this.updatePaginationLabel();
	}

	imageLoadError(event){
		this.currentImage.classList.add('mod-error');
		this.updatePaginationLabel();
	}

	updatePaginationLabel(text){
		this.paginationLabel.textContent = `${this.currentImageIndex + 1}/${this.imageURLs.length}`;
	}

	getPreviousImage(event){
		this.decreaseImageIndex();
		this.currentImage.src = this.imageURLs[this.currentImageIndex];
	}
	getNextImage(event){
		this.increaseImageIndex();
		this.currentImage.src = this.imageURLs[this.currentImageIndex];
	}

	increaseImageIndex(){
		if(this.currentImageIndex + 1 < this.imageURLs.length){
			this.currentImageIndex++;
		}
		else{
			this.currentImageIndex = 0;
		}
	}

	decreaseImageIndex(){
		if(this.currentImageIndex - 1 >= 0){
			this.currentImageIndex--;
		}
		else{
			this.currentImageIndex = this.imageURLs.length - 1;
		}
	}
}


window.onload = ()=>{
	const gallery = new Gallery('root', ['https://placebear.com/g/500/500/', 'https://placebear.com/g/500/501', 'https://placebear.com/g/500/502', 'https://placebear.com/g/500/503'], 0);
}