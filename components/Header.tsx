import { useState } from 'react'
import cx from 'classnames'
import { useRouter } from 'next/router'
import { ChevronDownIcon, MarkGithubIcon, ThreeBarsIcon, XIcon } from '@primer/octicons-react'
import { ButtonOutline } from '@primer/components'

import { Link } from 'components/Link'
import { useMainContext } from './context/MainContext'
import { LanguagePicker } from './LanguagePicker'
import { HeaderNotifications } from 'components/HeaderNotifications'
import { MobileProductDropdown } from 'components/MobileProductDropdown'
import { useTranslation } from 'components/hooks/useTranslation'
import { HomepageVersionPicker } from 'components/landing/HomepageVersionPicker'
import { Search } from 'components/Search'

export const Header = () => {
  const router = useRouter()
  const { currentProduct, relativePath, currentLayoutName, error } = useMainContext()
  const { t } = useTranslation(['header', 'homepage'])

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const showVersionPicker =
    relativePath === 'index.md' ||
    currentLayoutName === 'product-landing' ||
    currentLayoutName === 'product-sublanding'

  return (
    <div className="border-bottom color-border-secondary no-print">
      {error !== '404' && <HeaderNotifications />}

      <header className="container-xl px-3 px-md-6 pt-3 pb-2 position-relative d-flex flex-justify-between width-full">
        <div
          className="d-flex flex-items-center d-lg-none"
          style={{ zIndex: 3 }}
          id="github-logo-mobile"
          role="banner"
        >
          <Link aria-hidden="true" tabIndex={-1} href={`/${router.locale}`}>
            <MarkGithubIcon size={32} className="color-icon-primary" />
          </Link>

          <Link
            href={`/${router.locale}`}
            className="h4-mktg color-text-primary no-underline no-wrap pl-2"
          >
            {t('github_docs')}
          </Link>
        </div>

        <div className="width-full">
          <div className="d-inline-block width-full d-md-flex" style={{ zIndex: 1 }}>
            <div className="float-right d-md-none position-relative" style={{ zIndex: 3 }}>
              <ButtonOutline
                css
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Navigation Menu"
              >
                {isMenuOpen ? <XIcon size="small" /> : <ThreeBarsIcon size="small" />}
              </ButtonOutline>
            </div>
            <div
              style={{ zIndex: 2 }}
              className={cx('nav-mobile-dropdown width-full', isMenuOpen && 'js-open')}
            >
              <div className="d-md-flex flex-justify-between flex-items-center">
                <div className="py-2 py-md-0 d-md-inline-block">
                  <h4 className="text-mono f5 text-normal color-text-secondary d-md-none">
                    {t('explore_by_product')}
                  </h4>
                  <details className="dropdown-withArrow position-relative details details-reset d-md-none close-when-clicked-outside">
                    <summary
                      className="nav-desktop-productDropdownButton color-text-link py-2"
                      role="button"
                      aria-label="Toggle products list"
                    >
                      <div
                        id="current-product"
                        className="d-flex flex-items-center flex-justify-between"
                        style={{ paddingTop: 2 }}
                      >
                        {/* <!-- Product switcher - GitHub.com, Enterprise Server, etc -->
                    <!-- 404 and 500 error layouts are not real pages so we need to hardcode the name for those --> */}
                        {currentProduct?.name}
                        <ChevronDownIcon size={24} className="arrow ml-md-1" />
                      </div>
                    </summary>

                    <MobileProductDropdown />
                  </details>
                </div>

                <div className="d-md-inline-block">
                  {/* <!-- Versions picker that only appears in the header on landing pages --> */}
                  {showVersionPicker && <HomepageVersionPicker />}

                  {/* <!-- Language picker - 'English', 'Japanese', etc --> */}
                  <div className="border-top border-md-top-0 py-2 d-md-inline-block">
                    <LanguagePicker />
                  </div>

                  {/* <!-- GitHub.com homepage and 404 page has a stylized search; Enterprise homepages do not --> */}
                  {relativePath !== 'index.md' && error !== '404' && (
                    <div className="pt-3 pt-md-0 ml-md-3 d-md-inline-block border-top border-md-top-0">
                      <Search />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
