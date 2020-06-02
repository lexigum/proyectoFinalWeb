const routes = require("express").Router();

module.exports = (models)=>{

    //GET /api/tracks?artist - Obtiene todas las pistas del artista
    routes.get('/', async (req,res) => {
        const artid = req.query.artist;
        console.log(artid);
      
        const albumsids = [];

       
        let albums = await models.album.findAll({
            where: {ArtistID: artid}
        });

        albums.map(album =>{
            albumsids.push(album.dataValues.AlbumId)
        }); 

        let tracks = await models.track.findAll({
            where: {AlbumId: albumsids}
        });

        res.send(tracks);
    });

    return routes;
}