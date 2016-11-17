import '/imports/startup/server';

Meteor.startup(function(){
	process.env.MAIL_URL = "smtp://postmaster%40sandboxd9dfb64facd7458aa4c394eb11c6bd43.mailgun.org:b693a2e3847ed7e16a98a8b4b98d2711@smtp.mailgun.org:587";
});