import DrAnjaliAmarapurkar from '../assets/Dr-Anjali-Amarapurkar,-Vice-President.jpg';
import DrArchanaRadstogi from '../assets/Dr-Archana-Radstogi,-Governing-Body-Member.jpg';
import DrArvindAhuja from '../assets/Dr-Arvind-Ahuja,-Treasurer.jpg';
import DrChhaganBihari from '../assets/Dr-Chhagan-Bihari,-Governing-Body-Member.jpg';
import DrKimVaiphei from '../assets/Dr-Kim-Vaiphei,-Governing-Body-Member.jpg';
import DrLipikaLipi from '../assets/Dr-Lipika-Lipi,-Joint-Treasurer.jpg';
import DrMalaBaneerjee from '../assets/Dr-Mala-Baneerjee,-Govering-Body-Member.jpg';
import DrMuktaRamadwar from '../assets/Dr-Mukta-Ramadwar,-Governing-Body-Member.jpg';
import DrMukulVij from '../assets/Dr-Mukul-Vij,-Govering-Body-Member.jpg';
import DrNirajKumari from '../assets/Dr-Niraj-Kumari,-Governing-body-Member.jpeg';
import DrPrasenjitDas from '../assets/Dr-Prasenjit-Das,-Secrertary-General.jpg';
import DrRajivKaushal from '../assets/Dr-Rajiv-Kaushal,-Governing-Body-Member.jpg';
import DrRajniYadav from '../assets/Dr-Rajni-Yadav,-Governing-Body-Member.png';
import DrSurbhiGoyal from '../assets/Dr-Surbhi-Goyal,-Governing-Body-Member.jpg';
import DrVatsalaMisra from '../assets/Dr-Vatsala-Misra,-Governing-Body-Member.jpg';

const GoverningBody = () => {
  // Office Bearers data
  const officeBearers = [
    { name: "Prof. Puja Sakhuja", position: "President", image: `` },
    { name: "Prof. Anjali Amarapurkar", position: "Vice-President", image: DrAnjaliAmarapurkar },
    { name: "Prof. Prasenjit Das", position: "Secretary General", image: DrPrasenjitDas },
    { name: "Prof. Arvind Ahuja", position: "Treasurer", image: DrArvindAhuja },
    { name: "Dr. Lipika Lipi", position: "Co-Treasurer", image: DrLipikaLipi }
  ];

  // Governing Body Members data
  const governingBodyMembers = [
    { name: "Prof. Puja Sakhuja", position: "President", image: `` },
    { name: "Prof. Anjali Amarapurkar", position: "Vice-President", image: DrAnjaliAmarapurkar },
    { name: "Prof. Prasenjit Das", position: "Secretary General", image: DrPrasenjitDas },
    { name: "Prof. Arvind Ahuja", position: "Treasurer", image: DrArvindAhuja },
    { name: "Dr. Lipika Lipi", position: "Co-Treasurer", image: DrLipikaLipi },
    { name: "Prof. Kim Vaiphei", position: "Patron", image: DrKimVaiphei },
    { name: "Prof. Vatsala Misra", position: "Patron", image: DrVatsalaMisra },
    { name: "Prof. Mukta Ramadwar", position: "EC Member", image: DrMuktaRamadwar },
    { name: "Prof. Archana Rastogi", position: "EC Member", image: DrArchanaRadstogi },
    { name: "Dr. Roopa Paulose", position: "EC Member", image: `` },
    { name: "Dr. Chagan Bihari", position: "EC Member", image: DrChhaganBihari },
    { name: "Dr. Rajni Yadav", position: "EC Member", image: DrRajniYadav },
    { name: "Dr. Mala Baneerjee", position: "EC Member", image: DrMalaBaneerjee },
    { name: "Prof. Niraj Kumari", position: "EC Member", image: DrNirajKumari },
    { name: "Prof. Munita Bal", position: "EC Member", image: `` },
    { name: "Dr. Mukul Vij", position: "EC Member", image: DrMukulVij },
    { name: "Dr. Rajeev Kumar", position: "EC Member", image: DrRajivKaushal },
    { name: "Dr. Surbhi Goyal", position: "EC Member", image: DrSurbhiGoyal },
  ];

  // National Advisors data
  const nationalAdvisors = [
    { name: "Prof. Siddhartha Datta Gupta", },
    { name: "Prof. Asim Das", },
    { name: "Prof. Rachana Chaturvedi", },
    { name: "Prof. Nuzhat Hussain", },
    { name: "Prof. Ritambhra Nada", },
    { name: "Prof. Anna Pulimood", },

  ];

  // International Advisors data
  const internationalAdvisors = [
    { name: "Prof. Vikram Deshpande", },
    { name: "Prof. Dhanpat Jain", },
    { name: "Prof. Sanjay Kakkar", },
    { name: "Prof. Amitabh Srivatava", },
    { name: "Prof. Deepti Dhall", }
  ];

  const MemberCard = ({ member, isOfficer = false, showImage = true }) => (
    <div className={`rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 ${isOfficer ? 'p-6' : 'p-5'} text-center shadow-sm hover:shadow-md transition-shadow`}>
      {showImage && (
        <div className={`${isOfficer ? 'w-32 h-32 mb-4' : 'w-24 h-24 mb-4'} mx-auto`}>
          <img
            src={member.image}
            className="w-full h-full rounded-full object-contain border-2 border-gold-DEFAULT"
          />
        </div>
      )}
      <h3 className={`text-primary dark:text-white ${isOfficer ? 'text-lg' : 'text-base'} font-bold mb-1`}>
        {member.name}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm">
        {member.position}
      </p>
    </div>
  );

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h1 className="text-primary dark:text-white text-4xl md:text-5xl font-black tracking-tighter">
                Governing Body
              </h1>
            </div>

            {/* Office Bearers Section */}
            <section className="mb-16">
              <div className="relative mb-8 text-center">
                <h2 className="text-primary dark:text-white text-2xl md:text-3xl font-bold tracking-tight">
                  Office Bearers
                </h2>
                <div className="absolute inset-x-0 bottom-[-8px] mx-auto h-0.5 w-20 bg-gold-DEFAULT"></div>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {officeBearers.map((member, index) => (
                  <MemberCard key={index} member={member} isOfficer={true}

                  />
                ))}
              </div>
            </section>

            {/* Governing Body Members Section */}
            <section className="mb-16">
              <div className="relative mb-8 text-center">
                <h2 className="text-primary dark:text-white text-2xl md:text-3xl font-bold tracking-tight">
                  Governing Body Members
                </h2>
                <div className="absolute inset-x-0 bottom-[-8px] mx-auto h-0.5 w-20 bg-gold-DEFAULT"></div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {governingBodyMembers.map((member, index) => (
                  <MemberCard key={index} member={member} />
                ))}
              </div>
            </section>

            {/* National Advisors Section */}
            <section className="mb-16">
              <div className="relative mb-8 text-center">
                <h2 className="text-primary dark:text-white text-2xl md:text-3xl font-bold tracking-tight">
                  National Advisors
                </h2>
                <div className="absolute inset-x-0 bottom-[-8px] mx-auto h-0.5 w-20 bg-gold-DEFAULT"></div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {nationalAdvisors.map((member, index) => (
                  <MemberCard key={index} member={member} showImage={false} />
                ))}
              </div>
            </section>

            {/* International Advisors Section */}
            <section>
              <div className="relative mb-8 text-center">
                <h2 className="text-primary dark:text-white text-2xl md:text-3xl font-bold tracking-tight">
                  International Advisors
                </h2>
                <div className="absolute inset-x-0 bottom-[-8px] mx-auto h-0.5 w-20 bg-gold-DEFAULT"></div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {internationalAdvisors.map((member, index) => (
                  <MemberCard key={index} member={member} showImage={false} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GoverningBody;