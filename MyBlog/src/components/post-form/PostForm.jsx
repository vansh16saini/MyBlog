import React ,{useCallback,useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Button,Input,Select,RTE} from '../index'
import service from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const submit = async (data) => {
    // 🔒 Auth guard
    if (!userData?.$id) {
      alert("User not ready");
      return;
    }

    try {
      if (post) {
        let file = null;

        if (data.image?.[0]) {
          file = await service.uploadFile(data.image[0]);

          if (!file?.$id) {
            alert("Image upload failed");
            return;
          }

          await service.deleteFile(post.featuredImage);
        }

        const dbPost = await service.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (dbPost?.$id) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        if (!data.image?.[0]) {
          alert("Image required");
          return;
        }

        const file = await service.uploadFile(data.image[0]);

        if (!file?.$id) {
          alert("Upload failed");
          return;
        }

        const dbPost = await service.createPost({
          ...data,
          featuredImage: file.$id,
          userId: userData.$id,
        });

        if (dbPost?.$id) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (err) {
      console.error("Post submit error:", err);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col md:flex-row gap-8 max-w-[1920px] mx-auto px-6 py-12"
    >
      {/* LEFT */}
      <div className="w-full md:w-2/3 space-y-5">
        <Input
          label="Title"
          placeholder="Title"
          className="bg-[var(--color-surface)] text-[var(--color-text)] border border-white/10 focus:border-[var(--color-primary)]"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug"
          placeholder="Slug"
          className="bg-[var(--color-surface)] text-[var(--color-text)] border border-white/10 focus:border-[var(--color-primary)]"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue(
              "slug",
              slugTransform(e.currentTarget.value),
              { shouldValidate: true }
            );
          }}
        />

        <div className="border border-white/10 rounded-lg overflow-hidden">
          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/3 space-y-5">
        <Input
          label="Featured Image"
          type="file"
          className="bg-[var(--color-surface)] text-[var(--color-text)] border border-white/10 focus:border-[var(--color-primary)]"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full">
            <img
              src={service.getFileView(post.featuredImage)}
              alt={post.title}
              className="rounded-lg border border-white/10"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="bg-[var(--color-surface)] text-[var(--color-text)] border border-white/10 focus:border-[var(--color-primary)]"
          {...register("status", { required: true })}
        />

        <Button type="submit" variant="primary" className="w-full cursor-pointer">
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;