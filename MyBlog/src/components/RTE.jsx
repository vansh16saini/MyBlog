import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';


export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className="w-full space-y-2">
  
  {label && (
    <label className="text-sm font-medium text-[var(--color-muted)]">
      {label}
    </label>
  )}

  <div className="border border-white/10 rounded-lg overflow-hidden bg-[var(--color-surface)]/40 backdrop-blur-xl">
    
    <Controller
      name={name || "content"}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Editor
          value={value}
          initialValue={defaultValue}
          apiKey="0qnbte7q2tnl2s4giblhtcfsvz1sk49diyekaoisyoph4k8l"
          init={{
            height: 400,
            menubar: false,
            skin: "oxide-dark",
            content_css: "dark",
            plugins: [
              "image",
              "advlist",
              "autolink",
              "lists",
              "link",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright | bullist numlist | link image | code",
            content_style:
              "body { font-family: Inter, sans-serif; font-size:14px; background:#131313; color:#e5e2e1 }",
          }}
          onEditorChange={onChange}
        />
      )}
    />

  </div>

</div>
  )
}