import { Analytics } from '@vercel/analytics/react'
import { GitProviderLink } from 'omnidoc/components'
import type { Metadata } from 'next'
import Link from 'next/link'

import './layout.css'

export const metadata = {
  title: 'Omnidoc',
  description: 'The toolkit to build docs as great as your product.',
} satisfies Metadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link
        href="/favicon-light.svg"
        rel="icon"
        media="(prefers-color-scheme: light)"
      />
      <link
        href="/favicon-dark.svg"
        rel="icon"
        media="(prefers-color-scheme: dark)"
      />
      <body css={{ padding: '2rem' }}>
        <header
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '2rem',
          }}
        >
          <Link href="/">
            <Logo />
          </Link>
          <nav css={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/collections">Collections</Link>
            <Link href="/components">Components</Link>
            <GitProviderLink />
          </nav>
        </header>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

function Logo() {
  return (
    <svg
      aria-label="Omnidoc"
      width="142"
      height="24"
      viewBox="0 0 142 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        '--primary': '#E3F1F8',
        '--secondary': '#6aa3d9',
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6438 3.01653C12.1466 3.18231 12.4864 3.65203 12.4864 4.18152V7.15763C12.4864 7.99174 11.6718 8.58262 10.8789 8.3237L8.25818 7.46792C7.83898 7.33103 7.37856 7.42969 7.05226 7.72633L6.03333 8.65263C5.77761 8.88511 5.63181 9.21468 5.63181 9.56029V11.9518C5.63181 12.786 4.81728 13.3768 4.02437 13.1179L0.940623 12.1109C0.43608 11.9462 0.0947266 11.4756 0.0947266 10.9449V7.95909C0.0947266 7.12352 0.911904 6.53249 1.70546 6.7941L4.04041 7.56388C4.4604 7.70234 4.9224 7.60402 5.24962 7.30655L6.54776 6.12642C6.80349 5.89394 6.94928 5.56437 6.94928 5.21876V3.16488C6.94928 2.32931 7.76646 1.73827 8.56002 1.99989L11.6438 3.01653ZM17.5809 10.6085C18.3738 10.8675 19.1883 10.2766 19.1883 9.44246V6.46635C19.1883 5.93687 18.8486 5.46714 18.3457 5.30136L15.262 4.28472C14.4684 4.0231 13.6512 4.61414 13.6512 5.44971V7.60505C13.6512 7.95066 13.5054 8.28023 13.2497 8.51271L12.2556 9.41646C11.9284 9.71393 11.4664 9.81225 11.0464 9.67379L8.56002 8.8541C7.76646 8.59248 6.94928 9.18352 6.94928 10.0191V13.0049C6.94928 13.5356 7.29064 14.0062 7.79518 14.1709L10.8789 15.1779C11.6718 15.4368 12.4864 14.846 12.4864 14.0118V11.8078C12.4864 11.4622 12.6322 11.1327 12.8879 10.9002L13.8363 10.038C14.1626 9.74134 14.623 9.64268 15.0422 9.77956L17.5809 10.6085ZM4.02175 19.9858C4.81518 20.2468 5.63181 19.6558 5.63181 18.8205V15.8039C5.63181 15.2755 5.29337 14.8064 4.79186 14.6398L1.7081 13.6154C0.914031 13.3516 0.0947266 13.9428 0.0947266 14.7795V17.8059C0.0947266 18.3356 0.434794 18.8055 0.937999 18.9711L4.02175 19.9858ZM12.8879 17.8841C12.6322 18.1165 12.4864 18.4461 12.4864 18.7917V20.8805C12.4864 21.7158 11.6697 22.3068 10.8763 22.0458L7.79256 21.0311C7.28935 20.8655 6.94928 20.3956 6.94928 19.8659V16.8395C6.94928 16.0028 7.76859 15.4116 8.56266 15.6754L11.1704 16.5417C11.591 16.6814 12.0543 16.5834 12.3822 16.2852L13.2497 15.4966C13.5054 15.2641 13.6512 14.9345 13.6512 14.5889V12.2701C13.6512 11.4334 14.4705 10.8422 15.2646 11.106L18.3484 12.1304C18.8499 12.297 19.1883 12.7661 19.1883 13.2945V16.3111C19.1883 17.1464 18.3717 17.7374 17.5783 17.4764L15.143 16.6751C14.7232 16.5369 14.2615 16.6353 13.9345 16.9326L12.8879 17.8841Z"
        fill="var(--secondary)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.02376 13.1178C4.81697 13.3768 5.63181 12.7857 5.63181 11.9512V8.97611C5.63181 8.44643 5.29194 7.97652 4.78889 7.81067L1.70608 6.79435C0.912219 6.53263 0.0947266 7.12389 0.0947266 7.95979V10.9446C0.0947266 11.4755 0.436211 11.9463 0.940949 12.1111L4.02376 13.1178ZM4.02113 19.9856C4.81486 20.2467 5.63181 19.6555 5.63181 18.8199V16.5469C5.63181 16.2012 5.77766 15.8715 6.03349 15.6389L7.15904 14.6157C7.48546 14.319 7.94606 14.2203 8.36542 14.3572L10.8783 15.1778C11.6715 15.4368 12.4864 14.8457 12.4864 14.0112V11.0361C12.4864 10.5064 12.1465 10.0365 11.6434 9.87068L8.56064 8.85436C7.76678 8.59264 6.94928 9.1839 6.94928 10.0198V12.205C6.94928 12.5507 6.80343 12.8804 6.54761 13.113L5.37883 14.1755C5.05074 14.4738 4.58728 14.5719 4.1665 14.4321L1.70872 13.6156C0.914346 13.3517 0.0947266 13.9431 0.0947266 14.7802V17.8056C0.0947266 18.3355 0.434924 18.8056 0.938323 18.9712L4.02113 19.9856ZM11.6461 16.6997C12.1478 16.8664 12.4864 17.3356 12.4864 17.8643V20.8799C12.4864 21.7155 11.6694 22.3068 10.8757 22.0456L7.79288 21.0312C7.28948 20.8656 6.94928 20.3955 6.94928 19.8656V16.8402C6.94928 16.0032 7.7689 15.4118 8.56328 15.6757L11.6461 16.6997Z"
        fill="var(--primary)"
      />
      <path
        d="M38.3988 21.0835C36.8343 21.0835 35.4852 20.8041 34.3517 20.2454C33.2182 19.6866 32.2842 18.9522 31.5498 18.0422C30.8154 17.1322 30.2646 16.1583 29.8975 15.1206C29.5462 14.0829 29.3706 13.085 29.3706 12.1271V11.6003C29.3706 10.5626 29.5542 9.51686 29.9214 8.46317C30.2886 7.40948 30.8474 6.45158 31.5977 5.58947C32.3481 4.71139 33.282 4.00893 34.3996 3.48208C35.5331 2.95524 36.8662 2.69181 38.3988 2.69181C39.9315 2.69181 41.2566 2.95524 42.3741 3.48208C43.5076 4.00893 44.4496 4.71139 45.1999 5.58947C45.9503 6.45158 46.5091 7.40948 46.8763 8.46317C47.2434 9.51686 47.427 10.5626 47.427 11.6003V12.1271C47.427 13.085 47.2434 14.0829 46.8763 15.1206C46.525 16.1583 45.9822 17.1322 45.2478 18.0422C44.5134 18.9522 43.5795 19.6866 42.446 20.2454C41.3124 20.8041 39.9634 21.0835 38.3988 21.0835ZM38.3988 18.9282C39.4206 18.9282 40.3386 18.7367 41.1528 18.3535C41.983 17.9703 42.6854 17.4515 43.2602 16.7969C43.8349 16.1264 44.274 15.376 44.5773 14.5458C44.8806 13.6997 45.0323 12.8136 45.0323 11.8877C45.0323 10.9138 44.8806 10.0038 44.5773 9.15765C44.274 8.3115 43.8349 7.56913 43.2602 6.93053C42.6854 6.27596 41.983 5.76508 41.1528 5.39789C40.3386 5.03069 39.4206 4.84709 38.3988 4.84709C37.3771 4.84709 36.4511 5.03069 35.6209 5.39789C34.8067 5.76508 34.1122 6.27596 33.5375 6.93053C32.9627 7.56913 32.5237 8.3115 32.2204 9.15765C31.917 10.0038 31.7654 10.9138 31.7654 11.8877C31.7654 12.8136 31.917 13.6997 32.2204 14.5458C32.5237 15.376 32.9627 16.1264 33.5375 16.7969C34.1122 17.4515 34.8067 17.9703 35.6209 18.3535C36.4511 18.7367 37.3771 18.9282 38.3988 18.9282Z"
        fill="var(--primary)"
      />
      <path
        d="M51.1924 20.6525V7.86448H53.0124V13.3485H52.7251C52.7251 12.1032 52.8847 11.0495 53.204 10.1874C53.5393 9.30932 54.0342 8.63879 54.6888 8.1758C55.3433 7.71281 56.1735 7.48132 57.1793 7.48132H57.2751C58.2809 7.48132 59.1111 7.71281 59.7656 8.1758C60.4362 8.63879 60.9311 9.30932 61.2504 10.1874C61.5697 11.0495 61.7293 12.1032 61.7293 13.3485H61.0588C61.0588 12.1032 61.2264 11.0495 61.5617 10.1874C61.897 9.30932 62.3919 8.63879 63.0464 8.1758C63.717 7.71281 64.5551 7.48132 65.5609 7.48132H65.6567C66.6625 7.48132 67.5007 7.71281 68.1712 8.1758C68.8418 8.63879 69.3367 9.30932 69.656 10.1874C69.9912 11.0495 70.1589 12.1032 70.1589 13.3485V20.6525H67.8599V12.8456C67.8599 11.8078 67.6045 11.0096 67.0936 10.4508C66.5827 9.87607 65.8723 9.5887 64.9623 9.5887C64.0203 9.5887 63.262 9.89204 62.6872 10.4987C62.1125 11.0894 61.8251 11.9196 61.8251 12.9893V20.6525H59.5262V12.8456C59.5262 11.8078 59.2707 11.0096 58.7598 10.4508C58.249 9.87607 57.5385 9.5887 56.6285 9.5887C55.6866 9.5887 54.9282 9.89204 54.3535 10.4987C53.7788 11.0894 53.4914 11.9196 53.4914 12.9893V20.6525H51.1924Z"
        fill="var(--primary)"
      />
      <path
        d="M74.3682 20.6525V7.86448H76.1882V13.3485H75.9008C75.9008 12.0872 76.0685 11.0256 76.4037 10.1634C76.755 9.28537 77.2818 8.62282 77.9843 8.1758C78.6867 7.71281 79.5728 7.48132 80.6425 7.48132H80.7382C82.3507 7.48132 83.5401 7.98422 84.3064 8.99002C85.0887 9.99581 85.4799 11.4486 85.4799 13.3485V20.6525H83.1809V12.8695C83.1809 11.8797 82.9015 11.0894 82.3427 10.4987C81.784 9.89204 81.0176 9.5887 80.0438 9.5887C79.038 9.5887 78.2238 9.90002 77.6011 10.5227C76.9785 11.1453 76.6672 11.9755 76.6672 13.0132V20.6525H74.3682Z"
        fill="var(--primary)"
      />
      <path
        d="M90.5483 20.6525V7.86448H92.8473V20.6525H90.5483ZM88.5846 9.68449V7.86448H92.8473V9.68449H88.5846ZM91.1949 5.56453C90.684 5.56453 90.3009 5.42883 90.0454 5.15742C89.8059 4.88602 89.6862 4.54277 89.6862 4.12768C89.6862 3.71259 89.8059 3.36934 90.0454 3.09793C90.3009 2.82653 90.684 2.69083 91.1949 2.69083C91.7058 2.69083 92.081 2.82653 92.3204 3.09793C92.5759 3.36934 92.7036 3.71259 92.7036 4.12768C92.7036 4.54277 92.5759 4.88602 92.3204 5.15742C92.081 5.42883 91.7058 5.56453 91.1949 5.56453Z"
        fill="var(--primary)"
      />
      <path
        d="M102.752 21.0835C101.842 21.0835 101.004 20.9159 100.238 20.5806C99.4716 20.2454 98.801 19.7744 98.2263 19.1677C97.6675 18.561 97.2285 17.8586 96.9092 17.0603C96.6059 16.2621 96.4542 15.4 96.4542 14.474V14.0429C96.4542 13.1329 96.6059 12.2788 96.9092 11.4806C97.2125 10.6823 97.6356 9.97985 98.1784 9.37318C98.7372 8.76651 99.3918 8.29554 100.142 7.96027C100.908 7.60904 101.755 7.43343 102.681 7.43343C103.654 7.43343 104.54 7.64097 105.339 8.05606C106.137 8.45519 106.792 9.08581 107.302 9.94792C107.813 10.81 108.101 11.9276 108.165 13.3006L107.207 11.7679V2.96549H109.506V20.6525H107.686V14.9769H108.356C108.292 16.4297 107.989 17.6111 107.446 18.5211C106.903 19.4152 106.217 20.0697 105.387 20.4848C104.572 20.884 103.694 21.0835 102.752 21.0835ZM103.064 19.0719C103.846 19.0719 104.556 18.8963 105.195 18.5451C105.834 18.1938 106.345 17.691 106.728 17.0364C107.111 16.3659 107.302 15.5836 107.302 14.6895V13.5879C107.302 12.7099 107.103 11.9675 106.704 11.3608C106.321 10.7382 105.802 10.2672 105.147 9.94792C104.509 9.61265 103.806 9.44502 103.04 9.44502C102.194 9.44502 101.443 9.64458 100.789 10.0437C100.15 10.4428 99.6472 11.0016 99.28 11.72C98.9288 12.4385 98.7532 13.2846 98.7532 14.2585C98.7532 15.2323 98.9368 16.0865 99.3039 16.8209C99.6711 17.5393 100.182 18.0981 100.837 18.4972C101.491 18.8803 102.234 19.0719 103.064 19.0719Z"
        fill="var(--primary)"
      />
      <path
        d="M119.574 21.0835C118.457 21.0835 117.475 20.8919 116.629 20.5088C115.783 20.1256 115.064 19.6227 114.474 19.0001C113.899 18.3615 113.46 17.651 113.156 16.8688C112.869 16.0865 112.725 15.2882 112.725 14.474V14.0429C112.725 13.2287 112.877 12.4305 113.18 11.6482C113.484 10.8499 113.931 10.1395 114.521 9.51686C115.112 8.87826 115.831 8.37536 116.677 8.00817C117.523 7.62501 118.489 7.43343 119.574 7.43343C120.66 7.43343 121.626 7.62501 122.472 8.00817C123.318 8.37536 124.037 8.87826 124.627 9.51686C125.218 10.1395 125.665 10.8499 125.968 11.6482C126.272 12.4305 126.423 13.2287 126.423 14.0429V14.474C126.423 15.2882 126.272 16.0865 125.968 16.8688C125.681 17.651 125.242 18.3615 124.651 19.0001C124.077 19.6227 123.366 20.1256 122.52 20.5088C121.674 20.8919 120.692 21.0835 119.574 21.0835ZM119.574 19.024C120.532 19.024 121.347 18.8165 122.017 18.4014C122.704 17.9703 123.222 17.3956 123.574 16.6772C123.941 15.9587 124.124 15.1525 124.124 14.2585C124.124 13.3485 123.941 12.5343 123.574 11.8158C123.206 11.0974 122.68 10.5306 121.993 10.1155C121.323 9.70046 120.516 9.49291 119.574 9.49291C118.648 9.49291 117.842 9.70046 117.156 10.1155C116.469 10.5306 115.942 11.0974 115.575 11.8158C115.208 12.5343 115.024 13.3485 115.024 14.2585C115.024 15.1525 115.2 15.9587 115.551 16.6772C115.918 17.3956 116.437 17.9703 117.108 18.4014C117.794 18.8165 118.617 19.024 119.574 19.024Z"
        fill="var(--primary)"
      />
      <path
        d="M135.83 21.0835C134.728 21.0835 133.77 20.8919 132.956 20.5088C132.158 20.1256 131.495 19.6147 130.968 18.9761C130.441 18.3216 130.042 17.6031 129.771 16.8209C129.515 16.0386 129.388 15.2563 129.388 14.474V14.0429C129.388 13.2287 129.515 12.4305 129.771 11.6482C130.042 10.8659 130.441 10.1634 130.968 9.54081C131.511 8.90221 132.182 8.39133 132.98 8.00817C133.778 7.62501 134.712 7.43343 135.782 7.43343C136.851 7.43343 137.809 7.63299 138.655 8.03211C139.517 8.43124 140.204 8.998 140.715 9.73239C141.242 10.4508 141.537 11.3049 141.601 12.2948H139.398C139.286 11.4965 138.919 10.834 138.296 10.3071C137.674 9.76432 136.835 9.49291 135.782 9.49291C134.872 9.49291 134.113 9.70046 133.507 10.1155C132.9 10.5306 132.445 11.0974 132.142 11.8158C131.838 12.5343 131.687 13.3485 131.687 14.2585C131.687 15.1365 131.838 15.9428 132.142 16.6772C132.445 17.3956 132.9 17.9703 133.507 18.4014C134.129 18.8165 134.904 19.024 135.83 19.024C136.548 19.024 137.171 18.8963 137.697 18.6409C138.224 18.3854 138.647 18.0422 138.967 17.6111C139.286 17.1801 139.478 16.6931 139.541 16.1503H141.745C141.697 17.1561 141.401 18.0262 140.859 18.7606C140.332 19.495 139.629 20.0697 138.751 20.4848C137.889 20.884 136.915 21.0835 135.83 21.0835Z"
        fill="var(--primary)"
      />
    </svg>
  )
}
