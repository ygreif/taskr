var TextInputWithFeedback = React.createClass({
    value: function() {
	return React.findDOMNode(this.refs.param).value.trim();
    },
    render: function() {
	var field = this.props.field.toString();
	var errors = this.props.errors.toString();
	return (
	     <div class={ "form-group" + errors ? "has-error has-feedback" : "" } onSubmit={this.props.callback} >
		<label class="control-label" for={ field }>{{ field }}</label>
		<input type="text" ref="param" class="form-control" id={ field } name={ field } placeholder={"Enter " + field } />
		<span class="help-block"> { errors } </span>
	    </div>
	);
    }
});

var SignupForm = React.createClass({
    handleSubmit: function(e) {
	e.preventDefault();
	payload = {
	    'username': this.refs.username.value(),
	    'password': this.refs.password.value(),
	    'email': this.refs.email.value()
	};
	console.log(payload);
	$.ajax({
            url: "/json/signup",
            dataType: 'json',
            type: 'POST',
            data: payload,
            success: function(data) {
		if (data["status"] == "invalid") {
		    this.setState( data["errors"] );
		} else {

		}
            }.bind(this),
            error: function(xhr, status, err) {
		console.error(this.props.url, status, err.toString());
            }.bind(this)
	});
    },
    getInitialState: function() {
	return {
	    usernameError: '',
	    emailError: '',
	    passwordError: ''
	};
    },
    render: function() {
	return (
	    <div class="SignupForm">
		<form role="form" class="signup" onSubmit={this.handleSubmit} >
		<TextInputWithFeedback field="username" errors={ this.state.usernameError } ref="username"/>
		<TextInputWithFeedback field="email" errors={ this.state.emailError } ref="email" />
		<TextInputWithFeedback field="password" errors={ this.state.passwordError } ref="password" />

		<button type="submit" class="btn btn-primary">Sign up</button>
		</form>
	    </div>
	);
    }
});

React.render(
  <SignupForm />,
  document.getElementById('content')
);