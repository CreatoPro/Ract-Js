"use client";
import Image from "next/image";
import React from "react";
import { Container } from "react-bootstrap";
import "../../../public/css/teacher-page.css";

export default function TeacherPage() {
  return (
    <div className="teacher-page img-fluid">
      <Container fluid className="p-0">
        <div className="teacher-bg">
          <Container className="d-flex row">
            <div className="text-wrapper col-lg-6">
              <div className="title">PHYSIOLOGY</div>
              <div className="description">Dr. Anupama C. Devgan</div>
              <div className="designation">
                MBBS, MS & DNB (Physiology) | 12+ Years of Experience
              </div>
            </div>
            <div className="teacher-img-container col-lg-6">
              <Image
                className="teacher-img img-fluid"
                src="/images/teacher-img.png"
                width={1000}
                height={1000}
              />
            </div>
          </Container>
        </div>
        <Container>
          <div className="features">
            <div className="outer-box">
              <div className="blue-box"></div>
              <div className="title-and-name">
                <div className="title">100K+</div>
                <div className="name">App Download</div>
              </div>
            </div>
            <div className="outer-box">
              <div className="blue-box"></div>
              <div className="title-and-name">
                <div className="title">100M+</div>
                <div className="name">Hours Videos Watched</div>
              </div>
            </div>
            <div className="outer-box">
              <div className="blue-box"></div>
              <div className="title-and-name">
                <div className="title">86%</div>
                <div className="name">NEET-PG 2023 Strike Rate</div>
              </div>
            </div>
          </div>
          <div className="about-teacher">
            <Image
              src="/images/hat.png"
              className="hat-img"
              height={91}
              width={91}
            />
            <div className="row">
              <div className="col-xl-6">
                <Image
                  src="/images/teacher-about-img.png"
                  height={1000}
                  width={1000}
                  className="teacher-img"
                />
              </div>
              <div className="col-xl-6 about">
                <div className="header">About Faculty</div>
                <div className="description">
                  <p>
                    Dr. Anupama Chowdhry Devgan, is a distinguished alumnus of
                    AFMC, Pune, a Gold medalist, an SSCO in Army Medical Corps
                    and an esteemed faculty having delivered at several premier
                    colleges like BJMC (Ahmedabad), NRS (Kolkata), and ACMS (New
                    Delhi).
                  </p>
                  <p>
                    With an exceptional 25 years of expertise in teaching
                    Physiology, Dr. Devgan has been passionately mentoring
                    students for MD/MS entrance exams like NEET PG, INI-CET,
                    USMLE and FMGE. Having transformed tens of thousands of
                    lives, she's now a diligent Faculty Member of the ALLEN NExT
                    team, providing her unparalleled guidance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Container>
    </div>
  );
}
