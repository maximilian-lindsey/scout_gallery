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
			let galleryIamgePrevBtn = document.createElement('button');
			let galleryImage = document.createElement('img');
			let galleryIamgeNextBtn = document.createElement('button');
			let galleryControllsWrapper = document.createElement('div');
			let galleryControllsPrevBtn = document.createElement('button');
			let galleryControllsPaginationLabel = document.createElement('span');
			let galleryControllsNextBtn = document.createElement('button');
			// add current image and paginationLabel reference to state
			this.currentImage = galleryImage;
			this.paginationLabel = galleryControllsPaginationLabel;
			// add classes
			galleryRoot.className = 'gallery';
			galleryImageWrapper.className = 'gallery-images';
			galleryIamgePrevBtn.className = 'gallery-images-button mod-prev';
			galleryImage.className = 'gallery-images-image';
			galleryIamgeNextBtn.className = 'gallery-images-button mod-next';
			galleryControllsWrapper.className = 'gallery-controlls';
			galleryControllsPrevBtn.className = 'gallery-controlls-button mod-prev';
			galleryControllsPaginationLabel.className = 'gallery-controlls-pagination';
			galleryControllsNextBtn.className = 'gallery-controlls-button mod-next';
			// add content
			galleryIamgePrevBtn.textContent = 'previous';
			galleryImage.src = this.imageURLs[this.currentImageIndex];
			galleryIamgeNextBtn.textContent = 'next';
			galleryControllsPrevBtn.textContent = 'previous';
			this.paginationLabel.textContent = 'loading'
			galleryControllsNextBtn.textContent = 'next';
			// add inline styles
			galleryImage.style.minHeight = this.minHeight;
			// add event listeners
			galleryImage.onload = (event)=>{
				this.imageLoadComplete(event);
			}
			galleryImage.onerror = (event)=>{
				this.imageLoadError(event);
			}
			galleryIamgePrevBtn.addEventListener('click', (event)=>{
				this.getPreviousImage(event);
			});
			galleryIamgeNextBtn.addEventListener('click', (event)=>{
				this.getNextImage(event);
			});
			galleryControllsPrevBtn.addEventListener('click', (event)=>{
				this.getPreviousImage(event);
			});
			galleryControllsNextBtn.addEventListener('click', (event)=>{
				this.getNextImage(event);
			});
			// append nodes to dom
			galleryImageWrapper.appendChild(galleryImage);
			galleryImageWrapper.appendChild(galleryIamgePrevBtn);
			galleryImageWrapper.appendChild(galleryIamgeNextBtn);
			galleryControllsWrapper.appendChild(galleryControllsPrevBtn);
			galleryControllsWrapper.appendChild(galleryControllsPaginationLabel);
			galleryControllsWrapper.appendChild(galleryControllsNextBtn);
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
		this.currentImage.setAttribute('data-content', `: ${this.imageURLs[this.currentImageIndex]}`);
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
	const gallery = new Gallery('root', ['https://placebear.com/g/500/500', 'https://placebear.com/g/500/501', 'https://placebear.com/g/500/5/01', 'https://placebear.com/g/500/502', 'https://placebear.com/g/500/503'], 0);
}