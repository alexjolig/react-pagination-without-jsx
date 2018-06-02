jQuery(document).ready(function($){
	
 class ImageGallery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
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

	render() {
		var postList = this.state.posts.map(function(post){
			return React.createElement('li', {key: post.index},
			  React.createElement('h2', {}, post.name),
			  React.createElement('a', {href:post.phone}, post.phone)
			)
		})

		return React.createElement('div', {}, 
			React.createElement('h1', {}, "Posts"),
			React.createElement('ul', {}, postList)
		);
	}
 }

	ReactDOM.render(
		React.createElement(ImageGallery, null),
		document.getElementById('root')
	);
});

