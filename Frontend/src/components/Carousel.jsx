import Carousel from "react-material-ui-carousel";
import { colorTokens } from "../theme";

const CarouselWidget = () => {
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiTHouB53d2smKXcdqRKRCww-DiaRyVr-iKZMHCLIp&s",
        },
        {
            name: "Random Name #2",
            description: "Hello World!",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiTHouB53d2smKXcdqRKRCww-DiaRyVr-iKZMHCLIp&s",
        },
    ];

    return (
        <Carousel
            autoPlay={false}
            animation="slide"
            indicators={false}
            navButtonsAlwaysVisible={true}
            navButtonsProps={{
                style: {
                    backgroundColor: "transparent",
                    color: colorTokens.grey[550],
                    borderRadius: 0,
                    margin: 0,
                    width: 30,
                    height: 30,
                    padding: 0,
                    top: "calc(50% - 15px)",
                    "&:hover": {
                        backgroundColor: "transparent",
                        color: colorTokens.grey[550],
                        opacity: 1,
                    },
                },
            }}
            NextIcon={<Button>Next</Button>}
            next={(next, active) =>
                console.log(`we left ${active}, and are now at ${next}`)
            }
        >
            {items.map((item, i) => (
                <Item key={i} item={item} />
            ))}
        </Carousel>
    );
};

const Item = ({ item }) => {
    return <div>{item.name}</div>;
};

export default CarouselWidget;
