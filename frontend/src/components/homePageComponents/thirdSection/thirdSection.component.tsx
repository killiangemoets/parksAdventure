import { useEffect } from "react";
import Title, {
  TITLE_TYPE_CLASSES,
} from "../../UIComponents/title/title.component";
import {
  ElementText,
  ThirdSecContainer,
  ThirdSecElement,
  ThirdSecImageContent,
  ThirdSecTextContent,
  ThirdSecWrapper,
} from "./thirdSection.style";

import canadianRockiesImg from "../../../assets/images/mainFilters/canadianRockies.webp";
import desertImg from "../../../assets/images/mainFilters/desert.webp";
import familyImg from "../../../assets/images/mainFilters/family.webp";

const ThirdSection = () => {
  const checkBoxes = (): void => {
    const triggerBottom = (window.innerHeight / 5) * 4;

    const boxes = document.querySelectorAll(".box");

    boxes.forEach((box, i) => {
      const boxTop = box.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        box.classList.add("show");
      }
    });
  };

  useEffect(() => {
    checkBoxes();
    window.addEventListener("scroll", checkBoxes);
  }, []);

  return (
    <ThirdSecContainer>
      <ThirdSecWrapper>
        <ThirdSecElement>
          <ThirdSecTextContent className="box box-left">
            <Title titleType={TITLE_TYPE_CLASSES.homeSubSection}>
              Why Exploring the Canadian Rockies?
            </Title>
            <ElementText>
              The Canadian Rockies are home to several renowned national parks,
              including Banff, Jasper, Soho, Kootenay, and Waterton Lakes. These
              parks are all known for their stunning and diverse landscapes,
              including majestic mountains, crystal-clear lakes, dense forests,
              and meadows filled with wildflowers. The beauty of the scenery is
              truly awe-inspiring and provides a sense of tranquility and
              connection to nature.
              <br />
              <br />
              Next, the Rockies are home to some of the most famous and iconic
              peaks in North America, , including Mount Robson, Mount Columbia,
              and the Three Sisters. They provide challenging and rewarding
              hiking opportunities for both experienced and novice hikers. The
              region offers trails of varying difficulty levels, from easy walks
              suitable for families to challenging alpine routes for experienced
              hikers and mountaineers. So whether you're looking for a short day
              hike or a multi-day backpacking adventure, the Canadian Rockies
              cater to a wide range of preferences. The extensive trail network
              ensures that everyone can find a suitable route.
            </ElementText>
          </ThirdSecTextContent>
          <ThirdSecImageContent className="box box-right">
            <img src={canadianRockiesImg} alt="canadian rockies" />
          </ThirdSecImageContent>
        </ThirdSecElement>
        <ThirdSecElement>
          <ThirdSecImageContent className="box box-left">
            <img src={desertImg} alt="desert" />
          </ThirdSecImageContent>
          <ThirdSecTextContent className="box box-right">
            <Title titleType={TITLE_TYPE_CLASSES.homeSubSection}>
              Why Hiking in the Desert?
            </Title>
            <ElementText>
              First, deserts have a stark and mesmerizing beauty that's unlike
              any other landscape. Vast expanses of sand dunes, rugged rock
              formations, and unique geological features create a visually
              captivating environment. Deserts are also home to a variety of
              exciting animals adapted to extreme conditions, such as lizards,
              snakes, birds, and desert mammals.
              <br />
              <br />
              The lack of dense vegetation in many desert areas means that
              hikers can often enjoy panoramic, unobstructed views of the
              surrounding landscape. This can lead to breathtaking vistas,
              especially during sunrise and sunset.
              <br />
              <br />
              Finally, many desert areas offer clear, unpolluted night skies,
              making them ideal for stargazing. The absence of city lights
              allows for breathtaking views of celestial bodies, including
              stars, planets, and meteor showers.
            </ElementText>
          </ThirdSecTextContent>
        </ThirdSecElement>
        <ThirdSecElement>
          <ThirdSecTextContent className="box box-left">
            <Title titleType={TITLE_TYPE_CLASSES.homeSubSection}>
              Why Taking Your Family on a Hiking Tour With Us?
            </Title>
            <ElementText>
              Planning a multiple-day hiking trip can be complex and
              time-consuming. Our professional tour guides take care of the
              logistical details, including route planning, accommodations,
              meals, and transportation, allowing your family to focus on
              enjoying the experience. We offer a range of difficulty levels,
              allowing family members of different fitness levels and ages to
              participate. This inclusivity ensures that everyone can enjoy the
              experience!
              <br />
              <br />
              Also, our tour guides offer insights into the natural and cultural
              aspects of the hiking route. They will share information about
              local flora, fauna, geology, and history, making the hike not only
              fun but also educational.
              <br />
              <br />
              Last but not least, having a knowledgeable tour guide ensures that
              your family will be in safe hands throughout the journey. Our
              guides are trained in first aid, navigation, and handling various
              outdoor situations, providing you with peace of mind.
            </ElementText>
          </ThirdSecTextContent>
          <ThirdSecImageContent className="box box-right">
            <img src={familyImg} alt="Family hiking" />
          </ThirdSecImageContent>
        </ThirdSecElement>
      </ThirdSecWrapper>
    </ThirdSecContainer>
  );
};

export default ThirdSection;
