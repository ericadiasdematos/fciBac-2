
import Api from './apiFunction';

beforeEach(() => {
  fetch.resetMocks();
});

it('Return data', async () => {
    fetch.mockResponseOnce(JSON.stringify({
      result: [
        {
            id: "18012708283123581",
            caption: "Toujours prêt à vous recevoir du lundi au samedi Toujours prêt à trouver ce qui vous conviendra  : 07.86.11.61.82\n✉ : Jeremy.debreux@gmail.com : paris / houdan / région parisienne : www.fcimmo.com  : www.fcisyndic.com",
            media_url: "https://scontent-cdt1-1.cdninstagram.com/v/t51.2885-15/50802688_176267883353833_3024583429391640836_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=rKXV5cFFPzwAX_iOysD&_nc_ht=scontent-cdt1-1.cdninstagram.com&oh=d8dd1b3b9c9353cbad4f4f60e75d6ebb&oe=608877CF",
            media_type: "IMAGE",
            timestamp: "2019-02-11T18:34:25+0000"
        }],
    }));
    const res = await Api.getData();
    expect(res).toEqual([{
        id: "18012708283123581",
        caption: "Toujours prêt à vous recevoir du lundi au samedi Toujours prêt à trouver ce qui vous conviendra  : 07.86.11.61.82\n✉ : Jeremy.debreux@gmail.com : paris / houdan / région parisienne : www.fcimmo.com  : www.fcisyndic.com",
        media_url: "https://scontent-cdt1-1.cdninstagram.com/v/t51.2885-15/50802688_176267883353833_3024583429391640836_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=8ae9d6&_nc_ohc=rKXV5cFFPzwAX_iOysD&_nc_ht=scontent-cdt1-1.cdninstagram.com&oh=d8dd1b3b9c9353cbad4f4f60e75d6ebb&oe=608877CF",
        media_type: "IMAGE",
        timestamp: "2019-02-11T18:34:25+0000"
    }]);
    expect(fetch.mock.calls.length).toEqual(1);
  });

