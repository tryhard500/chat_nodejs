let express = require(`express`);
let app = express();
let port = 3000;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});

// Раздача статики
app.use(express.static(`public`));


// Настройка handlebars
let hbs = require('hbs');
app.set('views', 'views');
app.set('view engine', 'hbs');

// Обработка POST-запросов
app.use(express.urlencoded({ extended: true }))

// Данные
let chats = [
    {
        title: 'Разработка проекта',
        messages: [
            {
                author: 'Коля',
                text: 'Привет, круто, что мы наконец-то запустили этот чат.'
            },
            {
                author: 'Женя',
                text: 'Давайте созвонимся, обсудим, что делать дальше?'
            },
            {
                author: 'Я',
                text: 'Пока некогда, столько дел...'
            },
            {
                author: 'Коля',
                text: 'Может тогда катку?'
            },
            {
                author: 'Я',
                text: 'Для этого у нас есть соседний чат)'
            },
        ]
    },
    {
        title: 'Для игр',
        messages: [
 
            {
                author: 'Я',
                text: 'Для игр время всегда найдётся)'
            }
        ]
    },
    {
        title: 'Алгебра ДЗ',
        messages: [
            {
                author: 'Я',
                text: 'У кого получился 15 номер? Не могу никак решить.'
            },
            {
                author: 'Женя',
                text: 'Могу помочь. А где застрял?'
            }
        ]
    }
]

// Роуты пиши здесь

app.get('/',(req,res)=>{
    res.render('index',{
        chats: chats
    });
});

app.post('/create',(req,res)=>{
    let title = req.body.title;
    if (title) {
        chats.push({
            title: title,
            messages: []
        });
    }
    res.redirect('/');
});

app.get('/remove',(req,res)=>{
    let id = req.query.id;
    let chat = chats[id];
    if (chat) {
        chats.splice(id,1)
    }
    res.redirect('/')
});

app.get('/show',(req,res)=>{
    let id = req.query.id;
    let chat = chats[id];
    res.render('index',{
        chats: chats,
        chat, chat,
        chatId: id
    });
});