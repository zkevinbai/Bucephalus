/**
 * Static data for Chinese Zodiac animals, elements, and meanings
 * Pre-fetched and stored for offline use
 */

// Animal information with emojis and meanings
export const ANIMAL_DATA = {
  Rat: {
    name: 'Rat',
    emoji: '🐭',
    order: 1,
    traits: ['clever', 'quick-witted', 'resourceful', 'adaptable'],
    personality: 'Rats are known for their intelligence and charm. They are quick thinkers, adaptable, and excellent at finding opportunities. Rats are natural leaders who can thrive in challenging situations.',
    strengths: ['Intelligence', 'Resourcefulness', 'Charm', 'Adaptability', 'Quick thinking'],
    weaknesses: ['Can be manipulative', 'Tendency to hoard', 'May lack patience']
  },
  Ox: {
    name: 'Ox',
    emoji: '🐂',
    order: 2,
    traits: ['diligent', 'dependable', 'strong', 'determined'],
    personality: 'Oxen are known for their strength, reliability, and methodical approach. They are hardworking, patient, and trustworthy. Oxen value tradition and are excellent at completing long-term projects.',
    strengths: ['Reliability', 'Patience', 'Strength', 'Determination', 'Loyalty'],
    weaknesses: ['Can be stubborn', 'May lack flexibility', 'Tendency to be overly cautious']
  },
  Tiger: {
    name: 'Tiger',
    emoji: '🐅',
    order: 3,
    traits: ['brave', 'confident', 'competitive', 'charismatic'],
    personality: 'Tigers are natural leaders with magnetic personalities. They are courageous, confident, and love challenges. Tigers are passionate and can inspire others with their enthusiasm.',
    strengths: ['Courage', 'Confidence', 'Charisma', 'Leadership', 'Passion'],
    weaknesses: ['Can be impulsive', 'May be too competitive', 'Tendency to take risks']
  },
  Rabbit: {
    name: 'Rabbit',
    emoji: '🐰',
    order: 4,
    traits: ['gentle', 'artistic', 'sensitive', 'diplomatic'],
    personality: 'Rabbits are known for their gentleness and artistic nature. They are sensitive, diplomatic, and value harmony. Rabbits have excellent taste and appreciate beauty in all forms.',
    strengths: ['Gentleness', 'Artistic talent', 'Diplomacy', 'Sensitivity', 'Taste'],
    weaknesses: ['Can be overly cautious', 'May avoid confrontation', 'Tendency to be moody']
  },
  Dragon: {
    name: 'Dragon',
    emoji: '🐲',
    order: 5,
    traits: ['ambitious', 'energetic', 'charismatic', 'innovative'],
    personality: 'Dragons are powerful, ambitious, and full of energy. They are natural leaders who inspire others. Dragons are innovative thinkers who aren\'t afraid to break conventions.',
    strengths: ['Ambition', 'Energy', 'Charisma', 'Innovation', 'Leadership'],
    weaknesses: ['Can be arrogant', 'May be impatient', 'Tendency to be demanding']
  },
  Snake: {
    name: 'Snake',
    emoji: '🐍',
    order: 6,
    traits: ['wise', 'intuitive', 'mysterious', 'elegant'],
    personality: 'Snakes are known for their wisdom and intuition. They are mysterious, elegant, and have deep insight. Snakes are thoughtful and prefer to observe before acting.',
    strengths: ['Wisdom', 'Intuition', 'Elegance', 'Insight', 'Thoughtfulness'],
    weaknesses: ['Can be secretive', 'May be jealous', 'Tendency to be suspicious']
  },
  Horse: {
    name: 'Horse',
    emoji: '🐴',
    order: 7,
    traits: ['energetic', 'independent', 'adventurous', 'cheerful'],
    personality: 'Horses are free-spirited and energetic. They love adventure and independence. Horses are cheerful, optimistic, and enjoy being in the spotlight.',
    strengths: ['Energy', 'Independence', 'Adventurous spirit', 'Optimism', 'Cheerfulness'],
    weaknesses: ['Can be impatient', 'May lack focus', 'Tendency to be restless']
  },
  Goat: {
    name: 'Goat',
    emoji: '🐐',
    order: 8,
    traits: ['gentle', 'artistic', 'peaceful', 'compassionate'],
    personality: 'Goats are gentle, artistic, and peace-loving. They are compassionate and value harmony. Goats have a strong aesthetic sense and appreciate beauty.',
    strengths: ['Gentleness', 'Artistic talent', 'Peacefulness', 'Compassion', 'Aesthetic sense'],
    weaknesses: ['Can be indecisive', 'May be too passive', 'Tendency to worry']
  },
  Monkey: {
    name: 'Monkey',
    emoji: '🐵',
    order: 9,
    traits: ['witty', 'intelligent', 'playful', 'curious'],
    personality: 'Monkeys are witty, intelligent, and playful. They are curious problem-solvers who love challenges. Monkeys are charming and can adapt to any situation.',
    strengths: ['Intelligence', 'Wit', 'Playfulness', 'Curiosity', 'Adaptability'],
    weaknesses: ['Can be mischievous', 'May lack discipline', 'Tendency to be restless']
  },
  Rooster: {
    name: 'Rooster',
    emoji: '🐓',
    order: 10,
    traits: ['confident', 'honest', 'hardworking', 'punctual'],
    personality: 'Roosters are confident, honest, and hardworking. They are punctual, organized, and value order. Roosters are natural perfectionists who pay attention to details.',
    strengths: ['Confidence', 'Honesty', 'Hard work', 'Organization', 'Attention to detail'],
    weaknesses: ['Can be critical', 'May be too perfectionist', 'Tendency to be blunt']
  },
  Dog: {
    name: 'Dog',
    emoji: '🐕',
    order: 11,
    traits: ['loyal', 'honest', 'responsible', 'protective'],
    personality: 'Dogs are loyal, honest, and responsible. They are protective of loved ones and value justice. Dogs are trustworthy friends who stand by their principles.',
    strengths: ['Loyalty', 'Honesty', 'Responsibility', 'Protectiveness', 'Trustworthiness'],
    weaknesses: ['Can be pessimistic', 'May be too cautious', 'Tendency to worry']
  },
  Pig: {
    name: 'Pig',
    emoji: '🐷',
    order: 12,
    traits: ['generous', 'diligent', 'compassionate', 'optimistic'],
    personality: 'Pigs are generous, diligent, and compassionate. They are optimistic and enjoy life\'s pleasures. Pigs are honest and value close relationships.',
    strengths: ['Generosity', 'Diligence', 'Compassion', 'Optimism', 'Honesty'],
    weaknesses: ['Can be naive', 'May be too trusting', 'Tendency to be materialistic']
  }
}

// Element information with meanings
export const ELEMENT_DATA = {
  Wood: {
    name: 'Wood',
    emoji: '🌳',
    characteristics: ['growth', 'renewal', 'vision', 'flexibility'],
    description: 'Wood represents growth, renewal, and expansion. It symbolizes upward movement, creativity, and the ability to adapt and flourish.',
    personality: 'Wood element individuals are visionary, creative, and adaptable. They are natural planners who think long-term and value growth and development.',
    strengths: ['Vision', 'Creativity', 'Adaptability', 'Growth mindset', 'Planning'],
    challenges: ['Can be too idealistic', 'May lack grounding', 'Tendency to overextend']
  },
  Fire: {
    name: 'Fire',
    emoji: '🔥',
    characteristics: ['passion', 'energy', 'transformation', 'charisma'],
    description: 'Fire represents passion, energy, and transformation. It symbolizes enthusiasm, leadership, and the power to inspire and motivate others.',
    personality: 'Fire element individuals are passionate, energetic, and charismatic. They are natural leaders who inspire others and bring excitement to any situation.',
    strengths: ['Passion', 'Energy', 'Charisma', 'Leadership', 'Inspiration'],
    challenges: ['Can be impulsive', 'May burn out quickly', 'Tendency to be impatient']
  },
  Earth: {
    name: 'Earth',
    emoji: '🌍',
    characteristics: ['stability', 'nourishment', 'reliability', 'practicality'],
    description: 'Earth represents stability, nourishment, and reliability. It symbolizes grounding, practicality, and the ability to provide support and security.',
    personality: 'Earth element individuals are stable, practical, and reliable. They are grounded, patient, and value security and tradition.',
    strengths: ['Stability', 'Reliability', 'Practicality', 'Patience', 'Security'],
    challenges: ['Can be too conservative', 'May resist change', 'Tendency to be stubborn']
  },
  Metal: {
    name: 'Metal',
    emoji: '⚙️',
    characteristics: ['discipline', 'strength', 'precision', 'analysis'],
    description: 'Metal represents discipline, strength, and precision. It symbolizes structure, organization, and the ability to cut through confusion.',
    personality: 'Metal element individuals are disciplined, strong, and precise. They are organized, analytical, and value efficiency and structure.',
    strengths: ['Discipline', 'Strength', 'Precision', 'Organization', 'Analysis'],
    challenges: ['Can be too rigid', 'May lack flexibility', 'Tendency to be critical']
  },
  Water: {
    name: 'Water',
    emoji: '💧',
    characteristics: ['wisdom', 'adaptability', 'intuition', 'flow'],
    description: 'Water represents wisdom, adaptability, and flow. It symbolizes intuition, depth, and the ability to navigate through life\'s challenges.',
    personality: 'Water element individuals are wise, adaptable, and intuitive. They are deep thinkers who value wisdom and can flow with life\'s changes.',
    strengths: ['Wisdom', 'Adaptability', 'Intuition', 'Depth', 'Flow'],
    challenges: ['Can be too emotional', 'May lack direction', 'Tendency to be indecisive']
  }
}

// Combined meanings for animal-element combinations
// This is a simplified version - in reality, there are 60 unique combinations
// We'll generate these dynamically based on the combination
export function getCombinedMeaning(animal, element) {
  const animalData = ANIMAL_DATA[animal]
  const elementData = ELEMENT_DATA[element]
  
  if (!animalData || !elementData) {
    return {
      combination: `${element} ${animal}`,
      description: `The ${element} ${animal} combines the characteristics of ${element.toLowerCase()} element with the ${animal.toLowerCase()} animal sign.`,
      personality: `This combination blends ${elementData.personality.toLowerCase()} with ${animalData.personality.toLowerCase()}`,
      traits: [...elementData.characteristics, ...animalData.traits]
    }
  }
  
  // Generate a combined description
  const descriptions = {
    'Wood Rat': 'The Wood Rat combines intelligence with growth-oriented thinking. This combination creates a visionary problem-solver who can see opportunities others miss.',
    'Fire Rat': 'The Fire Rat combines intelligence with passion. This combination creates an energetic innovator who brings enthusiasm to every challenge.',
    'Earth Rat': 'The Earth Rat combines intelligence with stability. This combination creates a practical strategist who builds lasting foundations.',
    'Metal Rat': 'The Metal Rat combines intelligence with precision. This combination creates an analytical thinker who excels at structured problem-solving.',
    'Water Rat': 'The Water Rat combines intelligence with wisdom. This combination creates an intuitive strategist who can navigate complex situations.',
    
    'Wood Ox': 'The Wood Ox combines reliability with growth. This combination creates a steady builder who works methodically toward long-term goals.',
    'Fire Ox': 'The Fire Ox combines reliability with passion. This combination creates a determined worker who brings energy to traditional values.',
    'Earth Ox': 'The Earth Ox combines reliability with stability. This combination creates the ultimate foundation-builder who values security above all.',
    'Metal Ox': 'The Metal Ox combines reliability with discipline. This combination creates a highly structured worker who excels at systematic approaches.',
    'Water Ox': 'The Water Ox combines reliability with adaptability. This combination creates a flexible traditionalist who can adjust while maintaining core values.',
    
    'Wood Tiger': 'The Wood Tiger combines courage with growth. This combination creates a bold innovator who leads with vision and energy.',
    'Fire Tiger': 'The Fire Tiger combines courage with passion. This combination creates an intensely charismatic leader who inspires through action.',
    'Earth Tiger': 'The Earth Tiger combines courage with stability. This combination creates a grounded leader who balances boldness with practicality.',
    'Metal Tiger': 'The Metal Tiger combines courage with precision. This combination creates a strategic leader who plans bold moves carefully.',
    'Water Tiger': 'The Water Tiger combines courage with wisdom. This combination creates an intuitive leader who acts with deep understanding.',
    
    'Wood Rabbit': 'The Wood Rabbit combines gentleness with growth. This combination creates an artistic visionary who brings beauty to creative projects.',
    'Fire Rabbit': 'The Fire Rabbit combines gentleness with passion. This combination creates a warm, artistic individual who inspires through creativity.',
    'Earth Rabbit': 'The Earth Rabbit combines gentleness with stability. This combination creates a peaceful, grounded artist who values harmony.',
    'Metal Rabbit': 'The Metal Rabbit combines gentleness with precision. This combination creates a refined artist who pays attention to every detail.',
    'Water Rabbit': 'The Water Rabbit combines gentleness with wisdom. This combination creates an intuitive artist who expresses deep emotions.',
    
    'Wood Dragon': 'The Wood Dragon combines ambition with growth. This combination creates an innovative leader who builds visionary projects.',
    'Fire Dragon': 'The Fire Dragon combines ambition with passion. This combination creates an intensely powerful leader who inspires through charisma.',
    'Earth Dragon': 'The Earth Dragon combines ambition with stability. This combination creates a grounded leader who builds lasting empires.',
    'Metal Dragon': 'The Metal Dragon combines ambition with precision. This combination creates a strategic leader who plans ambitious moves carefully.',
    'Water Dragon': 'The Water Dragon combines ambition with wisdom. This combination creates an intuitive leader who acts with deep insight.',
    
    'Wood Snake': 'The Wood Snake combines wisdom with growth. This combination creates a thoughtful innovator who sees long-term possibilities.',
    'Fire Snake': 'The Fire Snake combines wisdom with passion. This combination creates an intense, charismatic individual who inspires through depth.',
    'Earth Snake': 'The Earth Snake combines wisdom with stability. This combination creates a grounded philosopher who values practical wisdom.',
    'Metal Snake': 'The Metal Snake combines wisdom with precision. This combination creates an analytical thinker who excels at strategic planning.',
    'Water Snake': 'The Water Snake combines wisdom with intuition. This combination creates the ultimate intuitive thinker who sees beyond the surface.',
    
    'Wood Horse': 'The Wood Horse combines energy with growth. This combination creates an adventurous innovator who explores new possibilities.',
    'Fire Horse': 'The Fire Horse combines energy with passion. This combination creates an intensely energetic individual who lives life to the fullest.',
    'Earth Horse': 'The Earth Horse combines energy with stability. This combination creates a grounded adventurer who balances freedom with responsibility.',
    'Metal Horse': 'The Metal Horse combines energy with precision. This combination creates a focused adventurer who channels energy into structured goals.',
    'Water Horse': 'The Water Horse combines energy with adaptability. This combination creates a flexible free spirit who flows with life\'s changes.',
    
    'Wood Goat': 'The Wood Goat combines gentleness with growth. This combination creates an artistic visionary who brings beauty to the world.',
    'Fire Goat': 'The Wood Goat combines gentleness with passion. This combination creates a warm, creative individual who inspires through art.',
    'Earth Goat': 'The Earth Goat combines gentleness with stability. This combination creates a peaceful, grounded artist who values harmony.',
    'Metal Goat': 'The Metal Goat combines gentleness with precision. This combination creates a refined artist who pays attention to detail.',
    'Water Goat': 'The Water Goat combines gentleness with wisdom. This combination creates an intuitive artist who expresses deep emotions.',
    
    'Wood Monkey': 'The Wood Monkey combines intelligence with growth. This combination creates a creative problem-solver who innovates playfully.',
    'Fire Monkey': 'The Fire Monkey combines intelligence with passion. This combination creates an energetic innovator who brings enthusiasm to challenges.',
    'Earth Monkey': 'The Earth Monkey combines intelligence with stability. This combination creates a practical problem-solver who builds lasting solutions.',
    'Metal Monkey': 'The Metal Monkey combines intelligence with precision. This combination creates an analytical problem-solver who excels at structured thinking.',
    'Water Monkey': 'The Water Monkey combines intelligence with wisdom. This combination creates an intuitive problem-solver who sees creative solutions.',
    
    'Wood Rooster': 'The Wood Rooster combines confidence with growth. This combination creates an organized innovator who plans for success.',
    'Fire Rooster': 'The Fire Rooster combines confidence with passion. This combination creates an energetic perfectionist who inspires through excellence.',
    'Earth Rooster': 'The Earth Rooster combines confidence with stability. This combination creates a grounded perfectionist who values tradition.',
    'Metal Rooster': 'The Metal Rooster combines confidence with precision. This combination creates the ultimate perfectionist who excels at detail-oriented work.',
    'Water Rooster': 'The Water Rooster combines confidence with adaptability. This combination creates a flexible perfectionist who can adjust while maintaining standards.',
    
    'Wood Dog': 'The Wood Dog combines loyalty with growth. This combination creates a trustworthy innovator who builds lasting relationships.',
    'Fire Dog': 'The Fire Dog combines loyalty with passion. This combination creates an intensely loyal friend who inspires through dedication.',
    'Earth Dog': 'The Earth Dog combines loyalty with stability. This combination creates the ultimate loyal friend who values security and tradition.',
    'Metal Dog': 'The Metal Dog combines loyalty with precision. This combination creates a structured loyalist who excels at organized support.',
    'Water Dog': 'The Water Dog combines loyalty with wisdom. This combination creates an intuitive loyalist who understands others deeply.',
    
    'Wood Pig': 'The Wood Pig combines generosity with growth. This combination creates a generous innovator who shares success with others.',
    'Fire Pig': 'The Fire Pig combines generosity with passion. This combination creates an intensely generous individual who inspires through giving.',
    'Earth Pig': 'The Earth Pig combines generosity with stability. This combination creates a grounded generous person who builds lasting security.',
    'Metal Pig': 'The Metal Pig combines generosity with precision. This combination creates an organized generous person who gives thoughtfully.',
    'Water Pig': 'The Water Pig combines generosity with wisdom. This combination creates an intuitive generous person who gives with deep understanding.'
  }
  
  const combination = `${element} ${animal}`
  const defaultDescription = `The ${combination} combines the ${element.toLowerCase()} element's ${elementData.characteristics[0]} and ${elementData.characteristics[1]} with the ${animal.toLowerCase()}'s ${animalData.traits[0]} and ${animalData.traits[1]} nature. This creates a unique blend of ${elementData.personality.split('.')[0].toLowerCase()} and ${animalData.personality.split('.')[0].toLowerCase()}.`
  
  // Synthesize strengths based on how element enhances animal traits
  const synthesizeStrengths = (animal, element) => {
    const synthesis = {
      'Wood Rat': ['Visionary problem-solving', 'Adaptable intelligence', 'Creative resourcefulness', 'Growth-oriented thinking'],
      'Fire Rat': ['Energetic innovation', 'Passionate intelligence', 'Enthusiastic problem-solving', 'Charismatic leadership'],
      'Earth Rat': ['Practical intelligence', 'Stable resourcefulness', 'Methodical problem-solving', 'Reliable strategy'],
      'Metal Rat': ['Analytical precision', 'Structured intelligence', 'Systematic resourcefulness', 'Disciplined thinking'],
      'Water Rat': ['Intuitive intelligence', 'Adaptive strategy', 'Wisdom-driven resourcefulness', 'Flexible problem-solving'],
      
      'Wood Ox': ['Steady growth', 'Methodical vision', 'Reliable expansion', 'Patient building'],
      'Fire Ox': ['Passionate determination', 'Energetic reliability', 'Enthusiastic tradition', 'Driven stability'],
      'Earth Ox': ['Ultimate foundation-building', 'Unshakeable stability', 'Deep-rooted reliability', 'Solid tradition'],
      'Metal Ox': ['Precise structure', 'Disciplined reliability', 'Systematic strength', 'Organized determination'],
      'Water Ox': ['Adaptive tradition', 'Flexible stability', 'Wise reliability', 'Flowing strength'],
      
      'Wood Tiger': ['Bold vision', 'Energetic courage', 'Innovative leadership', 'Growth-driven charisma'],
      'Fire Tiger': ['Intense charisma', 'Passionate courage', 'Dynamic leadership', 'Fiery confidence'],
      'Earth Tiger': ['Grounded courage', 'Practical boldness', 'Stable leadership', 'Balanced confidence'],
      'Metal Tiger': ['Strategic courage', 'Precise boldness', 'Structured leadership', 'Disciplined confidence'],
      'Water Tiger': ['Intuitive courage', 'Wise boldness', 'Deep leadership', 'Flowing confidence'],
      
      'Wood Rabbit': ['Creative gentleness', 'Artistic growth', 'Visionary harmony', 'Expansive beauty'],
      'Fire Rabbit': ['Warm creativity', 'Passionate artistry', 'Enthusiastic harmony', 'Inspiring beauty'],
      'Earth Rabbit': ['Grounded artistry', 'Stable harmony', 'Practical beauty', 'Peaceful creativity'],
      'Metal Rabbit': ['Refined artistry', 'Precise beauty', 'Structured harmony', 'Disciplined creativity'],
      'Water Rabbit': ['Intuitive artistry', 'Deep beauty', 'Flowing harmony', 'Wise creativity'],
      
      'Wood Dragon': ['Visionary ambition', 'Innovative power', 'Growth-driven leadership', 'Creative energy'],
      'Fire Dragon': ['Intense power', 'Passionate ambition', 'Fiery leadership', 'Dynamic charisma'],
      'Earth Dragon': ['Grounded ambition', 'Stable power', 'Practical leadership', 'Lasting empire-building'],
      'Metal Dragon': ['Strategic ambition', 'Precise power', 'Structured leadership', 'Disciplined innovation'],
      'Water Dragon': ['Intuitive ambition', 'Wise power', 'Deep leadership', 'Flowing innovation'],
      
      'Wood Snake': ['Thoughtful growth', 'Innovative wisdom', 'Visionary insight', 'Creative depth'],
      'Fire Snake': ['Intense wisdom', 'Passionate insight', 'Charismatic depth', 'Dynamic mystery'],
      'Earth Snake': ['Grounded wisdom', 'Practical insight', 'Stable depth', 'Reliable philosophy'],
      'Metal Snake': ['Analytical wisdom', 'Precise insight', 'Structured depth', 'Disciplined thinking'],
      'Water Snake': ['Ultimate intuition', 'Deep wisdom', 'Flowing insight', 'Transcendent understanding'],
      
      'Wood Horse': ['Adventurous growth', 'Innovative energy', 'Visionary freedom', 'Creative exploration'],
      'Fire Horse': ['Intense energy', 'Passionate adventure', 'Dynamic freedom', 'Fiery enthusiasm'],
      'Earth Horse': ['Grounded adventure', 'Stable energy', 'Balanced freedom', 'Practical exploration'],
      'Metal Horse': ['Focused energy', 'Structured adventure', 'Precise freedom', 'Disciplined exploration'],
      'Water Horse': ['Flowing energy', 'Adaptive adventure', 'Flexible freedom', 'Intuitive exploration'],
      
      'Wood Goat': ['Artistic growth', 'Creative gentleness', 'Visionary beauty', 'Expansive harmony'],
      'Fire Goat': ['Warm creativity', 'Passionate artistry', 'Enthusiastic beauty', 'Inspiring gentleness'],
      'Earth Goat': ['Grounded artistry', 'Stable beauty', 'Peaceful harmony', 'Practical creativity'],
      'Metal Goat': ['Refined artistry', 'Precise beauty', 'Structured harmony', 'Disciplined gentleness'],
      'Water Goat': ['Intuitive artistry', 'Deep beauty', 'Flowing harmony', 'Wise gentleness'],
      
      'Wood Monkey': ['Creative intelligence', 'Innovative wit', 'Visionary problem-solving', 'Growth-driven playfulness'],
      'Fire Monkey': ['Energetic intelligence', 'Passionate wit', 'Dynamic problem-solving', 'Enthusiastic innovation'],
      'Earth Monkey': ['Practical intelligence', 'Stable wit', 'Reliable problem-solving', 'Grounded innovation'],
      'Metal Monkey': ['Analytical intelligence', 'Precise wit', 'Structured problem-solving', 'Disciplined innovation'],
      'Water Monkey': ['Intuitive intelligence', 'Wise wit', 'Flowing problem-solving', 'Adaptive innovation'],
      
      'Wood Rooster': ['Organized growth', 'Innovative confidence', 'Visionary perfectionism', 'Creative planning'],
      'Fire Rooster': ['Energetic perfectionism', 'Passionate confidence', 'Dynamic excellence', 'Enthusiastic organization'],
      'Earth Rooster': ['Grounded perfectionism', 'Stable confidence', 'Traditional excellence', 'Reliable organization'],
      'Metal Rooster': ['Ultimate precision', 'Disciplined perfectionism', 'Structured excellence', 'Analytical organization'],
      'Water Rooster': ['Adaptive perfectionism', 'Flexible confidence', 'Flowing excellence', 'Intuitive organization'],
      
      'Wood Dog': ['Trustworthy growth', 'Innovative loyalty', 'Visionary protection', 'Creative reliability'],
      'Fire Dog': ['Intense loyalty', 'Passionate protection', 'Dynamic reliability', 'Enthusiastic trustworthiness'],
      'Earth Dog': ['Ultimate loyalty', 'Unshakeable reliability', 'Deep protection', 'Solid trustworthiness'],
      'Metal Dog': ['Structured loyalty', 'Precise reliability', 'Disciplined protection', 'Organized trustworthiness'],
      'Water Dog': ['Intuitive loyalty', 'Wise reliability', 'Deep understanding', 'Flowing trustworthiness'],
      
      'Wood Pig': ['Generous growth', 'Innovative giving', 'Visionary sharing', 'Creative abundance'],
      'Fire Pig': ['Intense generosity', 'Passionate giving', 'Enthusiastic sharing', 'Dynamic abundance'],
      'Earth Pig': ['Grounded generosity', 'Stable giving', 'Reliable sharing', 'Practical abundance'],
      'Metal Pig': ['Organized generosity', 'Precise giving', 'Structured sharing', 'Thoughtful abundance'],
      'Water Pig': ['Intuitive generosity', 'Wise giving', 'Deep sharing', 'Flowing abundance']
    }
    
    return synthesis[combination] || [
      `${elementData.strengths[0]} ${animalData.strengths[0]}`,
      `${elementData.strengths[1]} ${animalData.strengths[1]}`,
      `Enhanced ${animalData.strengths[2]}`,
      `Balanced ${elementData.strengths[2]}`
    ]
  }
  
  // Synthesize challenges based on how element and animal traits conflict or amplify weaknesses
  const synthesizeChallenges = (animal, element) => {
    const synthesis = {
      'Wood Rat': ['May overthink opportunities', 'Can be too idealistic in planning', 'Tendency to spread resources thin'],
      'Fire Rat': ['Can burn out from overenthusiasm', 'May be too impulsive with ideas', 'Risk of overwhelming others'],
      'Earth Rat': ['May resist necessary changes', 'Can be overly cautious', 'Tendency to miss opportunities'],
      'Metal Rat': ['Can be too rigid in thinking', 'May over-analyze simple problems', 'Tendency to be overly critical'],
      'Water Rat': ['Can be indecisive with opportunities', 'May lack direction', 'Tendency to overthink decisions'],
      
      'Wood Ox': ['May be too slow to adapt', 'Can resist growth opportunities', 'Tendency to stick to old methods'],
      'Fire Ox': ['Can be stubborn about change', 'May burn out from overwork', 'Tendency to ignore new ideas'],
      'Earth Ox': ['May be overly conservative', 'Can resist all change', 'Tendency to be inflexible'],
      'Metal Ox': ['Can be too rigid', 'May lack emotional flexibility', 'Tendency to be overly structured'],
      'Water Ox': ['May lack clear direction', 'Can be indecisive', 'Tendency to flow without purpose'],
      
      'Wood Tiger': ['Can take too many risks', 'May lack follow-through', 'Tendency to overextend'],
      'Fire Tiger': ['Can be too impulsive', 'May burn out quickly', 'Tendency to be reckless'],
      'Earth Tiger': ['May lack boldness', 'Can be too cautious', 'Tendency to miss opportunities'],
      'Metal Tiger': ['Can be too strategic', 'May overthink bold moves', 'Tendency to delay action'],
      'Water Tiger': ['May lack clear direction', 'Can be indecisive', 'Tendency to flow without focus'],
      
      'Wood Rabbit': ['Can be too idealistic', 'May avoid necessary conflict', 'Tendency to overextend creatively'],
      'Fire Rabbit': ['Can be too emotional', 'May burn out from intensity', 'Tendency to be moody'],
      'Earth Rabbit': ['May be too passive', 'Can avoid all confrontation', 'Tendency to be overly cautious'],
      'Metal Rabbit': ['Can be too critical', 'May lack spontaneity', 'Tendency to overthink beauty'],
      'Water Rabbit': ['Can be too sensitive', 'May lack direction', 'Tendency to be indecisive'],
      
      'Wood Dragon': ['Can overextend ambitions', 'May lack follow-through', 'Tendency to start too many projects'],
      'Fire Dragon': ['Can be too intense', 'May burn out from power', 'Tendency to overwhelm others'],
      'Earth Dragon': ['May be too conservative', 'Can resist innovation', 'Tendency to be rigid'],
      'Metal Dragon': ['Can be too controlling', 'May lack flexibility', 'Tendency to be overly structured'],
      'Water Dragon': ['May lack clear direction', 'Can be indecisive', 'Tendency to flow without focus'],
      
      'Wood Snake': ['Can be too idealistic', 'May overthink decisions', 'Tendency to miss opportunities'],
      'Fire Snake': ['Can be too intense', 'May burn out from passion', 'Tendency to be secretive'],
      'Earth Snake': ['May be too conservative', 'Can resist new ideas', 'Tendency to be rigid'],
      'Metal Snake': ['Can be too analytical', 'May overthink everything', 'Tendency to be critical'],
      'Water Snake': ['Can be too mysterious', 'May lack direction', 'Tendency to be indecisive'],
      
      'Wood Horse': ['Can lack focus', 'May overextend energy', 'Tendency to start too many things'],
      'Fire Horse': ['Can burn out quickly', 'May be too impulsive', 'Tendency to lack patience'],
      'Earth Horse': ['May lack adventure', 'Can be too cautious', 'Tendency to resist freedom'],
      'Metal Horse': ['Can be too focused', 'May lack spontaneity', 'Tendency to be rigid'],
      'Water Horse': ['Can lack direction', 'May be too flexible', 'Tendency to flow without purpose'],
      
      'Wood Goat': ['Can be too idealistic', 'May avoid conflict', 'Tendency to overextend creatively'],
      'Fire Goat': ['Can be too emotional', 'May burn out from intensity', 'Tendency to be moody'],
      'Earth Goat': ['May be too passive', 'Can avoid confrontation', 'Tendency to be overly cautious'],
      'Metal Goat': ['Can be too critical', 'May lack spontaneity', 'Tendency to overthink'],
      'Water Goat': ['Can be too sensitive', 'May lack direction', 'Tendency to be indecisive'],
      
      'Wood Monkey': ['Can lack focus', 'May overextend intelligence', 'Tendency to start too many projects'],
      'Fire Monkey': ['Can burn out from energy', 'May be too impulsive', 'Tendency to lack discipline'],
      'Earth Monkey': ['May be too practical', 'Can lack creativity', 'Tendency to be rigid'],
      'Metal Monkey': ['Can be too analytical', 'May lack playfulness', 'Tendency to overthink'],
      'Water Monkey': ['Can lack direction', 'May be too flexible', 'Tendency to flow without purpose'],
      
      'Wood Rooster': ['Can be too idealistic', 'May overextend perfectionism', 'Tendency to start too many projects'],
      'Fire Rooster': ['Can burn out from intensity', 'May be too critical', 'Tendency to overwhelm others'],
      'Earth Rooster': ['May be too conservative', 'Can resist innovation', 'Tendency to be rigid'],
      'Metal Rooster': ['Can be overly critical', 'May lack flexibility', 'Tendency to be too rigid'],
      'Water Rooster': ['Can be indecisive', 'May lack clear standards', 'Tendency to flow without focus'],
      
      'Wood Dog': ['Can be too idealistic', 'May overextend loyalty', 'Tendency to worry excessively'],
      'Fire Dog': ['Can burn out from intensity', 'May be too protective', 'Tendency to overwhelm'],
      'Earth Dog': ['May be too conservative', 'Can resist change', 'Tendency to be pessimistic'],
      'Metal Dog': ['Can be too rigid', 'May lack emotional flexibility', 'Tendency to be overly structured'],
      'Water Dog': ['Can be too emotional', 'May lack direction', 'Tendency to worry excessively'],
      
      'Wood Pig': ['Can be too trusting', 'May overextend generosity', 'Tendency to be naive'],
      'Fire Pig': ['Can burn out from giving', 'May be too intense', 'Tendency to overwhelm'],
      'Earth Pig': ['May be too materialistic', 'Can resist change', 'Tendency to be overly cautious'],
      'Metal Pig': ['Can be too organized', 'May lack spontaneity', 'Tendency to overthink giving'],
      'Water Pig': ['Can be too trusting', 'May lack direction', 'Tendency to be indecisive']
    }
    
    return synthesis[combination] || [
      `May struggle with ${animalData.weaknesses[0].toLowerCase()}`,
      `Can be affected by ${elementData.challenges[0].toLowerCase()}`,
      `Tendency toward ${animalData.weaknesses[1]?.toLowerCase() || 'imbalance'}`
    ]
  }
  
  return {
    combination,
    description: descriptions[combination] || defaultDescription,
    personality: descriptions[combination] ? descriptions[combination] : `This ${combination} individual combines ${elementData.personality.toLowerCase()} with ${animalData.personality.toLowerCase()}`,
    traits: [...new Set([...elementData.characteristics, ...animalData.traits])],
    strengths: synthesizeStrengths(animal, element),
    challenges: synthesizeChallenges(animal, element)
  }
}
