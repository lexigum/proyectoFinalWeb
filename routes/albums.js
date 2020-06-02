const routes = require("express").Router();

module.exports = (models)=>{

    //GET /api/albums?artistId - Obtiene los albums del artista
    routes.get('/', async (req,res) => {
        const artistId = req.query.artistId
        let albums = await models.album.findAll({
            where: { ArtistId: artistId}
        })
        res.send(albums)
    });

    return routes;
}