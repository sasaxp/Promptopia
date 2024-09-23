// 'use client'
// import { useEffect, useState } from 'react'
// import { useSession } from 'next-auth/react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import Form  from '@components/Form'

// const EditPrompt = () => {
//     const router = useRouter()
//     // const { data: session } = useSession()
//     const searchParams = useSearchParams()
//     const promptId = searchParams.get('id')
//     const [submitting, setSubmitting] = useState(false)
//     const [post, setPost] = useState({
//         prompt: '',
//         tag: '',
//     });

//     useEffect(() => {
//         const getPromptDetails = async () => {
//             const response = await fetch(`/api/prompt/${promptId}`)
//             const data = await response.json()
//             setPost({
//                 prompt: data.prompt,
//                 tag: data.tag
//             })
//         }
//         if(promptId) getPromptDetails()
//     }, [promptId])


//     const updatePrompt= async (e) => {
//         e.preventDefault();
//         setSubmitting(true)
//         if(!promptId) return alert('Prompt ID not found')

//         try {
//             const response = await fetch(`/api/prompt/${promptId}`, {
//                 method: 'PATCH',
//                 body: JSON.stringify({
//                     prompt: post.prompt,
                    
//                     tag: post.tag
//                 })
//             })
//             if(response.ok) {
//                 router.push('/')
//             }
//         } catch (error) {
//             console.log(error)
//         } finally {
//             setSubmitting(false)
//         }
//     }
//     return (
//         <Form 
//             type="Edit"
//             post={post}
//             setPost={setPost}
//             submitting={submitting}
//             handleSubmit={updatePrompt}
//         />
//     )
// }

// export default EditPrompt



'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

// Ensure dynamic rendering to avoid pre-rendering errors
export const dynamic = 'force-dynamic';

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Hook is within Suspense
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      if (promptId) {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      }
    };
    getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert('Prompt ID not found');

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading prompt data...</div>}>
      <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </Suspense>
  );
};

export default EditPrompt;
