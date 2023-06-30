jQuery(document).ready(() => {

	/******************/
	/*** START CHAT ***/
	/******************/


	// set visitor name
	let $userName = "Tom";

	// start chatbox
	jQuery("#start-chat").click((event) => {
		event.preventDefault();
		$userName = jQuery("#username").val();
		jQuery("#landing").slideUp(300);
		setTimeout(() => {
			jQuery("#start-chat").html("Continue chat")
		}, 300);
	});




	/*****************/
	/*** USER CHAT ***/
	/*****************/


	// Post a message to the board
	function $postMessage() {
		jQuery("#message").find("br").remove();
		let $message = jQuery("#message").html().trim(); // get text from text box
		//$message = $message.replace(/<div>/, "<br>").replace(/<div>/g, "").replace(/<\/div>/g, "<br>").replace(/<br>/g, " ").trim();
		if ($message) { // if text is not empty
			const html = `<div class="post post-user">${$message + timeStamp()}</span></div>`; // convert post to html
			jQuery("#message-board").append(html); // add post to board
			$scrollDown(); // stay at bottom of chat
			botReply($message);
		};
		jQuery("#message").empty();
	};

	// Chat input
	jQuery("#message").on("keyup", (event) => {
		if (event.which === 13) $postMessage(); // Use enter to send
	}).on("focus", () => {
		jQuery("#message").addClass("focus");
	}).on("blur", () => {
		jQuery("#message").removeClass("focus");
	});
	jQuery("#send").on("click", $postMessage);




	/**********************/
	/*** AUTO REPLY BOT ***/
	/**********************/


	function botReply(userMessage) {
		const reply = generateReply(userMessage);
		if (typeof reply === "string") postBotReply(reply);
		else reply.forEach((str) => postBotReply(str));
	};

	function generateReply(userMessage) {
		const message = userMessage.toLowerCase();
		let reply = [`Sorry, I don't understand you.`, `Please try again`];

		// Generate some different replies
		if (/^hi$|^hello|^howdy|^hoi|^hey|^ola/.test(message)) reply = [`Hi ${$userName}`, `What can I do for you?`];
		else if (/test/.test(message)) reply = [`Ok`, `Feel free to test as much as you want`];
		else if (/help|sos|emergency|support/.test(message)) reply = [`I am here to help.`, `What seems to be the problem?`];
		else if (/class\=\"fa/.test(message)) reply = [`I see you've found the smileys`, `Cool! <span class="far fa-grin-beam fa-2x"></span>`, `Did you need something?`];
		else if (/how|what|why/.test(message)) reply = userMessage + " what?";
		else if (/^huh+|boring|lame|wtf|pff/.test(message)) reply = [`<span class="far fa-dizzy fa-2x"></span>`, `I'm sorry you feel that way`, `How can I make it better?`];
		else if (/bye|ciao|adieu|salu/.test(message)) reply = [`Ok, bye :)`];
    else if (/enquire/.test(message)) reply = ['What would you like to know?'];

		return reply;
	};

	function postBotReply(reply) {
		const html = `<div class="post post-bot">${reply + timeStamp()}</div>`;
		const timeTyping = 500 + Math.floor(Math.random() * 2000);
		jQuery("#message-board").append(html);
		$scrollDown();
	};



	/******************/
	/*** TIMESTAMPS ***/
	/******************/


	function timeStamp() {
		const timestamp = new Date();
		const hours = timestamp.getHours();
		let minutes = timestamp.getMinutes();
		if (minutes < 10) minutes = "0" + minutes;
		const html = `<span class="timestamp">${hours}:${minutes}</span>`;
		return html;
	};



	/***************/
	/*** CHAT UI ***/
	/***************/


	// Back arrow button
	jQuery("#back-button").on("click", () => {
		jQuery("#landing").show();
	});


	// Menu - navigation
	jQuery("#nav-icon").on("click", () => {
		jQuery("#nav-container").show();
	});

	jQuery("#nav-container").on("mouseleave", () => {
		jQuery("#nav-container").hide();
	});

	jQuery(".nav-link").on("click", () => {
		jQuery("#nav-container").slideToggle(200);
	});

	// Clear history
	jQuery("#clear-history").on("click", () => {
		jQuery("#message-board").empty();
		jQuery("#message").empty();
	});

	// Sign out
	jQuery("#sign-out").on("click", () => {
		jQuery("#message-board").empty();
		jQuery("#message").empty();
		jQuery("#landing").show();
		jQuery("#username").val("");
		jQuery("#start-chat").html("Start chat");
	});



	/*********************/
	/*** SCROLL TO END ***/
	/*********************/


	function $scrollDown() {
		const $container = jQuery("#message-board");
		const $maxHeight = $container.height();
		const $scrollHeight = $container[0].scrollHeight;
		if ($scrollHeight > $maxHeight) $container.scrollTop($scrollHeight);
	}

    
	/***************/
	/*** EMOIJIS ***/
	/***************/


	// toggle emoijis
	jQuery("#emoi").on("click", () => {
		jQuery("#emoijis").slideToggle(300);
		jQuery("#emoi").toggleClass("fa fa-grin far fa-chevron-down");
	});

	// add emoiji to message
	jQuery(".smiley").on("click", (event) => {
		const $smiley = jQuery(event.currentTarget).clone().contents().addClass("fa-lg");
		jQuery("#message").append($smiley);
		jQuery("#message").select(); // ==> BUG: message field not selected after adding smiley !! 
	});

    jQuery("#open-chat-button").on("click", () => {
      document.getElementById("phone-wrapper").style.display = "block";
    	document.getElementById("open-chat-button").style.display = "none";
    });
    
    jQuery("#close-chat-button").on("click", () => {
    	document.getElementById("phone-wrapper").style.display = "none";
      document.getElementById("open-chat-button").style.display = "block";
  	});
    
});