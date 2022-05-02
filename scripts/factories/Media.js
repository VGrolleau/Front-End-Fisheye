class MediaFactory {
    constructor(data) {
        if ("image" in data) {
            console.log("image")
            return new Photo(data);
        } else if ("video" in data) {
            console.log("video")
            return new Video(data);
        } else {
            throw "Unknown media";
        }
    }
}