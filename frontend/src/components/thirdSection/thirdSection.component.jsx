import {
  ElementText,
  ElementTitle,
  ThirdSecContainer,
  ThirdSecElement,
  ThirdSecImageContent,
  ThirdSecTextContent,
  ThirdSecWrapper,
} from "./thirdSection.style";

const ThirdSection = () => {
  return (
    <ThirdSecContainer>
      <ThirdSecWrapper>
        <ThirdSecElement>
          <ThirdSecTextContent>
            <ElementTitle>Why Canadian Rockies?</ElementTitle>
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
          <ThirdSecImageContent>
            <img src="images/canadianRockies.jpg" alt="canadian rockies" />
          </ThirdSecImageContent>
        </ThirdSecElement>
        <ThirdSecElement>
          <ThirdSecImageContent>
            <img src="images/desert.jpg" alt="desert" />
          </ThirdSecImageContent>
          <ThirdSecTextContent>
            <ElementTitle>Why Hiking in the Desert?</ElementTitle>
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
          <ThirdSecTextContent>
            <ElementTitle>
              Why Taking Your Family on a Hiking Tour With Us?
            </ElementTitle>
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
          <ThirdSecImageContent>
            <img src="images/family.jpg" alt="Family hiking" />
          </ThirdSecImageContent>
        </ThirdSecElement>
      </ThirdSecWrapper>
    </ThirdSecContainer>
  );
};

export default ThirdSection;
