import React, { useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Container, Button, Modal } from "react-bootstrap";
import "./ResponsiveCarousel.css";
import drKhandelwal from "../../assets/images/dr-ankit-khandelwal.png";
import drAnupama from "../../assets/images/dr-anupama.png";
import drAmit from "../../assets/images/dr-amit.png";
import icon from "../../assets/images/teacher-carousel-icon.png";

const options = {
  loop: true,
  margin: 10,
  page: 1,
  items: 1,
  autoplay: false,
};

const ResponsiveCarousel = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const handleShowModal = (profile) => {
    setSelectedProfile(profile);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProfile(null);
    setShowModal(false);
  };

  const prof1 = [
    {
      image: drKhandelwal,
      name: "Dr. Ankit Khandelwal",
      experience: "14+ Years of Experience",
      description:
        "Dr. Ankit Khandelwal is a distinguished Anatomist and faculty member with extensive experience in teaching.",
      video:
        "https://student.allennext.com/api/v1/src/player/805085157?h=4df8d01a9e",
      about:
        "Dr. Ankit Khandelwal is a distinguished Anatomist and faculty member with extensive experience in teaching. He has over 14 years of experience in teaching through both online and offline platforms and is known as a leading authority in the field. Dr. Khandelwal earned his MBBS degree from the prestigious King George Medical College in Lucknow, followed by an MS in Anatomy from S.N. Medical College in Agra, and completed his Senior residency at UCMS Delhi.Currently, Dr. Khandelwal holds the position of Associate Professor of Anatomy and has numerous publications in both National and International medical journals, which makes him a valuable asset to our faculty team. With his expertise and passion for teaching, he is well-equipped to guide students with their inquiries in the field of Anatomy.",
    },
    {
      image: drAnupama,
      name: "Dr. Anupama",
      experience: "14+ Years of Experience",
      description:
        "Dr. Anupama Chowdhry Devgan is a distinguished alumnus of AFMC, Pune, with remarkable academic ",
      video:
        "https://student.allennext.com/api/v1/src/player/805085239?h=98f7416b83",
      about:
        "Dr. Anupama Chowdhry Devgan is a distinguished alumnus of AFMC, Pune, with remarkable academic achievements and extracurricular activities. She graduated with a distinction in Biochemistry and received a Gold Medal in Pathology. She served as a Short Service Commission Officer in the Army Medical Corps before completing her MD and DNB in Physiology from BJMC, Ahmedabad.Dr. Anupama has more than 25 years of experience teaching Physiology at various medical colleges across the country, including BJMC (Ahmedabad), NRS Medical College (Kolkata), and ACMS (New Delhi). For the past 17 years, she has been passionately guiding students preparing for MD/MS entrance exams such as NEET PG, INICET, FMGE, and USMLE at a premier coaching institute. Dr. Anupama has also been actively mentoring and tutoring students for different entrance exams, both nationally and internationally.As part of the ALLEN NExT team, Dr. Anupama Devgan is sharing her expertise in Physiology with aspiring medical specialists. With her extensive experience in teaching and mentoring, she is a perfect guide for students preparing for entrance exams. Drawing from her own academic achievements and experiences, she will be able to provide valuable insights on how to excel in these exams.",
    },
    {
      image: drAmit,
      name: "Dr. Amit Jain",
      experience: "14+ Years of Experience",
      description:
        "Dr. Amit Jain is a highly respected and sought-after professor of Biochemistry, with over a decade of",
      video:
        "https://student.allennext.com/api/v1/src/player/805085366?h=05566aa68d",
      about:
        "Dr. Amit Jain is a highly respected and sought-after professor of Biochemistry, with over a decade of experience in teaching and research. A graduate of the prestigious Maulana Azad Medical College, Dr. Jain brings a wealth of knowledge and expertise to our faculty team and is dedicated to helping students develop a deep understanding of the subject. His innovative teaching methods, which include the use of mind maps and clinical scenarios, make Biochemistry accessible and enjoyable for learners of all levels.Dr. Jain's commitment to excellence and passion for his work has earned him a reputation as one of the most inspiring and effective educators in the field.",
    },
    {
      image: drAmit,
      name: "Dr. Amit Jain",
      experience: "14+ Years of Experience",
      description:
        "Dr. Amit Jain is a highly respected and sought-after professor of Biochemistry, with over a decade of",
      video:
        "https://student.allennext.com/api/v1/src/player/805085366?h=05566aa68d",
      about:
        "Dr. Amit Jain is a highly respected and sought-after professor of Biochemistry, with over a decade of experience in teaching and research. A graduate of the prestigious Maulana Azad Medical College, Dr. Jain brings a wealth of knowledge and expertise to our faculty team and is dedicated to helping students develop a deep understanding of the subject. His innovative teaching methods, which include the use of mind maps and clinical scenarios, make Biochemistry accessible and enjoyable for learners of all levels.Dr. Jain's commitment to excellence and passion for his work has earned him a reputation as one of the most inspiring and effective educators in the field.",
    },
    {
      image: drKhandelwal,
      name: "Dr. Ankit Khandelwal",
      experience: "14+ Years of Experience",
      description:
        "Dr. Ankit Khandelwal is a distinguished Anatomist and faculty member with extensive experience in teaching.",
      video:
        "https://student.allennext.com/api/v1/src/player/805085157?h=4df8d01a9e",
      about:
        "Dr. Ankit Khandelwal is a distinguished Anatomist and faculty member with extensive experience in teaching. He has over 14 years of experience in teaching through both online and offline platforms and is known as a leading authority in the field. Dr. Khandelwal earned his MBBS degree from the prestigious King George Medical College in Lucknow, followed by an MS in Anatomy from S.N. Medical College in Agra, and completed his Senior residency at UCMS Delhi.Currently, Dr. Khandelwal holds the position of Associate Professor of Anatomy and has numerous publications in both National and International medical journals, which makes him a valuable asset to our faculty team. With his expertise and passion for teaching, he is well-equipped to guide students with their inquiries in the field of Anatomy.",
    },
    {
      image: drAnupama,
      name: "Dr. Anupama",
      experience: "14+ Years of Experience",
      description:
        "Dr. Anupama Chowdhry Devgan is a distinguished alumnus of AFMC, Pune, with remarkable academic ",
      video:
        "https://student.allennext.com/api/v1/src/player/805085239?h=98f7416b83",
      about:
        "Dr. Anupama Chowdhry Devgan is a distinguished alumnus of AFMC, Pune, with remarkable academic achievements and extracurricular activities. She graduated with a distinction in Biochemistry and received a Gold Medal in Pathology. She served as a Short Service Commission Officer in the Army Medical Corps before completing her MD and DNB in Physiology from BJMC, Ahmedabad.Dr. Anupama has more than 25 years of experience teaching Physiology at various medical colleges across the country, including BJMC (Ahmedabad), NRS Medical College (Kolkata), and ACMS (New Delhi). For the past 17 years, she has been passionately guiding students preparing for MD/MS entrance exams such as NEET PG, INICET, FMGE, and USMLE at a premier coaching institute. Dr. Anupama has also been actively mentoring and tutoring students for different entrance exams, both nationally and internationally.As part of the ALLEN NExT team, Dr. Anupama Devgan is sharing her expertise in Physiology with aspiring medical specialists. With her extensive experience in teaching and mentoring, she is a perfect guide for students preparing for entrance exams. Drawing from her own academic achievements and experiences, she will be able to provide valuable insights on how to excel in these exams.",
    },
  ];
  const prof2 = [
    {
      image: drKhandelwal,
      name: "Dr. Ankit Khandelwal",
      experience: "14+ Years of Experience",
      description:
        "Dr. Ankit Khandelwal is a distinguished Anatomist and faculty member with extensive experience in teaching.",
      video:
        "https://student.allennext.com/api/v1/src/player/805085157?h=4df8d01a9e",
      about:
        "Dr. Ankit Khandelwal is a distinguished Anatomist and faculty member with extensive experience in teaching. He has over 14 years of experience in teaching through both online and offline platforms and is known as a leading authority in the field. Dr. Khandelwal earned his MBBS degree from the prestigious King George Medical College in Lucknow, followed by an MS in Anatomy from S.N. Medical College in Agra, and completed his Senior residency at UCMS Delhi.Currently, Dr. Khandelwal holds the position of Associate Professor of Anatomy and has numerous publications in both National and International medical journals, which makes him a valuable asset to our faculty team. With his expertise and passion for teaching, he is well-equipped to guide students with their inquiries in the field of Anatomy.",
    },
    {
      image: drAnupama,
      name: "Dr. Anupama",
      experience: "14+ Years of Experience",
      description:
        "Dr. Anupama Chowdhry Devgan is a distinguished alumnus of AFMC, Pune, with remarkable academic ",
      video:
        "https://student.allennext.com/api/v1/src/player/805085239?h=98f7416b83",
      about:
        "Dr. Anupama Chowdhry Devgan is a distinguished alumnus of AFMC, Pune, with remarkable academic achievements and extracurricular activities. She graduated with a distinction in Biochemistry and received a Gold Medal in Pathology. She served as a Short Service Commission Officer in the Army Medical Corps before completing her MD and DNB in Physiology from BJMC, Ahmedabad.Dr. Anupama has more than 25 years of experience teaching Physiology at various medical colleges across the country, including BJMC (Ahmedabad), NRS Medical College (Kolkata), and ACMS (New Delhi). For the past 17 years, she has been passionately guiding students preparing for MD/MS entrance exams such as NEET PG, INICET, FMGE, and USMLE at a premier coaching institute. Dr. Anupama has also been actively mentoring and tutoring students for different entrance exams, both nationally and internationally.As part of the ALLEN NExT team, Dr. Anupama Devgan is sharing her expertise in Physiology with aspiring medical specialists. With her extensive experience in teaching and mentoring, she is a perfect guide for students preparing for entrance exams. Drawing from her own academic achievements and experiences, she will be able to provide valuable insights on how to excel in these exams.",
    },
    {
      image: drAmit,
      name: "Dr. Amit Jain",
      experience: "14+ Years of Experience",
      description:
        "Dr. Amit Jain is a highly respected and sought-after professor of Biochemistry, with over a decade of",
      video:
        "https://student.allennext.com/api/v1/src/player/805085366?h=05566aa68d",
      about:
        "Dr. Amit Jain is a highly respected and sought-after professor of Biochemistry, with over a decade of experience in teaching and research. A graduate of the prestigious Maulana Azad Medical College, Dr. Jain brings a wealth of knowledge and expertise to our faculty team and is dedicated to helping students develop a deep understanding of the subject. His innovative teaching methods, which include the use of mind maps and clinical scenarios, make Biochemistry accessible and enjoyable for learners of all levels.Dr. Jain's commitment to excellence and passion for his work has earned him a reputation as one of the most inspiring and effective educators in the field.",
    },
    {
      image: drAmit,
      name: "Dr. Amit Jain",
      experience: "14+ Years of Experience",
      description:
        "Dr. Amit Jain is a highly respected and sought-after professor of Biochemistry, with over a decade of",
      video:
        "https://student.allennext.com/api/v1/src/player/805085366?h=05566aa68d",
      about:
        "Dr. Amit Jain is a highly respected and sought-after professor of Biochemistry, with over a decade of experience in teaching and research. A graduate of the prestigious Maulana Azad Medical College, Dr. Jain brings a wealth of knowledge and expertise to our faculty team and is dedicated to helping students develop a deep understanding of the subject. His innovative teaching methods, which include the use of mind maps and clinical scenarios, make Biochemistry accessible and enjoyable for learners of all levels.Dr. Jain's commitment to excellence and passion for his work has earned him a reputation as one of the most inspiring and effective educators in the field.",
    },
    {
      image: drKhandelwal,
      name: "Dr. Ankit Khandelwal",
      experience: "14+ Years of Experience",
      description:
        "Dr. Ankit Khandelwal is a distinguished Anatomist and faculty member with extensive experience in teaching.",
      video:
        "https://student.allennext.com/api/v1/src/player/805085157?h=4df8d01a9e",
      about:
        "Dr. Ankit Khandelwal is a distinguished Anatomist and faculty member with extensive experience in teaching. He has over 14 years of experience in teaching through both online and offline platforms and is known as a leading authority in the field. Dr. Khandelwal earned his MBBS degree from the prestigious King George Medical College in Lucknow, followed by an MS in Anatomy from S.N. Medical College in Agra, and completed his Senior residency at UCMS Delhi.Currently, Dr. Khandelwal holds the position of Associate Professor of Anatomy and has numerous publications in both National and International medical journals, which makes him a valuable asset to our faculty team. With his expertise and passion for teaching, he is well-equipped to guide students with their inquiries in the field of Anatomy.",
    },
    {
      image: drAnupama,
      name: "Dr. Anupama",
      experience: "14+ Years of Experience",
      description:
        "Dr. Anupama Chowdhry Devgan is a distinguished alumnus of AFMC, Pune, with remarkable academic ",
      video:
        "https://student.allennext.com/api/v1/src/player/805085239?h=98f7416b83",
      about:
        "Dr. Anupama Chowdhry Devgan is a distinguished alumnus of AFMC, Pune, with remarkable academic achievements and extracurricular activities. She graduated with a distinction in Biochemistry and received a Gold Medal in Pathology. She served as a Short Service Commission Officer in the Army Medical Corps before completing her MD and DNB in Physiology from BJMC, Ahmedabad.Dr. Anupama has more than 25 years of experience teaching Physiology at various medical colleges across the country, including BJMC (Ahmedabad), NRS Medical College (Kolkata), and ACMS (New Delhi). For the past 17 years, she has been passionately guiding students preparing for MD/MS entrance exams such as NEET PG, INICET, FMGE, and USMLE at a premier coaching institute. Dr. Anupama has also been actively mentoring and tutoring students for different entrance exams, both nationally and internationally.As part of the ALLEN NExT team, Dr. Anupama Devgan is sharing her expertise in Physiology with aspiring medical specialists. With her extensive experience in teaching and mentoring, she is a perfect guide for students preparing for entrance exams. Drawing from her own academic achievements and experiences, she will be able to provide valuable insights on how to excel in these exams.",
    },
  ];
  const prof3 = [
    {
      image: drKhandelwal,
      name: "Dr. Ankit Khandelwal",
      experience: "14+ Years of Experience",
      description:
        "Dr. Ankit Khandelwal is a distinguished Anatomist and faculty member with extensive experience in teaching.",
      video:
        "https://student.allennext.com/api/v1/src/player/805085157?h=4df8d01a9e",
      about:
        "Dr. Ankit Khandelwal is a distinguished Anatomist and faculty member with extensive experience in teaching. He has over 14 years of experience in teaching through both online and offline platforms and is known as a leading authority in the field. Dr. Khandelwal earned his MBBS degree from the prestigious King George Medical College in Lucknow, followed by an MS in Anatomy from S.N. Medical College in Agra, and completed his Senior residency at UCMS Delhi.Currently, Dr. Khandelwal holds the position of Associate Professor of Anatomy and has numerous publications in both National and International medical journals, which makes him a valuable asset to our faculty team. With his expertise and passion for teaching, he is well-equipped to guide students with their inquiries in the field of Anatomy.",
    },
    {
      image: drAnupama,
      name: "Dr. Anupama",
      experience: "14+ Years of Experience",
      description:
        "Dr. Anupama Chowdhry Devgan is a distinguished alumnus of AFMC, Pune, with remarkable academic ",
      video:
        "https://student.allennext.com/api/v1/src/player/805085239?h=98f7416b83",
      about:
        "Dr. Anupama Chowdhry Devgan is a distinguished alumnus of AFMC, Pune, with remarkable academic achievements and extracurricular activities. She graduated with a distinction in Biochemistry and received a Gold Medal in Pathology. She served as a Short Service Commission Officer in the Army Medical Corps before completing her MD and DNB in Physiology from BJMC, Ahmedabad.Dr. Anupama has more than 25 years of experience teaching Physiology at various medical colleges across the country, including BJMC (Ahmedabad), NRS Medical College (Kolkata), and ACMS (New Delhi). For the past 17 years, she has been passionately guiding students preparing for MD/MS entrance exams such as NEET PG, INICET, FMGE, and USMLE at a premier coaching institute. Dr. Anupama has also been actively mentoring and tutoring students for different entrance exams, both nationally and internationally.As part of the ALLEN NExT team, Dr. Anupama Devgan is sharing her expertise in Physiology with aspiring medical specialists. With her extensive experience in teaching and mentoring, she is a perfect guide for students preparing for entrance exams. Drawing from her own academic achievements and experiences, she will be able to provide valuable insights on how to excel in these exams.",
    },
    {
      image: drAmit,
      name: "Dr. Amit Jain",
      experience: "14+ Years of Experience",
      description:
        "Dr. Amit Jain is a highly respected and sought-after professor of Biochemistry, with over a decade of",
      video:
        "https://student.allennext.com/api/v1/src/player/805085366?h=05566aa68d",
      about:
        "Dr. Amit Jain is a highly respected and sought-after professor of Biochemistry, with over a decade of experience in teaching and research. A graduate of the prestigious Maulana Azad Medical College, Dr. Jain brings a wealth of knowledge and expertise to our faculty team and is dedicated to helping students develop a deep understanding of the subject. His innovative teaching methods, which include the use of mind maps and clinical scenarios, make Biochemistry accessible and enjoyable for learners of all levels.Dr. Jain's commitment to excellence and passion for his work has earned him a reputation as one of the most inspiring and effective educators in the field.",
    },
    {
      image: drAmit,
      name: "Dr. Amit Jain",
      experience: "14+ Years of Experience",
      description:
        "Dr. Amit Jain is a highly respected and sought-after professor of Biochemistry, with over a decade of",
      video:
        "https://student.allennext.com/api/v1/src/player/805085366?h=05566aa68d",
      about:
        "Dr. Amit Jain is a highly respected and sought-after professor of Biochemistry, with over a decade of experience in teaching and research. A graduate of the prestigious Maulana Azad Medical College, Dr. Jain brings a wealth of knowledge and expertise to our faculty team and is dedicated to helping students develop a deep understanding of the subject. His innovative teaching methods, which include the use of mind maps and clinical scenarios, make Biochemistry accessible and enjoyable for learners of all levels.Dr. Jain's commitment to excellence and passion for his work has earned him a reputation as one of the most inspiring and effective educators in the field.",
    },
  ];
  const prof4 = [
    {
      image: drKhandelwal,
      name: "Dr. Ankit Khandelwal",
      experience: "14+ Years of Experience",
      description:
        "Dr. Ankit Khandelwal is a distinguished Anatomist and faculty member with extensive experience in teaching.",
      video:
        "https://student.allennext.com/api/v1/src/player/805085157?h=4df8d01a9e",
      about:
        "Dr. Ankit Khandelwal is a distinguished Anatomist and faculty member with extensive experience in teaching. He has over 14 years of experience in teaching through both online and offline platforms and is known as a leading authority in the field. Dr. Khandelwal earned his MBBS degree from the prestigious King George Medical College in Lucknow, followed by an MS in Anatomy from S.N. Medical College in Agra, and completed his Senior residency at UCMS Delhi.Currently, Dr. Khandelwal holds the position of Associate Professor of Anatomy and has numerous publications in both National and International medical journals, which makes him a valuable asset to our faculty team. With his expertise and passion for teaching, he is well-equipped to guide students with their inquiries in the field of Anatomy.",
    },
    {
      image: drAnupama,
      name: "Dr. Anupama",
      experience: "14+ Years of Experience",
      description:
        "Dr. Anupama Chowdhry Devgan is a distinguished alumnus of AFMC, Pune, with remarkable academic ",
      video:
        "https://student.allennext.com/api/v1/src/player/805085239?h=98f7416b83",
      about:
        "Dr. Anupama Chowdhry Devgan is a distinguished alumnus of AFMC, Pune, with remarkable academic achievements and extracurricular activities. She graduated with a distinction in Biochemistry and received a Gold Medal in Pathology. She served as a Short Service Commission Officer in the Army Medical Corps before completing her MD and DNB in Physiology from BJMC, Ahmedabad.Dr. Anupama has more than 25 years of experience teaching Physiology at various medical colleges across the country, including BJMC (Ahmedabad), NRS Medical College (Kolkata), and ACMS (New Delhi). For the past 17 years, she has been passionately guiding students preparing for MD/MS entrance exams such as NEET PG, INICET, FMGE, and USMLE at a premier coaching institute. Dr. Anupama has also been actively mentoring and tutoring students for different entrance exams, both nationally and internationally.As part of the ALLEN NExT team, Dr. Anupama Devgan is sharing her expertise in Physiology with aspiring medical specialists. With her extensive experience in teaching and mentoring, she is a perfect guide for students preparing for entrance exams. Drawing from her own academic achievements and experiences, she will be able to provide valuable insights on how to excel in these exams.",
    },
    {
      image: drAmit,
      name: "Dr. Amit Jain",
      experience: "14+ Years of Experience",
      description:
        "Dr. Amit Jain is a highly respected and sought-after professor of Biochemistry, with over a decade of",
      video:
        "https://student.allennext.com/api/v1/src/player/805085366?h=05566aa68d",
      about:
        "Dr. Amit Jain is a highly respected and sought-after professor of Biochemistry, with over a decade of experience in teaching and research. A graduate of the prestigious Maulana Azad Medical College, Dr. Jain brings a wealth of knowledge and expertise to our faculty team and is dedicated to helping students develop a deep understanding of the subject. His innovative teaching methods, which include the use of mind maps and clinical scenarios, make Biochemistry accessible and enjoyable for learners of all levels.Dr. Jain's commitment to excellence and passion for his work has earned him a reputation as one of the most inspiring and effective educators in the field.",
    },
    {
      image: drAmit,
      name: "Dr. Amit Jain",
      experience: "14+ Years of Experience",
      description:
        "Dr. Amit Jain is a highly respected and sought-after professor of Biochemistry, with over a decade of",
      video:
        "https://student.allennext.com/api/v1/src/player/805085366?h=05566aa68d",
      about:
        "Dr. Amit Jain is a highly respected and sought-after professor of Biochemistry, with over a decade of experience in teaching and research. A graduate of the prestigious Maulana Azad Medical College, Dr. Jain brings a wealth of knowledge and expertise to our faculty team and is dedicated to helping students develop a deep understanding of the subject. His innovative teaching methods, which include the use of mind maps and clinical scenarios, make Biochemistry accessible and enjoyable for learners of all levels.Dr. Jain's commitment to excellence and passion for his work has earned him a reputation as one of the most inspiring and effective educators in the field.",
    },
  ];

  return (
    <Container className="responsive-carousel">
      <OwlCarousel
        className="owl-theme d-flex flex-column-reverse"
        {...options}
      >
        <div className="item row">
          {prof1.map((prof, i) => (
            <div className="outer-box col-lg-4 col-md-6" key={i}>
              <div className="teacher-box">
                <img
                  src={prof.image}
                  alt={prof.name}
                  style={{ width: "auto", height: "300px" }}
                  className="img-fluid"
                />
                <h4>{prof.name}</h4>
                <div className="experience">
                  <img src={icon} alt="icon" className="img-fluid icon" />
                  <p>{prof.experience}</p>
                </div>
                <p>
                  {prof.description} <br />
                  <a href="#" onClick={() => handleShowModal(prof)}>
                    Know More
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="item row">
          {prof2.map((prof, i) => (
            <div className="outer-box col-lg-4 col-md-6" key={i}>
              <div className="teacher-box">
                <img
                  src={prof.image}
                  alt={prof.name}
                  style={{ width: "auto", height: "300px" }}
                  className="img-fluid"
                />
                <h4>{prof.name}</h4>
                <div className="experience">
                  <img src={icon} alt="icon" className="img-fluid icon" />
                  <p>{prof.experience}</p>
                </div>
                <p>
                  {prof.description} <br />
                  <a href="#" onClick={() => handleShowModal(prof)}>
                    Know More
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="item row">
          {prof3.map((prof, i) => (
            <div className="outer-box col-lg-4 col-md-6" key={i}>
              <div className="teacher-box">
                <img
                  src={prof.image}
                  alt={prof.name}
                  style={{ width: "auto", height: "300px" }}
                  className="img-fluid"
                />
                <h4>{prof.name}</h4>
                <div className="experience">
                  <img src={icon} alt="icon" className="img-fluid icon" />
                  <p>{prof.experience}</p>
                </div>
                <p>
                  {prof.description} <br />
                  <a href="#" onClick={() => handleShowModal(prof)}>
                    Know More
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="item row">
          {prof4.map((prof, i) => (
            <div className="outer-box col-lg-4 col-md-6" key={i}>
              <div className="teacher-box">
                <img
                  src={prof.image}
                  alt={prof.name}
                  style={{ width: "auto", height: "300px" }}
                  className="img-fluid"
                />
                <h4>{prof.name}</h4>
                <div className="experience">
                  <img src={icon} alt="icon" className="img-fluid icon" />
                  <p>{prof.experience}</p>
                </div>
                <p>
                  {prof.description} <br />
                  <a href="#" onClick={() => handleShowModal(prof)}>
                    Know More
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </OwlCarousel>

      {/* Modal component */}

      <Modal show={showModal} onHide={handleCloseModal} fullscreen>
        <Modal.Body className="row">
          <div className="col-md-6">
            <Modal.Header closeButton>
              <Modal.Title>
                {selectedProfile ? selectedProfile.name : ""}
              </Modal.Title>
            </Modal.Header>
            {selectedProfile ? selectedProfile.about : ""}
          </div>
          <iframe
            className="col-md-6"
            allow="autoplay"
            width="100%"
            height="100%"
            src={selectedProfile ? selectedProfile.video : ""}
          />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer> */}
      </Modal>
    </Container>
  );
};

export default ResponsiveCarousel;
