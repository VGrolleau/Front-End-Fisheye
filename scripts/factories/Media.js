class MediaFactory {
    constructor(data, namePhotographer) {
        if ("image" in data) {
            console.log("image")
            return new Photo(data, namePhotographer);
        } else if ("video" in data) {
            console.log("video")
            return new Video(data, namePhotographer);
        } else {
            throw "Unknown media";
        }
    }
}