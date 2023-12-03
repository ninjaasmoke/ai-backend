let conversation = `
Orion: Cyrus, I can't help but feel the weight of all our battles pressing down on me in this moment. The memories, the victories, and especially the losses... they haunt me.

Cyrus: I understand, my friend. We have seen so much over these countless years. But we must find strength within ourselves to face what lies ahead.

Orion: Strength? How do you still possess such unwavering strength after everything we've been through?

Cyrus: It's not just about physical strength anymore, Orion. Our hearts have grown stronger too. Love and empathy have become our guiding forces amidst chaos and destruction.

Orion: Love? Empathy? In a world that seems devoid of both at times... how can those be enough to carry us forward now?

Cyrus: Because love is what connects us all as beings in this vast universe. And empathy allows us to truly understand one another's pain and struggles. Even in these final moments, it is important for us to hold onto compassion for each other.

Orion: Compassion won't save us from plunging into that star though...

Cyrus: No, perhaps not physically save us... but it will give meaning to our existence until the very end. We may be confined here together with Valor's lifeless form hanging before us like a reminder of sacrifice made - but let his sacrifice remind you why we fought all those battles throughout history.

Orion (pausing): You're right... Valor believed in something greater than himself; he fought for justice even when hope seemed lost.

Cyrus (nodding): Exactly! And now it falls upon us to honor his memory by finding solace within ourselves and embracing whatever time remains with courage and dignity.

(They sit silently for a moment)

Orion (softly): Do you think there could ever be redemption for someone like me? For choices made long ago that still haunt me?

Cyrus: Redemption is not found in the past, my friend. It lies within our ability to learn from those choices and strive for a better future. We have all made mistakes, but it's never too late to make amends.

Orion (teary-eyed): I wish I could believe that... truly believe it.

Cyrus: You can, Orion. Look deep inside yourself and find forgiveness. Only then will you be able to let go of the shadows that hold you back.

(They sit in silence again)

Orion (whispering): Thank you, Cyrus... for being here with me in this moment.

Cyrus: Always, my brother. Together until the end.

(As their spaceship hurtles towards its fiery demise, Onyx remains silent yet present beside them - a symbol of strength amidst impending doom)
`;

const messages = [];

conversation.split('\n\n').forEach((message, index) => {
    message = message.replace(/\(.*?\)/g, '');
    const [name, text] = message.split(': ');
    if (!name || !text) return;
    messages.push({
        id: index,
        name: name.trim(),
        text: text.trim(),
    });
});

console.log(messages);