class MediaFactory {
    constructor(data, namePhotographer) {
        if ("image" in data) {
            return new Photo(data, namePhotographer);
        } else if ("video" in data) {
            return new Video(data, namePhotographer);
        } else {
            throw "Unknown media";
        }
    }
}