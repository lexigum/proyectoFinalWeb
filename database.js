const Sequelize = require("sequelize");
const Model = Sequelize.Model;

let album = null;
let artist = null;
let genre = null;
let customer = null;
let employee = null;
let mediaType = null;
let playlist = null;
let track = null;
let invoice = null;
let invoiceItems = null;
let playlistTracks = null;

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db.sqlite'
});

(async()=>{
    class customers extends Model {}
    customer = customers.init({
        CustomerId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        FirstName: Sequelize.STRING,
        LastName: Sequelize.STRING,
        Company: Sequelize.STRING,
        Address: Sequelize.STRING,
        City: Sequelize.STRING,
        State: Sequelize.STRING,
        Country: Sequelize.STRING,
        PostalCode: Sequelize.STRING,
        Phone: Sequelize.STRING,
        Fax: Sequelize.STRING,
        Email: Sequelize.STRING
    }, { sequelize, modelName:'customers' }
    );
    
    class employees extends Model {}
    employee = employees.init({
        EmployeeId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        FirstName: Sequelize.STRING,
        LastName: Sequelize.STRING,
        Title: Sequelize.STRING,
        BirthDate: Sequelize.STRING,
        HireDate: Sequelize.STRING,
        Address: Sequelize.STRING
    }, { sequelize, modelName:'employees' }
    );

    class media_types extends Model {}
    mediaType = media_types.init({
        MediaTypeId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: Sequelize.STRING
    }, { sequelize, modelName:'media_types' }
    );

    class genres extends Model {}
    genre = genres.init({
         GenreId: {
             type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: Sequelize.STRING
    }, { sequelize, modelName:'genres' }
    );
    class playlists extends Model {}
    playlist = playlists.init({
        PlaylistId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: false
        },
        Name: Sequelize.STRING
    }, { sequelize, modelName:'playlists' }
    );
    class tracks extends Model {}
    track = tracks.init({
        TrackId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: false
        },
        Name: Sequelize.STRING,
        Composer: Sequelize.STRING,
        Miliseconds: Sequelize.INTEGER,
        Bytes: Sequelize.INTEGER,
        UnitPrice: Sequelize.DECIMAL
    }, { sequelize, modelName:'tracks' }
    );
    class artists extends Model {}
    artist = artists.init({
        ArtistId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Name: Sequelize.STRING
    }, { sequelize, modelName:'artists' }
    );
    class albums extends Model {}
    album = albums.init({
        AlbumId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Title: Sequelize.STRING
    }, { sequelize, modelName:'albums' }
    );
    class invoices extends Model {}
    invoice = invoices.init({
        InvoiceId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        InvoiceDate: Sequelize.DATE,
        BillingAddress: Sequelize.STRING,
        BillingCity: Sequelize.STRING,
    }, { sequelize, modelName:'invoices' }
    );
    class invoice_items extends Model {}
    invoiceItems = invoice_items.init({
        InvoiceItemId: {
            type: Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey: true
        },
        UnitPrice: Sequelize.STRING,
        Quantity: Sequelize.INTEGER
    }, { sequelize, modelName:'invoice_items' }
    );

    class playlist_track extends Model {}
    playlistTracks = playlist_track.init({
        Id:{
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        PlaylistId: {
            type:Sequelize.INTEGER,
        },
        TrackId: {
            type:Sequelize.INTEGER,
        }
    }, { sequelize, modelName:'playlist_track' }
    );

    employees.hasMany(employees, {foreignKey:'ReportsTo', as:'ReportsToEmployee'});

    employees.hasMany(customers, {foreignKey:'SupportRepId', as:'SupportRepEmployeeId'});

    customers.hasMany(invoices, {foreignKey:'CustomerId', as:'CustomerInvoicesId'});

    invoices.hasMany(invoice_items, {foreignKey:'InvoiceId', as:'InvoiceItemsId'});

    tracks.hasMany(invoice_items, {foreignKey:'TrackId', as:'TrackInvoicesItemsId'});

    albums.hasMany(tracks, {foreignKey:'AlbumId', as:'AlbumTracksId'});

    genres.hasMany(tracks, {foreignKey:'GenreId', as:'GenreTracksId'});

    artists.hasMany(albums,{foreignKey:'ArtistID',as:'AlbumArtist'});

    media_types.hasMany(tracks, {foreignKey:'MediaTypeId', as:'MediaTypeTracksId'});

    //playlist.hasMany(playlist_track,{})
    /*tracks.belongsToMany(playlists, {through: {model:'playlist_track', unique: false }});
    playlists.belongsToMany(tracks, {through: {model:'playlist_track', unique: false }});
    
    const playlist_track = sequelize.define('playlist_track', {
        Id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        playlistPlaylistId: {
            unique: false
        }
    });
    */

    //tracks.belongsToMany(playlists, {through:playlist_track});

    await sequelize.sync({force: true});

    await artists.bulkCreate([
        {Name:'Led Zeppelin'},
        {Name:'Meat Loaf'},
        {Name:'Pink Floyd'},
        {Name:'Alanis Morissette'},
        {Name:'The Beatles'},
        {Name:'Eagles'},
        {Name:'Varios artistas'},
        {Name:'Michael Jackson'},
        {Name:'Mariah Carey'},
        {Name:'Céline Dion'},
        {Name:'Elton John'},
        {Name:'Bee Gees'},
        {Name:'Linkin Park'},
        {Name:'Dire Straits'},
        {Name:'Guns N Roses'},
        {Name:'Madonna'},
        {Name:'Metallica'},
        {Name:'Nirvana'},
        {Name:'Backstreet Boys'},
        {Name:'James Horner'}
    ])

    await albums.bulkCreate([
        {Title:'Led Zeppelin IV', ArtistID:1},
        {Title:'Bat Out of Hell', ArtistID:2},
        {Title:'The Wall', ArtistID:3},
        {Title:'Jagged Little Pill', ArtistID:4},
        {Title:'Sgt. Peppers Lonely Hearts Club Band', ArtistID:5},
        {Title:'Hotel California', ArtistID:6},
        {Title:'Dirty Dancing', ArtistID:7},
        {Title:'Dangerous', ArtistID:8},
        {Title:'Music Box', ArtistID:9},
        {Title:'Falling into You', ArtistID:10},
        {Title:'Goodbye Yellow Brick Road', ArtistID:11},
        {Title:'Lets Talk About Love', ArtistID:12},
        {Title:'1', ArtistID:13},
        {Title:'Abbey Road', ArtistID:14},
        {Title:'Spirits Having Flown', ArtistID:15},
        {Title:'Born in the U.S.A.', ArtistID:16},
        {Title:'Brothers in Arms', ArtistID:17},
        {Title:'Appetite for Destruction', ArtistID:18},
        {Title:'Bad', ArtistID:19},
        {Title:'The Immaculate Collection', ArtistID:20}
    ])

    await playlists.bulkCreate([
        {	Name:	'Imprescindibles para salir a correr'	},
        {	Name:	'Tu pon las copas y yo la música '	},
        {	Name:	'Recopilación de la recopilación  '	},
        {	Name:	'Cassette del coche de papá'	},
        {	Name:	'Las tipicas canciones que no sabes como se llaman y te tiras la vida buscándola'	},
        {	Name:	'Canciones de anuncios '	},
        {	Name:	'Anti-Karaoke: Lo mejor del rock de siempre  '	},
        {	Name:	'Números 1 para no hacer el amor'	},
        {	Name:	'Canciones para escuchar mientras te haces una tostada'	},
        {	Name:	'BSO Instrumental para leer, escribir o relajarse'	},
        {	Name:	'Música de las tiendas H&M'	},
        {	Name:	'Música para escuchar en FAROLAS'	},
        {	Name:	'Cuando el Reggae salió de Jamaica (I don’t like unjamaican reggae)'	},
        {	Name:	'Plagios'	},
        {	Name:	'Canciones conocidas pero que no sabes sus nombres'	},
        {	Name:	'Versiones rock de canciones conocidas'	},
        {	Name:	'Versiones a montones'	},
        {	Name:	'Lo que más suena en las discotecas que ponen rock en español'	},
        {	Name:	'Lo mejor del rock en español'	},
        {	Name:	'Los 70 mejores canciones el rock en español'	},
    ])
    
    await media_types.bulkCreate([
        {Name:'Digital'},
        {Name:'Fisico'}
    ])

    await genres.bulkCreate([
        {Name: 'Música rock' },
        {Name: 'Jazz' },
        {Name: 'Dubstep' },
        {Name: 'Rhythm and Blues o R&B' },
        {Name: 'Techno' },
        {Name: 'Música country' },
        {Name: 'Electro' },
        {Name: 'Indie' },
        {Name: 'Pop' },
        {Name: 'Disco' }
    ])
    
    await employees.bulkCreate([
        {FirstName: 'Kevin', LastName: 'Romero',Title:'Gerente', ReportsTo: null, BirthDate:'1980-01-01', HireDate:'2010-02-01', Address:'DOMICILIO CONOCIDO'},
        {FirstName: 'Andres', LastName: 'Sosa',Title:'Gerente', ReportsTo: 1, BirthDate:'1980-01-01', HireDate:'2010-02-01', Address:'AV. GUADALUPE S/N'},
        {FirstName: 'Alexia', LastName: 'Torres',Title:'Empleado General', ReportsTo: 1, BirthDate:'1980-01-01', HireDate:'2010-02-01', Address:'AVENIDA NIÑOS HEROES NO. 3'},
        {FirstName: 'Guadalupe', LastName: 'Álvarez',Title:'Empleado General', ReportsTo: 2, BirthDate:'1980-01-01', HireDate:'2010-02-01', Address:'CARRETERA MEXICO-LAREDO KM.125'},
        {FirstName: 'Fernanda', LastName: 'Ruiz',Title:'Empleado General', ReportsTo: 2, BirthDate:'1980-01-01', HireDate:'2010-02-01', Address:'PLAZA CONSTITUCION NO. 1'},
    ])

    await customers.bulkCreate([
        {FirstName: 'Antonio', LastName: 'Gonzales', Company: 'América Móvil', Address:'DOMICILIO CONOCIDO', City:'Culiacan', State:'Sinaloa', Country:'Mexico', PostalCode:null, Phone:'000-000-000', Fax:null,Email:null,SupportRepId:1},
        {FirstName: 'Jose', LastName: 'Rodriguez', Company: 'Femsa', Address:'AV. GUADALUPE S/N', City:'Culiacan', State:'Sinaloa', Country:'Mexico', PostalCode:null, Phone:'000-000-000', Fax:null,Email:null,SupportRepId:1},
        {FirstName: 'Manuel', LastName: 'Gomez', Company: 'Grupo Financiero Banorte', Address:'AVENIDA NIÑOS HEROES NO. 3', City:'Culiacan', State:'Sinaloa', Country:'Mexico', PostalCode:null, Phone:'000-000-000', Fax:null,Email:null,SupportRepId:2},
        {FirstName: 'Francisco', LastName: 'Fernandez', Company: 'Grupo México', Address:'CARRETERA MEXICO-LAREDO KM.125', City:'Culiacan', State:'Sinaloa', Country:'Mexico', PostalCode:null, Phone:'000-000-000', Fax:null,Email:null,SupportRepId:2},
        {FirstName: 'David', LastName: 'Lopez', Company: 'Televisa', Address:'PLAZA CONSTITUCION NO. 1', City:'Culiacan', State:'Sinaloa', Country:'Mexico', PostalCode:null, Phone:'000-000-000', Fax:null,Email:null,SupportRepId:3},
        {FirstName: 'Juan', LastName: 'Diaz', Company: 'Cemex', Address:'DOMICILIO CONOCIDO', City:'Culiacan', State:'Sinaloa', Country:'Mexico', PostalCode:null, Phone:'000-000-000', Fax:null,Email:null,SupportRepId:3},
        {FirstName: 'Jose Antonio', LastName: 'Martinez', Company: 'América Móvil', Address:'CARRETERA MEXICO-LAREDO', City:'Culiacan', State:'Sinaloa', Country:'Mexico', PostalCode:null, Phone:'000-000-000', Fax:null,Email:null,SupportRepId:4},
        {FirstName: 'Javier', LastName: 'Perez', Company: 'Femsa', Address:'AVENIDA MIGUEL HIDALGO S/N', City:'Culiacan', State:'Sinaloa', Country:'Mexico', PostalCode:null, Phone:'000-000-000', Fax:null,Email:null,SupportRepId:4},
        {FirstName: 'Mariana', LastName: 'Garcia', Company: 'Grupo Financiero Banorte', Address:'CARRETERA SAN SALVADOR SAN MIGUEL K', City:'Culiacan', State:'Sinaloa', Country:'Mexico', PostalCode:null, Phone:'000-000-000', Fax:null,Email:null,SupportRepId:5},
        {FirstName: 'Maria', LastName: 'Sanchez', Company: 'Grupo México', Address:'AV. 16 DE JULIO S/N', City:'Culiacan', State:'Sinaloa', Country:'Mexico', PostalCode:null, Phone:'000-000-000', Fax:null,Email:null,SupportRepId:5},
    ])
    
    await invoices.bulkCreate([
        {CustomerId:1,InvoiceDate:'2020-05-30',BillingAddress:null,BillingCity:null},
        {CustomerId:1,InvoiceDate:'2020-05-30',BillingAddress:null,BillingCity:null},
        {CustomerId:2,InvoiceDate:'2020-05-30',BillingAddress:null,BillingCity:null},
        {CustomerId:2,InvoiceDate:'2020-05-30',BillingAddress:null,BillingCity:null},
        {CustomerId:3,InvoiceDate:'2020-05-30',BillingAddress:null,BillingCity:null},
        {CustomerId:3,InvoiceDate:'2020-05-30',BillingAddress:null,BillingCity:null},
        {CustomerId:4,InvoiceDate:'2020-05-30',BillingAddress:null,BillingCity:null},
        {CustomerId:4,InvoiceDate:'2020-05-30',BillingAddress:null,BillingCity:null},
        {CustomerId:5,InvoiceDate:'2020-05-30',BillingAddress:null,BillingCity:null},
        {CustomerId:5,InvoiceDate:'2020-05-30',BillingAddress:null,BillingCity:null},
        {CustomerId:6,InvoiceDate:'2020-05-30',BillingAddress:null,BillingCity:null},
        {CustomerId:6,InvoiceDate:'2020-05-30',BillingAddress:null,BillingCity:null},
        {CustomerId:7,InvoiceDate:'2020-05-30',BillingAddress:null,BillingCity:null},
        {CustomerId:7,InvoiceDate:'2020-05-30',BillingAddress:null,BillingCity:null},
        {CustomerId:8,InvoiceDate:'2020-05-30',BillingAddress:null,BillingCity:null},
        {CustomerId:8,InvoiceDate:'2020-05-30',BillingAddress:null,BillingCity:null},
        {CustomerId:9,InvoiceDate:'2020-05-30',BillingAddress:null,BillingCity:null},
        {CustomerId:9,InvoiceDate:'2020-05-30',BillingAddress:null,BillingCity:null},
        {CustomerId:10,InvoiceDate:'2020-05-30',BillingAddress:null,BillingCity:null},
        {CustomerId:10,InvoiceDate:'2020-05-30',BillingAddress:null,BillingCity:null}
    ])
    
    await tracks.bulkCreate([
        {Name:'La balsa', AlbumId:1, MediaTypeId:1, GenreId:1, Bytes:2, UnitPrice:20.00},
        {Name:'Muchacha (Ojos de papel)', AlbumId:1, MediaTypeId:1, GenreId:1, Bytes:2, UnitPrice:20.00},
        {Name:'Rasguña las piedras', AlbumId:1, MediaTypeId:1, GenreId:1, Bytes:2, UnitPrice:20.00},
        {Name:'De música ligera', AlbumId:1, MediaTypeId:1, GenreId:1, Bytes:2, UnitPrice:20.00},
        {Name:'Ji ji ji', AlbumId:1, MediaTypeId:1, GenreId:1, Bytes:2, UnitPrice:20.00},
        {Name:'Sólo le pido a Dios', AlbumId:2, MediaTypeId:1, GenreId:1, Bytes:2, UnitPrice:20.00},
        {Name:'Presente (El momento en que estás)', AlbumId:2, MediaTypeId:1, GenreId:1, Bytes:2, UnitPrice:20.00},
        {Name:'Seminare', AlbumId:2, MediaTypeId:1, GenreId:1, Bytes:2, UnitPrice:20.00},
        {Name:'Y dale alegría a mi corazón', AlbumId:2, MediaTypeId:1, GenreId:1, Bytes:2, UnitPrice:20.00},
        {Name:'Matador', AlbumId:2, MediaTypeId:1, GenreId:1, Bytes:2, UnitPrice:20.00},
        {Name:'Canción para mi muerte', AlbumId:3, MediaTypeId:1, GenreId:2, Bytes:2, UnitPrice:20.00	},
        {Name:'La rubia tarada', AlbumId:3, MediaTypeId:1, GenreId:2, Bytes:2, UnitPrice:20.00	},
        {Name:'El oso', AlbumId:3, MediaTypeId:1, GenreId:2, Bytes:2, UnitPrice:20.00	},
        {Name:'Mil horas', AlbumId:3, MediaTypeId:1, GenreId:2, Bytes:2, UnitPrice:20.00	},
        {Name:'Tengo', AlbumId:3, MediaTypeId:1, GenreId:2, Bytes:2, UnitPrice:20.00	},
        {Name:'Demoliendo hoteles', AlbumId:4, MediaTypeId:1, GenreId:2, Bytes:2, UnitPrice:20.00	},
        {Name:'Yo vengo a ofrecer mi corazón', AlbumId:4, MediaTypeId:1, GenreId:2, Bytes:2, UnitPrice:20.00	},
        {Name:'Nada que perder', AlbumId:4, MediaTypeId:1, GenreId:2, Bytes:2, UnitPrice:20.00	},
        {Name:'¿Qué ves?', AlbumId:4, MediaTypeId:1, GenreId:2, Bytes:2, UnitPrice:20.00	},
        {Name:'Jugo de tomate', AlbumId:4, MediaTypeId:1, GenreId:2, Bytes:2, UnitPrice:20.00	},

        {Name:'Imágenes paganas', AlbumId:5, MediaTypeId:1, GenreId:3, Bytes:2, UnitPrice:20.00	},
        {Name:'Los viejos vinagres', AlbumId:5, MediaTypeId:1, GenreId:3, Bytes:2, UnitPrice:20.00	},
        {Name:'Flaca', AlbumId:5, MediaTypeId:1, GenreId:3, Bytes:2, UnitPrice:20.00	},
        {Name:'Los dinosaurios', AlbumId:5, MediaTypeId:1, GenreId:3, Bytes:2, UnitPrice:20.00	},
        {Name:'El revelde', AlbumId:5, MediaTypeId:1, GenreId:3, Bytes:2, UnitPrice:20.00	},
        {Name:'Verano del 92', AlbumId:6, MediaTypeId:1, GenreId:3, Bytes:2, UnitPrice:20.00	},
        {Name:'Se viene', AlbumId:6, MediaTypeId:1, GenreId:3, Bytes:2, UnitPrice:20.00	},
        {Name:'Tirá para arriba', AlbumId:6, MediaTypeId:1, GenreId:3, Bytes:2, UnitPrice:20.00	},
        {Name:'11 y 6', AlbumId:6, MediaTypeId:1, GenreId:3, Bytes:2, UnitPrice:20.00	},
        {Name:'Los piratas', AlbumId:6, MediaTypeId:1, GenreId:3, Bytes:2, UnitPrice:20.00	},

        {Name:'Persiana americana', AlbumId:7, MediaTypeId:1, GenreId:4, Bytes:2, UnitPrice:20.00	},
        {Name:'La bestia pop', AlbumId:7, MediaTypeId:1, GenreId:4, Bytes:2, UnitPrice:20.00	},
        {Name:'Seguir viviendo sin tu amor', AlbumId:7, MediaTypeId:1, GenreId:4, Bytes:2, UnitPrice:20.00	},
        {Name:'Para siempre', AlbumId:7, MediaTypeId:1, GenreId:4, Bytes:2, UnitPrice:20.00	},
        {Name:'Abarajame', AlbumId:7, MediaTypeId:1, GenreId:4, Bytes:2, UnitPrice:20.00	},
        {Name:'Mi enfermedad', AlbumId:8, MediaTypeId:1, GenreId:4, Bytes:2, UnitPrice:20.00	},
        {Name:'Y lo que quiero es que pises sin el suelo', AlbumId:8, MediaTypeId:1, GenreId:4, Bytes:2, UnitPrice:20.00	},
        {Name:'Sólo se trata de vivir', AlbumId:8, MediaTypeId:1, GenreId:4, Bytes:2, UnitPrice:20.00	},
        {Name:'Spaghetti del rock', AlbumId:8, MediaTypeId:1, GenreId:4, Bytes:2, UnitPrice:20.00	},
        {Name:'Mirta, de regreso', AlbumId:8, MediaTypeId:1, GenreId:4, Bytes:2, UnitPrice:20.00	},

        {Name:'Uno, dos, ultraviolento', AlbumId:9, MediaTypeId:1, GenreId:5, Bytes:2, UnitPrice:20.00	},
        {Name:'Sin documentos', AlbumId:9, MediaTypeId:1, GenreId:5, Bytes:2, UnitPrice:20.00	},
        {Name:'Yo no quiero volverme tan loco', AlbumId:9, MediaTypeId:1, GenreId:5, Bytes:2, UnitPrice:20.00	},
        {Name:'La música', AlbumId:9, MediaTypeId:1, GenreId:5, Bytes:2, UnitPrice:20.00	},
        {Name:'Hacelo por mí', AlbumId:9, MediaTypeId:1, GenreId:5, Bytes:2, UnitPrice:20.00	},
        {Name:'El amor después del amor', AlbumId:10, MediaTypeId:1, GenreId:5, Bytes:2, UnitPrice:20.00	},
        {Name:'El extraño de pelo largo', AlbumId:10, MediaTypeId:1, GenreId:5, Bytes:2, UnitPrice:20.00	},
        {Name:'En la ciudad de la furia', AlbumId:10, MediaTypeId:1, GenreId:5, Bytes:2, UnitPrice:20.00	},
        {Name:'El tren de las 16', AlbumId:10, MediaTypeId:1, GenreId:5, Bytes:2, UnitPrice:20.00	},
        {Name:'Himno de mi corazón', AlbumId:10, MediaTypeId:1, GenreId:5, Bytes:2, UnitPrice:20.00	},

        {Name:'Vasos vacíos', AlbumId:11, MediaTypeId:1, GenreId:6, Bytes:2, UnitPrice:20.00	},
        {Name:'El anillo del Capitán Beto', AlbumId:11, MediaTypeId:1, GenreId:6, Bytes:2, UnitPrice:20.00	},
        {Name:'No llores por mi, Argentina', AlbumId:11, MediaTypeId:1, GenreId:6, Bytes:2, UnitPrice:20.00	},
        {Name:'Un poco de amor francés', AlbumId:11, MediaTypeId:1, GenreId:6, Bytes:2, UnitPrice:20.00	},
        {Name:'Loco', AlbumId:11, MediaTypeId:1, GenreId:6, Bytes:2, UnitPrice:20.00	},
        {Name:'Pensé que se trataba de cieguitos', AlbumId:12, MediaTypeId:1, GenreId:6, Bytes:2, UnitPrice:20.00	},
        {Name:'Me gusta ese tajo', AlbumId:12, MediaTypeId:1, GenreId:6, Bytes:2, UnitPrice:20.00	},
        {Name:'Vos sabés', AlbumId:12, MediaTypeId:1, GenreId:6, Bytes:2, UnitPrice:20.00	},
        {Name:'Puente', AlbumId:12, MediaTypeId:1, GenreId:6, Bytes:2, UnitPrice:20.00	},
        {Name:'Mañana campestre', AlbumId:12, MediaTypeId:1, GenreId:6, Bytes:2, UnitPrice:20.00	},

        {Name:'El rock del gato', AlbumId:13, MediaTypeId:1, GenreId:7, Bytes:2, UnitPrice:20.00	},
        {Name:'Una luna de miel en la mano', AlbumId:13, MediaTypeId:1, GenreId:7, Bytes:2, UnitPrice:20.00	},
        {Name:'Pupilas lejanas', AlbumId:13, MediaTypeId:1, GenreId:7, Bytes:2, UnitPrice:20.00	},
        {Name:'Mañana en el Abasto', AlbumId:13, MediaTypeId:1, GenreId:7, Bytes:2, UnitPrice:20.00	},
        {Name:'Gente del futuro', AlbumId:13, MediaTypeId:1, GenreId:7, Bytes:2, UnitPrice:20.00	},
        {Name:'Avanti morocha', AlbumId:14, MediaTypeId:1, GenreId:7, Bytes:2, UnitPrice:20.00	},
        {Name:'La colina de la vida', AlbumId:14, MediaTypeId:1, GenreId:7, Bytes:2, UnitPrice:20.00	},
        {Name:'Cuando pase el temblor', AlbumId:14, MediaTypeId:1, GenreId:7, Bytes:2, UnitPrice:20.00	},
        {Name:'La muralla verde', AlbumId:14, MediaTypeId:1, GenreId:7, Bytes:2, UnitPrice:20.00	},
        {Name:'Silencio marginal', AlbumId:14, MediaTypeId:1, GenreId:7, Bytes:2, UnitPrice:20.00	},

        {Name:'Génesis', AlbumId:15, MediaTypeId:1, GenreId:8, Bytes:2, UnitPrice:20.00	},
        {Name:'Trátame suavemente', AlbumId:15, MediaTypeId:1, GenreId:8, Bytes:2, UnitPrice:20.00	},
        {Name:'Es la vida que me alcanza', AlbumId:15, MediaTypeId:1, GenreId:8, Bytes:2, UnitPrice:20.00	},
        {Name:'Mujer amante', AlbumId:15, MediaTypeId:1, GenreId:8, Bytes:2, UnitPrice:20.00	},
        {Name:'Malón', AlbumId:15, MediaTypeId:1, GenreId:8, Bytes:2, UnitPrice:20.00	},
        {Name:'Loco (Tu forma de ser)', AlbumId:16, MediaTypeId:1, GenreId:8, Bytes:2, UnitPrice:20.00	},
        {Name:'El nuevo camino del hombre', AlbumId:16, MediaTypeId:1, GenreId:8, Bytes:2, UnitPrice:20.00	},
        {Name:'La calle es su lugar', AlbumId:16, MediaTypeId:1, GenreId:8, Bytes:2, UnitPrice:20.00	},
        {Name:'Maribel se durmió', AlbumId:16, MediaTypeId:1, GenreId:8, Bytes:2, UnitPrice:20.00	},
        {Name:'La bifurcada', AlbumId:16, MediaTypeId:1, GenreId:8, Bytes:2, UnitPrice:20.00	},
        
        {Name:'Chipi chipi', AlbumId:17, MediaTypeId:1, GenreId:9, Bytes:2, UnitPrice:20.00	},
        {Name:'El bar de la calle Rodney', AlbumId:17, MediaTypeId:1, GenreId:9, Bytes:2, UnitPrice:20.00	},
        {Name:'Puerto Pollensa', AlbumId:17, MediaTypeId:1, GenreId:9, Bytes:2, UnitPrice:20.00	},
        {Name:'Hola que tal', AlbumId:17, MediaTypeId:1, GenreId:9, Bytes:2, UnitPrice:20.00	},
        {Name:'Todo a pulmón', AlbumId:17, MediaTypeId:1, GenreId:9, Bytes:2, UnitPrice:20.00	},
        {Name:'Kanishka', AlbumId:18, MediaTypeId:1, GenreId:9, Bytes:2, UnitPrice:20.00	},
        {Name:'Tan solo', AlbumId:18, MediaTypeId:1, GenreId:9, Bytes:2, UnitPrice:20.00	},
        {Name:'Escafandra', AlbumId:18, MediaTypeId:1, GenreId:9, Bytes:2, UnitPrice:20.00	},
        {Name:'Ya no sos igual', AlbumId:18, MediaTypeId:1, GenreId:9, Bytes:2, UnitPrice:20.00	},
        {Name:'Todo cambia', AlbumId:18, MediaTypeId:1, GenreId:9, Bytes:2, UnitPrice:20.00	},

        {Name:'Playas oscuras', AlbumId:19, MediaTypeId:1, GenreId:10, Bytes:2, UnitPrice:20.00	},
        {Name:'Susy Cadillac', AlbumId:19, MediaTypeId:1, GenreId:10, Bytes:2, UnitPrice:20.00	},
        {Name:'Ella vendrá', AlbumId:19, MediaTypeId:1, GenreId:10, Bytes:2, UnitPrice:20.00	},
        {Name:'Masticar', AlbumId:19, MediaTypeId:1, GenreId:10, Bytes:2, UnitPrice:20.00	},
        {Name:'Amanece en la ruta', AlbumId:19, MediaTypeId:1, GenreId:10, Bytes:2, UnitPrice:20.00	},
        {Name:'Héroes anónimos', AlbumId:20, MediaTypeId:1, GenreId:10, Bytes:2, UnitPrice:20.00	},
        {Name:'Gente que no', AlbumId:20, MediaTypeId:1, GenreId:10, Bytes:2, UnitPrice:20.00	},
        {Name:'Lollipop', AlbumId:20, MediaTypeId:1, GenreId:10, Bytes:2, UnitPrice:20.00	},
        {Name:'Me gustas mucho', AlbumId:20, MediaTypeId:1, GenreId:10, Bytes:2, UnitPrice:20.00	},
        {Name:'Morrissey', AlbumId:20, MediaTypeId:1, GenreId:10, Bytes:2, UnitPrice:20.00	}
    ])

    await playlist_track.bulkCreate([
        {PlaylistId:1,TrackId:1},
        {PlaylistId:1,TrackId:2},
        {PlaylistId:1,TrackId:3},
        {PlaylistId:1,TrackId:4},
        {PlaylistId:1,TrackId:5},
        {PlaylistId:2,TrackId:6},
        {PlaylistId:2,TrackId:7},
        {PlaylistId:2,TrackId:8},
        {PlaylistId:2,TrackId:9},
        {PlaylistId:2,TrackId:10},
        {PlaylistId:3,TrackId:11},
        {PlaylistId:3,TrackId:12},
        {PlaylistId:3,TrackId:13},
        {PlaylistId:3,TrackId:14},
        {PlaylistId:3,TrackId:15},
        {PlaylistId:4,TrackId:16},
        {PlaylistId:4,TrackId:17},
        {PlaylistId:4,TrackId:18},
        {PlaylistId:4,TrackId:19},
        {PlaylistId:4,TrackId:20},
        {PlaylistId:5,TrackId:21},
        {PlaylistId:5,TrackId:22},
        {PlaylistId:5,TrackId:23},
        {PlaylistId:5,TrackId:24},
        {PlaylistId:5,TrackId:25},
        {PlaylistId:6,TrackId:26},
        {PlaylistId:6,TrackId:27},
        {PlaylistId:6,TrackId:28},
        {PlaylistId:6,TrackId:29},
        {PlaylistId:6,TrackId:30},
        {PlaylistId:7,TrackId:31},
        {PlaylistId:7,TrackId:32},
        {PlaylistId:7,TrackId:33},
        {PlaylistId:7,TrackId:34},
        {PlaylistId:7,TrackId:35},
        {PlaylistId:8,TrackId:36},
        {PlaylistId:8,TrackId:37},
        {PlaylistId:8,TrackId:38},
        {PlaylistId:8,TrackId:39},
        {PlaylistId:8,TrackId:40},
        {PlaylistId:9,TrackId:41},
        {PlaylistId:9,TrackId:42},
        {PlaylistId:9,TrackId:43},
        {PlaylistId:9,TrackId:44},
        {PlaylistId:9,TrackId:45},
        {PlaylistId:10,TrackId:46},
        {PlaylistId:10,TrackId:47},
        {PlaylistId:10,TrackId:48},
        {PlaylistId:10,TrackId:49},
        {PlaylistId:10,TrackId:50},
        {PlaylistId:11,TrackId:51},
        {PlaylistId:11,TrackId:52},
        {PlaylistId:11,TrackId:53},
        {PlaylistId:11,TrackId:54},
        {PlaylistId:11,TrackId:55},
        {PlaylistId:12,TrackId:56},
        {PlaylistId:12,TrackId:57},
        {PlaylistId:12,TrackId:58},
        {PlaylistId:12,TrackId:59},
        {PlaylistId:12,TrackId:60},
        {PlaylistId:13,TrackId:61},
        {PlaylistId:13,TrackId:62},
        {PlaylistId:13,TrackId:63},
        {PlaylistId:13,TrackId:64},
        {PlaylistId:13,TrackId:65},
        {PlaylistId:14,TrackId:66},
        {PlaylistId:14,TrackId:67},
        {PlaylistId:14,TrackId:68},
        {PlaylistId:14,TrackId:69},
        {PlaylistId:14,TrackId:70},
        {PlaylistId:15,TrackId:71},
        {PlaylistId:15,TrackId:72},
        {PlaylistId:15,TrackId:73},
        {PlaylistId:15,TrackId:74},
        {PlaylistId:15,TrackId:75},
        {PlaylistId:16,TrackId:76},
        {PlaylistId:16,TrackId:77},
        {PlaylistId:16,TrackId:78},
        {PlaylistId:16,TrackId:79},
        {PlaylistId:16,TrackId:80},
        {PlaylistId:17,TrackId:81},
        {PlaylistId:17,TrackId:82},
        {PlaylistId:17,TrackId:83},
        {PlaylistId:17,TrackId:84},
        {PlaylistId:17,TrackId:85},
        {PlaylistId:18,TrackId:86},
        {PlaylistId:18,TrackId:87},
        {PlaylistId:18,TrackId:88},
        {PlaylistId:18,TrackId:89},
        {PlaylistId:18,TrackId:90},
        {PlaylistId:19,TrackId:91},
        {PlaylistId:19,TrackId:92},
        {PlaylistId:19,TrackId:93},
        {PlaylistId:19,TrackId:94},
        {PlaylistId:19,TrackId:95},
        {PlaylistId:20,TrackId:96},
        {PlaylistId:20,TrackId:97},
        {PlaylistId:20,TrackId:98},
        {PlaylistId:20,TrackId:99},
        {PlaylistId:20,TrackId:100}
    ])

    await invoice_items.bulkCreate([
        { InvoiceId:1, TrackId:1, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:1, TrackId:2, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:1, TrackId:3, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:1, TrackId:4, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:1, TrackId:5, UnitPrice:20.00, Quantity:2 },
        
        { InvoiceId:2, TrackId:6, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:2, TrackId:7, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:2, TrackId:8, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:2, TrackId:9, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:2, TrackId:10, UnitPrice:20.00, Quantity:2 },

        { InvoiceId:3, TrackId:11, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:3, TrackId:12, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:3, TrackId:13, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:3, TrackId:14, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:3, TrackId:15, UnitPrice:20.00, Quantity:2 },

        { InvoiceId:4, TrackId:16, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:4, TrackId:17, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:4, TrackId:18, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:4, TrackId:19, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:4, TrackId:20, UnitPrice:20.00, Quantity:2 },

        { InvoiceId:5, TrackId:21, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:5, TrackId:22, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:5, TrackId:23, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:5, TrackId:24, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:5, TrackId:25, UnitPrice:20.00, Quantity:2 },

        { InvoiceId:6, TrackId:26, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:6, TrackId:27, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:6, TrackId:28, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:6, TrackId:29, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:6, TrackId:30, UnitPrice:20.00, Quantity:2 },

        { InvoiceId:7, TrackId:31, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:7, TrackId:32, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:7, TrackId:33, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:7, TrackId:34, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:7, TrackId:35, UnitPrice:20.00, Quantity:2 },

        { InvoiceId:8, TrackId:36, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:8, TrackId:37, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:8, TrackId:38, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:8, TrackId:39, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:8, TrackId:40, UnitPrice:20.00, Quantity:2 },

        { InvoiceId:9, TrackId:41, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:9, TrackId:42, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:9, TrackId:43, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:9, TrackId:44, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:9, TrackId:45, UnitPrice:20.00, Quantity:2 },

        { InvoiceId:10, TrackId:46, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:10, TrackId:47, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:10, TrackId:48, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:10, TrackId:49, UnitPrice:20.00, Quantity:2 },
        { InvoiceId:10, TrackId:50, UnitPrice:20.00, Quantity:2 }
    ])
})();

module.exports = {
   album,
   artist,
   genre,
   customer,
   employee,
   mediaType,
   playlist,
   track,
   invoice,
   invoiceItems,
   playlistTracks
}

