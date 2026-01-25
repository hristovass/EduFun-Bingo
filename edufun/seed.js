
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

const questionSchema = new mongoose.Schema({
    category: { type: String, required: true },
    question: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    answers: { type: [String], required: true },
});

const Question = mongoose.model('Question', questionSchema);

const questions = [
    {
        category: 'history',
        question: 'Who was the first president of United States',
        correctAnswer: 'George Washington',
        answers: ['George Washington', 'Abraham Lincoln', 'Thomas Jefferson', 'John Adams'],
    },
    {
        category: 'history',
        question: 'In which year did World War II begin?',
        correctAnswer: '1939',
        answers: ['1914', '1945', '1939', '1929'],
    },
    {
        category: 'history',
        question: 'Which empire was ruled by Julius Caesar?',
        correctAnswer: 'Roman empire',
        answers: ['Ottoman Empire', 'Roman empire', 'Byzantine empire', 'Greek empire'],
    },
    {
        category: 'history',
        question: 'Which country was first to land a human on the moon?',
        correctAnswer: 'United States',
        answers: ['Soviet Union', 'China', 'United States', 'United Kingdom'],
    },
    {
        category: 'history',
        question: 'In what year did Titanic sink?',
        correctAnswer: '1912',
        answers: ['1912', '1922', '1921', '1925'],
    },
    {
        category: 'history',
        question: 'Which ancient civilization built the pyramids?',
        correctAnswer: 'Egyptians',
        answers: ['Egyptians', 'Romans', 'Greek', 'Balkans'],
    },
    {
        category: 'history',
        question: 'Who was the first female Prime Minister of the United Kingdom?',
        correctAnswer: 'Margaret Thatcher',
        answers: ['Theresa May', 'Margaret Thatcher', 'Angela Merkel', 'Queen Elizabeth II'],
    },
    {
        category: 'history',
        question: 'The French Revolution began in which year?',
        correctAnswer: '1789',
        answers: ['1799', '1815', '1789', '1776'],
    },
    {
        category: 'history',
        question: 'Who was the leader of the Soviet Union during World War II?',
        correctAnswer: ' Joseph Stalin',
        answers: ['Vladimir Lenin', 'Leon Trotsky', 'Nikita Khrushchev', ' Joseph Stalin'],
    },
    {
        category: 'history',
        question: 'Who was the first emperor of Rome?',
        correctAnswer: 'Augustus',
        answers: ['Nero', 'Augustus', 'Julius Caesar', 'Tiberius'],
    },
    {
        category: 'technology',
        question: 'What does the acronym HTML stand for?',
        correctAnswer: 'Hypertext Markup Language',
        answers: ['Hypertext Markup Language', 'Hyperlink and Text Markup Language', 'High-level Text Markup Language', 'Hypertext Multi-language'],
    },
    {
        category: 'technology',
        question: 'Which company developed the Android operating system?',
        correctAnswer: 'Google',
        answers: ['Apple', 'Google', 'Microsoft', 'IBM'],
    },
    {
        category: 'technology',
        question: 'What is the primary function of a CPU in a computer?',
        correctAnswer: 'Process instructions ',
        answers: ['Process instructions ', 'Manage power supply', 'Connect peripherals', 'Store data'],
    },
    {
        category: 'technology',
        question: 'Which programming language is known as the backbone of web development?',
        correctAnswer: 'JavaScript ',
        answers: ['Ruby', 'C++', 'Python', 'JavaScript '],
    },
    {
        category: 'technology',
        question: 'Which technology is used to create virtual environments within a computer?',
        correctAnswer: 'Virtualization',
        answers: ['Blockchain', 'Cloud Computing', 'Augmented Reality', 'Virtualization'],
    },
    {
        category: 'technology',
        question: 'WWhat is the name of the first computer virus that spread in the wild?',
        correctAnswer: 'Brain',
        answers: ['ILOVEYOU', 'Melissa', 'Brain', 'MyDoom'],
    },
    {
        category: 'technology',
        question: 'Which of the following is a popular open-source operating system?',
        correctAnswer: 'Linux',
        answers: ['Linux', 'Solaris', 'Windows', 'macOS'],
    },
    {
        category: 'technology',
        question: 'What does AI stand for in technology?',
        correctAnswer: 'Artificial Intelligence',
        answers: ['Automated Intelligence', 'Artificial Intelligence', 'Advanced Integration', ' Algorithmic Interpretation'],
    },
    {
        category: 'technology',
        question: 'Which of the following technologies is primarily used for decentralized digital currency?',
        correctAnswer: 'Blockchain ',
        answers: ['Blockchain ', 'Artificial Intelligence', 'Cloud Computing', 'Virtual Reality'],
    },
    {
        category: 'technology',
        question: 'What is the primary purpose of a firewall in a computer network?',
        correctAnswer: 'To prevent unauthorized access ',
        answers: ['To boost internet speed', 'To store data securely', 'To prevent unauthorized access ', 'To enhance graphics performance'],
    },
    {
        category: 'geography',
        question: 'What is the largest country in the world by land area?',
        correctAnswer: 'Russia',
        answers: ['Canada', 'Russia', 'China', 'United States'],
    },
    {
        category: 'geography',
        question: 'Which river is the longest in the world?',
        correctAnswer: 'Nile River',
        answers: ['Amazon River', 'Nile River', 'Yangtze River', 'Mississippi River'],
    },
    {
        category: 'geography',
        question: 'What mountain range separates Europe and Asia?',
        correctAnswer: 'Ural Mountains',
        answers: ['Andes', 'Himalayas', 'Ural Mountains', 'Rockies'],
    },
    {
        category: 'geography',
        question: 'Which desert is the largest in the world?',
        correctAnswer: 'Sahara Desert',
        answers: ['Sahara Desert', 'Arabian Desert', 'Gobi Desert', 'Kalahari Desert'],
    },
    {
        category: 'geography',
        question: 'Which country has the most natural lakes?',
        correctAnswer: 'Canada',
        answers: ['Canada', 'Russia', 'United States', 'Brazil'],
    },
    {
        category: 'geography',
        question: 'What is the capital of Australia?',
        correctAnswer: 'Canberra',
        answers: ['Sydney', 'Canberra', 'Melbourne', 'Brisbane'],
    },
    {
        category: 'geography',
        question: 'Which continent is known as the "Dark Continent"?',
        correctAnswer: 'Africa',
        answers: ['Asia', 'Africa', 'South America', 'Australia'],
    },
    {
        category: 'geography',
        question: 'Which country is both an island and a continent?',
        correctAnswer: 'Australia',
        answers: ['Greenland', 'Australia', 'Madagascar', 'Iceland'],
    },
    {
        category: 'geography',
        question: 'What is the largest city in the world by population?',
        correctAnswer: 'Tokyo',
        answers: ['Tokyo', 'Delhi', 'Shanghai', 'São Paulo'],
    },
    {
        category: 'geography',
        question: 'Which ocean is the smallest?',
        correctAnswer: 'Arctic Ocean',
        answers: ['Indian Ocean', 'Atlantic Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    },
    {
        category: 'upset',
        question: 'Which famous band was formed in Liverpool in 1960?',
        correctAnswer: 'The Beatles',
        answers: ['The Rolling Stones', 'The Beatles', 'The Who', 'Led Zeppelin'],
    },
    {
        category: 'upset',
        question: 'What is the highest-selling album of all time?',
        correctAnswer: 'Thriller by Michael Jackson',
        answers: ['Rumours by Fleetwood Mac', 'The Dark Side of the Moon by Pink Floyd', 'Thriller by Michael Jackson', 'Back in Black by AC/DC'],
    },
    {
        category: 'upset',
        question: 'Who is known as the "Queen of Pop"?',
        correctAnswer: 'Madonna',
        answers: ['Mariah Carey', 'Madonna', 'Beyoncé', 'Whitney Houston'],
    },
    {
        category: 'upset',
        question: 'Which artist is known for the hit song "Shape of You"?',
        correctAnswer: 'Ed Sheeran',
        answers: ['Justin Bieber', 'Ed Sheeran', 'Bruno Mars', 'Sam Smith'],
    },
    {
        category: 'upset',
        question: 'What genre of music is characterized by the use of heavy guitar riffs and aggressive vocals?',
        correctAnswer: 'Metal',
        answers: ['Pop', 'Metal', 'Jazz', 'Classical'],
    },
    {
        category: 'upset',
        question: 'Which song begins with the lyrics "Is this the real life? Is this just fantasy?"',
        correctAnswer: 'Bohemian Rhapsody',
        answers: ['Hotel California', 'Bohemian Rhapsody', 'Stairway to Heaven', 'Imagine'],
    },
    {
        category: 'upset',
        question: 'Who won the Grammy for Album of the Year in 2020?',
        correctAnswer: 'Billie Eilish',
        answers: ['Billie Eilish', 'Lizzo', 'Ariana Grande', 'Taylor Swift'],
    },
    {
        category: 'upset',
        question: 'What instrument does Yo-Yo Ma famously play?',
        correctAnswer: 'Cello',
        answers: ['Violin', 'Cello', 'Piano', 'Viola'],
    },
    {
        category: 'upset',
        question: 'Which music festival is known for its three-day performances and massive crowds, often held in California?',
        correctAnswer: 'Coachella',
        answers: ['Lollapalooza', 'Coachella', 'Glastonbury', 'Bonnaroo'],
    },
    {
        category: 'upset',
        question: 'What is the name of the lead singer of the band U2?',
        correctAnswer: 'Bono',
        answers: ['Mick Jagger', 'Bono', 'Freddie Mercury', 'David Bowie'],
    },

];

const seedQuestions = async () => {
    await Question.deleteMany({});
    const result = await Question.insertMany(questions);
    console.log(`${result.length} pitanja dodato u bazu`);
    mongoose.connection.close();
};

seedQuestions().catch(err => console.error(err));
