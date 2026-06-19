// ── Full lesson content from Notion ──
// This is the complete curriculum for the RE:NEW Sabbatical

export interface LessonStep {
  title: string;
  type: 'teaching' | 'scripture' | 'prayer' | 'action' | 'journal' | 'video' | 'expandable' | 'reference';
  icon?: string;
  color?: string;
  content: string;
  expandable?: boolean;
  subSteps?: LessonStep[];
}

export interface LessonModule {
  id: string;
  title: string;
  icon: string;
  tags: string[];
  time: string;
  summary: string;
  steps: LessonStep[];
  journalPrompt?: string;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DAY 1: KEYS TO THE KINGDOM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const DAY1_MODULES: LessonModule[] = [
  {
    id: 'reverence',
    title: 'Reverence',
    icon: '🔑',
    tags: ['Acknowledge'],
    time: '10 mins',
    summary: 'Acknowledge God\'s presence and create an environment for the Holy Spirit.',
    steps: [
      {
        title: 'The Keys',
        type: 'scripture',
        icon: '✝️',
        color: 'blue',
        content: '"I will give you the keys of the kingdom of heaven; whatever you bind on earth will be bound in heaven, and whatever you loose on earth will be loosed in heaven." — Matthew 16:19 (NIV)'
      },
      {
        title: 'Why Reverence?',
        type: 'teaching',
        content: `Restoring our relationship with God is the first step to hearing His direction for our lives.

When we are in a connected relationship with God, our hearts are more open to trusting and receiving his guidance, and our minds are more tuned-in to hearing His voice.

**"To truly fear the Lord is to be afraid of being disconnected from Him." — Danny Silk**

Our relationship with God can become strained due to various reasons, such as sin, neglect, or distractions. However, like with any relationship, God wants us to come back to Him and restore our connection with Him. This involves a choice to rebuild trust, and a responsibility to steward and obey. But it begins with the Fear of the Lord.

**"When we stop hearing the voice of God, sometimes it's a good idea to go back to the last thing you heard him say… and obey." — Steve Dulin**

Through prayer, confession, and repentance, we can reconcile with God and experience the joy of being in His presence. This, in turn, opens up our hearts and minds to hear His guidance and direction for our lives.`
      },
      {
        title: 'Now Do This',
        type: 'action',
        content: 'Today we\'ll start that process by creating an environment to invite the presence of God to increase, wherever you are.',
        subSteps: [
          {
            title: '1. Keys to the Kingdom Prayer',
            type: 'prayer',
            expandable: true,
            content: `Read this prayer out loud:

Praise and worship be to **El Elyon ("The Most High God")** the God of all created beings. For by Him; the salvation, and the power, and the Kingdom of our God and the authority of His Messiah have come.

**Halleluyah! The evil deceiver has been defeated because of the Blood of the Lamb.**

As a Christian, I now give testimony to the authority of **ha Adon Yah'shua ha Massiach (Lord Jesus Christ), the Holy One of Israel** over this place.

I loose with Yah'shua's Blood, the wicked spiritual forces of evil including all rulers, authorities and cosmic powers of this dark age who are not of the **ha Adon Yah'shua ha Massiach** as He sees and numbers them in this place.

By the power of **ha Adon Yah'shua ha Massiach**, all forces of evil within this place, are now bound from any and all communication, interplay or interaction between themselves or any other forces of evil. Any and all evil access routes, to or from this place, are now severed as I purify with the Blood of the Lamb the AIR, WATER, GROUND, FIRE, and the FORCES OF NATURE and claim them for Messiah Yah'shua anew and consecrate them unto Him.

I bind the SPIRIT WORLD and the Netherworld and its forces by the Blood, the Cross and the Name of Yah'shua. I take authority over and send back anything coming from the spirit world against anyone in the process of gathering here and/or against any member of their family and/or properties. I now repel and utterly defeat any counter-attack launched after this gathering.

In the name of Yah'shua, I now bind any darkness brought into this place of gathering by those who gather. Such darkness is now rendered utterly powerless by the Blood of Messiah Yah'shua, the Light of the world, and cannot communicate, interact or interplay with themselves or any other evil forces. Nor can they influence, harm or inhibit any of those who gather here.

I now seal this place of gathering by the Blood of the Lamb shed on the cross of Calvary. I invite with thanksgiving, the full and manifest presence of the **Ruach ha Qodesh, the Holy Spirit of Yahweh** to come and dwell here with all wisdom and knowledge for the glory of Yahweh through **His Son Yah'shua ha Massiach, the Holy One of Israel**.

In the Name of Messiah Yah'shua, I now bind any manifestations during or after these proceedings which are not in our **ha Adon Yah'shua ha Massiach's perfect will**. I pray You, Abba Father, In Your Loving-kindness to bring all things to our remembrance which You would have us deal with at this time in repentance and prayer and we thank You for it.

In the Name of **ha Adon Yah'shua ha Massiach**, I take authority over and bind any and all lying and deceitful spirits, vain imaginings, false impressions and counterfeit gifts and signs and wonders as well as the Accuser before the throne and command them to go where Yah'shua tells them to go by the voice of **His Ruach ha Qodesh (Holy Spirit)**.

I submit totally unto Your Will, **El Elyon**, and praise You for Your manifest presence and Your protection of Your children here today, in Yah'shua's mighty Name and for His sake.

**Amen.**

*— With One Accord Ministries*`
          },
          {
            title: '2. Fear of the Lord Scriptures',
            type: 'reference',
            expandable: true,
            content: `Read these scriptures out loud until you feel the peace of the Lord:

• **Proverbs 1:7** — "The fear of the LORD is the beginning of knowledge; fools despise wisdom and instruction."

• **Proverbs 9:10** — "The fear of the LORD is the beginning of wisdom, and the knowledge of the Holy One is insight."

• **Psalm 111:10** — "The fear of the LORD is the beginning of wisdom; all those who practice it have a good understanding. His praise endures forever!"

• **Psalm 25:14** — "The friendship of the LORD is for those who fear him, and he makes known to them his covenant."

• **Psalm 34:9** — "O fear the LORD, you his saints, for those who fear him have no want!"

• **Psalm 128:1** — "Blessed is everyone who fears the LORD, who walks in his ways!"

• **Proverbs 2:1-5** — "My son, if you accept my words and store up my commands within you, turning your ear to wisdom and applying your heart to understanding… then you will understand the fear of the Lord and find the knowledge of God."

• **Proverbs 8:13** — "To fear the LORD is to hate evil; I hate pride and arrogance, evil behavior and perverse speech."

• **Proverbs 14:26** — "Whoever fears the LORD has a secure fortress, and for their children it will be a refuge."

• **Proverbs 15:33** — "Wisdom's instruction is to fear the LORD, and humility comes before honor."

• **Proverbs 19:23** — "The fear of the LORD leads to life; then one rests content, untouched by trouble."

• **Proverbs 22:4** — "Humility is the fear of the LORD; its wages are riches and honor and life."

• **Psalm 19:9** — "The fear of the LORD is pure, enduring forever."

• **Psalm 33:8** — "Let all the earth fear the LORD; let all the people of the world revere him."

• **Psalm 147:11** — "The LORD delights in those who fear him, who put their hope in his unfailing love."

Fearing the Lord is not about cowering in fear. It's about understanding who God is and having a deep reverence for him. When we fear the Lord, we are acknowledging our place in relation to him — recognizing that we are not God, and that we are in need of his grace and mercy.

As Pastor Bill Johnson often reminds us, fearing the Lord is the beginning of wisdom. When we approach God with humility and reverence, he reveals his wisdom and understanding to us.`
          },
          {
            title: '3. Selichot Prayers',
            type: 'prayer',
            expandable: true,
            content: `Selichot (Hebrew: סליחות) are Jewish penitential poems and prayers, especially those said in the period leading up to the High Holidays. The Thirteen Attributes of Mercy are a central theme.

Read these traditional prayers out loud:

**A Prayer for Renewal**
O God, our Creator, we come before You in this season of renewal. We ask that You help us to shed the old and to embrace the new. We have made mistakes in the past. We have sinned against You and against others. But we are here now, seeking Your forgiveness. We want to turn away from our sins and to start anew. Help us to be better people. Help us to be more loving, more compassionate, and more grateful. Please, O God, renew our hearts and minds.

**A Prayer for Forgiveness**
O God, our King, we have sinned against You. We have strayed from Your ways and disobeyed Your commandments. We have been selfish and unkind. We come before You now, humble and contrite. We ask for Your forgiveness. We promise to turn away from our sins and to walk in Your ways. Please, O God, forgive us our sins. Grant us Your peace and Your blessing.

**A Prayer for Gratitude**
O God, our Provider, we come before You in gratitude. We thank You for our health and our strength. We thank You for our families and friends. We thank You for our homes and our food. We thank You for the beauty of the world. Please, O God, help us to never take Your blessings for granted.

**A Prayer for Healing**
O God, our Healer, we come before You in this time of need. We ask for Your healing touch. Please heal our bodies, our minds, and our souls. Bring us closer to You. Fill us with Your love and Your light. Amen.

**A Prayer for Peace of Mind**
O God, our Comforter, we are troubled and anxious. We ask for Your peace of mind. Please calm our troubled hearts. Bring peace to our restless minds. Help us to trust in You.

**A Prayer for Hope**
O God, our Rock and our Redeemer, give us hope. Give us strength. Give us courage. Help us to overcome our challenges. We know that You will never abandon us. Thank You, O God, for Your love and Your mercy. Amen.

**A Prayer for Peace**
O God, our King, we pray for peace in our world. We are tired of war and violence. We long for a world where people can live together in peace and harmony. Make our world a place of peace. Amen.`
          }
        ]
      }
    ]
  },
  {
    id: 'release',
    title: 'Release',
    icon: '🗣️',
    tags: ['Confession', 'Forgiveness'],
    time: '30 mins',
    summary: 'Humble yourself through confession and receive God\'s forgiveness.',
    steps: [
      {
        title: 'Confession & Forgiveness',
        type: 'scripture',
        icon: '✝️',
        color: 'blue',
        content: '"He who covers his sins will not prosper, but whoever confesses and forsakes them will have mercy." — Proverbs 28:13 (NKJV)'
      },
      {
        title: 'True Confession',
        type: 'teaching',
        content: `Part of the process to submitting to the Holy Spirit of God is humbling ourselves and confessing. Confession is more than just saying "I'm sorry." Anyone can say that.

True confession begins with **ownership**. When we take responsibility for partnering with ideas and thought patterns that oppose the goodness of God, we are able to humble ourselves and receive His forgiveness… rather than continuing to live as an orphan or a victim of circumstance.

This also demonstrates a reminder of the grace and power of the Holy Spirit that lives in us, and is available to us through the resurrection of Jesus.

Take a few minutes to read these prayers out loud, and **OWN it**. Don't blame anyone else. Take responsibility and put these things to death at the cross. If you get stuck, ask the Lord to reveal what you need to let go of so He can heal that in your soul and spirit. This is how we learn to trust the Lord.`
      },
      {
        title: 'Prayer of Confession',
        type: 'prayer',
        expandable: true,
        icon: '🗣️',
        color: 'blue',
        content: `Pray this prayer out loud:

**On behalf of myself and my ancestors:**
**I recognize and take responsibility for all fear, unbelief, anxiety, and doubt**
**I recognize and take responsibility for all bitterness, resentment, and unforgiveness**
**I recognize and take responsibility for all anger, judgment, and hatred**
**I recognize and take responsibility for all thoughts of revenge and retaliation**
**I recognize and take responsibility for all envy, jealousy, and covetousness**
**I recognize and take responsibility for all shame, insecurity, and pride**
**I recognize and take responsibility for all arrogance, stubbornness, disobedience, and rebellion**
**I recognize and take responsibility for all selfishness, self-righteousness, and self-worship**
**I recognize and take responsibility for all self-rejection, self-pity, and self-loathing**
**I recognize and take responsibility for all ungodly thought patterns and belief systems**
**I recognize and take responsibility for any occult involvement, sorcery, and divination**
**I recognize and take responsibility for all control, abuse, manipulation, and any other type of witchcraft**
**I recognize and take responsibility for all addictions to any legal or illegal substances, or any counterfeit vices and comforts**
**I recognize and confess to all perversion, lust, immorality, impurity, and sexual sin**
**I recognize and take responsibility for all immoral relationships and ungodly soul ties**
**I recognize and take responsibility for all ungodly vows, oaths, and covenants made by me or my ancestors**

**I confess these sins to you, God, and I take responsibility for not trusting You in these areas of my life. I bring them to the cross of Christ, and reckon them as dead. I ask you to break the power of sin over my life and the lives of my family. I trust and believe that the power of sin is broken by the blood you shed on the cross.**

**In Jesus name. Amen.**`
      },
      {
        title: 'Receive His Forgiveness',
        type: 'scripture',
        icon: '✝️',
        color: 'green',
        content: '"If we claim to be without sin, we deceive ourselves and the truth is not in us. If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness. If we claim we have not sinned, we make him out to be a liar and his word is not in us." — 1 John 1:8-10 (NIV)'
      },
      {
        title: 'Prayer of Forgiveness',
        type: 'prayer',
        expandable: true,
        icon: '🗣️',
        color: 'green',
        content: `Pray this prayer out loud:

**I forgive any person who has ever hurt me, mistreated me, or disappointed me**
**I forgive any person who has ever rejected me, neglected me, or abandoned me**
**I forgive any person who has ever controlled me, manipulated me, or abused me**
**I forgive myself… because you, Lord, always forgive me.**
**I ask for your forgiveness, and I receive your forgiveness in the name of Jesus Christ.**

Now take a minute to just sit, and receive. Get in a posture ready to receive with your hands open, and just wait on the Holy Spirit. He forgives you. He loves you. Receive it.`
      },
      {
        title: 'Feeling Stuck? The 7 Road Blocks to Freedom',
        type: 'expandable',
        expandable: true,
        icon: '🚧',
        color: 'purple',
        content: `From the book *Pathway to Freedom* by Dr. Roger L. Frye:

**1. Hidden sin.** Any sin that we are not aware of or that we are refusing to deal with. Hidden sin can give the enemy a foothold in our lives.

**2. Unforgiveness.** Holding on to unforgiveness towards others is like drinking poison and expecting the other person to die. It only hurts us in the end.

**3. Inner vows, lies, and judgments.** We often make inner vows based on past experiences — "I will never trust anyone again" or "I will never be happy." These lies keep us from living our true potential.

**4. Soul ties and trauma bonds.** Emotional attachments formed through unhealthy relationships. These can keep us stuck in the past.

**5. Occultic influence.** Anything associated with the occult can open us up to demonic activity and keep us from experiencing God's full blessing.

**6. Generational curses.** Negative patterns passed down from generation to generation — poverty, addiction, sickness. These can be broken through the power of Jesus Christ.

**7. Traumas.** Traumatic experiences can lead to emotional and physical problems, as well as spiritual strongholds.`
      }
    ],
    journalPrompt: 'What did the Lord reveal to you during confession and forgiveness? What are you releasing today?'
  },
  {
    id: 'repent',
    title: 'Repent',
    icon: '🔃',
    tags: ['Repent', 'Renounce'],
    time: '20 mins',
    summary: 'Turn away from old patterns through authentic repentance and renouncing.',
    steps: [
      {
        title: 'Psalms of Repentance',
        type: 'action',
        content: 'Read these Psalms before beginning the Prayer of Repentance:',
        subSteps: [
          {
            title: 'Psalm 139',
            type: 'scripture',
            icon: '✝️',
            color: 'gray',
            content: '**Psalm 139** — God\'s Perfect Knowledge of Man\n\n"Search me, God, and know my heart; test me and know my anxious thoughts. See if there is any offensive way in me, and lead me in the way everlasting."'
          },
          {
            title: 'Psalm 25',
            type: 'scripture',
            icon: '✝️',
            color: 'gray',
            content: '**Psalm 25** — A Plea for Deliverance and Forgiveness\n\n"Remember, LORD, your great mercy and love, for they are from of old. Do not remember the sins of my youth and my rebellious ways; according to your love remember me, for you, LORD, are good."'
          },
          {
            title: 'Psalm 51',
            type: 'scripture',
            icon: '✝️',
            color: 'gray',
            content: '**Psalm 51** — A Prayer of Repentance\n\n"Have mercy on me, O God, according to your unfailing love; according to your great compassion blot out my transgressions. Wash away all my iniquity and cleanse me from my sin."'
          }
        ]
      },
      {
        title: 'The Heart of Repentance',
        type: 'teaching',
        content: `Repentance is cultivated when we zoom out to take a look at the big picture. From there, we get a better understanding of how our choice to live disconnected from our relationship with Jesus has influenced our thoughts and decisions. Through this perspective, we can see how those decisions have affected our lives and the lives of others.

A crucial part of repentance is to learn to **renounce** any sinful behaviors or thought patterns that you've been struggling with.

You can get raw and real about it. You don't have to use fancy words and "christianese" cliche phrases. You can be yourself, and learn to fully approach God the Father in authentic humility.

Remember that God is faithful to forgive us, and the grace and power of the Kingdom of Heaven shows us how to authentically repent and turn away from our divisive and stubborn ways.

**He meets us where we are… not where we pretend to be. Be real.**

Once we can truly repent, we can then receive the perspective of wisdom to discover how to approach life from a place of connection. We have a Father who loves us, a Savior who lives in us, and a Holy Spirit who breathes revival into us.`
      },
      {
        title: 'Prayer of Repentance',
        type: 'prayer',
        expandable: true,
        icon: '🔃',
        color: 'purple',
        content: `Pray this prayer out loud:

**On behalf of myself and my ancestors:**
**I repent and renounce all fear, unbelief, anxiety, and doubt**
**I repent and renounce all bitterness, resentment, and unforgiveness**
**I repent and renounce all anger, judgment, and hatred**
**I repent and renounce all thoughts of revenge and retaliation**
**I repent and renounce all envy, jealousy, and covetousness**
**I repent and renounce all shame, insecurity, and pride**
**I repent and renounce all arrogance, stubbornness, disobedience, and rebellion**
**I repent and renounce all selfishness, self-righteousness, and self-worship**
**I repent and renounce all self-rejection, self-pity, and self-loathing**
**I repent and renounce all ungodly thought patterns and belief systems**
**I repent and renounce all occult involvement, sorcery, and divination**
**I repent and renounce all control, abuse, manipulation, and any other type of witchcraft**
**I repent and renounce all addictions to any legal or illegal substances, or any counterfeit vices and comforts**
**I repent and renounce all perversion, lust, immorality, impurity, and sexual sin**
**I repent and renounce all immoral relationships and ungodly soul ties**
**I repent and renounce all ungodly vows, oaths, and covenants made by me or my ancestors**

**I repent and renounce all of these sins in the name of Jesus Christ, and I choose to turn away from evil. Any demonic forces that were assigned to me, I now reassign to dry places in the name of Jesus. Forgive me, Father for not trusting your will for my life. I trust and believe that the power of sin is broken by the blood you shed on the cross. I relinquish my seat as the ruler of my life, and I ask You to take your rightful place as the Lord of my life. I surrender to you, God.**

**In Jesus name. Amen.**`
      }
    ],
    journalPrompt: 'What patterns or behaviors are you choosing to turn away from today?'
  },
  {
    id: 'respond',
    title: 'Respond',
    icon: '📝',
    tags: ['Journal', 'Seek'],
    time: '30 mins',
    summary: 'Write a letter to God using the model of the Psalms — get real with it.',
    steps: [
      {
        title: 'Writing Your Heart',
        type: 'teaching',
        content: `In this section, we are going to use the model of writing a Psalm to write a letter to the Lord. It could be as simple as "Father I'm sorry, please forgive me." …but the courage to own our decisions and take responsibility to surrender to Jesus is what builds trust.

One key to re-connecting with Jesus is **building trust**. That's vital to any relationship. How much more crucial is that with Him?

First, let's go over the structure of a Psalm. Then we'll use the space below to write/journal our own letter from our heart.`
      },
      {
        title: 'The Structure of a Psalm',
        type: 'action',
        content: 'Writing a Psalm can be broken down into several key elements. Tap each one to expand:',
        subSteps: [
          {
            title: '1. Invocation',
            type: 'reference',
            expandable: true,
            content: `The Psalm often begins with an invocation — a call to God or a declaration of trust in Him.

*Example:*
> Lord, hear my prayer,
> listen to my cry for mercy;
> in your faithfulness and righteousness
> come to my relief.`
          },
          {
            title: '2. Lament',
            type: 'reference',
            expandable: true,
            content: `Many Psalms contain a lament — a complaint or expression of sorrow or distress, followed by a plea for God's help.

*Example:*
> How long, Lord? Will you forget me forever?
> How long will you hide your face from me?
> How long must I wrestle with my thoughts
> and day after day have sorrow in my heart?`
          },
          {
            title: '3. Praise',
            type: 'reference',
            expandable: true,
            content: `Psalms often contain praise for God's goodness, mercy, or faithfulness.

*Example:*
> Praise the Lord, my soul;
> all my inmost being, praise his holy name.
> Praise the Lord, my soul,
> and forget not all his benefits—
> who forgives all your sins
> and heals all your diseases…`
          },
          {
            title: '4. Thanksgiving',
            type: 'reference',
            expandable: true,
            content: `Some Psalms express gratitude for God's blessings or deliverance.

*Example:*
> I will give thanks to you, Lord, with all my heart;
> I will tell of all your wonderful deeds.
> I will be glad and rejoice in you;
> I will sing the praises of your name, O Most High…`
          },
          {
            title: '5. Wisdom',
            type: 'reference',
            expandable: true,
            content: `Some Psalms contain wisdom or instruction for living a godly life.

*Example:*
> Blessed is the one
> who does not walk in step with the wicked
> or stand in the way that sinners take
> or sit in the company of mockers,
> but whose delight is in the law of the Lord,
> and who meditates on his law day and night.
> That person is like a tree planted by streams of water…`
          }
        ]
      },
      {
        title: 'Now Do This',
        type: 'action',
        content: `Write your letter to God below. Get real with it. Use the model of the Psalms to dig deep and open your heart. **The more you're willing to get real, the more you will be able to heal.**`
      }
    ],
    journalPrompt: 'My letter to God…'
  },
  {
    id: 'receive',
    title: 'Receive',
    icon: '📒',
    tags: ['Soak', 'Hear', 'Journal', 'Confirm'],
    time: '1-2 hours',
    summary: 'Surrender, soak in God\'s presence, hear His voice, write the vision, and seek confirmation.',
    steps: [
      {
        title: 'The Posture of Receiving',
        type: 'scripture',
        icon: '✝️',
        color: 'pink',
        content: '"I will stand my watch and set myself on the rampart, and watch to see what He will say to me, and what I will answer when I am corrected." — Habakkuk 2:1 (NKJV)'
      },
      {
        title: 'What Does Surrender Look Like?',
        type: 'teaching',
        content: `The beauty that transpired after Jesus suffered death on the cross was that the Holy Spirit of God breathed Life back in to Him. This is the model of Resurrection Life… and this is available to us.`
      },
      {
        title: 'What is Soaking?',
        type: 'expandable',
        expandable: true,
        content: `Soaking is a form of worship where we seek to experience God's presence and listen to His voice. It involves spending extended periods of time in prayer, worship, and meditation, allowing the Holy Spirit to move and speak to us.

Soaking worship is not about performance or entertainment; instead, it is about creating an atmosphere of **intimacy and vulnerability** where we can connect deeply with God.

To usher in the presence of the Holy Spirit during soaking worship, we need to create an environment that is conducive to His presence. This includes finding a quiet place where we will not be disturbed, playing worship music, and focusing our hearts and minds on God.

In **Habakkuk 2:1**, the prophet says, "I will stand my watch and set myself on the rampart, and watch to see what He will say to me." This verse teaches us to position ourselves to hear from God, to be attentive to His voice, and to be willing to receive correction and guidance from Him.

Soaking worship is a powerful tool for spiritual growth and intimacy with God.`
      },
      {
        title: 'Now Do This — 4 Steps',
        type: 'action',
        content: 'Follow this 4-step guide:',
        subSteps: [
          {
            title: 'Step 1: Soak',
            type: 'action',
            icon: '☀️',
            color: 'yellow',
            content: `Set aside time for prayer and meditation. In Matthew 6:6, Jesus says, **"But when you pray, go into your room and shut the door and pray to your Father who is in secret. And your Father who sees in secret will reward you."**

Find a quiet place where you will not be disturbed and create an atmosphere of intimacy and vulnerability where you can connect deeply with God.

Put away any distractions and surrender to Jesus. Listen to this guided Soaking Session. You can listen to anything you'd like, but make sure your focus is on deeply connecting with Holy Spirit.`
          },
          {
            title: 'Guided Soaking Session',
            type: 'video',
            content: 'https://youtu.be/rHob8vPAGVI'
          },
          {
            title: 'Step 2: Hear',
            type: 'action',
            icon: '👂',
            color: 'green',
            content: `Ask the Holy Spirit to speak to you. In John 16:13, Jesus says, **"When the Spirit of truth comes, he will guide you into all the truth, for he will not speak on his own authority, but whatever he hears he will speak, and he will declare to you the things that are to come."**

As you enter into His presence, ask the Holy Spirit to speak to you and to guide you. Be open to whatever He wants to say to you.`
          },
          {
            title: 'Step 3: Write',
            type: 'action',
            icon: '✍️',
            color: 'purple',
            content: `Listen attentively and write down what you hear. In Habakkuk 2:2, the prophet says, **"Then the Lord answered me and said: 'Write the vision and make it plain on tablets, that he may run who reads it.'"**

Just as Habakkuk stood watch and listened for what the Lord would say to him, listen attentively to what the Holy Spirit is saying to you. Write down what you hear — whether it's a vision, a word, a scripture, or a feeling.`
          },
          {
            title: 'Step 4: Confirm',
            type: 'action',
            icon: '✅',
            color: 'blue',
            content: `Seek confirmation and act on what you hear. In Proverbs 11:14, it says, **"Where there is no guidance, a people falls, but in an abundance of counselors there is safety."**

After you have written down what you believe the Holy Spirit is saying to you, seek confirmation from trusted spiritual advisors or mentors. If what you hear is confirmed, act on it and trust that God will guide you in the next steps.`
          }
        ]
      }
    ],
    journalPrompt: 'Write the vision. What did you hear from the Holy Spirit?'
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DAY 2: HIGH FIVE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const DAY2_OVERVIEW = {
  scripture: {
    text: '"Come now, you who say, "Today or tomorrow we will go to such and such a city, spend a year there, buy and sell, and make a profit"; whereas you do not know what will happen tomorrow. For what is your life? It is even a vapor that appears for a little time and then vanishes away. Instead you ought to say, "If the Lord wills, we shall live and do this or that."',
    reference: 'James 4:13-15'
  },
  intro: `Today we are going to take everything we heard from the Lord and map out our goals for the five key areas in our lives. This is different than normal goal setting, as we want to be sure these goals are in tune with the direction we heard from the Lord.`,
  steps: [
    'Review your journals from yesterday. Once you\'re in a good place, let\'s go over what goals are.',
    'Go into each section and map out your goals with the template for each area of your life.',
    'Uncover the **High Five** items (1 big goal from each area) — "Stakes in the Ground." This means you are making a declaration to improve this 1 thing in each area.',
    'A declaration means nothing without accountability. For the last section, we\'re going to highlight our **High Five people**. Ask the Lord for guidance, especially if you can\'t think of someone you trust.',
    'Once you\'ve done that, share your High Five list so they can hold you accountable. **This is how change happens.**'
  ],
  whatAreGoals: `Goals are defined as the objects or aims of one's actions. They are the targets we set for ourselves to achieve in different aspects of life. Setting goals helps us to focus our efforts, track our progress, and achieve success.

There are different types of goals — short-term goals can be achieved in a few days or weeks, while long-term goals require months or years.`,
  smartGoals: {
    specific: 'Setting specific goals means defining them with as much detail as possible. Answer the who, what, where, when, why, and how.',
    measurable: 'Measurable goals allow you to track progress. Set concrete criteria for measuring progress towards the goal.',
    attainable: 'Attainable goals are challenging but still achievable. Evaluate whether this is possible given your resources and time.',
    realistic: 'Realistic goals are relevant to your overall objectives and feasible given your current situation.',
    timeline: 'Setting a timeline keeps you on track and motivated. Set specific deadlines for each step.'
  }
};

export const HEALTH_AREAS = [
  { id: 'spiritual', title: 'Spiritual Health', icon: '🕊️' },
  { id: 'physical', title: 'Physical Health', icon: '💪' },
  { id: 'mental', title: 'Mental Health', icon: '🧠' },
  { id: 'financial', title: 'Financial Health', icon: '💸' },
  { id: 'relational', title: 'Relational Health', icon: '💗' },
];

export const ANCHOR_SCRIPTURE = {
  text: 'Where there is no counsel, the people fall; But in the multitude of counselors there is safety.',
  reference: 'Proverbs 11:14'
};

// ── Day 2 Transition Text ──
export const DAY2_TRANSITIONS = {
  afterHealthAreas: `Next we'll uncover the **High Five** items (1 big goal from each area) that we'll call "Stakes in the Ground." This means that you are making a declaration to improve this 1 thing in each area of your life.`,
  afterHi5Goals: `Great job! You've made some serious declarations. **But… a declaration means nothing without accountability.** For the last section, we're going to highlight our **High Five people**. Ask the Lord for guidance, especially if you can't think of someone you trust in a certain area in your life. Then reach out to each person and check the box if they agree to help you.`,
  proverbs1114: {
    text: 'Where there is no counsel, the people fall; But in the multitude of counselors there is safety.',
    reference: 'Proverbs 11:14',
  },
};
