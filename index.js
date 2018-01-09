var TelegramBot = require('node-telegram-bot-api'),
	telegram = new TelegramBot("517547367:AAEH4BuJQET-D_4w5UMd6o18KA-d49GmLxQ", { polling: true });
	var idList = [];
	var question_bank = [
		"1. Given the choice of anyone in the world, whom would you want as a dinner guest?",
		"2. Would you like to be famous? In what way?",
		"3. Before making a telephone call, do you ever rehearse what you are going to say? Why?",
		"4. What would constitute a “perfect” day for you?",
		"5. When did you last sing to yourself? To someone else?",
		"6.  If you were able to live to the age of 90 and retain either the mind or body of a 30-year-old for the last 60 years of your life, which would you want?",
		"7. Do you have a secret hunch about how you will die?",
		"8. Name three things you and your partner appear to have in common.",
		"9. For what in your life do you feel most grateful?",
		"10. If you could change anything about the way you were raised, what would it be?",
		"11. Take four minutes and tell your partner your life story in as much detail as possible.",
		"12. If you could wake up tomorrow having gained any one quality or ability, what would it be?",
		"13. If a crystal ball could tell you the truth about yourself, your life, the future or anything else, what would you want to know?",
		"14. Is there something that you’ve dreamed of doing for a long time? Why haven’t you done it?",
		"15. What is the greatest accomplishment of your life?",
		"16. What do you value most in a friendship?",
		"17. What is your most treasured memory?",
		"18. What is your most terrible memory?",
		"19. If you knew that in one year you would die suddenly, would you change anything about the way you are now living? Why?",
		"20. What does friendship mean to you?",
		"21. What roles do love and affection play in your life?",
		"22. Alternate sharing something you consider a positive characteristic of your partner. Share a total of five items.",
		"23. How close and warm is your family? Do you feel your childhood was happier than most other people’s?",
		"24. How do you feel about your relationship with your mother?",		
		"25. Make three true 'we' statements each. For instance, 'We are both in this room feeling ... '",
		"26. Complete this sentence: 'I wish I had someone with whom I could share ... '",
		"27. If you were going to become a close friend with your partner, please share what would be important for him or her to know.",
		"28. Tell your partner what you like about them; be very honest this time, saying things that you might not say to someone you’ve just met.",
		"29. Share with your partner an embarrassing moment in your life.",
		"30. When did you last cry in front of another person? By yourself?",
		"31. Tell your partner something that you like about them already.",
		"32. What, if anything, is too serious to be joked about?",
		"33. If you were to die this evening with no opportunity to communicate with anyone, what would you most regret not having told someone? Why haven’t you told them yet?",
		"34. Your house, containing everything you own, catches fire. After saving your loved ones and pets, you have time to safely make a final dash to save any one item. What would it be? Why?",
		"35. Of all the people in your family, whose death would you find most disturbing? Why?",
		"36. Share a personal problem and ask your partner’s advice on how he or she might handle it. Also, ask your partner to reflect back to you how you seem to be feeling about the problem you have chosen.",
		"You have finished the game! We will now reset the questions for you. Thanks for playing, and we hope you have become closer to your partner :) "
	];

past = "";
telegram.on("text", (message) => {
	if(message.text.indexOf("/test") === 0) {
		past = "";
		telegram.sendMessage(message.chat.id, "Hello world");
	} else if(message.text.indexOf("/next") === 0 && idList[message.chat.id] >= 35) {
		past = "";
		idList[message.chat.id] = -1;
		telegram.sendMessage(message.chat.id, question_bank[36]);
	} else if(message.text.indexOf("/start") === 0) {
		past= "";
		idList[message.chat.id] = 0;
		telegram.sendMessage(message.chat.id, question_bank[0]);
	} else if(message.text.indexOf("/next") === 0 && idList[message.chat.id] === undefined) {
		past = "";
		telegram.sendMessage(message.chat.id, "Either you need to press start, or, in our effort to fix some bugs, we have accidentally forgotten which question you were at. If it is the latter, please use '/jump' to return the game wherever you left off :) ");
	} else if(message.text.indexOf("/next") === 0) {
		past = "";
		idList[message.chat.id] += 1;
		telegram.sendMessage(message.chat.id, question_bank[idList[message.chat.id]]);
	} else if (message.text.indexOf("/jump") === 0) {
		past = "/jump";
		telegram.sendMessage(message.chat.id, "What question do you want to jump to?");
	} else if (past === "/jump") {
		num = parseInt(message.text) - 1;
		if(num != parseInt('h') && num < 37) {
			past = "";
			idList[message.chat.id] = parseInt(message.text) - 1;
			telegram.sendMessage(message.chat.id, question_bank[idList[message.chat.id]]);		
		} else {
			telegram.sendMessage(message.chat.id, "Invalid input. Please send a numeral between 1 and 36.");
		}
	} else {
		past = "";
	} 
});
