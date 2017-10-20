class Gallery {
	constructor(galleryContainerId = '', images = []) {
		if(galleryContainerId !== ''){
			this.galleryContainerId = galleryContainerId;
			this.images = images;
			this.createDOMElements();
		}
		else{
			throw Error('galleryContainerId is missing');
		}
	}

	createDOMElements(){
		const galleryContainer = document.getElementById(this.galleryContainerId);
		try {			
			let galleryRoot = document.createElement('div');
			galleryRoot.className = 'galleryroot';
			galleryContainer.appendChild(galleryRoot);
		} catch(e) {
			if(!galleryContainer){
				throw Error(`galleryContainer with id ${this.galleryContainerId} was not found`);
			}
		}
		
	}
	
}


window.onload = ()=>{
	const gallery = new Gallery('root');	
}