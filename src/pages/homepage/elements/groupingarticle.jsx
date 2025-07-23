import React, { useEffect, useState } from "react";
import Layout from "../../../component/Layout";

const GroupedArticles = () => {
  const [sectionedArticles, setSectionedArticles] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const response = await fetch("https://updated-naatacademy.onrender.com/api/articles/sectionone");
      const data = await response.json();

      const articles = data.data || [];

      // Grouping articles by SectionName
      const groupedBySection = articles.reduce((acc, article) => {
        const sectionName = article.SectionName || "نامعلوم سیکشن";
        if (!acc[sectionName]) {
          acc[sectionName] = [];
        }
        acc[sectionName].push(article);
        return acc;
      }, {});

      setSectionedArticles(groupedBySection);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <Layout>
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">سیکشن کے مطابق آرٹیکلز</h1>

      {loading ? (
        <p className="text-center text-gray-500">ڈیٹا لوڈ ہو رہا ہے...</p>
      ) : (
        Object.keys(sectionedArticles).map((section) => (
          <div key={section} className="mb-10">
            <h2 className="text-2xl font-bold text-right text-green-700 border-b pb-2 mb-4">
              سیکشن: {section}
            </h2>

            <div className="grid gap-4">
              {sectionedArticles[section].map((article) => (
                <div
                  key={article.ArticleID}
                  className="bg-white shadow rounded-lg p-4 border"
                >
                  <h3 className="text-xl font-semibold text-blue-700 text-right">
                    {article.Title}
                  </h3>
                  <p className="text-sm text-right text-gray-600 mt-1">
                    گروپ: {article.GroupName || "نامعلوم"}
                  </p>
                  <p className="text-xs text-right text-gray-400">
                    تاریخ: {new Date(article.CreatedOn).toLocaleDateString("ur-PK")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
    </Layout>
  );
};

export default GroupedArticles;
