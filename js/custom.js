jQuery(document).ready(function($){
	
 class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
		posts: [],
		currentPage: 1,
		postsPerPage: 2
    };
	this.handleClick = this.handleClick.bind(this);
  }

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
	
	handleClick(event) {
		this.setState({
		  currentPage: Number(event.currentTarget.id) //using event.target would reference to child tag (a). So use event.currentTarget 
		});

		//this.setState({active: !this.state.active});
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
		
		return [
				React.createElement('div', {key: 'a', className: 'row'},
					React.createElement('ul', {key:'a'}, renderPosts)
				),
				React.createElement('div', {key: 'b', className: 'row'},
										React.createElement('ul', {className: 'pagination',key: 'b'}, renderPageNumbers)	
				)					
			];
	}
 }

	ReactDOM.render(
		React.createElement(ImageGallery, null),
		document.getElementById('root')
	);
});

