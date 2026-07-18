import MedicalCard, {
  Article,
  MedicalCardProps,
} from "@/components/modules/blog/medicareBlogCard";
import EmptyBlog from "./emptyBlog";
import blogService from "@/service/blog.service";

export default async function MedicareBlogs() {
  const articles = await blogService.getBlogs();

  if (articles.length === 0) {
    return <EmptyBlog />;
  }

  return (
    <div className="my-20 w-11/12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((item: Article, index: any) => (
        <MedicalCard key={index} article={item} />
      ))}
    </div>
  );
}
