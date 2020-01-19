const Discord = require("discord.js");
const _client = new Discord.Client({disableEveryone: true});
const prefix = (";");


_client.login(process.env.token);

_client.on("ready", ()=>{
    console.log(`${_client.user.tag} is opgestart!`);
    _client.user.setActivity("In de rewrite! Geen commando's gebruiken aub!");
})

_client.on("message", async (message) =>{
    if(message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();


    if (cmd == "ping"){
        message.channel.send("Aan het pingen...").then(sentMessage =>{
        sentMessage.edit(`Pong! De API latency is ${Math.round(_client.ping)}ms!`);
        })
    }

    if (cmd == "help"){
        message.channel.send("komt binnenkort! de dev Tytgamer is druk bezig met een embed daarvoor.")
    }

    if (cmd == "copy"){
        var msg = `${args.join(" ")}`;
        if(msg.includes("{delete}")) {msg = msg.replace("{delete}", ''); message.delete().catch(()=>{})};
        message.channel.send(msg)
    }

    if (cmd == "praat"){
        var msg = `${args.join(" ")}`;
        if(msg.includes("{delete}")) {msg = msg.replace("{delete}", ''); message.delete().catch(()=>{})};
        await message.guild.channels.get(kanaal).send(msg)
    }

    if (cmd == "voeruit"){
        if (message.author.id != 159717599993790464) return;
        if (!args[0]) return message.channel.send("Put your Code to Eval.");
        try {
            if (args.join(" ").toLowerCase().includes("token")) return;
            eval(args.join(" "));
        } catch (e) {
            return message.channel.send(e);
        }
    }

    if (cmd == "ban"){
        let memberToBan = message.mentions.members.first();
        let banReason = message.content.split(" ").splice(1);

        if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Hey, dat mag jij helemaal niet doen!")

        if(!banReason){
            message.reply("Je hebt geen reden aan de ban gegeven!");
        }
        if(!memberToBan){
            message.reply("Je hebt niemand gepingt! Ping de persoon die je wil bannen!")
            return;
        }
        if(message.guild.members.find('id', memberToBan.id)){
            memberToBan.ban(banReason);
            message.reply("De persoon is verbannen! :ok_hand:");
            return;
        }else{
            message.reply("Error! Is de persoon nog in de server?");
            return;
        }
    }

    if (cmd == "kick"){
        let memberToKick = message.mentions.members.first();
        let kickReason = message.content.split(" ").splice(1);

        if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("Hey, dat mag jij helemaal niet doen!")

        if(!kickReason){
            message.reply("Je hebt geen reden aan de ban gegeven!");
        }
        if(!memberToKick){
            message.reply("Je hebt niemand gepingt! Ping de persoon die je wil kicken!")
            return;
        }
        if(message.guild.members.find('id', memberToKick.id)){
            memberToKick.kick(kickReason);
            message.reply("De persoon is weg! :ok_hand:");
            return;
        }else{
            message.reply("Error! Is de persoon nog in de server?");
            return;
        }
    }
    

});

//Variabelen
var kanaal = "441664086560997381";