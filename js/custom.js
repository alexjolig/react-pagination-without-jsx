jQuery(document).ready(function($){
	
 class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		posts: [], //However its not relevant in this sample but I named the array posts. feel free to name it as you wish
		currentPage: 1,
		postsPerPage: 5
    };
	this.handleClick = this.handleClick.bind(this);
	this.changePage = this.changePage.bind(this);
  }

  //put AJAX request in componentDidMount() method
  componentDidMount() {

    $.ajax({
      url: "generated.json",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({posts: data});
		console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("", status, err.toString());
      }.bind(this)
    });	
  }
	
	//Handle click on page number list
	handleClick(event) {
		this.setState({
		  currentPage: Number(event.currentTarget.id) //using event.target would reference to child tag (a). So use event.currentTarget 
		});	
	}

	//Handle next and previous buttons
	changePage(event) {
		let newPage = 1;
		if(event.currentTarget.id === 'p-page') {
			newPage = this.state.currentPage > 1 ? this.state.currentPage - 1 : 1;
			this.setState({
			  currentPage: newPage
			});
		}
		else {
			let pageCount = this.state.posts.length / this.state.postsPerPage;			
			newPage = this.state.currentPage < pageCount ? this.state.currentPage + 1 : pageCount;
			this.setState({
			  currentPage: newPage
			});			
		}
	} 
	  
	render() {
		
		const { posts, currentPage, postsPerPage } = this.state;
		
        // Logic for displaying current posts
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);		

        const renderPosts = currentPosts.map((post, index) => {
			return React.createElement('li', {key: post.index},
			  React.createElement('h2', {}, post.name),
			  React.createElement('a', {href: post.phone}, post.phone)
			)
        });		
		
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
          pageNumbers.push(i);
        }

		const prevPage = React.createElement(
            'li', {	className: 'page-item',
					key:'p-page',
					id: 'p-page',
					onClick: this.changePage
				},
			React.createElement('a', {	className: 'page-link',
										href: '#'
									}, 'Previous'
			)
          );
		  
		const nextPage = React.createElement(
            'li', {	className: 'page-item',
					key:'n-page',
					id: 'n-page',
					onClick: this.changePage
				},
			React.createElement('a', {	className: 'page-link',
										href: '#'
									}, 'Next'
			)
          );		  
		
        const renderPageNumbers = pageNumbers.map(number => {
          return React.createElement(
            'li', {	className: 'page-item' + (currentPage === number ? ' active' : '') ,
					key:number,
					id: number,
					onClick: this.handleClick
				},
			React.createElement('a', {	className: 'page-link',
										href: '#'
									}, number
			)
          );
        });	
		
		//NOTE: return elements as array is added in react 16+
		return [
				React.createElement('div', {key: 'a', className: 'row'},
					React.createElement('ul', {key:'a'}, renderPosts)
				),
				React.createElement('div', {key: 'b', className: 'row'},
										React.createElement('ul', {className: 'pagination',key: 'b'}, 
										prevPage,
										renderPageNumbers,
										nextPage)	
				)					
			];
	}
 }

	ReactDOM.render(
		React.createElement(ImageGallery, null),
		document.getElementById('root')
	);
});

