const lessons = [
  {
    id: "1",
    title: "French Colonial Era (1863–1953)",
    description:
      "The French Colonial Era was an important period in Cambodian history. It began when Cambodia became a French protectorate in 1863..."
  },
  {
    id: "2",
    title: "Sangkum Reastr Niyum Era (1953–1970)",
    description:
      "During the Sangkum Era, Cambodia experienced political stability..."
  },
  {
    id: "3",
    title: "Khmer Republic Era (1970–1975)",
    description:
      "The Khmer Republic was established after the removal of Prince Sihanouk..."
  },
  {
    id: "4",
    title: "Democratic Kampuchea (1975–1979)",
    description:
      "The Khmer Rouge regime ruled Cambodia from 1975 to 1979..."
  },
  {
    id: "5",
    title: "People’s Republic of Kampuchea (1979–1989)",
    description:
      "After the fall of the Khmer Rouge, Vietnam helped establish..."
  }
];

exports.getAllLessons = (req, res) => {
  res.json({ success: true, data: lessons });
};

exports.getLessonById = (req, res) => {
  const id = req.params.id; // keep as string

  const lesson = lessons.find((l) => l.id === id);

  if (!lesson) {
    return res.status(404).json({ success: false, message: "Lesson not found" });
  }

  res.json({ success: true, data: lesson });
};
