/* My daily-life texts (homework sheet, 17 Oct): 11 short texts with verbs and prepositions.
   NOTE: the sheet lists all verbs as „Слабые глаголы“ (weak verbs), but several are STRONG —
   treffen, finden, sitzen, tragen, waschen, lesen, kommen, schlafen, verlassen, einsteigen, aussteigen,
   anrufen, ausziehen. Every verb below shows its real type and its 1st · 2nd · 3rd form. */
window.TEXTS = window.TEXTS || [];
window.EXTRA_VERBS = (window.EXTRA_VERBS || []).concat([
 {de:'verlassen', en:'to leave (a place)'}, {de:'spazieren', en:'to walk / stroll'}, {de:'sich setzen', en:'to sit down'},
 {de:'einschalten', en:'to switch on'}, {de:'kontrollieren', en:'to check / control'}, {de:'beenden', en:'to finish / end'},
 {de:'spülen', en:'to wash up (dishes) / to rinse'}, {de:'schauen', en:'to watch / look'}, {de:'decken', en:'to set (the table)'},
 {de:'fühlen', en:'to feel'}, {de:'passieren', en:'to happen'}, {de:'zeigen', en:'to show'}, {de:'ausziehen', en:'to take off (clothes) / to move out'},
 {de:'aufräumen', en:'to tidy up'}, {de:'untersuchen', en:'to examine'}, {de:'reden', en:'to talk'}, {de:'sitzen', en:'to sit'}, {de:'legen', en:'to lay / put (down)'}
]);
const AL = 'My texts · Alltag (daily life)';
const NOTE_WEAK = (v) => `⚠️ The sheet calls these „weak“, but ${v} are STRONG — learn their 3 forms below.`;
TEXTS.push(
{id:'al-morgen', book:AL, ref:'Text 1', title:'Der Morgen — The morning', topic:'separable', lines:[
 "Am Morgen stehe ich um sieben Uhr auf. | In the morning I get up at seven o'clock.",
 "Ich dusche und ziehe mich an. | I shower and get dressed.",
 "Dann mache ich Frühstück in der Küche. | Then I make breakfast in the kitchen.",
 "Ich höre Musik und trinke Kaffee. | I listen to music and drink coffee.",
 "Danach räume ich die Küche auf. | After that I tidy up the kitchen.",
 "Um acht Uhr verlasse ich das Haus und gehe zur Arbeit. | At eight o'clock I leave the house and go to work."],
 words:["aufstehen||to get up","duschen||to shower","sich anziehen||to get dressed","machen||to make / do","hören||to hear / listen","trinken||to drink","aufräumen||to tidy up","verlassen||to leave (a place)","gehen||to go","das Frühstück|Frühstücke|breakfast","die Küche|Küchen|kitchen","in||in (in der Küche = in the kitchen)","zur||to the (zu der Arbeit = to work)","um||at (um acht Uhr = at eight o'clock)"],
 items:["m: Which verbs from this text are STRONG?|trinken, gehen, verlassen|duschen, machen, hören|aufräumen, duschen ## trinken – trank – getrunken · gehen – ging – ist gegangen · verlassen – verließ – verlassen"]},
{id:'al-supermarkt', book:AL, ref:'Text 2', title:'Im Supermarkt — In the supermarket', topic:'akkusativ', lines:[
 "Nach der Arbeit gehe ich in den Supermarkt. | After work I go to the supermarket.",
 "Ich kaufe Brot, Milch, Käse und Gemüse. | I buy bread, milk, cheese and vegetables.",
 "Ich suche eine Packung Kaffee und finde sie schnell. | I look for a packet of coffee and find it quickly.",
 "Dann lege ich alles in den Einkaufswagen. | Then I put everything in the shopping trolley.",
 "An der Kasse bezahle ich bar. | At the checkout I pay in cash.",
 "Ich nehme den Kassenzettel und packe die Einkäufe in meine Tasche. | I take the receipt and pack the shopping into my bag."],
 words:["kaufen||to buy","suchen||to look for","finden||to find","legen||to lay / put (down)","bezahlen||to pay","nehmen||to take","packen||to pack","der Supermarkt|Supermärkte|supermarket","die Packung|Packungen|packet / pack","der Einkaufswagen|Einkaufswagen|shopping trolley","die Kasse|Kassen|checkout / till","der Kassenzettel|Kassenzettel|receipt","die Einkäufe||shopping (things bought) (plural)","bar||in cash","in den||into the (direction → accusative)","an der||at the"],
 items:["m: finden is …|strong: fand – hat gefunden|weak: findete – hat gefindet ## "+"finden – fand – gefunden"]},
{id:'al-park', book:AL, ref:'Text 3', title:'Im Park — In the park', topic:'akkusativ', lines:[
 "Am Nachmittag gehe ich in den Park. | In the afternoon I go to the park.",
 "Das Wetter ist schön. | The weather is nice.",
 "Ich spaziere eine Stunde durch den Park. | I walk through the park for an hour.",
 "Dort treffe ich meine Freundin. | There I meet my friend.",
 "Wir sitzen auf einer Bank und reden über unsere Arbeit. | We sit on a bench and talk about our work.",
 "Dann machen wir ein Foto und gehen langsam nach Hause. | Then we take a photo and slowly go home."],
 words:["spazieren||to walk / stroll","treffen||to meet","sitzen||to sit","reden||to talk","machen||to make / do","der Nachmittag|Nachmittage|afternoon","das Wetter||weather","die Bank|Bänke|bench (also: die Bank, Banken = bank)","das Foto|Fotos|photo","durch||through (+ accusative: durch den Park)","über||about (reden über = to talk about)","nach Hause||(to) home"],
 items:["m: Ich spaziere durch ___ Park.|den|der|dem ## durch + accusative (DOGFU): der Park → durch den Park"]},
{id:'al-hause', book:AL, ref:'Text 4', title:'Zu Hause — At home', topic:'separable', lines:[
 "Am Abend bin ich zu Hause. | In the evening I am at home.",
 "Ich putze die Wohnung und räume mein Zimmer auf. | I clean the flat and tidy up my room.",
 "Dann koche ich das Abendessen. | Then I cook dinner.",
 "Mein Bruder arbeitet am Computer und hört Musik. | My brother works on the computer and listens to music.",
 "Nach dem Essen spülen wir das Geschirr. | After the meal we wash the dishes.",
 "Danach schauen wir zusammen einen Film. | After that we watch a film together."],
 words:["putzen||to clean","aufräumen||to tidy up","kochen||to cook","arbeiten||to work","hören||to hear / listen","spülen||to wash up (dishes) / to rinse","schauen||to watch / look","das Abendessen|Abendessen|dinner","das Geschirr||dishes","zu Hause||at home","am Computer||at / on the computer","nach dem Essen||after the meal"]},
{id:'al-cafe', book:AL, ref:'Text 5', title:'Im Café — In the café', topic:'moechten', lines:[
 "Am Samstag treffe ich meine Freundin im Café. | On Saturday I meet my friend in the café.",
 "Wir bestellen Kaffee und Kuchen. | We order coffee and cake.",
 "Ich frage die Kellnerin nach der Speisekarte. | I ask the waitress for the menu.",
 "Meine Freundin erzählt von ihrer Arbeit. | My friend talks about her work.",
 "Wir reden lange und lachen viel. | We talk for a long time and laugh a lot.",
 "Dann bezahlen wir die Rechnung und verlassen das Café. | Then we pay the bill and leave the café."],
 words:["treffen||to meet","bestellen||to order","fragen nach||to ask for","erzählen von||to tell about","reden||to talk","lachen||to laugh","bezahlen||to pay","verlassen||to leave (a place)","die Kellnerin|Kellnerinnen|waitress","die Speisekarte|Speisekarten|menu","die Rechnung|Rechnungen|bill","im||in the (in dem)"]},
{id:'al-wohnung', book:AL, ref:'Text 6', title:'Ein Einkauf für die Wohnung — Shopping for the flat', topic:'akkusativ', lines:[
 "Heute brauche ich einige Sachen für meine Wohnung. | Today I need a few things for my flat.",
 "Ich gehe in ein Geschäft und suche eine Lampe. | I go into a shop and look for a lamp.",
 "Ich frage einen Verkäufer nach dem Preis. | I ask a salesman about the price.",
 "Er zeigt mir eine schöne Lampe. | He shows me a nice lamp.",
 "Ich bezahle die Lampe und trage sie nach Hause. | I pay for the lamp and carry it home.",
 "Zu Hause stelle ich sie auf den Tisch. | At home I put it on the table."],
 words:["brauchen||to need","suchen||to look for","fragen||to ask","zeigen||to show","bezahlen||to pay","tragen||to wear / carry","stellen||to put (standing)","die Sache|Sachen|thing","das Geschäft|Geschäfte|shop","die Lampe|Lampen|lamp","der Verkäufer|Verkäufer|salesman","der Preis|Preise|price","für||for (+ accusative: für meine Wohnung)","auf den Tisch||onto the table"],
 items:["m: Ich frage ___ Verkäufer.|einen|ein|eine ## der Verkäufer is the object → einen"]},
{id:'al-arbeitstag', book:AL, ref:'Text 7', title:'Ein Arbeitstag — A working day', topic:'separable', lines:[
 "Ich arbeite von Montag bis Freitag. | I work from Monday to Friday.",
 "Am Morgen öffne ich das Büro. | In the morning I open the office.",
 "Ich schalte den Computer ein und kontrolliere meine E-Mails. | I switch on the computer and check my e-mails.",
 "Dann telefoniere ich mit einem Kunden. | Then I phone a customer.",
 "Um zwölf Uhr mache ich eine Pause. | At twelve o'clock I take a break.",
 "Nach der Pause arbeite ich weiter und beende meine Arbeit um fünf Uhr. | After the break I carry on working and finish my work at five o'clock."],
 words:["arbeiten||to work","öffnen||to open","einschalten||to switch on","kontrollieren||to check / control","telefonieren||to make a phone call","machen||to make / do","beenden||to finish / end","das Büro|Büros|office","der Kunde|Kunden|customer","die Pause|Pausen|break","von … bis||from … to","mit||with","weiter||further / on"]},
{id:'al-wochenende', book:AL, ref:'Text 8', title:'Am Wochenende — At the weekend', topic:'strong', lines:[
 "Am Sonntag habe ich frei. | On Sunday I am free (I have the day off).",
 "Ich schlafe lange und frühstücke zu Hause. | I sleep late and have breakfast at home.",
 "Danach wasche ich meine Kleidung und putze die Wohnung. | After that I wash my clothes and clean the flat.",
 "Am Nachmittag besuche ich meine Eltern. | In the afternoon I visit my parents.",
 "Wir trinken Tee und erzählen uns von der Woche. | We drink tea and tell each other about the week.",
 "Am Abend telefoniere ich mit meiner Schwester. | In the evening I phone my sister."],
 words:["schlafen||to sleep","frühstücken||to have breakfast","waschen||to wash","putzen||to clean","besuchen||to visit","trinken||to drink","erzählen||to tell","telefonieren||to make a phone call","die Kleidung||clothes","die Eltern||parents (plural)","frei haben||to have time off"],
 items:["m: Er ___ lange. (schlafen)|schläft|schlaft|schlafet ## a → ä: er schläft","m: Sie ___ ihre Kleidung. (waschen)|wäscht|wascht|wäschet ## a → ä: sie wäscht"]},
{id:'al-arzt', book:AL, ref:'Text 9', title:'Beim Arzt — At the doctor\'s', topic:'separable', lines:[
 "Heute fühle ich mich nicht gut. | Today I don't feel well.",
 "Ich rufe beim Arzt an und mache einen Termin. | I call the doctor's and make an appointment.",
 "Am Nachmittag gehe ich zur Praxis. | In the afternoon I go to the practice.",
 "Der Arzt fragt mich nach meinen Beschwerden. | The doctor asks me about my symptoms.",
 "Ich erzähle ihm, was passiert ist. | I tell him what happened.",
 "Dann untersucht er mich und erklärt mir alles. | Then he examines me and explains everything to me."],
 words:["sich fühlen||to feel","anrufen||to call (on the phone)","machen||to make / do","fragen nach||to ask about","erzählen||to tell","passieren||to happen","untersuchen||to examine","erklären||to explain","der Arzt|Ärzte|doctor","der Termin|Termine|appointment","die Praxis|Praxen|doctor's practice","die Beschwerden||symptoms / complaints (plural)","bei||at (beim Arzt = at the doctor's)"],
 items:["m: was passiert ist — why „ist“?|passieren takes ist in the Perfekt|it is a mistake ## passieren – passierte – ist passiert"]},
{id:'al-freunde', book:AL, ref:'Text 10', title:'Mit Freunden — With friends', topic:'akkusativ', lines:[
 "Am Freitag treffe ich meine Freunde. | On Friday I meet my friends.",
 "Wir sitzen zusammen in einem Restaurant. | We sit together in a restaurant.",
 "Wir bestellen Essen und Getränke. | We order food and drinks.",
 "Mein Freund erzählt einen Witz und alle lachen. | My friend tells a joke and everyone laughs.",
 "Nach dem Essen bezahlen wir die Rechnung. | After the meal we pay the bill.",
 "Dann gehen wir noch in eine Bar und reden über das Wochenende. | Then we go to a bar and talk about the weekend."],
 words:["treffen||to meet","sitzen||to sit","bestellen||to order","erzählen||to tell","lachen||to laugh","bezahlen||to pay","reden über||to talk about","das Getränk|Getränke|drink","der Witz|Witze|joke","alle||everyone","die Bar|Bars|bar","noch||also / still"]},
{id:'al-bus', book:AL, ref:'Text 11', title:'Im Bus — On the bus', topic:'separable', lines:[
 "Jeden Morgen fahre ich mit dem Bus zur Arbeit. | Every morning I go to work by bus.",
 "An der Haltestelle warte ich auf den Bus. | At the bus stop I wait for the bus.",
 "Wenn der Bus kommt, steige ich ein. | When the bus comes, I get on.",
 "Ich finde einen freien Platz und setze mich. | I find a free seat and sit down.",
 "Während der Fahrt lese ich eine Nachricht und höre Musik. | During the journey I read a message and listen to music.",
 "Nach zwanzig Minuten steige ich aus und gehe zur Arbeit. | After twenty minutes I get off and walk to work."],
 words:["fahren||to drive / go","warten auf||to wait for","kommen||to come","einsteigen||to get on / in","finden||to find","sich setzen||to sit down","lesen||to read","hören||to hear / listen","aussteigen||to get off / out","die Haltestelle|Haltestellen|stop (bus / tram)","der Platz|Plätze|seat / place","die Fahrt|Fahrten|journey / ride","die Nachricht|Nachrichten|message","mit dem Bus||by bus","während||during","wenn||when / if (verb goes to the end)"],
 items:["m: „Wenn der Bus kommt, steige ich ein.“ — why „steige ich“?|after a wenn-clause the verb comes first|it is a question ## The whole wenn-clause is position 1, so the verb steige is in position 2."]},
{id:'al-abend', book:AL, ref:'Text 12', title:'Ein ruhiger Abend — A quiet evening', topic:'separable', lines:[
 "Nach der Arbeit komme ich nach Hause. | After work I come home.",
 "Ich ziehe meine Schuhe aus und dusche. | I take off my shoes and have a shower.",
 "Dann koche ich etwas und decke den Tisch. | Then I cook something and set the table.",
 "Ich esse zu Abend und räume danach die Küche auf. | I have dinner and afterwards tidy up the kitchen.",
 "Später telefoniere ich mit meiner Freundin. | Later I phone my girlfriend.",
 "Um zehn Uhr mache ich das Licht aus und gehe ins Bett. | At ten o'clock I switch off the light and go to bed."],
 words:["kommen||to come","ausziehen||to take off (clothes) / to move out","duschen||to shower","kochen||to cook","decken||to set (the table)","essen||to eat","aufräumen||to tidy up","telefonieren||to make a phone call","ausmachen||to turn off","gehen||to go","der Schuh|Schuhe|shoe","das Licht|Lichter|light","das Bett|Betten|bed","zu Abend essen||to have dinner","ins Bett||to bed (in das Bett)"]}
);
// the homework sheet labels every verb as „weak“ — show the real type in each text
TEXTS.filter(t=>t.book===AL).forEach(t=>{ t.note = 'The homework sheet calls all these verbs „weak“ (Слабые глаголы). Check the coloured label next to each verb below: <b>STRONG</b> / <b>MIXED</b> verbs change their vowel in the 2nd and 3rd form (treffen – traf – getroffen), <b>WEAK</b> ones just add -te / ge-…-t (machen – machte – gemacht).'; });
