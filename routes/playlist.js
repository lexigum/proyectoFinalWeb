const routes = require("express").Router();

module.exports = (models)=>{

    //GET /api/playlists/track - Obtiene todas las playlist donde se encuentra el track
    routes.get('/:track', async (req,res) => {
        const TrackID = req.params.track;
        const play = []
        let playlistTracks = await models.playlistTracks.findAll({
            where: { TrackId: TrackID}
        });
        playlistTracks.map(playt => {
            play.push(playt.dataValues.PlaylistId)
        })
        let playlist = await models.playlist.findAll({
            where: {PlaylistId: play}
        })
        res.send(playlist);
    });

    return routes;
}