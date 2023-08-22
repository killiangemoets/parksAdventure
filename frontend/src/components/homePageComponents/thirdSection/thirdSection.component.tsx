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
              Why Canadian Rockies?
            </Title>
            <ElementText>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
              mollitia tempore nesciunt pariatur, consequuntur ut nulla
              voluptatem exercitationem eligendi iure? Nulla commodi suscipit et
              exercitationem est porro aliquam molestiae facilis. Lorem ipsum
              dolor sit amet consectetur, adipisicing elit. Ea ipsa odit nihil
              in magni explicabo libero quisquam, exercitationem beatae!
              Repellendus neque rerum commodi nobis accusantium quod corporis,
              <br />
              <br />
              soluta provident repudiandae!Exercitationem est porro aliquam
              molestiae facilis. Lorem ipsum dolor sit amet consectetur,
              adipisicing elit. Ea ipsa odit nihil in magni explicabo libero
              quisquam, exercitationem beatae! Repellendus neque rerum commodi
              nobis accusantium quod corporis, soluta provident repudiandae!
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Ipsaaliquam molestiae facilis. Lorem ipsum dolor sit amet
              Ipsaaliquam molestiae facilis. Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Ea ipsa odit nihil in magni
              explicabo libero quisquam, exercitationem beatae!
              <br />
              <br />
              Repellendus neque rerum commodi nobis accusantium quod corporis,
              soluta provident repudiandae! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Beatae, reprehenderit quaerat culpa
              necessitatibus exercitationem hic modi animi iure repellat iste
              <br />
              <br />
              illum, praesentium, debitis cupiditate nulla architecto quisquam
              tempore dolor voluptate.
            </ElementText>
          </ThirdSecTextContent>
        </ThirdSecElement>
        <ThirdSecElement>
          <ThirdSecTextContent className="box box-left">
            <Title titleType={TITLE_TYPE_CLASSES.homeSubSection}>
              Why Taking Your Family on a Hiking Tour With Us?
            </Title>
            <ElementText>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa?
              <br />
              <br />
              mollitia tempore nesciunt pariatur, consequuntur ut nulla
              voluptatem exercitationem eligendi iure? Nulla commodi suscipit et
              exercitationem est porro aliquam molestiae facilis. Lorem ipsum
              dolor sit amet consectetur, adipisicing elit. Ea ipsa odit nihil
              in magni explicabo libero quisquam, exercitationem beatae!
              <br />
              <br />
              Repellendus neque rerum commodi nobis accusantium quod corporis,
              soluta provident repudiandae! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Provident voluptate facilis
              voluptatum consequuntur, est illum. Consectetur cupiditate quod
              sunt voluptatum! Dolores minima autem consequuntur blanditiis
              optio vero laboriosam quam officiis.
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
