class Gallery {
	constructor(galleryContainerId = '', imageURLs = []) {
		if(galleryContainerId == ''){
			throw Error('galleryContainerId is missing');
		}
		if(imageURLs.length == 0){
			throw Error('no imageURLs recieved');
		}
		else{
			this.galleryContainerId = galleryContainerId;
			this.imageURLs = imageURLs;
			this.createDOMElements();
		}
	}

	createDOMElements(){
		const galleryContainer = document.getElementById(this.galleryContainerId);
		try {			
			let galleryRoot = document.createElement('div');			
			let galleryImageWrapper = document.createElement('div');
			let galleryImage = document.createElement('img');
			let galleryControllsWrapper = document.createElement('div');
			let galleryPrevBtn = document.createElement('button');
			let galleryPaginationLabel = document.createElement('span');
			let galleryNextBtn = document.createElement('button');

			galleryRoot.className = 'gallery';
			galleryImageWrapper.className = 'gallery-images';
			galleryImage.className = 'gallery-images-image';
			galleryControllsWrapper.className = 'gallery-controlls';
			galleryPrevBtn.className = 'gallery-controlls-button';			
			galleryPaginationLabel.className = 'gallery-controlls-pagination';			
			galleryNextBtn.className = 'gallery-controlls-button';

			galleryPrevBtn.textContent = '←';
			galleryPaginationLabel.textContent = `1/${this.imageURLs.length}`;
			galleryNextBtn.textContent = '→';

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
	
}


window.onload = ()=>{
	const gallery = new Gallery('root', ['https://placebear.com/g/500/500', 'https://placebear.com/g/500/501', 'https://placebear.com/g/500/502', 'https://placebear.com/g/500/503']);	
}